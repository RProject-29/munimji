import React, { useState } from 'react'
import { ExternalLink, ChevronDown, Star, Check, X } from 'lucide-react'
import PassbookCard from '../components/PassbookCard.jsx'
import { PLATFORMS } from '../data/platforms.js'

export default function Platforms() {
  const [expanded, setExpanded] = useState('groww')
  const [filter, setFilter] = useState('All')

  const filtered =
    filter === 'All'
      ? PLATFORMS
      : filter === 'Beginner'
      ? PLATFORMS.filter((p) => p.beginnerFriendly)
      : PLATFORMS.filter((p) => !p.beginnerFriendly)

  return (
    <div className="space-y-4 md:max-w-2xl">
      <div>
        <h1 className="font-display text-xl md:text-2xl font-semibold text-navy">
          Investment Platforms
        </h1>
        <p className="text-ink-light text-sm md:text-base mt-1">
          Popular Indian apps for investing  compared honestly for beginners.
        </p>
      </div>

      <div className="bg-saffron-50 border border-saffron-100 rounded-xl px-3 py-2.5">
        <p className="text-xs text-saffron-800 leading-relaxed">
          <span className="font-semibold">Disclosure:</span> MunimJi has no partnership with any platform listed here. These are independent assessments for educational purposes only.
        </p>
      </div>

      <div className="flex gap-2">
        {['All', 'Beginner', 'Advanced'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${
              filter === f
                ? 'bg-navy text-white border-navy'
                : 'bg-white text-ink-light border-saffron-100'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((platform) => {
          const isOpen = expanded === platform.id
          return (
            <PassbookCard key={platform.id} className="overflow-visible">
              <button
                onClick={() => setExpanded(isOpen ? null : platform.id)}
                className="w-full flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 text-left">
                  <span className="text-2xl">{platform.logo}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-semibold text-navy text-base">
                        {platform.name}
                      </h3>
                      {platform.beginnerFriendly && (
                        <span className="text-[10px] font-semibold bg-leaf-50 text-leaf-800 border border-leaf-100 px-1.5 py-0.5 rounded-full">
                          Beginner ✓
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3"
                          fill={i < platform.rating ? '#FF9933' : 'none'}
                          color={i < platform.rating ? '#FF9933' : '#C5B8A8'}
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-saffron flex-shrink-0 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="mt-3 space-y-3">
                  <p className="text-xs text-ink-faint italic">{platform.tagline}</p>

                  <div>
                    <p className="text-[11px] font-semibold text-ink-faint uppercase tracking-wide mb-1">
                      Minimum investment
                    </p>
                    <p className="text-sm text-navy font-semibold">{platform.minInvestment}</p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold text-ink-faint uppercase tracking-wide mb-1.5">
                      What it offers
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {platform.offers.map((offer) => (
                        <span
                          key={offer}
                          className="text-xs bg-navy-50 text-navy px-2 py-0.5 rounded-full border border-navy-100"
                        >
                          {offer}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-leaf-50 rounded-lg px-3 py-2">
                      <p className="text-[11px] font-semibold text-leaf-800 uppercase tracking-wide mb-1.5">
                        Pros
                      </p>
                      <ul className="space-y-1">
                        {platform.pros.map((pro) => (
                          <li key={pro} className="flex items-start gap-1.5">
                            <Check className="w-3 h-3 text-leaf mt-0.5 flex-shrink-0" />
                            <span className="text-xs text-leaf-800 leading-snug">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-red-50 rounded-lg px-3 py-2">
                      <p className="text-[11px] font-semibold text-red-800 uppercase tracking-wide mb-1.5">
                        Cons
                      </p>
                      <ul className="space-y-1">
                        {platform.cons.map((con) => (
                          <li key={con} className="flex items-start gap-1.5">
                            <X className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-xs text-red-800 leading-snug">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-saffron-50 rounded-lg px-3 py-2">
                    <p className="text-[11px] font-semibold text-saffron-800 uppercase tracking-wide mb-0.5">
                      Best for
                    </p>
                    <p className="text-sm text-saffron-800">{platform.bestFor}</p>
                  </div>

                  <a
                    href={platform.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold text-navy bg-white border border-navy-100 px-3 py-2 rounded-full w-fit"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Visit {platform.name}
                  </a>
                </div>
              )}
            </PassbookCard>
          )
        })}
      </div>

      <p className="text-[11px] text-ink-faint leading-relaxed">
        Platform features, charges, and ratings may change. Always check the official website before opening an account. SEBI-registered brokers only — verify at sebi.gov.in.
      </p>
    </div>
  )
}