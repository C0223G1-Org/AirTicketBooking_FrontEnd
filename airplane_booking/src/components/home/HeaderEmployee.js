import React from "react";
import "../../css/home/Header.css";
import {Link, NavLink} from "react-router-dom";
import image from "../../logo_5.png";


export default function HeaderEmployee() {
    return (
        <header className='header'>
            <nav className="navbar navbar-expand-lg">
                <img className="navbar-brand" src={image} alt='CodeGym Airline'/>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"><i className="fa-solid fa-bars"/></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" href="#">
                                <i className="fa-solid fa-gift"/>
                                Ưu đãi
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="#">
                                <i className="fa-solid fa-barcode"/>
                                Giới thiệu
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="#">
                                <i className="fa-solid fa-suitcase-rolling"/>
                                Quy định hành lý
                            </a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to={`/listPost`}>
                                <i className="fa-regular fa-newspaper"/>
                                Tin tức
                            </Link>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/tickets/search-ticket" className="nav-link active">
                                <i className="fa-solid fa-circle-info" />
                                Thông tin hành trình
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/admin/messages" className="nav-link active">
                                <i className="fa-solid fa-circle-info" />
                                Chat
                            </NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa-solid fa-list-check"/>
                                Quản lý
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link to={`/customers`} className="dropdown-item" >Quản lý khách hàng</Link></li>
                                <li><a className="dropdown-item" href="#">Quản lý kinh doanh</a></li>
                                <li><Link to={`/ticket/booked`} className="dropdown-item">Quản lý vé</Link></li>
                                <li><a className="dropdown-item" href="#">Báo cáo</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="navbar-nav login">
                        <li className="nav-item">
                            <a className="nav-link active" href="#">
                                Xin chào - NamPC
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="#">
                                <i className="fa-solid fa-right-from-bracket"/>
                                Đăng xuất
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}