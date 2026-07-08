import React, { useState, useRef, useEffect } from 'react'
import { Sparkles, Send, AlertCircle, Mic, MicOff } from 'lucide-react'
import { askAiMunim } from '../utils/geminiClient.js'
import { useLanguage } from '../context/LanguageContext.jsx'
import munimImg from '../assets/munim-mascot.png'

const SUGGESTIONS = [
  'What is SIP?',
  'FD vs SIP — which is better?',
  'I need 5 lakh in 5 years',
  'Explain emergency fund simply',
]

// Map our language codes to browser SpeechRecognition language codes
const SPEECH_LANG_MAP = {
  en: 'en-IN',
  hi: 'hi-IN',
  mr: 'mr-IN',
  gu: 'gu-IN',
  bn: 'bn-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  kn: 'kn-IN',
  ml: 'ml-IN',
  pa: 'pa-IN',
}

export default function AiMunim() {
  const { t, language } = useLanguage()
  const [messages, setMessages] = useState([
    { role: 'assistant', content: t('ai_welcome') }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isListening, setIsListening] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(false)
  const scrollRef = useRef(null)
  const recognitionRef = useRef(null)

  // Check if browser supports speech recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      setVoiceSupported(true)
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = SPEECH_LANG_MAP[language] || 'en-IN'

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join('')
        setInput(transcript)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
        if (event.error === 'not-allowed') {
          setError('Microphone access denied. Please allow microphone in browser settings.')
        }
      }
    }
  }, [language])

  // Update recognition language when app language changes
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = SPEECH_LANG_MAP[language] || 'en-IN'
    }
  }, [language])

  useEffect(() => {
    setMessages((prev) =>
      prev.length === 1 && prev[0].role === 'assistant'
        ? [{ role: 'assistant', content: t('ai_welcome') }]
        : prev
    )
  }, [language])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  function toggleVoice() {
    if (!recognitionRef.current) return

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      setInput('')
      setError(null)
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  async function sendMessage(text) {
    if (!text.trim()) return
    const userMsg = { role: 'user', content: text }
    const nextMessages = [...messages, userMsg]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)
    setError(null)

    try {
      const reply = await askAiMunim(nextMessages, language)
      setMessages([...nextMessages, { role: 'assistant', content: reply }])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!input.trim() || loading) return
    sendMessage(input.trim())
  }

  return (
    <div className="flex flex-col h-[calc(100vh-9rem)] md:h-[calc(100vh-7rem)] md:max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <img
          src={munimImg}
          alt="AI Munim"
          className="w-9 h-9 rounded-full object-cover object-top"
        />
        <div>
          <h1 className="font-display font-semibold text-navy text-base leading-tight">
            {t('ai_title')}
          </h1>
          <p className="text-[11px] text-ink-faint">{t('ai_subtitle')}</p>
        </div>
        {voiceSupported && (
          <div className="ml-auto">
            <span className="text-[10px] text-ink-faint bg-leaf-50 text-leaf px-2 py-1 rounded-full font-medium">
              🎤 Voice enabled
            </span>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 -mx-1 px-1">
        {messages.map((m, idx) => (
          <ChatBubble key={idx} role={m.role} content={m.content} />
        ))}

        {loading && (
          <div className="flex items-center gap-1.5 text-ink-faint text-xs pl-2">
            <span className="w-1.5 h-1.5 bg-saffron rounded-full animate-bounce" />
            <span className="w-1.5 h-1.5 bg-saffron rounded-full animate-bounce [animation-delay:0.15s]" />
            <span className="w-1.5 h-1.5 bg-saffron rounded-full animate-bounce [animation-delay:0.3s]" />
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-lg px-3 py-2.5">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-red-700 leading-relaxed">{error}</p>
          </div>
        )}

        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-xs font-medium text-saffron-800 bg-saffron-50 border border-saffron-100 rounded-full px-3 py-1.5"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Voice listening indicator */}
        {isListening && (
          <div className="flex items-center gap-2 bg-leaf-50 border border-leaf-100 rounded-lg px-3 py-2.5">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-leaf rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-leaf rounded-full animate-bounce [animation-delay:0.15s]" />
              <span className="w-1.5 h-1.5 bg-leaf rounded-full animate-bounce [animation-delay:0.3s]" />
            </div>
            <p className="text-xs text-leaf font-medium">
              Listening... speak now in {SPEECH_LANG_MAP[language] || 'English'}
            </p>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('ai_input_placeholder')}
          className="flex-1 bg-white border border-saffron-100 rounded-full px-4 py-2.5 text-sm text-navy placeholder:text-ink-faint focus:outline-none focus:border-saffron"
        />

        {/* Voice button — only shown if browser supports it */}
        {voiceSupported && (
          <button
            type="button"
            onClick={toggleVoice}
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
              isListening
                ? 'bg-leaf text-white animate-pulse'
                : 'bg-white border border-saffron-100 text-ink-faint hover:border-saffron hover:text-saffron'
            }`}
            title={isListening ? 'Stop listening' : 'Speak your question'}
          >
            {isListening ? (
              <MicOff className="w-4 h-4" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </button>
        )}

        {/* Send button */}
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="w-10 h-10 rounded-full bg-saffron flex items-center justify-center flex-shrink-0 disabled:opacity-40"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </form>

      {voiceSupported && (
        <p className="text-[10px] text-ink-faint text-center mt-1.5">
          🎤 Tap the mic and speak in any language — works in Chrome and Edge
        </p>
      )}
    </div>
  )
}

function ChatBubble({ role, content }) {
  const isUser = role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'bg-saffron text-white rounded-br-sm'
            : 'bg-white border border-saffron-100 text-ink rounded-bl-sm'
        }`}
      >
        {content}
      </div>
    </div>
  )
}