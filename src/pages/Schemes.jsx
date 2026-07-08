import React, { useState } from 'react'
import { Landmark, ExternalLink, ChevronDown } from 'lucide-react'

import { useLanguage } from '../context/LanguageContext.jsx'

import PassbookCard from '../components/PassbookCard.jsx'
import { SCHEMES } from '../data/schemes.js'

const CATEGORIES = ['All', 'Farmers', 'Girl Child', 'Retirement', 'Insurance', 'Savings']

export default function Schemes() {
  const { t } = useLanguage()
  const [category, setCategory] = useState('All')
  const [expanded, setExpanded] = useState(null)

  const filtered =
    category === 'All' ? SCHEMES : SCHEMES.filter((s) => s.category === category)

  return (
    <div className="space-y-4">
      <div>
        <div className="bg-saffron-50 border border-saffron-100 rounded-xl px-3 py-2.5">
        <p className="text-xs text-saffron-800 leading-relaxed">
          <span className="font-semibold">Disclosure:</span> {t('schemes_disclosure')}
        </p>
      </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none">
        {CATEGORIES.map((c) => (
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
        {filtered.map((scheme) => {
          const isOpen = expanded === scheme.id
          return (
            <PassbookCard key={scheme.id} eyebrow={scheme.category} className="md:self-start">
              <button
                onClick={() => setExpanded(isOpen ? null : scheme.id)}
                className="w-full flex items-start justify-between gap-3"
              >
                <div className="text-left">
                  <h3 className="font-display font-semibold text-navy text-base leading-snug">
                    {scheme.name}
                  </h3>
                  <p className="text-xs text-ink-faint mt-0.5">{scheme.summary}</p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-saffron flex-shrink-0 mt-1 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="mt-3 space-y-3">
                 <div>
                    <p className="text-[11px] font-semibold text-ink-faint uppercase tracking-wide mb-1">
                      {t('schemes_who_eligible')}
                    </p>
                    <ul className="space-y-1">
                      {scheme.eligibility.map((item, i) => (
                        <li key={i} className="text-sm text-ink-light leading-relaxed flex gap-1.5">
                          <span className="text-saffron">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                 <div className="bg-leaf-50 rounded-lg px-3 py-2">
                    <p className="text-[11px] font-semibold text-leaf-800 uppercase tracking-wide mb-1">
                      {t('schemes_benefits')}
                    </p>
                    <p className="text-sm text-leaf-800 leading-relaxed">{scheme.benefits}</p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold text-ink-faint uppercase tracking-wide mb-1">
                      {t('schemes_investment')}
                    </p>
                    <p className="text-sm text-ink-light leading-relaxed">{scheme.investmentAmount}</p>
                  </div>

                 <div>
                    <p className="text-[11px] font-semibold text-ink-faint uppercase tracking-wide mb-1">
                      {t('schemes_returns')}
                    </p>
                    <p className="text-sm text-ink-light leading-relaxed">{scheme.returns}</p>
                  </div>

                 <div className="bg-saffron-50 rounded-lg px-3 py-2">
                    <p className="text-[11px] font-semibold text-saffron-800 uppercase tracking-wide mb-1">
                      {t('schemes_how_apply')}
                    </p>
                    <p className="text-sm text-saffron-800 leading-relaxed">{scheme.howToApply}</p>
                  </div>
<a href={scheme.officialLink} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold text-navy bg-navy-50 px-3 py-1.5 rounded-full w-fit">
                    <ExternalLink className="w-3.5 h-3.5" />
                    {t('schemes_official')}
                  </a>
                  
                </div>
              )}
            </PassbookCard>
          )
        })}
      </div>

      <p className="text-[11px] text-ink-faint leading-relaxed pt-2">
        {t('schemes_disclaimer')}
      </p>
    </div>
  )
}