import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import en from "./locales/en/translation.json";
import fr from "./locales/fr/translation.json";
import es from "./locales/es/translation.json";

// Configure i18n
i18n
  .use(LanguageDetector) // Detects language from browser/cookies/localStorage
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      es: { translation: es },
    },
    fallbackLng: "en", // Default if language can't be detected
    detection: {
      order: ["localStorage", "navigator", "htmlTag", "path", "subdomain"],
      caches: ["localStorage"], // Saves language preference
    },
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
