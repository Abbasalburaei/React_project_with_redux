import {useState } from "react";
import LanguageService from "../utils/languageService"
import LocalizationContext from '../utils/context/LocalizationContext';
const LocalizationContainer = (props) => {
    const _localizer = new LanguageService();
    const { dir, currentLanguage } = _localizer;
    const [localeProps, setLocaleProps] = useState({
        lang: currentLanguage,
        dir: 'core-lang-' + dir
    });

    return <LocalizationContext.Provider value={{localeProps,setLocaleProps}}>
        <div className={`w-full h-full ${localeProps?.dir}`}>
            {props.children}
        </div>
      </LocalizationContext.Provider>
};

export default LocalizationContainer;