import logo from './logo.svg';
import './App.css';
import CreateEmployee from "./component/Employee/CreateEmployee";
import {Route, Routes} from "react-router-dom";
import EmployeeList from "./component/Employee/EmployeeList";
import EditEmployee from "./component/Employee/EditEmployee";


function App() {
    return (
        <>
            <Routes>
                <Route path='/employee' element={<EmployeeList/>}/>
                <Route path='employee/create' element={<CreateEmployee/>}/>
                <Route path='employee/update/:id' element={<EditEmployee/>}/>
            </Routes>

        </>
    );
}

export default App;
