import React from 'react';
import { Route, Routes } from 'react-router-dom';
import "./style/index.scss";
import { ToastContainer } from 'react-toastify';
import LocalizationContainer from './components/LocalizationContainer';
import { Provider } from 'react-redux';
import store from './app/store';
import 'react-toastify/dist/ReactToastify.css';
import LanguageService from './utils/languageService';
import UserLayout from './components/layouts/UserLayout';
import Home from './features/home/Home';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import SendTransform from './features/transforms/SendTransform';
import ReceiveTransform from './features/transforms/ReceiveTransform';
import ReportUser from './features/report/ReportDaily';
import ReportDaily from './features/report/ReportUser';

const App = () => {
    const { dir } = new LanguageService();
    return (
        <Provider store={store}>
            <LocalizationContainer>
                <Routes>
                    <Route path='/' element={<UserLayout />}>
                        <Route index={true} element={<Home />} />
                        <Route path='transform/send' element={<SendTransform />} />
                        <Route path='transform/receive' element={<ReceiveTransform/>} />
                        <Route path='report/user' element={<ReportUser/>} />
                        <Route path='report/daily' element={<ReportDaily/>} />
                    </Route>
               </Routes>
                    <ToastContainer
                        position={`top-center`}
                        autoClose={5000}
                        hideProgressBar={true}
                        newestOnTop={false}
                        closeOnClick
                        rtl={dir}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
            </LocalizationContainer>
           </Provider>
    );

}

export default App;


