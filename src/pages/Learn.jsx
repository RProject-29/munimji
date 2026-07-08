import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Volume2, ArrowRight, BookOpen } from 'lucide-react'
import PassbookCard from '../components/PassbookCard.jsx'
import { TOPICS } from '../data/learnTopics.js'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Learn() {
  const { t } = useLanguage()
  const [expanded, setExpanded] = useState(TOPICS[0]?.id ?? null)

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(text))
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-xl md:text-2xl font-semibold text-navy">{t('learn_title')}</h1>
        <p className="text-ink-light text-sm md:text-base mt-1 max-w-xl">
          {t('learn_subtitle')}
        </p>
      </div>

      <Link
        to="/dictionary"
        className="flex items-center gap-3 bg-navy rounded-xl px-3 py-3 md:max-w-md"
      >
        <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-4.5 h-4.5 text-saffron" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">{t('learn_dictionary_title')}</p>
          <p className="text-xs text-white/60">{t('learn_dictionary_desc')}</p>
        </div>
        <ArrowRight className="w-4 h-4 text-white/60" />
      </Link>

      <div className="space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
        {TOPICS.map((topic) => {
          const isOpen = expanded === topic.id
          return (
            <PassbookCard key={topic.id} eyebrow={topic.category} className="md:self-start">
              <button
                onClick={() => setExpanded(isOpen ? null : topic.id)}
                className="w-full flex items-center justify-between gap-3"
              >
                <h3 className="font-display font-semibold text-navy text-base text-left leading-snug">
                  {topic.title}
                </h3>
                <span className="text-saffron text-xs font-semibold flex-shrink-0">
                  {isOpen ? t('learn_hide') : t('learn_read')}
                </span>
              </button>

              {isOpen && (
                <div className="mt-3 space-y-3">
                  <div>
                    <p className="text-[11px] font-semibold text-ink-faint uppercase tracking-wide mb-1">
                      {t('learn_technical')}
                    </p>
                    <p className="text-sm text-ink-light leading-relaxed">
                      {topic.technical}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-ink-faint uppercase tracking-wide mb-1">
                      {t('learn_simple')}
                    </p>
                    <p className="text-sm text-ink leading-relaxed">{topic.simple}</p>
                  </div>
                  <div className="bg-leaf-50 rounded-lg px-3 py-2">
                    <p className="text-[11px] font-semibold text-leaf-800 uppercase tracking-wide mb-1">
                      {t('learn_example')}
                    </p>
                    <p className="text-sm text-leaf-800 leading-relaxed">
                      {topic.example}
                    </p>
                  </div>
                  <div className="bg-saffron-50 rounded-lg px-3 py-2">
                    <p className="text-[11px] font-semibold text-saffron-800 uppercase tracking-wide mb-1">
                      {t('learn_try')}
                    </p>
                    <p className="text-sm text-saffron-800 leading-relaxed mb-2">
                      {topic.interactiveHint}
                    </p>
                    <Link
                      to={topic.calculatorLink}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-saffron-800"
                    >
                      {t('learn_open')} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <button
                    onClick={() => speak(`${topic.title}. ${topic.simple}`)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-navy bg-navy-50 px-3 py-1.5 rounded-full"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    {t('learn_listen')}
                  </button>
                </div>
              )}
            </PassbookCard>
          )
        })}
      </div>
    </div>
  )
}