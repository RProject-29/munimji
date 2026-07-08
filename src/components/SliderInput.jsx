import React from 'react'

/**
 * Shared number input — a manual entry box plus a slider, kept in sync.
 * Used across every calculator (SIP, FD, RD, Goal Planner, Inflation,
 * Wealth Simulator) so input behavior stays consistent everywhere.
 */
export default function SliderInput({ label, value, onChange, min, max, step, prefix = '', suffix = '' }) {
  function handleBoxChange(e) {
    const raw = e.target.value.replace(/[^0-9.]/g, '')
    if (raw === '') {
      onChange(0)
      return
    }
    const num = Number(raw)
    if (!isNaN(num)) {
      onChange(Math.min(max, Math.max(min, num)))
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-sm text-ink-light">{label}</label>
      </div>

      <div className="flex items-center bg-white border border-saffron-100 rounded-lg px-3 py-2 mb-2 focus-within:border-saffron">
        {prefix && <span className="text-sm font-semibold text-ink-faint mr-1">{prefix}</span>}
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleBoxChange}
          className="flex-1 text-sm font-semibold text-navy bg-transparent outline-none w-full"
        />
        {suffix && <span className="text-sm text-ink-faint ml-1 whitespace-nowrap">{suffix}</span>}
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{ accentColor: '#FF9933' }}
      />
    </div>
  )
}