import ListRouter from "./component_SAngTDN/ListRoute";
import SearchDemo from "./component_SAngTDN/SearchDemo";
import {Route, Routes} from "react-router-dom"
import ChangePassword from "./component_SAngTDN/ChangePassword";
import React from "react";
import {Login} from "./component/account/Login";
import {SignUp} from "./component/account/SignUp";
import {CheckCode} from "./component/account/CheckCode";

function App() {
    return (
        <>
            <Routes>
                {/*<Route path="/" element={<SearchDemo/>}></Route>*/}
                {/*<Route path="/list/:data" element={<ListRouter/>}></Route>*/}
                {/*<Route path="/change-password" element={<ChangePassword/>}></Route>*/}
                <Route path={"/"} element={<Login/>}/>
                <Route path={"/signup"} element={<SignUp/>}/>
                <Route path={"/checkCode/:data"} element={<CheckCode/>}/>
            </Routes>
        </>
    );
}

export default App;
