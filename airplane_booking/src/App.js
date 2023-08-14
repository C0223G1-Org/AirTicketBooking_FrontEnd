import { BrowserRouter, Route, Routes } from "react-router-dom";
import TicketBooked from "./components/TicketBooked";
import TicketUnBook from "./components/TicketUnBook";



function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/ticket/booked" element={<TicketBooked/>}/>
    <Route path="/ticket/unbooked" element={<TicketUnBook/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
