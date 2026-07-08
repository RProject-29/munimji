import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Home as HomeIcon,
  BookOpen,
  Calculator,
  Target,
  Sparkles,
  IndianRupee,
  User,
  Globe2,
  Check,
  ArrowLeft,
  Landmark,
  PieChart,
  ShieldCheck,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useLanguage, LANGUAGES } from '../context/LanguageContext.jsx'
import munimImg from '../assets/munim-mascot.png'

export default function Layout({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { isGuest } = useAuth()
  const { t } = useLanguage()
  const [langMenuOpen, setLangMenuOpen] = useState(false)

  const isHome = location.pathname === '/'

  const NAV_ITEMS = [
    { to: '/', label: 'Home', icon: HomeIcon },
    { to: '/calculators', label: 'Calculate', icon: Calculator },
    { to: '/expense', label: 'Expenses', icon: PieChart },
    { to: '/ai-munim', label: 'AI Munim', icon: Sparkles },
    { to: '/goals', label: 'Goals', icon: Target },
  ]

  const DESKTOP_NAV_EXTRAS = [
    { to: '/learn', label: 'Learn', icon: BookOpen },
    { to: '/schemes', label: 'Schemes', icon: Landmark },
    { to: '/compare', label: 'Compare', icon: Calculator },
    { to: '/health', label: 'Health Score', icon: ShieldCheck },
  ]

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="bg-navy sticky top-0 z-30">
        <div className="max-w-screen-lg mx-auto px-4 md:px-8 h-14 md:h-16 flex items-center justify-between gap-9">
          <div className="flex items-center gap-2">
            {!isHome && (
              <button
                onClick={() => navigate(-1)}
                aria-label="Go back"
                className="w-8 h-8 rounded-lg flex items-center justify-center -ml-1 hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-white" strokeWidth={2} />
              </button>
            )}
            <Link to="/" className="flex items-center gap-1">
              <img src={munimImg} alt="MunimJi" className="w-8 h-8 rounded-lg object-cover object-top" />
              <span className="font-display font-semibold text-orange-500 text-lg md:text-">
                Munimji
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {[...NAV_ITEMS, ...DESKTOP_NAV_EXTRAS].map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active ? 'bg-white/10 text-saffron' : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" strokeWidth={active ? 2.5 : 1.8} />
                  {label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen((v) => !v)}
                className="w-8 h-8 rounded-full bg-navy-400 flex items-center justify-center border border-white/15"
                aria-label="Change language"
              >
                <Globe2 className="w-4 h-4 text-white/80" />
              </button>
              {langMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} />
                  <LanguageDropdown onClose={() => setLangMenuOpen(false)} />
                </>
              )}
            </div>
            <Link
              to="/profile"
              className="w-8 h-8 rounded-full bg-navy-400 flex items-center justify-center border border-white/15"
            >
              <User className="w-4 h-4 text-white/80" />
            </Link>
          </div>
        </div>

        {isGuest && (
          <div className="bg-saffron-50 border-t border-saffron-100">
            <div className="max-w-screen-lg mx-auto px-4 md:px-8 py-1.5 flex items-center justify-between">
              <span className="text-xs text-saffron-800">
                Guest mode :  your progress is not saved
              </span>
              <Link to="/profile" className="text-xs font-semibold text-saffron-800 underline whitespace-nowrap ml-2">
                Sign in
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 max-w-screen-lg mx-auto w-full px-4 md:px-8 pt-5 md:pt-8 pb-24 md:pb-12">
        {children}
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-saffron-100 z-30">
        <div className="max-w-md mx-auto grid grid-cols-5">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to
            return (
              <Link key={to} to={to} className="flex flex-col items-center justify-center py-2 gap-0.5">
                <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 1.8} color={active ? '#FF9933' : '#8C857B'} />
                <span className={`text-[10px] ${active ? 'text-saffron font-semibold' : 'text-ink-faint'}`}>
                  {label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}

function LanguageDropdown({ onClose }) {
  const { language, setLanguage } = useLanguage()
  return (
    <div className="absolute right-0 top-10 z-50 bg-white rounded-xl border border-saffron-100 shadow-lg w-56 max-h-80 overflow-y-auto py-1.5">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => { setLanguage(lang.code); onClose() }}
          className="w-full flex items-center justify-between px-3 py-2 hover:bg-saffron-50 text-left"
        >
          <span>
            <span className="text-sm font-medium text-navy">{lang.native}</span>
            <span className="text-xs text-ink-faint ml-1.5">{lang.label}</span>
          </span>
          {language === lang.code && <Check className="w-4 h-4 text-saffron" />}
        </button>
      ))}
    </div>
  )
}