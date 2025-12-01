import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import hi from './locales/hi.json'

const getSavedLocale = () => {
  if (typeof window === 'undefined') return 'en'
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'hi') return 'hi'
    if (saved === 'en') return 'en'
    return 'en' // Default to English
  } catch {
    return 'en'
  }
}

const i18n = createI18n({
  legacy: false,
  locale: getSavedLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    hi
  }
})

export default i18n
