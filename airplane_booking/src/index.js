import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchTicketPage from "./components/searchTickets_KietNT/SearchTicketPage";
import HomePage from "./components/HomePage";
import SearchResultPage from "./components/searchTickets_KietNT/SearchResultPage";
import { TicketProvider } from "./components/searchTickets_KietNT/TicketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TicketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/tickets" element={<HomePage />}></Route>
          <Route path="/tickets/search-ticket" element={<SearchTicketPage />}></Route>
          <Route path="/tickets/search-ticket-results" element={<SearchResultPage />}></Route>
        </Routes>
      </BrowserRouter>
    </TicketProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
