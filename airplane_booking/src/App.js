import logo from './logo.svg';
import './App.css';
import React from "react";
import {Route, Routes} from "react-router";

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
