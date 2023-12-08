import './App.css';
import React from "react";
import {Route, Routes} from "react-router";
import {BrowserRouter} from "react-router-dom";
import SearchDemo from "./component_SAngTDN/SearchDemo";
import ListRouter from "./component_SAngTDN/ListRoute";
import ChangePassword from "./component_SAngTDN/ChangePassword";
import TicketBooked from "./components/TicketBooked";
import TicketUnBook from "./components/TicketUnBook";

function App() {
  return (
<>
  <BrowserRouter>
  <Routes>
 <Route path="/" element={<SearchDemo/>}></Route>
 <Route path="/list/:data" element={<ListRouter/>}></Route>
 <Route path="/change-password" element={<ChangePassword/>}></Route>
  <Route path="/ticket/booked" element={<TicketBooked/>}/>
  <Route path="/ticket/unbooked" element={<TicketUnBook/>}/>
</Routes>
  </BrowserRouter>

</>
  );
}

export default App;
