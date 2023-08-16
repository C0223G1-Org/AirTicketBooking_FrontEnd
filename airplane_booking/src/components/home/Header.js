import React from 'react';
import "../../css/home/Header.css";
import NavLink from "react-bootstrap/NavLink";

export default function Header() {
    // localStoragevvvvvvvv
    return (
        <header className="header">
            <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="#">CodeGym Airline</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"><i className="fa-solid fa-bars" /></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" href="#">
                                <i className="fa-solid fa-gift" />
                                Ưu đãi
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="#">
                                <i className="fa-solid fa-barcode" />
                                Giới thiệu
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="#">
                                <i className="fa-solid fa-suitcase-rolling" />
                                Quy định hành lý
                            </a>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/listPost"} className="nav-link active">
                                <i className="fa-regular fa-newspaper" />
                                Tin tức
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="#">
                                <i className="fa-solid fa-circle-info" />
                                Thông tin hành trình
                            </a>
                        </li>
                    </ul>
                    <ul className="navbar-nav login">
                        <li className="nav-item">
                            <a className="nav-link active" href="#">
                                <i className="fa-solid fa-circle-user" />
                                Đăng nhập
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="#">
                                <i className="fa-solid fa-user-plus" />
                                Đăng ký
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}