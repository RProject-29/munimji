import React from 'react'

export default function Diya({ className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 40 50"
      className={`diya-flicker ${className}`}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="20" cy="38" rx="16" ry="6" fill="#B35F00" />
      <path d="M4 36 Q20 48 36 36 Q36 28 20 28 Q4 28 4 36 Z" fill="#FF9933" />
      <ellipse cx="20" cy="29" rx="9" ry="3" fill="#FFE2BF" />
      <path d="M20 26 C16 20 18 12 20 8 C22 12 24 20 20 26 Z" fill="#FFC580" />
      <path d="M20 22 C18 18 19 13 20 11 C21 13 22 18 20 22 Z" fill="#FFF8F0" />
    </svg>
  )
}