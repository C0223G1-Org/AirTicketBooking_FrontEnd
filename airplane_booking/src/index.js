import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Header from "./components/home/Header";
import "bootstrap/dist/css/bootstrap.css";
import Footer from "./components/home/Footer";
import Home from "./components/home/Home";
import GetTop10Cheapest from "./components/home/Top10";
import HeaderCustomer from "./components/home/HeaderCustomer.";
import HeaderAdmin from "./components/home/HeaderAdmin";
import HeaderEmployee from "./components/home/HeaderEmployee";
import UpdateTicket from "./components/ticket/updateTicket";
import PrintTicket from "./components/ticket/printTicket";
import TicketBooked from "./components/TicketBooked";
import TicketUnBook from "./components/TicketUnBook";
import CustomerManagement from "./component/CustomerManagement";
import EmployeeCreateCustomer from "./component/EmployeeCreateCustomer";
import EmployeeUpdateCustomer from "./component/EmployeeUpdateCustomer";
import ListRouter from "./component_SAngTDN/ListRoute";
import CustomerUpdate from "./component/CustomerUpdate";
import CustomerDetails from "./component/CustomerDetails";
import DetailTicket from "./component/ticket/DetailTicket";
import InfoPassenger from "./component/ticket/InfoPassenger";
import EmployeeList from "./component/Employee/EmployeeList";
import CreateEmployee from "./component/Employee/CreateEmployee";
import ListPost from "./component/post/ListPost";
import SearchTicketPage from "./components/searchTickets_KietNT/SearchTicketPage";
import SearchResultPage from "./components/searchTickets_KietNT/SearchResultPage";
import { TicketProvider } from "./components/searchTickets_KietNT/TicketContext";
import AdminPage from "./components/chat_messenger/AdminChat";
import {Login} from "./component/account/Login";
import CreateReport from "./component/report/CreateReport";
import PaymentComponent from './component/PaymentComponent';
import ChangePassword from './component_SAngTDN/ChangePassword';
import {SignUp} from "./component/account/SignUp";
import {CheckCode} from "./component/account/CheckCode";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TicketProvider>
        <Header />
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/top10" element={<GetTop10Cheapest />}></Route>
          <Route path="/header-customer" element={<HeaderCustomer />} />
          <Route path="/header-admin" element={<HeaderAdmin />} />
          <Route path="/header-employee" element={<HeaderEmployee />} />
          <Route
            path="/printTicket"
            element={<PrintTicket></PrintTicket>}
          ></Route>
          <Route
            path="/tickets/updateTicket/:id"
            element={<UpdateTicket />}
          ></Route>
          <Route path="/ticket/booked" element={<TicketBooked />} />
          <Route path="/ticket/unbooked" element={<TicketUnBook />} />
          <Route path="/customers" element={<CustomerManagement />} />
          <Route path="/customers/add" element={<EmployeeCreateCustomer />} />
          <Route
            path="/customers/edit/:id"
            element={<EmployeeUpdateCustomer />}
          />
          <Route path="/customers/update/:id" element={<CustomerUpdate />} />
          <Route path="/customers/details/:id" element={<CustomerDetails />} />
          <Route path="/list/:data" element={<ListRouter />} />
          <Route path="/detail-ticket/:data" element={<DetailTicket />} />
          <Route path="/info-passenger/:data" element={<InfoPassenger />} />
          {/*<Route path="/employee" element={<EmployeeList/>} />*/}
          {/*<Route path='/employee/create' element={<CreateEmployee />} />*/}
          <Route path="/listPost" element={<ListPost />} />
          <Route path="/tickets/search-ticket" element={<SearchTicketPage />} />
          <Route
            path="/tickets/search-ticket-results"
            element={<SearchResultPage />}
          />
           <Route path="/admin/messages" element={<AdminPage />}></Route>
           <Route path="/admin/messages" element={<AdminPage />}></Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/checkCode/:data" element={<CheckCode/>}/>
          <Route path="/report" element={<CreateReport />}></Route>
          <Route path='/payment/:departure/:num' element={<PaymentComponent/>}></Route>
          <Route path='/change-password' element={<ChangePassword/>}></Route>
        </Routes>

        <Footer />
      </TicketProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
