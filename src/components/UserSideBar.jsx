import { useContext, useReducer } from "react";
import { useTranslation } from "react-i18next";
import DashboardContext from "../utils/context/DashboardContent";
import { NavList } from "./NavList";
const UserSideBar = () => {

    const {update } = useContext(DashboardContext);

    const [hide, toggle] = useReducer(state => {
        const newState = !state;
        update(newState);
        return newState;
    }, true);

    const { i18n, t: trans } = useTranslation();
    const isRtl = i18n.language === 'ar' ? true : false;
    const menuBtnDir = (isRtl ? { left: '-1.5rem' } : { right: '-1.5rem' });

    return (
        <aside className={`clayout-user-sidebar clayout-unActive ${hide && `clayout-unActive-${isRtl ? 'right' : 'left'}`}`}>
            <div className='p-3'>
                <header className='clayout-user-sidebar-header'>
                    <img src='/assets/icons/grid-dots.svg' alt='grid dots' className='object-contain select-none' />
                    <h2 className='ctext-white ctext-font-4 select-none font-bold'>{trans("common:dashboards")}</h2>
                </header>
                <div className='core-line-slim ctext-bg-white w-full'></div>
                <div
                    style={menuBtnDir}
                    className='menu-btn'
                    onClick={toggle}
                >
                    <img src={`/assets/icons/${hide ? 'menu' : 'delete'}.svg`} alt='menu' />
                </div>
            </div>
            <NavList/>
        </aside>
    )
};
export default UserSideBar;