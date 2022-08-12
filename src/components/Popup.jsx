export default function Popup({ show = false, ...props }) {
    return (
        show ? <div className='popup' >
            {
                props.children
            }
        </div> : null
    );
}
export const POPUP_TYPE = {
    QUESTION: 'question',
    INFORMATION: 'info',
    ERROR: 'error'
};
