import React from 'react'
import { Link } from 'react-router-dom'
const munimImg = '/munim-mascot.png'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function NotFound() 






// const { t } = useLanguage()

//   return (
//     <div className="flex flex-col items-center justify-center text-center py-16 px-6">
//       <img src={munimImg} alt="Munim" className="w-28 h-32 object-contain object-top mb-6" />
//       <h1 className="font-display text-4xl font-bold text-navy mb-2">404</h1>
//       <p className="font-display text-lg font-semibold text-navy mb-1">
//         {t('not_found_title')}
//       </p>
//       <p className="text-ink-light text-sm mb-8 max-w-xs leading-relaxed">
//         {t('not_found_desc')}
//       </p>
//       <Link to="/" className="bg-saffron text-white font-semibold text-sm rounded-xl px-6 py-3">
//         {t('not_found_btn')}
//       </Link>
//     </div>
//   )








{
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">

      <img src={munimImg} alt="Munim" className="w-28 h-32 object-contain object-top mb-6" />

      <h1 className="font-display text-4xl font-bold text-navy mb-2">404</h1>
      <p className="font-display text-lg font-semibold text-navy mb-1">
        Page not found
      </p>
      <p className="text-ink-light text-sm mb-8 max-w-xs leading-relaxed">
        Even your Munim couldn't find this page. Let's go somewhere useful.
      </p>
      <Link
        to="/"
        className="bg-saffron text-white font-semibold text-sm rounded-xl px-6 py-3"
      >
        Go to Home
      </Link>
    </div>
  )
}