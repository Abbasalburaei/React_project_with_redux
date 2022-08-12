import { useTranslation } from "react-i18next";
export const CellButton = props =>{
     return <button
    title={props.hint}
    className={`flex justify-center items-center ${props.className}`}
    onClick={() => {
        if (props.onClick) {
            props.onClick(props.value);
        }
    }}> 
    <img src={props.iconPath} alt={props.hint}/>
</button>
}
export const GroupCellButtons = props =>{
    const {done} = props.value; 
    return <div className="btn-group">
 { !done &&      
<button
   title={props.editHint}
   className={`flex justify-center items-center ${props.editClassName}`}
   onClick={() => {
       if (props.onEdit) {
           props.onEdit(props.value);
       }
   }}> 
   <img src={props.editIconPath} alt={props.editHint}/>
</button>
}{ done &&
<button
   title={props.printHint}
   className={`flex justify-center items-center ${props.printClassName}`}
   onClick={() => {
       if (props.onPrint) {
           props.onPrint(props.value);
       }
   }}> 
   <img src={props.printIconPath} alt={props.printHint}/>
</button>
}
    </div>
}
export const  CellStatus = props=>{
    const {t:trans} = useTranslation("common");
    const statusText = props?.done ? "common:drawn" : 'common:not_drawn';
    const statusColor = props?.done ? 'ctext-primary' : 'ctext-danger';
    return <span className={ 'font-bold' + ' ' + statusColor}>{trans(statusText)}</span>
} 