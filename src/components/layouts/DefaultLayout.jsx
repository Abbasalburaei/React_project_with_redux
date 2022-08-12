import { Outlet } from 'react-router-dom';
import { CopyRights } from '../CopyRights';
const DefaultLayout = (props) => {
    return <main className="clayout-default">
        {/*  {props.children}*/}
        <Outlet/>
        <CopyRights />
    </main>
};

export default DefaultLayout;