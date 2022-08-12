import axios from 'axios';
import i18next from 'i18next';
export const apiRequestService = async (url, method, data , params = null) => {
    const currentLang = i18next?.language === 'en' ? 'en-US' : 'ar';
    return await axios.request({
        url, method, data, params : params, withCredentials: true, headers: {
            'Accept-Language': currentLang
        }
    });
};