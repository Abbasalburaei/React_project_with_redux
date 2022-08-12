export const FormButton = ({ title = '', isLoading = false, className = 'ctext-bg-primary ctext-white',onClick}) => {
    return <button
        disabled={isLoading}
        className={`cbtn cbtn-img ${className}`}
        onClick={() => {
            if (onClick) {
                onClick();
            }
        }}> 
            <>
            {title}
            {(isLoading && <img src="/assets/icons/loader.svg" className="animate-spin" alt="loader" />)}
            </>
        
    </button>
}