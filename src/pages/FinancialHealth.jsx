import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  TrendingUp,
  Target,
  PiggyBank,
  CreditCard,
  BarChart2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
   Sparkles,
} from 'lucide-react'
import PassbookCard, { PassbookRow } from '../components/PassbookCard.jsx'

const QUESTIONS = [
  {
    id: 'emergency',
    icon: ShieldCheck,
    color: '#138808',
    bg: '#e8f5e9',
    pillar: 'Emergency Fund',
    question: 'Do you have at least 3 months of expenses saved as an emergency fund?',
    subtext: 'Example: If you spend ₹15,000/month, do you have ₹45,000+ kept aside only for emergencies?',
    options: [
      { label: 'Yes, 6+ months saved', score: 17 },
      { label: 'Yes, 3–6 months saved', score: 13 },
      { label: 'Partially — less than 3 months', score: 7 },
      { label: 'No emergency fund yet', score: 0 },
    ],
  },
  {
    id: 'insurance',
    icon: ShieldCheck,
    color: '#FF9933',
    bg: '#FFF3E0',
    pillar: 'Insurance',
    question: 'Do you have life insurance and health insurance?',
    subtext: 'Term insurance protects your family. Health insurance protects your savings from medical bills.',
    options: [
      { label: 'Yes, both life and health insurance', score: 17 },
      { label: 'Only health insurance', score: 10 },
      { label: 'Only life insurance', score: 8 },
      { label: 'No insurance at all', score: 0 },
    ],
  },
  {
    id: 'debt',
    icon: CreditCard,
    color: '#e53935',
    bg: '#ffebee',
    pillar: 'Debt Management',
    question: 'How is your current debt situation?',
    subtext: 'Good debt (home loan) is okay. Bad debt (credit card, personal loan at high interest) should be minimized.',
    options: [
      { label: 'Completely debt-free', score: 17 },
      { label: 'Only home loan — manageable', score: 13 },
      { label: 'Some loans but paying on time', score: 7 },
      { label: 'Struggling with debt or credit card dues', score: 0 },
    ],
  },
  {
    id: 'investing',
    icon: TrendingUp,
    color: '#138808',
    bg: '#e8f5e9',
    pillar: 'Investing',
    question: 'Do you invest regularly every month?',
    subtext: 'Any regular investment counts — SIP, PPF, RD, gold, stocks. The habit matters more than the amount.',
    options: [
      { label: 'Yes, multiple investments monthly', score: 17 },
      { label: 'Yes, at least one SIP or RD', score: 13 },
      { label: 'Occasionally, not every month', score: 5 },
      { label: 'No regular investing yet', score: 0 },
    ],
  },
  {
    id: 'budget',
    icon: BarChart2,
    color: '#0B1F3A',
    bg: '#E9EDF3',
    pillar: 'Budgeting',
    question: 'Do you track your income and expenses every month?',
    subtext: 'Knowing where your money goes is the first step to making it grow.',
    options: [
      { label: 'Yes, I track every rupee', score: 17 },
      { label: 'Roughly — I have a mental budget', score: 10 },
      { label: 'Occasionally check my bank statement', score: 5 },
      { label: 'No tracking at all', score: 0 },
    ],
  },
  {
    id: 'goals',
    icon: Target,
    color: '#FF9933',
    bg: '#FFF3E0',
    pillar: 'Financial Goals',
    question: 'Do you have clear financial goals you are saving towards?',
    subtext: 'Goals give your money direction — house, education, retirement, emergency fund.',
    options: [
      { label: 'Yes, multiple goals with a plan', score: 15 },
      { label: 'Yes, one clear goal', score: 10 },
      { label: 'Vague goals but no real plan', score: 5 },
      { label: 'No financial goals defined', score: 0 },
    ],
  },
]

function getGrade(score) {
  if (score >= 85) return { grade: 'A+', label: 'Excellent', color: '#138808', bg: '#e8f5e9', emoji: '🏆' }
  if (score >= 70) return { grade: 'A', label: 'Very Good', color: '#138808', bg: '#e8f5e9', emoji: '⭐' }
  if (score >= 55) return { grade: 'B', label: 'Good', color: '#FF9933', bg: '#FFF3E0', emoji: '👍' }
  if (score >= 40) return { grade: 'C', label: 'Average', color: '#FF9933', bg: '#FFF3E0', emoji: '📈' }
  if (score >= 25) return { grade: 'D', label: 'Needs Work', color: '#e53935', bg: '#ffebee', emoji: '⚠️' }
  return { grade: 'F', label: 'Critical', color: '#e53935', bg: '#ffebee', emoji: '🚨' }
}

