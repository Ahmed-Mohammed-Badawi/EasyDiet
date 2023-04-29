import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                aside: require('./locales/en/aside.json'),
                home: require('./locales/en/pages/home.json'),
                packageCard: require('./locales/en/packageCard.json')
            },
            ar: {
                aside: require('./locales/ar/aside.json'),
                home: require('./locales/ar/pages/home.json'),
                packageCard: require('./locales/ar/packageCard.json')

            },
        },
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
