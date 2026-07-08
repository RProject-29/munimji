import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {  Sparkles } from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import PassbookCard, { PassbookRow } from '../../components/PassbookCard.jsx'
import SliderInput from '../../components/SliderInput.jsx'
import { calculateSIP, formatINR } from '../../utils/financeMath.js'
import { useLanguage } from '../../context/LanguageContext.jsx'

export default function SipCalculator() {
  const { t } = useLanguage()
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000)
  const [expectedReturn, setExpectedReturn] = useState(12)
  const [years, setYears] = useState(10)

  const result = useMemo(
    () => calculateSIP(monthlyInvestment, expectedReturn, years),
    [monthlyInvestment, expectedReturn, years]
  )

  const chartData = useMemo(() => {
    const points = []
    for (let y = 1; y <= years; y++) {
      const r = calculateSIP(monthlyInvestment, expectedReturn, y)
      points.push({
        year: `Y${y}`,
        invested: Math.round(r.investedAmount),
        value: Math.round(r.futureValue),
      })
    }
    return points
  }, [monthlyInvestment, expectedReturn, years])

  return (
    <div className="space-y-5 md:max-w-2xl">
      <h1 className="font-display text-xl md:text-2xl font-semibold text-navy">
        {t('sip_title')}
      </h1>
   

      <div className="space-y-4 md:grid md:grid-cols-3 md:gap-4 md:space-y-0">
        <SliderInput
          label={t('sip_monthly')}
          value={monthlyInvestment}
          onChange={setMonthlyInvestment}
          min={500}
          max={100000}
          step={500}
          prefix="₹"
        />
        <SliderInput
          label={t('sip_return')}
          value={expectedReturn}
          onChange={setExpectedReturn}
          min={1}
          max={30}
          step={0.5}
          suffix="%"
        />
        <SliderInput
          label={t('sip_period')}
          value={years}
          onChange={setYears}
          min={1}
          max={40}
          step={1}
          suffix={` ${t('sip_years')}`}
        />
      </div>

      <div className="bg-white rounded-xl border border-saffron-100 p-3" style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="valueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF9933" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#FF9933" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="investedGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0B1F3A" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#0B1F3A" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="year"
              tick={{ fontSize: 10, fill: '#8C857B' }}
              axisLine={false}
              tickLine={false}
              interval={Math.max(0, Math.floor(years / 5) - 1)}
            />
            <YAxis hide />
            <Tooltip
              formatter={(value) => formatINR(value)}
              labelStyle={{ fontSize: 12 }}
              contentStyle={{ fontSize: 12, borderRadius: 8 }}
            />
            <Area type="monotone" dataKey="value" stroke="#FF9933" fill="url(#valueGrad)" strokeWidth={2} name="Total value" />
            <Area type="monotone" dataKey="invested" stroke="#0B1F3A" fill="url(#investedGrad)" strokeWidth={1.5} name="Invested" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <PassbookCard eyebrow={`${t('sip_after')} ${years} ${t('sip_years')}`} title={t('sip_projection')}>
        <PassbookRow label={t('sip_invested')} value={formatINR(result.investedAmount)} />
        <PassbookRow label={t('sip_profit')} value={formatINR(result.profit)} highlight />
        <PassbookRow label={t('sip_final')} value={formatINR(result.futureValue)} highlight />
      </PassbookCard>

      <p className="text-[11px] text-ink-faint leading-relaxed">
        {t('sip_disclaimer')}
      </p>

      <Link to="/ai-munim" className="flex items-center gap-2 bg-navy rounded-xl px-3 py-3 md:max-w-md">
        <Sparkles className="w-4 h-4 text-saffron" />
        <span className="text-sm text-white">{t('sip_ask_ai')}</span>
      </Link>
    </div>
  )
}

