import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { applyRTLDirection } from './utils/rtl';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "sv",
    fallbackLng: "en",
    supportedLngs: ["sv", "en", "fa"], // Add Persian/Farsi support

    interpolation: {
      escapeValue: false, 
    },
    
    // Language detection configuration
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
      excludeCacheFor: ['cimode'], // never cache if we are in cimode
    }
  });

// Apply RTL direction on language change
i18n.on('languageChanged', (lng) => {
  applyRTLDirection(lng);
});

// Apply initial direction
applyRTLDirection(i18n.language);

export default i18n;
