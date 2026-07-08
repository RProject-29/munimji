import React, { createContext, useContext, useState, useEffect } from 'react'
import { getTranslations, GREETINGS } from '../i18n/translations.js'

export const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  
]

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('munimji_lang') || null
  })

  useEffect(() => {
    if (language) {
      localStorage.setItem('munimji_lang', language)
    }
  }, [language])

  const strings = getTranslations(language || 'en')
  const greeting = GREETINGS[language] || GREETINGS.en

  function t(key) {
    return strings[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, greeting }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}