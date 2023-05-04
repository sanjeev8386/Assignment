import React, { Fragment } from 'react';
import Loader from "./loader";
import Taptop from "./tap-top";
import Header from './header'
import Sidebar from './sidebar'
import Footer from './footer'

import { ToastContainer } from 'react-toastify'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
    return (
        <Fragment>
            <Loader />
            <Taptop />
            <div className="page-wrapper compact-wrapper" id="pageWrapper">
                <Header />
                <div className="page-body-wrapper">
                    <Sidebar />
                    <div className="page-body">
                        <Outlet />
                    </div>
                    <Footer />
                </div>

            </div>
            <ToastContainer />
        </Fragment>
    );
}
export default DashboardLayout;