function getActionPlan(answers) {
  const actions = []

  if (answers.emergency < 13) {
    actions.push({
      priority: 1,
      icon: ShieldCheck,
      title: 'Build your emergency fund first',
      desc: 'Before investing, save 3–6 months of expenses in a savings account or liquid fund. This is your financial safety net.',
      link: '/calculators/goal',
      linkLabel: 'Plan your emergency fund',
    })
  }
  if (answers.insurance < 10) {
    actions.push({
      priority: 2,
      icon: ShieldCheck,
      title: 'Get term + health insurance',
      desc: 'A ₹1 crore term plan costs just ₹8,000–12,000/year for a young person. Health insurance protects your savings from medical bills.',
      link: '/dictionary',
      linkLabel: 'Learn about insurance',
    })
  }
  if (answers.debt === 0) {
    actions.push({
      priority: 3,
      icon: CreditCard,
      title: 'Focus on clearing high-interest debt',
      desc: 'Credit card debt at 36%/year and personal loans drain your wealth. Pay these off before investing.',
      link: '/learn',
      linkLabel: 'Learn about debt',
    })
  }
  if (answers.investing < 13) {
    actions.push({
      priority: 4,
      icon: TrendingUp,
      title: 'Start a monthly SIP',
      desc: 'Even ₹500/month in a mutual fund through SIP can grow significantly over 10–15 years. Start small, start now.',
      link: '/calculators/sip',
      linkLabel: 'See SIP calculator',
    })
  }
  if (answers.budget < 10) {
    actions.push({
      priority: 5,
      icon: BarChart2,
      title: 'Track your expenses',
      desc: 'Use MunimJi\'s Expense Analyzer to see where your money is going. Most people save 10–20% more just by tracking.',
      link: '/expense',
      linkLabel: 'Analyze your expenses',
    })
  }
  if (answers.goals < 10) {
    actions.push({
      priority: 6,
      icon: Target,
      title: 'Set at least one financial goal',
      desc: 'A goal gives your savings direction. Pick one — emergency fund, bike, house — and work towards it.',
      link: '/goals',
      linkLabel: 'Set a goal',
    })
  }

  // If doing well overall
  if (actions.length === 0) {
    actions.push({
      priority: 1,
      icon: TrendingUp,
      title: 'You\'re doing great — now optimize',
      desc: 'Consider diversifying into NPS for retirement, reviewing your insurance coverage annually, and increasing your SIP by 10% every year.',
      link: '/compare',
      linkLabel: 'Compare investments',
    })
  }

  return actions.slice(0, 3)
}

