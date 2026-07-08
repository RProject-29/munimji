import React from 'react'

const COLORS = ['#FF9933', '#FFC580', '#138808', '#FF9933', '#FFC580', '#138808', '#FF9933']

export default function BuntingGarland({ className = '', count = 9 }) {
  const flags = Array.from({ length: count })

  return (
    <svg
      viewBox="0 0 1000 90"
      className={className}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 10 Q500 70 1000 10"
        fill="none"
        stroke="#0B1F3A"
        strokeWidth="3"
        opacity="0.5"
      />
      {flags.map((_, i) => {
        const t = i / (count - 1)
        const x = t * 1000
        const y = 10 + Math.sin(t * Math.PI) * 60 * (1 - Math.abs(t - 0.5) * 0.3)
        const color = COLORS[i % COLORS.length]
        return (
          <path
            key={i}
            d={`M${x - 16} ${y} L${x + 16} ${y} L${x} ${y + 36} Z`}
            fill={color}
            className="bunting-flag"
            style={{ animationDelay: `${i * 0.12}s` }}
          />
        )
      })}
    </svg>
  )
}