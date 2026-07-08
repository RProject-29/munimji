import React, { useState, useMemo } from 'react'
import PassbookCard, { PassbookRow } from '../../components/PassbookCard.jsx'
import SliderInput from '../../components/SliderInput.jsx'
import { calculateFuturePurchasingPower, formatINR } from '../../utils/financeMath.js'
import { useLanguage } from '../../context/LanguageContext.jsx'

export default function InflationCalculator() {
  const { t } = useLanguage()
  const [currentValue, setCurrentValue] = useState(100000)
  const [inflationRate, setInflationRate] = useState(6)
  const [years, setYears] = useState(10)

  const result = useMemo(
    () => calculateFuturePurchasingPower(currentValue, inflationRate, years),
    [currentValue, inflationRate, years]
  )

  return (
    <div className="space-y-5 md:max-w-2xl">
      <h1 className="font-display text-xl md:text-2xl font-semibold text-navy">
        {t('inflation_title')}
      </h1>

      <div className="space-y-4 md:grid md:grid-cols-3 md:gap-4 md:space-y-0">
        <SliderInput
          label={t('inflation_current_value')}
          value={currentValue}
          onChange={setCurrentValue}
          min={1000}
          max={10000000}
          step={1000}
          prefix="₹"
        />
        <SliderInput
          label={t('inflation_rate')}
          value={inflationRate}
          onChange={setInflationRate}
          min={1}
          max={15}
          step={0.5}
          suffix="%"
        />
        <SliderInput
          label={t('inflation_duration')}
          value={years}
          onChange={setYears}
          min={1}
          max={40}
          step={1}
          suffix={` ${t('sip_years')}`}
        />
      </div>

      <PassbookCard eyebrow={t('inflation_result_title')}>
        <PassbookRow label={t('inflation_future_cost_label')} value={formatINR(result.futureCostOfSameGoods)} highlight />
        <PassbookRow label={t('inflation_erosion_label')} value={formatINR(result.purchasingPowerErosion)} />
      </PassbookCard>

      <p className="text-[11px] text-ink-faint leading-relaxed">
        {t('inflation_disclaimer')}
      </p>
    </div>
  )
}