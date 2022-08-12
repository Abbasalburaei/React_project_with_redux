import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';
import HttpApi from "i18next-http-backend";


i18n
    // load translation using http -> see /public/locales
    // learn more: https://github.com/i18next/i18next-http-backend
    .use(Backend)
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    .use(HttpApi)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        whitelist: ['ar', 'en'],
        nonExplicitWhitelist: false,
        supportedLngs: ['ar', 'en'],
        nonExplicitSupportedLngs : true,
        fallbackLng: 'ar',
        lng: 'ar',
        ns:["errors","inputs","common"],
        detection: {
            order: ['path', 'cookie', 'htmlTag', 'localStorage', 'subdomain'],
            caches: ['localStorage']
        },
        debug: false,
        interpolation: {
            escapeValue: false, 
        },
         react: {
             useSuspense: false
         }
    });

export default i18n;