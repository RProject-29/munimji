import React, { useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import PassbookCard, { PassbookRow } from '../components/PassbookCard.jsx'
import { formatINR } from '../utils/financeMath.js'
import { askAiMunim } from '../utils/geminiClient.js'
import { Sparkles, AlertCircle } from 'lucide-react'

import { useLanguage } from '../context/LanguageContext.jsx'

const COLORS = ['#FF9933', '#138808', '#0B1F3A', '#FFC580', '#5C3A21', '#1E3A5F', '#E67E00', '#0B5705']

const EXPENSE_FIELD_KEYS = [
  { key: 'food', labelKey: 'expense_food' },
  { key: 'rent', labelKey: 'expense_rent' },
  { key: 'travel', labelKey: 'expense_travel' },
  { key: 'shopping', labelKey: 'expense_shopping' },
  { key: 'entertainment', labelKey: 'expense_entertainment' },
  { key: 'health', labelKey: 'expense_health' },
  { key: 'education', labelKey: 'expense_education' },
  { key: 'other', labelKey: 'expense_other' },
]

const DEFAULT_EXPENSES = {
  food: 0, rent: 0, travel: 0, shopping: 0,
  entertainment: 0, health: 0, education: 0, other: 0,
}

export default function ExpenseAnalyzer() {
  const { t } = useLanguage()
  const EXPENSE_FIELDS = EXPENSE_FIELD_KEYS.map(f => ({ key: f.key, label: t(f.labelKey) }))






  const [income, setIncome] = useState(0)
  const [expenses, setExpenses] = useState(DEFAULT_EXPENSES)
  const [analyzed, setAnalyzed] = useState(false)
  const [aiResponse, setAiResponse] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState(null)

  const totalExpenses = Object.values(expenses).reduce((sum, v) => sum + (Number(v) || 0), 0)
  const savings = Math.max(0, (Number(income) || 0) - totalExpenses)
  const savingsRate = income > 0 ? Math.round((savings / income) * 100) : 0

  const chartData = EXPENSE_FIELDS
    .filter((f) => expenses[f.key] > 0)
    .map((f) => ({ name: f.label, value: Number(expenses[f.key]) }))

  function handleExpenseChange(key, value) {
    const raw = value.replace(/[^0-9]/g, '')
    setExpenses((prev) => ({ ...prev, [key]: raw === '' ? 0 : Number(raw) }))
    setAnalyzed(false)
    setAiResponse('')
  }

  async function handleAnalyze() {
    setAnalyzed(true)
    setAiLoading(true)
    setAiError(null)

    const breakdown = EXPENSE_FIELDS
      .filter((f) => expenses[f.key] > 0)
      .map((f) => `${f.label}: ₹${expenses[f.key].toLocaleString('en-IN')}`)
      .join(', ')

    const prompt = `I earn ₹${Number(income).toLocaleString('en-IN')} per month. My monthly expenses are: ${breakdown}. My total expenses are ₹${totalExpenses.toLocaleString('en-IN')}, leaving me with ₹${savings.toLocaleString('en-IN')} in savings (${savingsRate}% savings rate). As my financial teacher, please analyze my spending pattern in 3-4 short points: what looks good, what areas might need attention, and one simple actionable suggestion to improve my savings. Keep it warm, friendly, and practical for an ordinary Indian household. Do not recommend specific products or guarantee any returns.`

    try {
      const response = await askAiMunim(
        [{ role: 'user', content: prompt }],
        'en'
      )
      setAiResponse(response)
    } catch (err) {
      setAiError(err.message)
    } finally {
      setAiLoading(false)
    }
  }

  const savingsColor = savingsRate >= 20 ? 'text-leaf' : savingsRate >= 10 ? 'text-saffron' : 'text-red-500'

  return (
    <div className="space-y-5 md:max-w-2xl">
      <div>
        <h1 className="font-display text-xl md:text-2xl font-semibold text-navy">
          {t('expense_title')}
        </h1>
        <p className="text-ink-light text-sm md:text-base mt-1">
          {t('expense_subtitle')}
        </p>
      </div>

      {/* Income */}
      <PassbookCard eyebrow={t('expense_income')}>
        <div className="flex items-center bg-white border border-saffron-100 rounded-lg px-3 py-2 focus-within:border-saffron">
          <span className="text-sm font-semibold text-ink-faint mr-1">₹</span>
          <input
            type="text"
            inputMode="numeric"
           placeholder={t('expense_income')}
            value={income || ''}
            onChange={(e) => {
              const raw = e.target.value.replace(/[^0-9]/g, '')
              setIncome(raw === '' ? 0 : Number(raw))
              setAnalyzed(false)
              setAiResponse('')
            }}
            className="flex-1 text-sm font-semibold text-navy bg-transparent outline-none"
          />
        </div>
      </PassbookCard>

      {/* Expenses */}
      <PassbookCard eyebrow="Monthly expenses">
        <div className="space-y-3">
          {EXPENSE_FIELDS.map((field) => (
            <div key={field.key}>
              <label className="text-xs text-ink-light mb-1 block">{field.label}</label>
              <div className="flex items-center bg-white border border-saffron-100 rounded-lg px-3 py-2 focus-within:border-saffron">
                <span className="text-sm text-ink-faint mr-1">₹</span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="0"
                  value={expenses[field.key] || ''}
                  onChange={(e) => handleExpenseChange(field.key, e.target.value)}
                  className="flex-1 text-sm font-semibold text-navy bg-transparent outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </PassbookCard>

      {/* Analyze button */}
    <button
        onClick={handleAnalyze}
        disabled={income === 0 || totalExpenses === 0}
        className="w-full bg-saffron text-white font-semibold text-sm rounded-xl py-3 disabled:opacity-40 active:scale-[0.98] transition-transform"
      >
        {t('expense_analyze_btn')}
      </button>

      {/* Results */}
      {analyzed && (
        <>
          <PassbookCard eyebrow="Your summary">
            <PassbookRow label="Monthly income" value={formatINR(income)} />
            <PassbookRow label="Total expenses" value={formatINR(totalExpenses)} />
            <PassbookRow label="Monthly savings" value={formatINR(savings)} highlight />
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-ink-light">Savings rate</span>
              <span className={`text-sm font-bold ${savingsColor}`}>
                {savingsRate}%
                {savingsRate >= 20 ? ' 🎉' : savingsRate >= 10 ? ' 👍' : ' ⚠️'}
              </span>
            </div>
          </PassbookCard>

          {/* Pie chart */}
          {chartData.length > 0 && (
            <div className="bg-white rounded-xl border border-saffron-100 p-3">
              <p className="text-xs font-semibold text-ink-faint uppercase tracking-wide mb-3">
                Expense breakdown
              </p>
              <div style={{ height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="45%"
                      outerRadius={90}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`
                      }
                      labelLine={false}
                    >
                      {chartData.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatINR(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* AI Analysis */}
          <div className="bg-navy rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-saffron" />
              <p className="text-white font-display font-semibold text-sm">
                AI Munim's analysis
              </p>
            </div>
            {aiLoading && (
              <div className="flex items-center gap-1.5 pt-1">
                <span className="w-1.5 h-1.5 bg-saffron rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-saffron rounded-full animate-bounce [animation-delay:0.15s]" />
                <span className="w-1.5 h-1.5 bg-saffron rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
            )}
            {aiError && (
              <div className="flex items-start gap-2 bg-red-50 rounded-lg px-3 py-2">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-700">{aiError}</p>
              </div>
            )}
            {aiResponse && (
              <p className="text-white/80 text-sm leading-relaxed">{aiResponse}</p>
            )}
          </div>

          <p className="text-[11px] text-ink-faint leading-relaxed">
            Your expense data is not stored anywhere — it exists only in this session.
          </p>
        </>
      )}
    </div>
  )
}