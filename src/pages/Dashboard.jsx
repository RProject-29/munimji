import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Target,
  Calculator,
  TrendingUp,
  BookOpen,
  Sparkles,
  ArrowRight,
  Bike,
  Laptop,
  GraduationCap,
  Heart,
  Home as HomeIcon,
  ShieldCheck,
  Landmark,
} from 'lucide-react'
import PassbookCard from '../components/PassbookCard.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { formatINR } from '../utils/financeMath.js'
import munimImg from '../assets/munim-mascot.png'
import DailyTipCard from '../components/DailyTipCard.jsx'

const GOAL_ICONS = {
  bike: Bike,
  laptop: Laptop,
  education: GraduationCap,
  marriage: Heart,
  house: HomeIcon,
  emergency: ShieldCheck,
  retirement: Landmark,
}

const SAMPLE_GOALS = [
  { type: 'bike', label: 'Bike', target: 90000, saved: 58500 },
  { type: 'emergency', label: 'Emergency Fund', target: 60000, saved: 60000 },
]

const RECENT_CALCULATIONS = [
  { label: 'SIP — ₹5,000/month @ 12% for 10 years', result: '₹11,61,695', path: '/calculators/sip' },
  { label: 'FD — ₹50,000 @ 7% for 1 year', result: '₹53,593', path: '/calculators/fd' },
  { label: 'Goal — ₹5 lakh in 5 years', result: '₹6,062/month', path: '/calculators/goal' },
]

const LEARN_PROGRESS = [
  { topic: 'What is a SIP?', done: true },
  { topic: 'FD vs SIP', done: true },
  { topic: 'Emergency fund first', done: false },
  { topic: 'Power of compounding', done: false },
  { topic: 'Government schemes', done: false },
]

export default function Dashboard() {
  const { user, displayName } = useAuth()

  const completedTopics = LEARN_PROGRESS.filter((t) => t.done).length
  const learningPercent = Math.round((completedTopics / LEARN_PROGRESS.length) * 100)

  return (
    <div className="space-y-5 md:max-w-3xl">
      {/* Welcome header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-ink-faint uppercase tracking-wide">Welcome back</p>
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-navy mt-0.5">
            {displayName?.split(' ')[0] || 'Friend'} 👋
          </h1>
        </div>
        <img
          src={munimImg}
          alt="Munim"
          className="w-16 h-20 object-contain object-top"
        />
      </div>

      {/* Daily tip */}
      <DailyTipCard />

      {/* Goals */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-semibold text-navy text-base md:text-lg">
            Your goals
          </h2>
          <Link to="/goals" className="text-xs text-saffron font-semibold flex items-center gap-0.5">
            Manage <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
          {SAMPLE_GOALS.map((goal, idx) => {
            const Icon = GOAL_ICONS[goal.type] ?? Target
            const pct = Math.min(100, Math.round((goal.saved / goal.target) * 100))
            return (
              <PassbookCard key={idx}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-leaf-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-leaf" strokeWidth={1.8} />
                  </div>
                  <div className="flex-1">
                    <p className="font-display font-semibold text-navy text-sm">{goal.label}</p>
                    <p className="text-xs text-ink-faint">
                      {formatINR(goal.saved)} of {formatINR(goal.target)}
                    </p>
                  </div>
                  <span className={`text-sm font-semibold ${pct >= 100 ? 'text-leaf' : 'text-saffron'}`}>
                    {pct}%
                  </span>
                </div>
                <div className="h-2 bg-saffron-50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-leaf rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                {pct >= 100 && (
                  <p className="text-xs text-leaf font-semibold mt-2">🎉 Goal achieved!</p>
                )}
              </PassbookCard>
            )
          })}
        </div>
      </section>

      {/* Learning progress */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-semibold text-navy text-base md:text-lg">
            Learning progress
          </h2>
          <Link to="/learn" className="text-xs text-saffron font-semibold flex items-center gap-0.5">
            Continue <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <PassbookCard>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-ink-light">
              {completedTopics} of {LEARN_PROGRESS.length} topics completed
            </p>
            <span className="text-sm font-semibold text-saffron">{learningPercent}%</span>
          </div>
          <div className="h-2 bg-saffron-50 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-saffron rounded-full transition-all"
              style={{ width: `${learningPercent}%` }}
            />
          </div>
          <div className="space-y-2">
            {LEARN_PROGRESS.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center ${
                  item.done ? 'bg-leaf' : 'bg-saffron-50 border border-saffron-100'
                }`}>
                  {item.done && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <p className={`text-sm ${item.done ? 'text-ink-faint line-through' : 'text-navy'}`}>
                  {item.topic}
                </p>
              </div>
            ))}
          </div>
        </PassbookCard>
      </section>

      {/* Recent calculations */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-semibold text-navy text-base md:text-lg">
            Recent calculations
          </h2>
          <Link to="/calculators" className="text-xs text-saffron font-semibold flex items-center gap-0.5">
            All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-2">
          {RECENT_CALCULATIONS.map((calc, idx) => (
            <Link key={idx} to={calc.path}
              className="flex items-center gap-3 bg-white border border-saffron-100 rounded-xl px-3 py-3 active:scale-[0.98] transition-transform">
              <div className="w-9 h-9 rounded-lg bg-saffron-50 flex items-center justify-center flex-shrink-0">
                <Calculator className="w-4 h-4 text-saffron" strokeWidth={1.8} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-ink-light leading-snug">{calc.label}</p>
                <p className="text-sm font-semibold text-leaf">{calc.result}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-ink-faint" />
            </Link>
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <h2 className="font-display font-semibold text-navy text-base md:text-lg mb-3">
          Quick actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { to: '/expense', icon: TrendingUp, label: 'Analyze expenses', color: 'bg-leaf-50 text-leaf' },
            { to: '/compare', icon: Calculator, label: 'Compare investments', color: 'bg-saffron-50 text-saffron' },
            { to: '/health', icon: ShieldCheck, label: 'Health Score', color: 'bg-navy-50 text-navy' },
            { to: '/ai-munim', icon: Sparkles, label: 'Ask AI Munim', color: 'bg-saffron-50 text-saffron' },
          ].map(({ to, icon: Icon, label, color }) => (
            <Link key={to} to={to}
              className="bg-white border border-saffron-100 rounded-xl p-3 flex flex-col items-start gap-2 active:scale-[0.98] transition-transform">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
                <Icon className="w-4 h-4" strokeWidth={1.8} />
              </div>
              <p className="text-xs font-semibold text-navy leading-snug">{label}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}