import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import PaymentComponent from './component/PaymentComponent';
// import HistoryPaymentComponent from './component/HistoryPaymentComponent';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Success from './component/Success';
import Failed from './component/Failed';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  
  <BrowserRouter>
    <Routes>
      <Route path='/:id/' element={<PaymentComponent></PaymentComponent>}></Route>
      <Route path='/success' element={<Success></Success>}></Route>
      <Route path='/failed' element={<Failed></Failed>}></Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
