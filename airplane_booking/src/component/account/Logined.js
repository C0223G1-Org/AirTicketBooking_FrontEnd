import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import {useNavigate} from "react-router";
import {Link} from "@react-pdf/renderer";
export function Logined() {
    const navigate = useNavigate();
    return (
        <>
            <div className="container">
                <div className="text-center">
                    <h1 style={{color:"red", margin:"10%"}}>
                        Bạn đã đăng nhập hệ thống
                    </h1>
                    <Link to="/home" style={{
                        textDecoration:"underline",
                        color:"blue"
                    }}>Về trang chủ</Link>
                </div>
            </div>
        </>
    )
}