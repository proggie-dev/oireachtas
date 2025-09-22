import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en.json';
import translationGA from './locales/ga.json';

const resources = {
  en: {
    translation: translationEN,
  },
  ga: {
    translation: translationGA,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
