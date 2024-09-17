import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from './Header/Header'
import Footer from './footer/Footer'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const LayOut = () => {
    return (
        <>
        <Header/>
        <ToastContainer/>
        <Outlet/>
        <Footer/>

        </>
    )
}

export default LayOut
