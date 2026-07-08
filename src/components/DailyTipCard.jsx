import React from 'react'
import { Sparkles } from 'lucide-react'
import { getTodaysTip } from '../data/dailyTips.js'

import { useLanguage } from '../context/LanguageContext.jsx'

import munimImg from '../assets/munim-mascot.png'

export default function DailyTipCard({ compact = false }) {
  const tip = getTodaysTip()
  const { t } = useLanguage()
  if (compact) {
    return (
      <div className="bg-navy rounded-xl px-4 py-3 flex items-start gap-3">
        <img
          src={munimImg}
          alt="Munim"
          className="w-8 h-8 rounded-full object-cover object-top flex-shrink-0"
        />
        <div>
          <p className="text-saffron text-[11px] font-semibold uppercase tracking-wide mb-0.5">
            {tip.icon} {t('tip_daily')}
          </p>
          <p className="text-white/80 text-xs leading-relaxed">{tip.tip}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-2xl p-4 md:p-5"
      style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #1E3A5F 100%)' }}>
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #FF9933, transparent)', transform: 'translate(30%, -30%)' }} />

      <div className="flex items-center gap-2 mb-3">
        <img
          src={munimImg}
          alt="Munim"
          className="w-9 h-9 rounded-full object-cover object-top flex-shrink-0"
        />
        <div>
          <p className="text-saffron text-xs font-semibold uppercase tracking-wide">
            Daily Munim Advice
          </p>
          <p className="text-white/50 text-[11px]">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-2 mb-3">
        <span className="text-2xl flex-shrink-0">{tip.icon}</span>
        <p className="text-white/85 text-sm leading-relaxed">{tip.tip}</p>
      </div>

      <span className="inline-block text-[10px] font-semibold px-2.5 py-1 rounded-full"
        style={{ background: 'rgba(255,153,51,0.2)', color: '#FF9933' }}>
        {tip.category}
      </span>
    </div>
  )
}