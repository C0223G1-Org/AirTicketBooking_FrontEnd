
import ListRouter from "./component_SAngTDN/ListRoute";
import SearchDemo from "./component_SAngTDN/SearchDemo";import ChangePassword from "./component_SAngTDN/ChangePassword";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TicketBooked from "./components/TicketBooked";
import TicketUnBook from "./components/TicketUnBook";
import ListPost from "./component/post/ListPost";
import {CreatePost} from "./component/post/CreatePost";
import {UpdatePost} from "./component/post/UpdatePost";



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
