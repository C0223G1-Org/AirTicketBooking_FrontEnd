import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import CreateReport from "./component/report/CreateReport";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            {/*<Header />*/}
            {/*<TicketProvider>*/}
            <Routes>
                {/*<Route path='/home' element={<Home/>}></Route>*/}
                {/*<Route path='/top10' element={<GetTop10Cheapest/>}></Route>*/}
                {/*<Route path='/header-customer' element={<HeaderCustomer />} />*/}
                {/*<Route path='/header-admin' element={<HeaderAdmin />} />*/}
                {/*<Route path='/header-employee' element={<HeaderEmployee />} />*/}
                {/*<Route path='/printTicket' element={<PrintTicket></PrintTicket>}></Route>*/}
                {/*<Route path='/tickets/updateTicket/:id' element={<UpdateTicket />}></Route>*/}
                {/*<Route path="/ticket/booked" element={<TicketBooked/>}/>*/}
                {/*<Route path="/ticket/unbooked" element={<TicketUnBook/>}/>*/}
                {/*<Route path='/customers' element={<CustomerManagement />} />*/}
                {/*<Route path='/customers/add' element={<EmployeeCreateCustomer />} />*/}
                {/*<Route path='/customers/edit/:id' element={<EmployeeUpdateCustomer />} />*/}
                {/*<Route path='/customers/update/:id' element={<CustomerUpdate />} />*/}
                {/*<Route path='/customers/details/:id' element={<CustomerDetails />} />*/}
                {/*<Route path='/list/:data' element={<ListRouter />} />*/}
                {/*<Route path="/detail-ticket/:data" element={<DetailTicket />} />*/}
                {/*<Route path="/info-passenger/:data" element={<InfoPassenger/>} />*/}
                {/*/!*<Route path="/employee" element={<EmployeeList/>} />*!/*/}
                {/*/!*<Route path='/employee/create' element={<CreateEmployee />} />*!/*/}
                {/*<Route path='/listPost' element={<ListPost />} />*/}
                <Route path="/report" element={<CreateReport />}/>

                {/*<Route path="/tickets/search-ticket" element={<SearchTicketPage />} />*/}
                {/*<Route*/}
                {/*    path="/tickets/search-ticket-results"*/}
                {/*    element={<SearchResultPage />}*/}
                {/*/>*/}
                {/*<Route path="/admin/messages" element={<AdminPage/>}></Route>*/}
            </Routes>
            {/*</TicketProvider>*/}
            {/*<Footer />*/}
        </BrowserRouter>

    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
