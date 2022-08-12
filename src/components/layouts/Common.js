import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
export const SectionHeading = (
    {   title = '',
        subTitle = '',
        subTitlePre = '',
        decorationClassNames = ''
    }
) => {
    const { i18n } = useTranslation();
    const decoration = decorationClassNames && (`core-border-${i18n.dir()}`);
    return <>
        <h2 className={`ctext-font-2 ${decoration} ${decorationClassNames} px-2`}>{title}</h2>
        {subTitle && <p className="my-3">{subTitlePre && <strong className='font-bold mx-1'>{subTitlePre}</strong>}{subTitle}</p>}
        </>
};

export const Ruller = ({ width = 100, className = 'ctext-bg-gray'}) => {
    return <div className={`core-line-slim ${className}`} style={{width:`${width}%`}}></div>;
}

export const Progress = ({ value = null , splashMilliseconds = 5000 }) => {
    const [statusText, setStatusText] = useState(null);
    const [display, setDisplay] = useState(false);
    const [color, setColor] = useState('ctext-danger');
    const { t: trans } = useTranslation("common");

    useEffect(() => {

        if (value >= 0 && value <= 49) {
            setStatusText("common:resting");
            setDisplay(true);
        } else if (value > 49 && value <= 90) {
            setStatusText("common:approximate");
            setColor('ctext-warning');
        } else if (value > 90 && value <= 99) {
            setColor('ctext-primary');
        } else if (value == 100) {
            setStatusText("common:completed");
            setColor('ctext-success');
            setTimeout(() => {
                setDisplay(false);
            }, [splashMilliseconds])
        } else {
            setDisplay(false);
        }

    }, [value]);

    return <div className='flex flex-row select-none'>
        {display && <><code className={`font-bold ${color} mx-2`}>{value}%</code>{trans(statusText)}</>}
    </div>
};