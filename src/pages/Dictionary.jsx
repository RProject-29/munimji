import React, { useState, useMemo } from 'react'
import { Search, Volume2 } from 'lucide-react'
import PassbookCard from '../components/PassbookCard.jsx'
import { TERMS, CATEGORIES, searchTerms } from '../data/dictionaryTerms.js'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function Dictionary() {
  const { t } = useLanguage()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [expanded, setExpanded] = useState(null)

  const results = useMemo(() => {
    let list = searchTerms(query)
    if (category !== 'All') {
      list = list.filter((tm) => tm.category === category)
    }
    return list
  }, [query, category])

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(text))
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-xl md:text-2xl font-semibold text-navy">
          {t('dict_title')}
        </h1>
        <p className="text-ink-light text-sm md:text-base mt-1">
          {TERMS.length}+ {t('dict_subtitle_suffix')}
        </p>
      </div>

      <div className="relative md:max-w-md">
        <Search className="w-4 h-4 text-ink-faint absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('dict_search_placeholder')}
          className="w-full bg-white border border-saffron-100 rounded-xl pl-9 pr-3 py-2.5 text-sm text-navy placeholder:text-ink-faint focus:outline-none focus:border-saffron"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none">
        {['All', ...CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`whitespace-nowrap text-xs font-semibold px-3 py-1.5 rounded-full border ${
              category === c
                ? 'bg-navy text-white border-navy'
                : 'bg-white text-ink-light border-saffron-100'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
        {results.length === 0 && (
          <p className="text-sm text-ink-faint text-center py-8 md:col-span-2">
            {t('dict_no_results')} "{query}".
          </p>
        )}
        {results.map((tm) => {
          const isOpen = expanded === tm.id
          return (
            <PassbookCard key={tm.id} eyebrow={tm.category} className="md:self-start">
              <button
                onClick={() => setExpanded(isOpen ? null : tm.id)}
                className="w-full flex items-center justify-between"
              >
                <h3 className="font-display font-semibold text-navy text-base text-left">
                  {tm.term}
                </h3>
                <span className="text-saffron text-xs font-semibold flex-shrink-0 ml-2">
                  {isOpen ? t('dict_hide') : t('dict_view')}
                </span>
              </button>

              {isOpen && (
                <div className="mt-3 space-y-3">
                  <div>
                    <p className="text-[11px] font-semibold text-ink-faint uppercase tracking-wide mb-1">
                      {t('learn_simple')}
                    </p>
                    <p className="text-sm text-ink leading-relaxed">{tm.simple}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-ink-faint uppercase tracking-wide mb-1">
                      {t('learn_technical')}
                    </p>
                    <p className="text-sm text-ink-light leading-relaxed">{tm.technical}</p>
                  </div>
                  <div className="bg-leaf-50 rounded-lg px-3 py-2">
                    <p className="text-[11px] font-semibold text-leaf-800 uppercase tracking-wide mb-1">
                      {t('learn_example')}
                    </p>
                    <p className="text-sm text-leaf-800 leading-relaxed">{tm.example}</p>
                  </div>
                  <button
                    onClick={() => speak(`${tm.term}. ${tm.simple}`)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-navy bg-navy-50 px-3 py-1.5 rounded-full"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    {t('dict_listen')}
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