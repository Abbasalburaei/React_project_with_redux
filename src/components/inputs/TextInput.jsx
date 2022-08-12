import { useEffect ,useState } from "react";
export const TextInput = ({
    title = '',
    placeholder = '',
    type = 'text',
    id,
    error = null,
    onChangeValue,
    initialValue = '',
    disabled = false,
    readOnly = false,
    length = 10,
    className = ''
}) => {
    const [value, setValue] = useState(initialValue);


    useEffect(()=>{
        setValue(initialValue);
    },[initialValue]);

    const handleInputValue = ({ value }) => {
      if (onChangeValue) {
          onChangeValue(value);
          setValue(value);
      }
    };

    return <div className="cinput">
        <div className="flex flex-row justify-between">
            <label className="cinput-label ctext-font-2" htmlFor={id}>{title}</label>
        </div>
        <input
            maxLength={length}
            disabled={disabled}
            readOnly={readOnly}
            value={value}
            id={id}
            onInput={(event) => { handleInputValue(event.target) }}
            placeholder={placeholder}
            type={type}
            className={`${className} cinput-field ${(readOnly || disabled) ? 'ctext-bg-optional' : ''}`}/>
            <span className="cinput-error">{error}</span>
    </div>
}