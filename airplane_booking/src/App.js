import logo from './logo.svg';
import './App.css';
import CreateEmployee from "./component/Employee/CreateEmployee";
import {Route, Routes} from "react-router-dom";
import EmployeeList from "./component/Employee/EmployeeList";
import {EditEmployee} from "./component/Employee/EditEmployee";

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<EmployeeList/>}/>
                <Route path='src/create/employee' element={<CreateEmployee/>}/>
                <Route path='src/edit/employee/:id' element={<EditEmployee/>}/>
            </Routes>

        </>
    );
}

export default App;
