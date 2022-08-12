import { useId, useState } from "react"
export const SwitchCheckBox = ({
    title = '',
    initialValue = false,
    error = null,
    onChangeValue
}) => {
    const controlId = useId();
    const [isChecked, setIsChecked] = useState(initialValue);
    return <div className="cinput">
        <label className="cinput-label" htmlFor={controlId}>{title}</label>
        <input
            className='toggle'
            checked={isChecked}
            id={controlId}
            onChange={() => {
                if (onChangeValue) {
                    const _newState = !isChecked;
                    setIsChecked(_newState);
                    onChangeValue(_newState)
                }
            }}
            type={'checkbox'}
            />
        {error && <span className="cinput-error">{error}</span>}
    </div>
};