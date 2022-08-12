import { useState } from "react"
export const TextArea = ({
    title = '',
    placeholder = '',
    id,
    rows = 5,
    cols = 5,
    error = null,
    onChangeValue,
    initialValue = '',
    disabled = false,
    readOnly = false,
    length = 10
}) => {
    const [value, setValue] = useState(initialValue);

    const handleInputValue = ({ value }) => {
        if (onChangeValue) {
            onChangeValue(value);
            setValue(value);
        }
    };

    return <div className="cinput">
            <label className="cinput-label" htmlFor={id}>{title}</label>
        <textarea
            maxLength={length}
            rows={rows}
            cols={cols}
            disabled={disabled}
            readOnly={readOnly}
            value={value}
            id={id}
            onInput={(event) => { handleInputValue(event.target) }}
            placeholder={placeholder}
            className="cinput-field" ></textarea>
           <span className="cinput-error">{error}</span>
    </div>
}