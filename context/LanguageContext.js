import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const languages = {
  de: { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  bs: { code: 'bs', name: 'Bosanski', flag: '🇧🇦' },
  en: { code: 'en', name: 'English', flag: '🇬🇧' },
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('de') // German as default

  useEffect(() => {
    // Load saved language preference
    const saved = localStorage.getItem('revolux-lang')
    if (saved && languages[saved]) {
      setLanguage(saved)
    }
  }, [])

  const changeLanguage = (lang) => {
    setLanguage(lang)
    localStorage.setItem('revolux-lang', lang)
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, languages }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    // Return default values if context is not available (SSR)
    return { 
      language: 'de', 
      changeLanguage: () => {}, 
      languages 
    }
  }
  return context
}
