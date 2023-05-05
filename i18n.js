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
                packageCard: require('./locales/en/packageCard.json'),
                license: require('./locales/en/pages/license.json'),
                // AUTHENTICATION
                login: require('./locales/en/pages/login.json'),
                register: require('./locales/en/pages/register.json'),
                newPassword: require('./locales/en/pages/newPassword.json'),
                resetPassword: require('./locales/en/pages/resetPassword.json'),
                verifyEmail: require('./locales/en/pages/verifyEmail.json'),
                // USER
                paymentMethod: require('./locales/en/pages/user/paymentMethod.json'),
                chooseDayMeals: require('./locales/en/pages/user/chooseDayMeals.json'),
                chooseStartingDate: require('./locales/en/pages/user/chooseStartingDay.json'),
                menu: require('./locales/en/pages/user/menu.json'),
                myStatus: require('./locales/en/pages/user/myStatus.json'),
            },
            ar: {
                aside: require('./locales/ar/aside.json'),
                home: require('./locales/ar/pages/home.json'),
                packageCard: require('./locales/ar/packageCard.json'),
                license: require('./locales/ar/pages/license.json'),
                // AUTHENTICATION
                login: require('./locales/ar/pages/login.json'),
                register: require('./locales/ar/pages/register.json'),
                newPassword: require('./locales/ar/pages/newPassword.json'),
                resetPassword: require('./locales/ar/pages/resetPassword.json'),
                verifyEmail: require('./locales/ar/pages/verifyEmail.json'),
                // USER
                paymentMethod: require('./locales/ar/pages/user/paymentMethod.json'),
                chooseDayMeals: require('./locales/ar/pages/user/chooseDayMeals.json'),
                chooseStartingDate: require('./locales/ar/pages/user/chooseStartingDay.json'),
                menu: require('./locales/ar/pages/user/menu.json'),
                myStatus: require('./locales/ar/pages/user/myStatus.json'),
            },
        },
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
