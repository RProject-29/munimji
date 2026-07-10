import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Target,
  Calculator,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Bike,
  Laptop,
  GraduationCap,
  Heart,
  Home as HomeIcon,
  ShieldCheck,
  Landmark,
  Plus,
  CheckCircle2,
  Trophy,
  BookOpen,
} from 'lucide-react'
import PassbookCard from '../components/PassbookCard.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { formatINR } from '../utils/financeMath.js'
import munimImg from '../assets/munim-mascot.png'
import DailyTipCard from '../components/DailyTipCard.jsx'
import { api } from '../utils/api.js'

const GOAL_ICONS = {
  bike: Bike,
  laptop: Laptop,
  education: GraduationCap,
  marriage: Heart,
  house: HomeIcon,
  emergency: ShieldCheck,
  retirement: Landmark,
  custom: Target,
}

const LEARN_PROGRESS = [
  { topic: 'What is a SIP?', done: true },
  { topic: 'FD vs SIP', done: true },
  { topic: 'Emergency fund first', done: false },
  { topic: 'Power of compounding', done: false },
  { topic: 'Government schemes', done: false },
]

const RECENT_CALCULATIONS = [
  { label: 'SIP — ₹5,000/month @ 12% for 10 years', result: '₹11,61,695', path: '/calculators/sip' },
  { label: 'FD — ₹50,000 @ 7% for 1 year', result: '₹53,593', path: '/calculators/fd' },
  { label: 'Goal — ₹5 lakh in 5 years', result: '₹6,062/month', path: '/calculators/goal' },
]

