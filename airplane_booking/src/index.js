import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Footer from "./components/home/Footer";
import Header from "./components/home/Header";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchTicketPage from "./components/searchTickets_KietNT/SearchTicketPage";
import SearchResultPage from "./components/searchTickets_KietNT/SearchResultPage";
import { TicketProvider } from "./components/searchTickets_KietNT/TicketContext";
import GetTop10Cheapest from "./components/home/Top10";
import Home from "./components/home/Home";
import AdminPage from "./components/chat_messenger/AdminChat";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <TicketProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/top10" element={<GetTop10Cheapest />} />
          <Route path="/tickets/search-ticket" element={<SearchTicketPage />} />
          <Route
            path="/tickets/search-ticket-results"
            element={<SearchResultPage />}
          />
          <Route path="/admin/messages" element={<AdminPage/>}></Route>
        </Routes>
      </TicketProvider>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
