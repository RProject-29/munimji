import React from 'react'

/**
 * The signature MunimJi component — styled like a page from a bank
 * passbook / ledger (khata). Used for goals, calculator results,
 * dictionary terms, and dashboard entries to give the whole app one
 * consistent visual identity.
 */
export default function PassbookCard({ eyebrow, title, children, className = '' }) {
  return (
    <div className={`passbook-card px-5 py-4 ${className}`}>
      <div className="pl-2">
        {eyebrow && (
          <p className="text-[11px] uppercase tracking-wide text-saffron-600 font-semibold mb-1">
            {eyebrow}
          </p>
        )}
        {title && (
          <h3 className="font-display font-semibold text-navy text-base mb-2">
            {title}
          </h3>
        )}
        {children}
      </div>
    </div>
  )
}

export function PassbookRow({ label, value, highlight = false }) {
  return (
    <div className="passbook-row flex items-center justify-between py-2">
      <span className="text-sm text-ink-light">{label}</span>
      <span
        className={`text-sm font-semibold ${
          highlight ? 'text-leaf' : 'text-navy'
        }`}
      >
        {value}
      </span>
    </div>
  )
}
