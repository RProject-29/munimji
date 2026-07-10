import React, { useState, useEffect } from 'react'
import {
  Bike,
  Laptop,
  GraduationCap,
  Heart,
  Home as HomeIcon,
  ShieldCheck,
  Landmark,
  Plus,
  Lock,
  Trash2,
  X,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import PassbookCard from '../components/PassbookCard.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { api } from '../utils/api.js'
import { formatINR } from '../utils/financeMath.js'

import { Trophy, CheckCircle2 } from 'lucide-react'


const GOAL_TYPES = [
  { id: 'bike', label: 'Bike', icon: Bike },
  { id: 'laptop', label: 'Laptop', icon: Laptop },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'marriage', label: 'Marriage', icon: Heart },
  { id: 'house', label: 'House', icon: HomeIcon },
  { id: 'emergency', label: 'Emergency fund', icon: ShieldCheck },
  { id: 'retirement', label: 'Retirement', icon: Landmark },
]

export default function Goals() {
  const { isGuest } = useAuth()
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState(null)

  function showToast(message, type = 'success') {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }
  // const [toast, setToast] = useState(null)

  // function showToast(message, type = 'success') {
  //   setToast({ message, type })
  //   setTimeout(() => setToast(null), 4000)
  // }

  useEffect(() => {
    if (!isGuest) {
      // Small delay to ensure Firebase token is ready
      const timer = setTimeout(() => fetchGoals(), 500)
      return () => clearTimeout(timer)
    } else {
      setLoading(false)
    }
  }, [isGuest])

 async function fetchGoals() {
    try {
      const data = await api.getGoals()
      setGoals(data.goals)
    } catch (err) {
      if (err.message.includes('Cannot reach server')) {
        setError('Backend server is not running. Start it with npm run dev in the munimji-backend folder.')
      } else {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function handleDeleteGoal(id) {
    try {
      await api.deleteGoal(id)
      setGoals((prev) => prev.filter((g) => g._id !== id))
    } catch (err) {
      setError('Failed to delete goal')
    }
  }

  // async function handleUpdateSaved(id, newAmount) {
  //   try {
  //     const data = await api.updateGoal(id, { savedAmount: newAmount })
  //     setGoals((prev) => prev.map((g) => g._id === id ? data.goal : g))
  //   } catch (err) {
  //     setError('Failed to update goal')
  //   }
  // }

async function handleUpdateSaved(id, newAmount, targetAmount) {
    try {
      const data = await api.updateGoal(id, { savedAmount: newAmount })
      setGoals((prev) => prev.map((g) => g._id === id ? data.goal : g))
      if (Number(newAmount) >= Number(targetAmount)) {
        showToast('🎉 Congratulations! Goal achieved! You did it!', 'celebrate')
      } else {
        showToast('Savings updated successfully! Keep going 💪', 'success')
      }
    } catch (err) {
      setError('Failed to update goal')
    }
  }






  if (isGuest) {
    return (
      <div className="space-y-5 md:max-w-2xl">
        <div>
          <h1 className="font-display text-xl md:text-2xl font-semibold text-navy">Goals</h1>
          <p className="text-ink-light text-sm mt-1">Track your savings for what matters to you.</p>
        </div>
        <div className="passbook-card px-5 py-8 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-saffron-50 flex items-center justify-center mb-3">
            <Lock className="w-5 h-5 text-saffron" />
          </div>
          <h3 className="font-display font-semibold text-navy text-base mb-1">
            Sign in to save goals
          </h3>
          <p className="text-sm text-ink-light leading-relaxed mb-4 max-w-xs">
            Guest mode lets you explore freely, but goals are saved only for signed-in users.
          </p>
          <Link to="/profile" className="bg-saffron text-white text-sm font-semibold rounded-xl px-5 py-2.5">
            Sign in to continue
          </Link>
        </div>
        <div>
          <p className="text-xs font-semibold text-ink-faint uppercase tracking-wide mb-2">
            Popular goal types
          </p>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
            {GOAL_TYPES.map(({ id, label, icon: Icon }) => (
              <div key={id} className="bg-white border border-saffron-100 rounded-xl p-2.5 flex flex-col items-center gap-1.5">
                <Icon className="w-4.5 h-4.5 text-leaf" strokeWidth={1.8} />
                <span className="text-[10px] text-ink-light text-center leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 md:max-w-2xl">
      {toast && (
        <div style={{
          position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)',
          zIndex: 9999, background: toast.type === 'celebrate' ? '#FFF3E0' : '#e8f5e9',
          border: `1.5px solid ${toast.type === 'celebrate' ? '#FF9933' : '#138808'}`,
          borderRadius: 14, padding: '12px 20px', display: 'flex', alignItems: 'center',
          gap: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: 260, maxWidth: 340,
        }}>
          <span style={{ fontSize: 20 }}>{toast.type === 'celebrate' ? '🎉' : '✅'}</span>
          <p style={{ color: toast.type === 'celebrate' ? '#E67E00' : '#138808', fontSize: 13, fontWeight: 600, flex: 1 }}>
            {toast.message}
          </p>
          <button onClick={() => setToast(null)} style={{ opacity: 0.6, fontSize: 16, background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
        </div>
      )}

      {/* <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl md:text-2xl font-semibold text-navy">Goals</h1> */}


{toast && (
        <div style={{
          position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)',
          zIndex: 9999, background: toast.type === 'celebrate' ? '#FFF3E0' : '#e8f5e9',
          border: `1.5px solid ${toast.type === 'celebrate' ? '#FF9933' : '#138808'}`,
          borderRadius: 14, padding: '12px 20px', display: 'flex', alignItems: 'center',
          gap: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: 260, maxWidth: 340,
        }}>
          <span style={{ fontSize: 20 }}>{toast.type === 'celebrate' ? '🎉' : '✅'}</span>
          <p style={{ color: toast.type === 'celebrate' ? '#E67E00' : '#138808', fontSize: 13, fontWeight: 600, flex: 1 }}>
            {toast.message}
          </p>
          <button onClick={() => setToast(null)} style={{ opacity: 0.6, fontSize: 16, background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl md:text-2xl font-semibold text-navy">Goals</h1>



          
          <p className="text-ink-light text-sm mt-1">
            {loading ? 'Loading...' : `${goals.length} active goal${goals.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="w-9 h-9 rounded-full bg-saffron flex items-center justify-center"
        >
          <Plus className="w-5 h-5 text-white" />
        </button>
      </div>

      {error && (
        <p className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-20 bg-white border border-saffron-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : goals.length === 0 ? (
        <div className="passbook-card px-5 py-10 flex flex-col items-center text-center">
          <p className="text-ink-faint text-sm mb-3">No goals yet.</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-saffron text-white text-sm font-semibold rounded-xl px-5 py-2.5"
          >
            Add your first goal
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {goals.map((goal) => {
            const meta = GOAL_TYPES.find((g) => g.id === goal.type)
            const Icon = meta?.icon ?? Landmark
            const pct = Math.min(100, Math.round((goal.savedAmount / goal.targetAmount) * 100))
            return (
              <PassbookCard key={goal._id}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-leaf-50 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-leaf" strokeWidth={1.8} />
                  </div>
                  <div className="flex-1">
                    <p className="font-display font-semibold text-navy text-sm">{goal.label}</p>
                    <p className="text-xs text-ink-faint">
                      {formatINR(goal.savedAmount)} of {formatINR(goal.targetAmount)}
                    </p>
                  </div>
                  <span className={`text-sm font-semibold ${pct >= 100 ? 'text-leaf' : 'text-saffron'}`}>
                    {pct}%
                  </span>
                  <button
                    onClick={() => handleDeleteGoal(goal._id)}
                    className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-500" />
                  </button>
                </div>
                <div className="h-2 bg-saffron-50 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-leaf rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="number"
                    placeholder="Update saved amount"
                    className="flex-1 text-xs border border-saffron-100 rounded-lg px-2 py-1.5 focus:outline-none focus:border-saffron"
                    // onKeyDown={(e) => {
                    //   if (e.key === 'Enter') {
                    //     handleUpdateSaved(goal._id, Number(e.target.value))
                    //     e.target.value = ''
                    //   }
                    // }}

onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleUpdateSaved(goal._id, Number(e.target.value), goal.targetAmount)
                        e.target.value = ''
                      }
                    }}






                  />
                  <span className="text-[10px] text-ink-faint">Press Enter to update</span>
                </div>
                {pct >= 100 && (
                  <p className="text-xs text-leaf font-semibold mt-2">🎉 Goal achieved!</p>
                )}
              </PassbookCard>
            )
          })}
        </div>
      )}

      {/* {showAddModal && (
        <AddGoalModal
          onClose={() => setShowAddModal(false)}
          onAdded={(newGoal) => {
            setGoals((prev) => [newGoal, ...prev])
            setShowAddModal(false)
          }}
        />
      )} */}


{showAddModal && (
        <AddGoalModal
          onClose={() => setShowAddModal(false)}
          onToast={showToast}
          onAdded={(newGoal) => {
            setGoals((prev) => [newGoal, ...prev])
            setShowAddModal(false)
          }}
        />
      )}



    </div>
  )
}

function AddGoalModal({ onClose, onAdded,onToast }) {
  const [type, setType] = useState('bike')
  const [label, setLabel] = useState('')
  const [targetAmount, setTargetAmount] = useState('')
  const [savedAmount, setSavedAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!label.trim() || !targetAmount) return setError('Please fill in all fields')
    setLoading(true)
    // try {
    //   const data = await api.createGoal({
    //     type,
    //     label: label.trim(),
    //     targetAmount: Number(targetAmount),
    //     savedAmount: Number(savedAmount) || 0,
    //   })
    //   onAdded(data.goal)
    // } catch (err) {


try {
      const data = await api.createGoal({
        type,
        label: label.trim(),
        targetAmount: Number(targetAmount),
        savedAmount: Number(savedAmount) || 0,
      })
      onAdded(data.goal)
      onToast(`Goal "${label}" created successfully! Keep saving 💪`, 'success')
    } catch (err) {

      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-semibold text-navy text-lg">Add a goal</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-ink-faint" />
          </button>
        </div>

        {error && <p className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs text-ink-light mb-1 block">Goal type</label>
            <div className="grid grid-cols-4 gap-2">
              {GOAL_TYPES.map(({ id, label: lbl, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => { setType(id); setLabel(lbl) }}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl border text-[10px] ${
                    type === id ? 'bg-navy text-white border-navy' : 'bg-white border-saffron-100 text-ink-light'
                  }`}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.8} />
                  {lbl}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-ink-light mb-1 block">Goal name</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. My Dream Bike"
              className="w-full border border-saffron-100 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-saffron"
            />
          </div>

          <div>
            <label className="text-xs text-ink-light mb-1 block">Target amount (₹)</label>
            <input
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              placeholder="e.g. 90000"
              className="w-full border border-saffron-100 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-saffron"
            />
          </div>

          <div>
            <label className="text-xs text-ink-light mb-1 block">Already saved (₹) — optional</label>
            <input
              type="number"
              value={savedAmount}
              onChange={(e) => setSavedAmount(e.target.value)}
              placeholder="e.g. 15000"
              className="w-full border border-saffron-100 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-saffron"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-saffron text-white font-semibold text-sm rounded-xl py-3 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save goal'}
          </button>
        </form>
      </div>
    </div>
  )
}