// ── Toast notification component ──────────────────────────────────
function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  const styles = {
    success: { bg: '#e8f5e9', border: '#138808', icon: '✅', text: '#138808' },
    celebrate: { bg: '#FFF3E0', border: '#FF9933', icon: '🎉', text: '#E67E00' },
    info: { bg: '#E9EDF3', border: '#0B1F3A', icon: 'ℹ️', text: '#0B1F3A' },
  }

  const s = styles[type] || styles.success

  return (
    <div
      style={{
        position: 'fixed',
        top: 80,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        background: s.bg,
        border: `1.5px solid ${s.border}`,
        borderRadius: 14,
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        minWidth: 260,
        maxWidth: 340,
        animation: 'toastIn 0.3s ease-out',
      }}
    >
      <span style={{ fontSize: 20 }}>{s.icon}</span>
      <p style={{ color: s.text, fontSize: 13, fontWeight: 600, flex: 1 }}>{message}</p>
      <button onClick={onClose} style={{ color: s.text, opacity: 0.6, fontSize: 16, background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  )
}

// ── Stat card ──────────────────────────────────────────────────────
function StatCard({ icon, value, label, color, bg }) {
  return (
    <div className="bg-white rounded-2xl border border-saffron-100 p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
      </div>
      <div>
        <p className="font-display font-bold text-navy text-lg leading-none" style={{ color }}>{value}</p>
        <p className="text-ink-faint text-xs mt-0.5">{label}</p>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { user, displayName } = useAuth()
  const [goals, setGoals] = useState([])
  const [loadingGoals, setLoadingGoals] = useState(true)
  const [toast, setToast] = useState(null)

  const completedTopics = LEARN_PROGRESS.filter((t) => t.done).length
  const learningPercent = Math.round((completedTopics / LEARN_PROGRESS.length) * 100)

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const data = await api.getGoals()
        setGoals(data.goals || [])
      } catch (err) {
        console.error('Could not load goals:', err.message)
      } finally {
        setLoadingGoals(false)
      }
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  function showToast(message, type = 'success') {
    setToast({ message, type })
  }

  const completedGoals = goals.filter(g => g.savedAmount >= g.targetAmount).length
  const activeGoals = goals.filter(g => g.savedAmount < g.targetAmount).length

  return (
    <div className="space-y-5 md:max-w-3xl">

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* ── Welcome header ─────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-ink-faint uppercase tracking-widest font-medium">Welcome back</p>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-navy mt-0.5">
            {(displayName && displayName !== 'MunimJi User'
              ? displayName
              : user?.displayName || user?.email?.split('@')[0] || 'Friend'
            ).split(' ')[0]} 👋
          </h1>
        </div>
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-saffron shadow-md flex-shrink-0">
          <img src={munimImg} alt="Munim" className="w-full h-full object-cover object-top scale-110" />
        </div>
      </div>

      {/* ── Daily tip ──────────────────────────────────── */}
      <DailyTipCard />

      {/* ── Quick stats ────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon="🎯" value={activeGoals} label="Active goals" color="#FF9933" bg="#FFF3E0" />
        <StatCard icon="🏆" value={completedGoals} label="Goals achieved" color="#138808" bg="#e8f5e9" />
        <StatCard icon="📚" value={`${learningPercent}%`} label="Learning done" color="#0B1F3A" bg="#E9EDF3" />
        <StatCard icon="💡" value="Daily" label="Munim advice" color="#FF9933" bg="#FFF3E0" />
      </div>

      {/* ── Goals ──────────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-navy text-lg">Your goals</h2>
          <Link to="/goals" className="text-xs text-saffron font-semibold flex items-center gap-0.5">
            Manage <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {loadingGoals ? (
          <div className="space-y-3">
            {[1, 2].map(i => (
              <div key={i} className="h-20 bg-white border border-saffron-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : goals.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-saffron-200 p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-saffron-50 flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-saffron" strokeWidth={1.8} />
            </div>
            <p className="font-display font-semibold text-navy text-base mb-1">No goals yet</p>
            <p className="text-ink-faint text-sm mb-3">Set your first financial goal and start saving towards it.</p>
            <Link
              to="/goals"
              className="inline-flex items-center gap-1.5 bg-saffron text-white text-sm font-semibold px-4 py-2 rounded-xl"
            >
              <Plus className="w-4 h-4" /> Add a goal
            </Link>
          </div>
        ) : (
          <div className="space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
            {goals.slice(0, 4).map((goal) => {
              const Icon = GOAL_ICONS[goal.type] ?? Target
              const pct = Math.min(100, Math.round((goal.savedAmount / goal.targetAmount) * 100))
              const isComplete = pct >= 100
              return (
                <div
                  key={goal._id}
                  className={`rounded-2xl p-4 border transition-all ${
                    isComplete
                      ? 'bg-leaf-50 border-leaf-100'
                      : 'bg-white border-saffron-100'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isComplete ? 'bg-leaf text-white' : 'bg-leaf-50'
                    }`}>
                      {isComplete
                        ? <Trophy className="w-5 h-5 text-white" strokeWidth={2} />
                        : <Icon className="w-5 h-5 text-leaf" strokeWidth={1.8} />
                      }
                    </div>
                    <div className="flex-1">
                      <p className="font-display font-semibold text-navy text-sm">{goal.label}</p>
                      <p className="text-xs text-ink-faint">
                        {formatINR(goal.savedAmount)} of {formatINR(goal.targetAmount)}
                      </p>
                    </div>
                    <span className={`text-sm font-bold ${isComplete ? 'text-leaf' : 'text-saffron'}`}>
                      {pct}%
                    </span>
                  </div>
                  <div className="h-2 bg-white rounded-full overflow-hidden border border-saffron-50">
                    <div
                      className={`h-full rounded-full transition-all ${isComplete ? 'bg-leaf' : 'bg-saffron'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  {isComplete && (
                    <div className="flex items-center gap-1.5 mt-2">
                      <CheckCircle2 className="w-4 h-4 text-leaf" />
                      <p className="text-xs text-leaf font-semibold">Goal achieved! 🎉</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* ── Learning progress ───────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-navy text-lg">Learning progress</h2>
          <Link to="/learn" className="text-xs text-saffron font-semibold flex items-center gap-0.5">
            Continue <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="bg-white rounded-2xl border border-saffron-100 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-ink-light">{completedTopics} of {LEARN_PROGRESS.length} topics completed</p>
            <span className="text-sm font-bold text-saffron">{learningPercent}%</span>
          </div>
          <div className="h-2.5 bg-saffron-50 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-saffron to-saffron-600 rounded-full transition-all"
              style={{ width: `${learningPercent}%` }}
            />
          </div>
          <div className="space-y-2">
            {LEARN_PROGRESS.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center ${
                  item.done ? 'bg-leaf' : 'bg-saffron-50 border-2 border-saffron-100'
                }`}>
                  {item.done && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <p className={`text-sm ${item.done ? 'text-ink-faint line-through' : 'text-navy font-medium'}`}>
                  {item.topic}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent calculations ─────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-navy text-lg">Recent calculations</h2>
          <Link to="/calculators" className="text-xs text-saffron font-semibold flex items-center gap-0.5">
            All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="space-y-2">
          {RECENT_CALCULATIONS.map((calc, idx) => (
            <Link key={idx} to={calc.path}
              className="flex items-center gap-3 bg-white border border-saffron-100 rounded-xl px-3 py-3 hover:border-saffron hover:shadow-sm transition-all group">
              <div className="w-9 h-9 rounded-lg bg-saffron-50 flex items-center justify-center flex-shrink-0">
                <Calculator className="w-4 h-4 text-saffron" strokeWidth={1.8} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-ink-light leading-snug">{calc.label}</p>
                <p className="text-sm font-bold text-leaf">{calc.result}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-ink-faint group-hover:text-saffron transition-colors" />
            </Link>
          ))}
        </div>
      </section>

      {/* ── Quick actions ───────────────────────────────── */}
      <section>
        <h2 className="font-display font-bold text-navy text-lg mb-3">Quick actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { to: '/expense', icon: '📊', label: 'Analyze expenses', bg: '#e8f5e9', color: '#138808' },
            { to: '/compare', icon: '⚖️', label: 'Compare investments', bg: '#FFF3E0', color: '#FF9933' },
            { to: '/health', icon: '💚', label: 'Health Score', bg: '#E9EDF3', color: '#0B1F3A' },
            { to: '/ai-munim', icon: '🤖', label: 'Ask AI Munim', bg: '#FFF3E0', color: '#FF9933' },
          ].map(({ to, icon, label, bg, color }) => (
            <Link key={to} to={to}
              className="bg-white border border-saffron-100 rounded-xl p-3 flex flex-col items-start gap-2 hover:shadow-md hover:border-saffron transition-all active:scale-[0.98]">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl" style={{ background: bg }}>
                {icon}
              </div>
              <p className="text-xs font-semibold text-navy leading-snug">{label}</p>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}