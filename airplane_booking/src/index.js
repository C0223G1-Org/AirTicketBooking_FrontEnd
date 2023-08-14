import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UpdateTicket from './components/ticket/updateTicket';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PrintTicket from './components/ticket/printTicket';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<BrowserRouter>
<Routes>
  <Route path='/printTicket' element={<PrintTicket></PrintTicket>}></Route>
  <Route path='/tickets/updateTicket/:id' element={<UpdateTicket />}></Route>
</Routes>
</BrowserRouter>
   
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
