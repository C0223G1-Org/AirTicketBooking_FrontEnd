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
import UpdateTicket from './components/ticket/updateTicket';
import PrintTicket from './components/ticket/printTicket';
import TicketBooked from './components/TicketBooked';
import TicketUnBook from './components/TicketUnBook';
import CustomerManagement from './component/CustomerManagement';
import EmployeeCreateCustomer from './component/EmployeeCreateCustomer';
import EmployeeUpdateCustomer from './component/EmployeeUpdateCustomer';
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
                <Route path='/header-employee' element={<HeaderEmployee />} />
                <Route path='/printTicket' element={<PrintTicket></PrintTicket>}></Route>
                <Route path='/tickets/updateTicket/:id' element={<UpdateTicket />}></Route>
                <Route path="/ticket/booked" element={<TicketBooked/>}/>
                <Route path="/ticket/unbooked" element={<TicketUnBook/>}/>
                <Route path='/customers' element={<CustomerManagement />} />
                <Route path='/customers/add' element={<EmployeeCreateCustomer />} />
                <Route path='/customers/edit/:id' element={<EmployeeUpdateCustomer />} />
            </Routes>
        </BrowserRouter>
        <Footer />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
