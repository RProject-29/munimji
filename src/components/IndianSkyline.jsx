import React from 'react'

export default function IndianSkyline({ className = '' }) {
  return (
    <svg
      viewBox="0 0 1200 260"
      className={className}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="currentColor">
        <rect x="0" y="170" width="90" height="90" />
        <rect x="20" y="150" width="50" height="22" />
        <rect x="90" y="190" width="70" height="70" />

        <g>
          <rect x="150" y="160" width="10" height="60" />
          <rect x="200" y="160" width="10" height="60" />
          <path d="M145 160 Q180 130 215 160 Z" />
          <circle cx="180" cy="124" r="6" />
        </g>

        <rect x="160" y="200" width="130" height="60" />

        <g>
          <rect x="330" y="150" width="180" height="110" />
          <path d="M330 150 Q420 30 510 150 Z" />
          <circle cx="420" cy="38" r="7" />
          <rect x="300" y="120" width="16" height="140" />
          <path d="M300 120 Q308 100 316 120 Z" />
          <rect x="524" y="120" width="16" height="140" />
          <path d="M524 120 Q532 100 540 120 Z" />
        </g>

        <g>
          <rect x="560" y="190" width="220" height="70" />
          <path d="M570 190 Q580 165 590 190 Z" />
          <path d="M605 190 Q615 165 625 190 Z" />
          <path d="M640 190 Q650 165 660 190 Z" />
          <path d="M675 190 Q685 165 695 190 Z" />
          <path d="M710 190 Q720 165 730 190 Z" />
          <path d="M745 190 Q755 165 765 190 Z" />
          <path d="M555 190 Q570 160 585 190 Z" opacity="0.9" />
          <path d="M755 190 Q770 160 785 190 Z" opacity="0.9" />
        </g>

        <g>
          <path d="M820 260 L820 140 Q860 90 900 140 L900 260 L880 260 L880 165 Q860 130 840 165 L840 260 Z" />
          <rect x="790" y="230" width="30" height="30" />
          <rect x="900" y="230" width="30" height="30" />
        </g>

        <g>
          <rect x="950" y="210" width="40" height="50" />
          <rect x="990" y="190" width="40" height="70" />
          <rect x="1030" y="210" width="40" height="50" />
          <rect x="1000" y="170" width="10" height="20" />
          <rect x="1070" y="195" width="50" height="65" />
          <circle cx="1095" cy="178" r="14" />
          <rect x="1120" y="215" width="80" height="45" />
        </g>
      </g>
    </svg>
  )
}