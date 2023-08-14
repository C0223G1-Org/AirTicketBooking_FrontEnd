import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Header from './components/home/Header';
import "bootstrap/dist/css/bootstrap.css";
import Footer from './components/home/Footer';
import Home from './components/home/Home';
import GetTop10Cheapest from './components/home/Top10';
import HeaderCustomer from "./components/home/HeaderCustomer.";
import HeaderAdmin from "./components/home/HeaderAdmin";
import HeaderEmployee from "./components/home/HeaderEmployee";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Header />
        <BrowserRouter>
            <Routes>
                <Route path='/home' element={<Home/>}></Route>
                <Route path='/top10' element={<GetTop10Cheapest/>}></Route>
                <Route path='/header-customer' element={<HeaderCustomer />} />
                <Route path='/header-admin' element={<HeaderAdmin />} />
                <Route path='/header-admin/api/employee/0/2' element={<App />} />
                <Route path='/header-employee' element={<HeaderEmployee />} />
            </Routes>
        </BrowserRouter>
        <Footer />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
