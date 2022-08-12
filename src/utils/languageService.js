import { apiRequestService } from "./apiService";
import i18next from "i18next";
export default class LanguageService {
    get currentPath() {
        return window.location.pathname;
    }

    get currentLanguage() {
        return i18next?.language;
    }

    get isRtl() {
        return this.currentLanguage === 'ar' ? true : false;
    }

    get dir() {
        return  i18next.dir();
    }

    langaugeRequest(culture) {
        i18next.changeLanguage(culture);
    }
}