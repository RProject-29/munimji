import React, { useState, useMemo } from 'react'
import PassbookCard, { PassbookRow } from '../../components/PassbookCard.jsx'
import SliderInput from '../../components/SliderInput.jsx'
import { calculateRD, formatINR } from '../../utils/financeMath.js'
import { useLanguage } from '../../context/LanguageContext.jsx'

export default function RdCalculator() {
  const { t } = useLanguage()
  const [monthlyDeposit, setMonthlyDeposit] = useState(2000)
  const [rate, setRate] = useState(7)
  const [years, setYears] = useState(2)

  const result = useMemo(() => calculateRD(monthlyDeposit, rate, years), [monthlyDeposit, rate, years])

  return (
    <div className="space-y-5 md:max-w-2xl">
      <h1 className="font-display text-xl md:text-2xl font-semibold text-navy">
        {t('rd_title')}
      </h1>

      <div className="space-y-4 md:grid md:grid-cols-3 md:gap-4 md:space-y-0">
        <SliderInput
          label={t('rd_monthly')}
          value={monthlyDeposit}
          onChange={setMonthlyDeposit}
          min={500}
          max={50000}
          step={500}
          prefix="₹"
        />
        <SliderInput
          label={t('rd_rate')}
          value={rate}
          onChange={setRate}
          min={3}
          max={10}
          step={0.1}
          suffix="%"
        />
        <SliderInput
          label={t('rd_duration')}
          value={years}
          onChange={setYears}
          min={1}
          max={10}
          step={1}
          suffix={` ${t('sip_years')}`}
        />
      </div>

      <PassbookCard eyebrow={t('rd_result_title')} title={t('rd_maturity_label')}>
        <PassbookRow label={t('rd_invested_label')} value={formatINR(result.investedAmount)} />
        <PassbookRow label={t('rd_interest_label')} value={formatINR(result.interestEarned)} highlight />
        <PassbookRow label={t('rd_maturity_label')} value={formatINR(result.maturityValue)} highlight />
      </PassbookCard>

      <p className="text-[11px] text-ink-faint leading-relaxed">
        {t('rd_disclaimer')}
      </p>
    </div>
  )
}