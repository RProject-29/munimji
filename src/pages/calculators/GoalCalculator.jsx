import React, { useState, useMemo } from 'react'
import PassbookCard, { PassbookRow } from '../../components/PassbookCard.jsx'
import SliderInput from '../../components/SliderInput.jsx'
import { calculateRequiredMonthlySavings, formatINR } from '../../utils/financeMath.js'
import { useLanguage } from '../../context/LanguageContext.jsx'

export default function GoalCalculator() {
  const { t } = useLanguage()
  const [goalAmount, setGoalAmount] = useState(500000)
  const [years, setYears] = useState(5)
  const [expectedReturn, setExpectedReturn] = useState(12)

  const requiredMonthly = useMemo(
    () => calculateRequiredMonthlySavings(goalAmount, expectedReturn, years),
    [goalAmount, expectedReturn, years]
  )

  return (
    <div className="space-y-5 md:max-w-2xl">
      <h1 className="font-display text-xl md:text-2xl font-semibold text-navy">
        {t('goal_title')}
      </h1>

      <div className="space-y-4 md:grid md:grid-cols-3 md:gap-4 md:space-y-0">
        <SliderInput
          label={t('goal_amount')}
          value={goalAmount}
          onChange={setGoalAmount}
          min={10000}
          max={10000000}
          step={10000}
          prefix="₹"
        />
        <SliderInput
          label={t('goal_timeline')}
          value={years}
          onChange={setYears}
          min={1}
          max={30}
          step={1}
          suffix={` ${t('sip_years')}`}
        />
        <SliderInput
          label={t('goal_return')}
          value={expectedReturn}
          onChange={setExpectedReturn}
          min={1}
          max={30}
          step={0.5}
          suffix="%"
        />
      </div>

      <PassbookCard eyebrow={t('goal_result_title')} title={t('goal_monthly_label')}>
        <PassbookRow label={t('goal_monthly_label')} value={formatINR(requiredMonthly)} highlight />
      </PassbookCard>

      <p className="text-[11px] text-ink-faint leading-relaxed">
        {t('goal_disclaimer')}
      </p>
    </div>
  )
}