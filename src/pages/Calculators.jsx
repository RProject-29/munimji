import React from 'react'
import { Link } from 'react-router-dom'
import {
  TrendingUp,
  Landmark,
  PiggyBank,
  Target,
  TrendingDown,
  LineChart,
  ArrowRight,
  BarChart2,
  Smartphone,
} from 'lucide-react'

const CALCULATORS = [
  {
    to: '/calculators/sip',
    icon: TrendingUp,
    title: 'SIP Calculator',
    desc: 'See how monthly investing grows your wealth',
    ready: true,
    color: 'bg-leaf-50 text-leaf',
  },
  {
    to: '/calculators/fd',
    icon: Landmark,
    title: 'FD Calculator',
    desc: 'Maturity value of a fixed deposit',
    ready: true,
    color: 'bg-leaf-50 text-leaf',
  },
  {
    to: '/calculators/rd',
    icon: PiggyBank,
    title: 'RD Calculator',
    desc: 'Maturity value of a recurring deposit',
    ready: true,
    color: 'bg-leaf-50 text-leaf',
  },
  {
    to: '/calculators/goal',
    icon: Target,
    title: 'Goal Planner',
    desc: 'How much to save monthly for any goal',
    ready: true,
    color: 'bg-saffron-50 text-saffron',
  },
  {
    to: '/calculators/inflation',
    icon: TrendingDown,
    title: 'Inflation Calculator',
    desc: 'What today\'s money will be worth later',
    ready: true,
    color: 'bg-saffron-50 text-saffron',
  },
  {
    to: '/calculators/wealth',
    icon: LineChart,
    title: 'Wealth Simulator',
    desc: 'Project your wealth at 30, 40, 50, 60',
    ready: true,
    color: 'bg-saffron-50 text-saffron',
  },
]

const TOOLS = [
  {
    to: '/compare',
    icon: BarChart2,
    title: 'Investment Comparison',
    desc: 'FD vs SIP vs Gold vs Stocks — side by side',
    color: 'bg-navy-50 text-navy',
  },
  {
    to: '/expense',
    icon: TrendingUp,
    title: 'Expense Analyzer',
    desc: 'See where your money goes + AI suggestions',
    color: 'bg-navy-50 text-navy',
  },
  {
    to: '/platforms',
    icon: Smartphone,
    title: 'Investment Platforms',
    desc: 'Groww, Zerodha, Upstox — compared honestly',
    color: 'bg-navy-50 text-navy',
  },
]

export default function Calculators() {
  return (
    <div className="space-y-6 md:max-w-2xl">
      <div>
        <h1 className="font-display text-xl md:text-2xl font-semibold text-navy">
          Smart calculators
        </h1>
        <p className="text-ink-light text-sm md:text-base mt-1">
          Plan your money with clear numbers, not guesswork.
        </p>
      </div>

      <div className="space-y-2">
        {CALCULATORS.map(({ to, icon: Icon, title, desc, color }) => (
          <Link
            key={title}
            to={to}
            className="flex items-center gap-3 bg-white border border-saffron-100 rounded-xl px-3 py-3 active:scale-[0.98] transition-transform"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
              <Icon className="w-5 h-5" strokeWidth={1.8} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-navy">{title}</p>
              <p className="text-xs text-ink-faint">{desc}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-ink-faint" />
          </Link>
        ))}
      </div>

      <div>
        <h2 className="font-display font-semibold text-navy text-base mb-2">
          Financial tools
        </h2>
        <div className="space-y-2">
          {TOOLS.map(({ to, icon: Icon, title, desc, color }) => (
            <Link
              key={title}
              to={to}
              className="flex items-center gap-3 bg-white border border-saffron-100 rounded-xl px-3 py-3 active:scale-[0.98] transition-transform"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
                <Icon className="w-5 h-5" strokeWidth={1.8} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-navy">{title}</p>
                <p className="text-xs text-ink-faint">{desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-ink-faint" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}