import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {Outlet } from "react-router-dom";
import DashboardContext from "../../utils/context/DashboardContent";
import UserSideBar from "../UserSideBar";
const UserLayout = (props) => {

    const [openSidebar, setOpenSidebar] = useState(true);
    const { i18n } = useTranslation();
    const lang = i18n?.language || 'ar';
    const contentBoxMemo = useMemo(() => {
        let style = {
            left: undefined,
            right:undefined
        };
        if (lang === 'ar') {
            style.right = (openSidebar) ? '1.6rem' : '20rem';
        } else {
            style.left = (openSidebar) ? '1.6rem' : '20rem';
        }
        return style;
    }, [openSidebar,lang]);
    return <DashboardContext.Provider value={{update: setOpenSidebar }}>
        <main className='clayout-user'>
            <UserSideBar />
            <div className='clayout-user-content mb-5' style={contentBoxMemo}>
                {!openSidebar && <div className='clayout-user-cover'></div>}
                <div className='clayout-user-content-body'>
                    <Outlet/>
                </div>
            </div>
        </main>
    </DashboardContext.Provider>
};

export default UserLayout;