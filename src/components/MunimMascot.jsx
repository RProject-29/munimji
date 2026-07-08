import React from 'react'

export default function MunimMascot({ className = '', bob = true }) {
  return (
    <svg
      viewBox="0 0 220 260"
      className={`${className} ${bob ? 'munim-bob' : ''}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="110" cy="248" rx="52" ry="9" fill="#000000" opacity="0.15" />

      <rect x="84" y="190" width="18" height="44" rx="8" fill="#E8DCC8" />
      <rect x="118" y="190" width="18" height="44" rx="8" fill="#E8DCC8" />
      <rect x="80" y="228" width="26" height="12" rx="6" fill="#5C3A21" />
      <rect x="114" y="228" width="26" height="12" rx="6" fill="#5C3A21" />

      <path
        d="M60 110 C60 80 80 64 110 64 C140 64 160 80 160 110 L168 200 C168 210 160 216 150 216 L70 216 C60 216 52 210 52 200 Z"
        fill="#FFF8F0"
      />
      <path d="M110 70 L110 130" stroke="#FF9933" strokeWidth="4" strokeLinecap="round" />
      <circle cx="110" cy="86" r="3" fill="#FF9933" />
      <circle cx="110" cy="100" r="3" fill="#FF9933" />
      <circle cx="110" cy="114" r="3" fill="#FF9933" />

      <path
        d="M52 200 C52 210 60 216 70 216 L150 216 C160 216 168 210 168 200"
        fill="none"
        stroke="#138808"
        strokeWidth="5"
        strokeLinecap="round"
      />

      <path d="M60 110 C45 116 36 132 38 152 C39 160 48 162 52 154 C56 142 58 124 64 112 Z" fill="#FFF8F0" />
      <path d="M160 110 C175 116 184 132 182 152 C181 160 172 162 168 154 C164 142 162 124 156 112 Z" fill="#FFF8F0" />
      <path d="M38 152 C39 160 48 162 52 154" fill="none" stroke="#138808" strokeWidth="3" strokeLinecap="round" />
      <path d="M182 152 C181 160 172 162 168 154" fill="none" stroke="#138808" strokeWidth="3" strokeLinecap="round" />

      <circle cx="84" cy="168" r="11" fill="#E8DCC8" />
      <circle cx="136" cy="168" r="11" fill="#E8DCC8" />

      <g transform="translate(78, 152)">
        <rect x="0" y="0" width="64" height="46" rx="4" fill="#FFC580" stroke="#B35F00" strokeWidth="2" />
        <line x1="32" y1="2" x2="32" y2="44" stroke="#B35F00" strokeWidth="2" />
        <line x1="8" y1="12" x2="26" y2="12" stroke="#B35F00" strokeWidth="1.5" opacity="0.6" />
        <line x1="8" y1="20" x2="26" y2="20" stroke="#B35F00" strokeWidth="1.5" opacity="0.6" />
        <line x1="8" y1="28" x2="26" y2="28" stroke="#B35F00" strokeWidth="1.5" opacity="0.6" />
        <line x1="38" y1="12" x2="56" y2="12" stroke="#B35F00" strokeWidth="1.5" opacity="0.6" />
        <line x1="38" y1="20" x2="56" y2="20" stroke="#B35F00" strokeWidth="1.5" opacity="0.6" />
        <text x="32" y="40" textAnchor="middle" fontSize="14" fill="#B35F00" fontWeight="700">
          ₹
        </text>
      </g>

      <rect x="100" y="56" width="20" height="16" rx="6" fill="#F2C9A0" />
      <circle cx="110" cy="42" r="32" fill="#F2C9A0" />
      <circle cx="80" cy="44" r="6" fill="#F2C9A0" />
      <circle cx="140" cy="44" r="6" fill="#F2C9A0" />

      <path
        d="M76 32 C76 8 92 -4 110 -4 C128 -4 144 8 144 32 C144 26 136 22 128 24 C120 14 100 14 92 24 C84 22 76 26 76 32 Z"
        fill="#FF9933"
      />
      <path d="M76 32 C90 26 130 26 144 32" fill="none" stroke="#B35F00" strokeWidth="2.5" />
      <path d="M80 24 C94 18 126 18 140 24" fill="none" stroke="#B35F00" strokeWidth="2" opacity="0.7" />
      <circle cx="110" cy="18" r="5" fill="#138808" stroke="#0B5705" strokeWidth="1.5" />
      <path d="M142 30 C156 34 160 46 152 56 C148 50 144 42 140 34 Z" fill="#FF9933" stroke="#B35F00" strokeWidth="1.5" />

      <path
        d="M96 54 C100 58 106 58 110 56 C114 58 120 58 124 54 C122 60 114 62 110 60 C106 62 98 60 96 54 Z"
        fill="#3A352F"
      />

      <circle cx="99" cy="40" r="3" fill="#3A352F" />
      <circle cx="121" cy="40" r="3" fill="#3A352F" />
      <path d="M93 32 Q99 29 105 32" stroke="#3A352F" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M115 32 Q121 29 127 32" stroke="#3A352F" strokeWidth="2" fill="none" strokeLinecap="round" />

      <path d="M102 48 Q110 53 118 48" stroke="#3A352F" strokeWidth="2" fill="none" strokeLinecap="round" />

      <line x1="110" y1="22" x2="110" y2="28" stroke="#138808" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}