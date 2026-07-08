import React, { useState, useMemo } from 'react'
import PassbookCard, { PassbookRow } from '../../components/PassbookCard.jsx'
import SliderInput from '../../components/SliderInput.jsx'
import { calculateFD, formatINR } from '../../utils/financeMath.js'
import { useLanguage } from '../../context/LanguageContext.jsx'

export default function FdCalculator() {
  const { t } = useLanguage()
  const [principal, setPrincipal] = useState(50000)
  const [rate, setRate] = useState(7)
  const [years, setYears] = useState(1)

  const result = useMemo(() => calculateFD(principal, rate, years), [principal, rate, years])

  return (
    <div className="space-y-5 md:max-w-2xl">
      <h1 className="font-display text-xl md:text-2xl font-semibold text-navy">
        {t('fd_title')}
      </h1>

      <div className="space-y-4 md:grid md:grid-cols-3 md:gap-4 md:space-y-0">
        <SliderInput
          label={t('fd_principal')}
          value={principal}
          onChange={setPrincipal}
          min={1000}
          max={1000000}
          step={1000}
          prefix="₹"
        />
        <SliderInput
          label={t('fd_rate')}
          value={rate}
          onChange={setRate}
          min={3}
          max={10}
          step={0.1}
          suffix="%"
        />
        <SliderInput
          label={t('fd_duration')}
          value={years}
          onChange={setYears}
          min={1}
          max={10}
          step={1}
          suffix={` ${t('sip_years')}`}
        />
      </div>

      <PassbookCard eyebrow={t('fd_result_title')} title={t('fd_maturity_label')}>
        <PassbookRow label={t('fd_principal_label')} value={formatINR(principal)} />
        <PassbookRow label={t('fd_interest_label')} value={formatINR(result.interestEarned)} highlight />
        <PassbookRow label={t('fd_maturity_label')} value={formatINR(result.maturityAmount)} highlight />
      </PassbookCard>

      <p className="text-[11px] text-ink-faint leading-relaxed">
        {t('fd_disclaimer')}
      </p>
    </div>
  )
}