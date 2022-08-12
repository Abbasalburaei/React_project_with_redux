import Popup from './Popup';
export const ContentLoader = ({isLoading = false ,element})=>{
    return <>
    {element}
    <Popup show={isLoading}>
         <div className="w-full h-full flex justify-center items-center">
            <img src="/assets/icons/loader.svg" alt='loading' className="animate-spin object-contain"/>
        </div>
    </Popup>
    </>
}
