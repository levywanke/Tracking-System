import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import enTranslation from "./locales/en.json"
import esTranslation from "./locales/es.json"
import frTranslation from "./locales/fr.json"

// Initialize i18next
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    es: {
      translation: esTranslation,
    },
    fr: {
      translation: frTranslation,
    },
  },
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already escapes values
  },
})

export default i18n

