import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from '../i18n/locales/en/translation.json';
import translationUA from '../i18n/locales/uk/translation.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  debug: false,
  resources: {
    en: {
      translation: translationEN,
    },
    uk: {
      translation: translationUA,
    },
  },
});

export default i18n;