export default function FinancialHealth() {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({})
  const [selectedOption, setSelectedOption] = useState(null)
  const [finished, setFinished] = useState(false)

  const question = QUESTIONS[currentQ]
  const Icon = question?.icon
  const totalScore = Object.values(answers).reduce((sum, v) => sum + v, 0)
  const grade = getGrade(totalScore)
  const actionPlan = getActionPlan(answers)
  const progress = (currentQ / QUESTIONS.length) * 100

  function handleSelect(score) {
    setSelectedOption(score)
  }

  function handleNext() {
    if (selectedOption === null) return
    const newAnswers = { ...answers, [question.id]: selectedOption }
    setAnswers(newAnswers)
    setSelectedOption(null)

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1)
    } else {
      setFinished(true)
    }
  }

  function handleRestart() {
    setCurrentQ(0)
    setAnswers({})
    setSelectedOption(null)
    setFinished(false)
  }

  if (finished) {
    return (
      <div className="space-y-5 md:max-w-2xl">
        {/* Score card */}
        <div className="rounded-2xl p-6 text-center" style={{ background: grade.bg, border: `2px solid ${grade.color}22` }}>
          <p className="text-4xl mb-1">{grade.emoji}</p>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="font-display text-6xl font-bold" style={{ color: grade.color }}>
              {totalScore}
            </span>
            <span className="text-ink-faint text-lg font-medium">/100</span>
          </div>
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-2"
            style={{ background: grade.color, color: '#fff' }}>
            {grade.grade} — {grade.label}
          </span>
          <p className="text-sm text-ink-light leading-relaxed max-w-xs mx-auto">
            {totalScore >= 70
              ? 'Your financial foundation is strong. Keep it up and keep growing.'
              : totalScore >= 40
              ? 'You have a decent base but there are clear gaps to address.'
              : 'Your financial health needs attention — but the good news is every gap is fixable with small steps.'}
          </p>
        </div>

        {/* Pillar breakdown */}
        <PassbookCard eyebrow="Your score breakdown">
          {QUESTIONS.map((q) => {
            const score = answers[q.id] ?? 0
            const maxScore = Math.max(...q.options.map(o => o.score))
            const pct = Math.round((score / maxScore) * 100)
            const isGood = pct >= 70
            return (
              <div key={q.id} className="py-2.5 border-b border-dashed border-saffron-100 last:border-0">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    {isGood
                      ? <CheckCircle2 className="w-4 h-4 text-leaf flex-shrink-0" />
                      : <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    }
                    <span className="text-sm font-medium text-navy">{q.pillar}</span>
                  </div>
                  <span className="text-xs font-bold" style={{ color: isGood ? '#138808' : '#e53935' }}>
                    {score}/{maxScore}
                  </span>
                </div>
                <div className="h-1.5 bg-saffron-50 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, background: isGood ? '#138808' : '#FF9933' }} />
                </div>
              </div>
            )
          })}
        </PassbookCard>

        {/* Action plan */}
        <div>
          <h2 className="font-display font-bold text-navy text-lg mb-3">
            Your personalised action plan
          </h2>
          <div className="space-y-3">
            {actionPlan.map((action, idx) => {
              const ActionIcon = action.icon
              return (
                <div key={idx} className="bg-white rounded-xl border border-saffron-100 p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-saffron flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">{idx + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-navy text-sm mb-1">{action.title}</p>
                      <p className="text-xs text-ink-light leading-relaxed mb-2">{action.desc}</p>
                      <Link to={action.link}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-saffron">
                        {action.linkLabel} <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleRestart}
            className="flex-1 bg-white border border-saffron-100 text-navy font-semibold text-sm rounded-xl py-3"
          >
            Retake quiz
          </button>
          <Link to="/ai-munim"
            className="flex-1 bg-saffron text-white font-semibold text-sm rounded-xl py-3 text-center flex items-center justify-center gap-1.5">
            Ask AI Munim <Sparkles className="w-4 h-4" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5 md:max-w-2xl">
      <div>
        <h1 className="font-display text-xl md:text-2xl font-bold text-navy">
          Financial Health Score
        </h1>
        <p className="text-ink-light text-sm mt-1">
          6 quick questions — get your personalised financial health score out of 100.
        </p>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-ink-faint">Question {currentQ + 1} of {QUESTIONS.length}</span>
          <span className="text-xs font-semibold text-saffron">{Math.round(progress)}% done</span>
        </div>
        <div className="h-1.5 bg-saffron-50 rounded-full overflow-hidden">
          <div className="h-full bg-saffron rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white rounded-2xl border border-saffron-100 p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: question.bg }}>
            <Icon className="w-5 h-5" style={{ color: question.color }} strokeWidth={2} />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: question.color }}>
              {question.pillar}
            </p>
          </div>
        </div>

        <h2 className="font-display font-bold text-navy text-base md:text-lg leading-snug mb-2">
          {question.question}
        </h2>
        <p className="text-xs text-ink-faint leading-relaxed mb-5">
          {question.subtext}
        </p>

        <div className="space-y-2">
          {question.options.map((option) => (
            <button
              key={option.score}
              onClick={() => handleSelect(option.score)}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                selectedOption === option.score
                  ? 'border-saffron bg-saffron-50 text-navy'
                  : 'border-saffron-100 bg-white text-ink hover:border-saffron hover:bg-saffron-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                  selectedOption === option.score
                    ? 'border-saffron bg-saffron'
                    : 'border-saffron-100'
                }`}>
                  {selectedOption === option.score && (
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  )}
                </div>
                {option.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        disabled={selectedOption === null}
        className="w-full bg-saffron text-white font-semibold text-sm rounded-xl py-3 disabled:opacity-40 flex items-center justify-center gap-2"
      >
        {currentQ === QUESTIONS.length - 1 ? 'See my score' : 'Next question'}
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  )
}