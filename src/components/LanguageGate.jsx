import React from 'react'
import { useLanguage, LANGUAGES } from '../context/LanguageContext.jsx'
import { IndianRupee } from 'lucide-react'

export default function LanguageGate() {
  const { setLanguage } = useLanguage()

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 py-12">
      <div className="w-16 h-16 rounded-2xl bg-saffron flex items-center justify-center mb-5 shadow-sm">
        <IndianRupee className="w-9 h-9 text-white" strokeWidth={2.5} />
      </div>
      <h1 className="font-display text-3xl font-semibold text-navy text-center">MunimJi</h1>
      <p className="text-ink-light text-center mt-2 mb-10 max-w-xs">
        Every Indian deserves a personal Munim. Choose your language to begin.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-md md:max-w-2xl">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className="passbook-card px-4 py-4 text-left hover:border-saffron hover:shadow-md transition-all active:scale-[0.98]"
          >
            <div className="pl-2">
              <p className="font-display font-semibold text-navy text-base">{lang.native}</p>
              <p className="text-ink-faint text-xs mt-0.5">{lang.label}</p>
            </div>
          </button>
        ))}
      </div>

      <p className="text-ink-faint text-xs text-center mt-8 max-w-xs">
        You can change your language anytime using the globe icon in the top bar.
      </p>
    </div>
  )
}