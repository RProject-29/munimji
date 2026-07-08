import React, { useState } from 'react'
import { TrendingUp, Lock, IndianRupee, Star, ChevronDown } from 'lucide-react'
import PassbookCard from '../components/PassbookCard.jsx'
import { INVESTMENTS, RISK_COLORS } from '../data/investments.js'

const FILTERS = ['All', 'Very Low Risk', 'Low–Medium Risk', 'Medium to High Risk', 'High Risk']

export default function InvestmentComparison() {
  const [filter, setFilter] = useState('All')
  const [expanded, setExpanded] = useState(null)
  const [sortBy, setSortBy] = useState('risk')

  const filtered = INVESTMENTS
    .filter((inv) => filter === 'All' || inv.risk === filter.replace(' Risk', ''))
    .sort((a, b) => sortBy === 'risk' ? a.riskLevel - b.riskLevel : a.name.localeCompare(b.name))

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-xl md:text-2xl font-semibold text-navy">
          Investment Comparison
        </h1>
        <p className="text-ink-light text-sm md:text-base mt-1 max-w-xl">
          Compare savings and investment options side by side — risk, returns, lock-in, and who each is best for.
        </p>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none">
          {['All', 'Very Low', 'Low–Medium', 'Medium to High', 'High'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f === 'All' ? 'All' : f + ' Risk')}
              className={`whitespace-nowrap text-xs font-semibold px-3 py-1.5 rounded-full border ${
                filter === (f === 'All' ? 'All' : f + ' Risk')
                  ? 'bg-navy text-white border-navy'
                  : 'bg-white text-ink-light border-saffron-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
        {filtered.map((inv) => {
          const isOpen = expanded === inv.id
          const colors = RISK_COLORS[inv.riskLevel]

          return (
            <PassbookCard key={inv.id} className="md:self-start">
              <button
                onClick={() => setExpanded(isOpen ? null : inv.id)}
                className="w-full flex items-start justify-between gap-3"
              >
                <div className="text-left flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-display font-semibold text-navy text-base">
                      {inv.name}
                    </h3>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
                      {inv.risk} Risk
                    </span>
                  </div>
                  <p className="text-xs text-ink-faint mt-0.5">{inv.bestFor}</p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-saffron flex-shrink-0 mt-1 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isOpen && (
                <div className="mt-3 space-y-2">
                  <Row icon={TrendingUp} label="Expected returns" value={inv.expectedReturns} highlight />
                  <Row icon={Lock} label="Lock-in period" value={inv.lockIn} />
                  <Row icon={IndianRupee} label="Minimum investment" value={inv.minInvestment} />
                  <Row icon={Star} label="Liquidity" value={inv.liquidity} />

                  <div className={`rounded-lg px-3 py-2 mt-2 ${colors.bg}`}>
                    <p className={`text-[11px] font-semibold uppercase tracking-wide mb-0.5 ${colors.text}`}>
                      Best for
                    </p>
                    <p className={`text-sm ${colors.text}`}>{inv.bestFor}</p>
                  </div>

                  <div className="bg-navy-50 rounded-lg px-3 py-2">
                    <p className="text-[11px] font-semibold text-navy uppercase tracking-wide mb-0.5">
                      Tax on returns
                    </p>
                    <p className="text-sm text-navy">
                      {inv.taxable ? 'Interest/gains are taxable as per your income slab' : 'Tax-free returns (EEE status)'}
                    </p>
                  </div>
                </div>
              )}
            </PassbookCard>
          )
        })}
      </div>

      <p className="text-[11px] text-ink-faint leading-relaxed pt-2">
        Returns shown are indicative long-term averages and are not guaranteed. Market-linked returns can be higher or lower. Always research before investing.
      </p>
    </div>
  )
}

function Row({ icon: Icon, label, value, highlight = false }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-dashed border-saffron-100 last:border-0">
      <div className="flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5 text-ink-faint" strokeWidth={1.8} />
        <span className="text-xs text-ink-light">{label}</span>
      </div>
      <span className={`text-xs font-semibold ${highlight ? 'text-leaf' : 'text-navy'}`}>
        {value}
      </span>
    </div>
  )
}