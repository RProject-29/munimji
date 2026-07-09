import React from 'react'
import { Link } from 'react-router-dom'
const munimImg = '/munim-mascot.png'
import {
  GraduationCap,
  Calculator,
  Landmark,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Globe2,
  BookOpen,
  Target,
  BarChart2,
  ChevronRight,
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext.jsx'

import DailyTipCard from '../components/DailyTipCard.jsx'


function MiniChart({ color = '#138808', height = 32 }) {
  const points = [[0,height],[8,height*0.7],[16,height*0.8],[24,height*0.4],[32,height*0.5],[40,height*0.2],[48,height*0.3],[56,0]]
  const pathD = points.map((p,i) => `${i===0?'M':'L'}${p[0]},${p[1]}`).join(' ')
  const areaD = pathD + ` L56,${height} L0,${height} Z`
  return (
    <svg width="56" height={height} viewBox={`0 0 56 ${height}`} style={{ opacity: 0.8 }}>
      <defs>
        <linearGradient id={`mg${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#mg${color.replace('#','')})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StatBadge({ value, label, color }) {
  return (
    <div style={{ borderLeft: `3px solid ${color}` }} className="pl-3">
      <p className="font-display font-bold text-navy text-lg leading-none">{value}</p>
      <p className="text-ink-faint text-[11px] mt-0.5">{label}</p>
    </div>
  )
}

export default function Home() {
  const { t } = useLanguage()

  return (
    <div className="space-y-6 md:space-y-8">

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy rounded-2xl px-5 py-6 md:px-8 md:py-8">
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #FF9933, transparent)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #138808, transparent)', transform: 'translate(-30%, 30%)' }} />
        <div className="absolute top-4 right-4 opacity-20">
          <MiniChart color="#FF9933" height={40} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold bg-saffron/20 text-saffron px-2.5 py-1 rounded-full">
              For every Indian
            </span>
          </div>
          <h1 className="font-display text-white text-2xl md:text-4xl font-bold leading-tight mb-2">
            {t('home_hero_title_1')}{' '}
            <span className="text-saffron">{t('home_hero_title_2')}</span>
          </h1>
          <p className="text-white/65 text-sm md:text-base leading-relaxed mb-5 max-w-lg">
            {t('home_hero_sub')}
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link to="/learn"
              className="flex items-center gap-2 bg-saffron text-white font-semibold text-sm rounded-xl px-5 py-2.5 hover:bg-saffron-600 transition-colors">
              {t('home_cta_learn')} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/calculators/sip"
              className="flex items-center gap-2 bg-white/10 text-white font-semibold text-sm rounded-xl px-5 py-2.5 hover:bg-white/20 transition-colors border border-white/20">
              {t('home_cta_calc')}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-4 gap-3 md:gap-6">
        <StatBadge value="5+" label="Languages" color="#FF9933" />
        <StatBadge value="6" label="Calculators" color="#138808" />
        <StatBadge value="70+" label="Finance terms" color="#0B1F3A" />
        <StatBadge value="Free" label="Always" color="#FFC580" />
      </section>

      {/* Why MunimJi */}
      <section>
        <h2 className="font-display font-bold text-navy text-lg md:text-xl mb-3">
          {t('home_why_title')}
        </h2>
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          {[
            { icon: GraduationCap, title: t('home_why_1_title'), desc: t('home_why_1_desc'), color: '#138808', bg: '#e8f5e9' },
            { icon: Globe2, title: t('home_why_2_title'), desc: t('home_why_2_desc'), color: '#FF9933', bg: '#FFF3E0' },
            { icon: ShieldCheck, title: t('home_why_3_title'), desc: t('home_why_3_desc'), color: '#0B1F3A', bg: '#E9EDF3' },
          ].map(({ icon: Icon, title, desc, color, bg }) => (
            <div key={title} className="bg-white rounded-xl border border-saffron-100 p-3 md:p-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ background: bg }}>
                <Icon className="w-4 h-4" style={{ color }} strokeWidth={2} />
              </div>
              <p className="text-xs md:text-sm font-semibold text-navy leading-snug">{title}</p>
              <p className="text-[11px] md:text-xs text-ink-faint mt-1 leading-snug">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured topic + Calculators */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-saffron-100 p-4 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 opacity-10">
            <MiniChart color="#138808" height={60} />
          </div>
          <p className="text-[11px] font-semibold text-saffron uppercase tracking-wide mb-1">
            {t('home_learning_topic')}
          </p>
          <h3 className="font-display font-bold text-navy text-base mb-1.5">
            {t('home_learning_sip_title')}
          </h3>
          <p className="text-sm text-ink-light leading-relaxed mb-3">
            {t('home_learning_sip_desc')}
          </p>
          <Link to="/learn" className="inline-flex items-center gap-1.5 text-saffron text-sm font-semibold">
            {t('home_read_explanation')} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-saffron-100 p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-semibold text-ink-faint uppercase tracking-wide">
              {t('home_calc_title')}
            </p>
            <Link to="/calculators" className="text-xs text-saffron font-semibold flex items-center gap-0.5">
              {t('home_see_all')} <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {[
              { to: '/calculators/sip', label: 'SIP Calculator', color: '#138808', bg: '#e8f5e9' },
              { to: '/calculators/fd', label: 'FD Calculator', color: '#FF9933', bg: '#FFF3E0' },
              { to: '/calculators/goal', label: 'Goal Planner', color: '#0B1F3A', bg: '#E9EDF3' },
            ].map((c) => (
              <Link key={c.to} to={c.to}
                className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-saffron-50 transition-colors group">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: c.bg }}>
                  <Calculator className="w-3.5 h-3.5" style={{ color: c.color }} strokeWidth={2} />
                </div>
                <span className="text-sm font-medium text-navy flex-1">{c.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-ink-faint group-hover:text-saffron transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Feature cards grid */}
      <section>
        <h2 className="font-display font-bold text-navy text-lg md:text-xl mb-3">
          Everything you need
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { to: '/dictionary', icon: BookOpen, label: 'Financial Dictionary', desc: '75+ terms explained simply', color: '#FF9933', bg: '#FFF3E0' },
            { to: '/schemes', icon: Landmark, label: 'Govt Schemes', desc: 'PM Kisan, SSY, APY & more', color: '#138808', bg: '#e8f5e9' },
            { to: '/compare', icon: BarChart2, label: 'Compare Investments', desc: 'FD vs SIP vs Gold vs Stocks', color: '#0B1F3A', bg: '#E9EDF3' },
            { to: '/expense', icon: Target, label: 'Expense Analyzer', desc: 'See where money goes', color: '#FFC580', bg: '#FFF8F0' },
            { to: '/health', icon: ShieldCheck, label: 'Health Score', desc: 'Rate your financial health', color: '#138808', bg: '#e8f5e9' },
            { to: '/platforms', icon: Sparkles, label: 'Investment Apps', desc: 'Groww, Zerodha & more', color: '#FF9933', bg: '#FFF3E0' },
          ].map(({ to, icon: Icon, label, desc, color, bg }) => (
            <Link key={to} to={to}
              className="bg-white rounded-xl border border-saffron-100 p-3 md:p-4 hover:shadow-md hover:border-saffron transition-all active:scale-[0.98]">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2.5" style={{ background: bg }}>
                <Icon className="w-4 h-4" style={{ color }} strokeWidth={1.8} />
              </div>
              <p className="text-sm font-semibold text-navy leading-snug">{label}</p>
              <p className="text-[11px] text-ink-faint mt-1 leading-snug">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Government schemes teaser */}
      <section>
        <Link to="/schemes"
          className="block relative overflow-hidden bg-white rounded-2xl border border-saffron-100 p-4 md:p-5 hover:border-leaf hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #138808, transparent)', transform: 'translate(30%, -30%)' }} />
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-leaf-50 flex items-center justify-center flex-shrink-0">
              <Landmark className="w-5 h-5 text-leaf" strokeWidth={1.8} />
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-semibold text-leaf uppercase tracking-wide mb-0.5">
                {t('home_schemes_title')}
              </p>
              <h3 className="font-display font-bold text-navy text-base mb-1">
                {t('home_schemes_cta')}
              </h3>
              <p className="text-sm text-ink-light leading-relaxed">
                {t('home_schemes_desc')}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-ink-faint flex-shrink-0 mt-1" />
          </div>
        </Link>
      </section>

      {/* AI Munim CTA */}
      {/* Daily tip */}
      <section>
        <DailyTipCard />
      </section>
      <section>
        <Link to="/ai-munim"
          className="block relative overflow-hidden rounded-2xl p-5 md:p-6"
          style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #1E3A5F 100%)' }}>
          <div className="absolute top-0 right-0 opacity-20">
            <MiniChart color="#FF9933" height={50} />
          </div>
          <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #FF9933, transparent)', transform: 'translate(-30%, 30%)' }} />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <img src={munimImg} alt="AI Munim" className="w-8 h-8 rounded-full object-cover object-top" />
              <span className="text-white font-display font-bold text-base">
                {t('home_ai_title')}
              </span>
            </div>
            <p className="text-white/65 text-sm leading-relaxed mb-4 max-w-md">
              {t('home_ai_desc')}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {['What is SIP?', 'FD vs SIP', 'I need 5 lakh in 5 years'].map((q) => (
                <span key={q}
                  className="text-xs font-medium bg-white/10 text-white/80 px-3 py-1.5 rounded-full border border-white/15">
                  {q}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-saffron text-sm font-semibold">
              {t('home_ai_cta')} <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      </section>

    </div>
  )
}