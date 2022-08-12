import { useTranslation } from 'react-i18next';
import Select from 'react-select';
export const Dropdown = ({
    label = '',
    isMulti = false,
    cache = true,
    options = [],
    onChange,
    onInputChange,
    searchable = true,
    defaultValue = null,
    props,
    error
}) => {
    const { t: trans } = useTranslation("common");
    return (<div className='flex flex-col mb-2'>
        <label className='ctext-black ctext-font-2 mb-2 select-none;'>{label}</label>
        <Select
            {...props}
            defaultValue={defaultValue}
            isSearchable={searchable}
            cache={cache}
            isMulti={isMulti}
            onInputChange = {(value)=>{
             if(onInputChange){
                onInputChange(value);
             }
            }}
            options={options}
            noOptionsMessage={({ inputValue }) => trans("common:no_options")}
            placeholder={trans("common:search_here")}
            onChange={(value) => {
                if (onChange) {
                    onChange(value)
                }
            }
          }
        />
        <span className="cinput-error">{error}</span>
    </div>)
}