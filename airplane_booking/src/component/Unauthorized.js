import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import {useNavigate} from "react-router";
import {Link} from "@react-pdf/renderer";
export function Unauthorzied() {
    return (
        <>
            <div className="container">
                <div className="text-center">
                    <h1 style={{color:"red", margin:"10%"}}>
                        Bạn không được quyền vào trang này
                    </h1>
                </div>
            </div>
        </>
    )
}