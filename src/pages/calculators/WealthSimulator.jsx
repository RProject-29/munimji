import React, { useState, useMemo } from 'react'
import PassbookCard, { PassbookRow } from '../../components/PassbookCard.jsx'
import SliderInput from '../../components/SliderInput.jsx'
import { simulateWealthByAge, formatINR } from '../../utils/financeMath.js'
import { useLanguage } from '../../context/LanguageContext.jsx'

export default function WealthSimulator() {
  const { t } = useLanguage()
  const [currentAge, setCurrentAge] = useState(25)
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000)
  const [expectedReturn, setExpectedReturn] = useState(12)

  const projections = useMemo(
    () => simulateWealthByAge(currentAge, monthlyInvestment, expectedReturn),
    [currentAge, monthlyInvestment, expectedReturn]
  )

  return (
    <div className="space-y-5 md:max-w-2xl">
      <h1 className="font-display text-xl md:text-2xl font-semibold text-navy">
        {t('wealth_title')}
      </h1>

      <div className="space-y-4 md:grid md:grid-cols-3 md:gap-4 md:space-y-0">
        <SliderInput
          label={t('wealth_current_age')}
          value={currentAge}
          onChange={setCurrentAge}
          min={18}
          max={55}
          step={1}
        />
        <SliderInput
          label={t('wealth_monthly')}
          value={monthlyInvestment}
          onChange={setMonthlyInvestment}
          min={500}
          max={100000}
          step={500}
          prefix="₹"
        />
        <SliderInput
          label={t('wealth_return')}
          value={expectedReturn}
          onChange={setExpectedReturn}
          min={1}
          max={30}
          step={0.5}
          suffix="%"
        />
      </div>

      <PassbookCard eyebrow={t('wealth_result_title')}>
        {projections.length === 0 ? (
          <p className="text-sm text-ink-faint">
            Pick a current age below 60 to see projections.
          </p>
        ) : (
          projections.map((p) => (
            <PassbookRow
              key={p.age}
              label={`${t('wealth_at_age')} ${p.age}`}
              value={formatINR(p.futureValue)}
              highlight
            />
          ))
        )}
      </PassbookCard>

      <p className="text-[11px] text-ink-faint leading-relaxed">
        {t('wealth_disclaimer')}
      </p>
    </div>
  )
}