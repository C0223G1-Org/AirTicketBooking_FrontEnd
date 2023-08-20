import React, {useEffect, useState} from 'react';
import "../../css/home/Header.css";
import {Link, NavLink, useLocation, useNavigate} from 'react-router-dom';
import image from "../../logo_5.png";
import {getCustomerByEmail} from "../../services/CustomerServices";
import {getEmployeeByEmail} from "../../services/EmployeeServices";


export default function Header() {
    const [user, setUser] = useState(null);
    const [emailUser, setEmailUser] = useState("");
    const [role, setRole] = useState("");
    // const [flag, setFlag] = useState(false)
    const navigate = useNavigate();

    console.log(localStorage)
    const loginUser = async () => {
        if (localStorage.getItem("username") != null) {
            setEmailUser(
                localStorage.getItem("username")
            );
            console.log({user: localStorage.getItem("username")})
            setRole(localStorage.getItem("role"));
        }
    }

    console.log(emailUser)

    const getUser = async (email, uRole) => {
        const rightEmail = email ?? emailUser;
        const rightRole = uRole ?? role;
        if (rightEmail) {
            if (rightRole == "ROLE_CUSTOMER") {
                let data = await getCustomerByEmail(rightEmail);
                console.log(data)
                setUser(data);
            } else if (rightRole == "ROLE_EMPLOYEE") {
                let data = await getEmployeeByEmail(rightEmail);
                setUser(data);
            } else if (rightRole == "ROLE_ADMIN") {
                let data = await getEmployeeByEmail(rightEmail);
                setUser(data);
            }
        }
    }

    console.log("aaaaa")
    const handleLogout = () => {
        localStorage.setItem("token", null);
        localStorage.setItem("username", null);
        localStorage.setItem("role", null);
        setUser(null);
        navigate("/login");
    }

    useEffect(() => {
        loginUser()
    }, [ user]);
    // useEffect(() => {
    //     console.log("asd")
    //     getUser()
    // }, [flag]);

    const location = useLocation();

    useEffect(() => {
        // console.log('COME IN HERE');
        const email = localStorage.getItem('username');
        const role = localStorage.getItem('role');
        if (email && role) {
            console.log('username: ' + email);
            getUser(email, role);
        }

    }, [location])


    // localStoragevvvvvvvv
    return (
        <>
            {
                user == null ?
                    <header className="header">
                        <nav className="navbar navbar-expand-lg">
                            <Link to={"/home"}><img className="navbar-brand" src={image} alt='CodeGym Airline'/></Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
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
                                            <i className="fa-solid fa-circle-info"/>
                                            Thông tin hành trình
                                        </NavLink>
                                    </li>
                                </ul>
                                <ul className="navbar-nav login">
                                    <li className="nav-item">
                                        <Link to={`/login`} className="nav-link active">
                                            <i className="fa-solid fa-circle-user"/>
                                            Đăng nhập
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" to={`/signup`}>
                                            <i className="fa-solid fa-user-plus"/>
                                            Đăng ký
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </header>
                    : role == "ROLE_CUSTOMER" ?
                        <header className='header'>
                            <nav className="navbar navbar-expand-lg">
                                <Link to={"/home"}><img className="navbar-brand" src={image} alt='CodeGym Airline'/></Link>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                        aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
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
                                                <i className="fa-solid fa-circle-info"/>
                                                Thông tin hành trình
                                            </NavLink>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown"
                                               role="button"
                                               data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="fa-solid fa-list-check"/>
                                                Tùy chọn
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <li><Link to={`/customers/details/${user.idCustomer}`} className="dropdown-item" href="#">Xem thông tin tài khoản</Link></li>
                                                <li><Link to={`/history-payment/${user.idCustomer}`} className="dropdown-item">Lịch sử đặt
                                                    vé</Link>
                                                </li>
                                                <li><Link to={`/change-password`} className="dropdown-item">Đổi mật khẩu</Link>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <ul className="navbar-nav login">
                                        <li className="nav-item">
                                            <a className="nav-link active" href="#">
                                                Xin chào - {user.nameCustomer}
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link active" onClick={() => {
                                                handleLogout()
                                            }}>
                                                <i className="fa-solid fa-right-from-bracket"/>
                                                Đăng xuất
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </header>
                        : role == "ROLE_EMPLOYEE" ?
                            <header className='header'>
                                <nav className="navbar navbar-expand-lg">
                                    <Link to={"/home"}><img className="navbar-brand" src={image}
                                                            alt='CodeGym Airline'/></Link>
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
                                                    <i className="fa-solid fa-circle-info"/>
                                                    Thông tin hành trình
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink to="/admin/messages" className="nav-link active">
                                                    <i className="fa-solid fa-circle-info"/>
                                                    Chat
                                                </NavLink>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown"
                                                   role="button"
                                                   data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className="fa-solid fa-list-check"/>
                                                    Quản lý
                                                </a>
                                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                    <li><Link to={`/customers`} className="dropdown-item">Quản lý khách
                                                        hàng</Link>
                                                    </li>
                                                    <li><a className="dropdown-item" href="#">Quản lý kinh doanh</a></li>
                                                    <li><Link to={`/ticket/booked`} className="dropdown-item">Quản lý
                                                        vé</Link></li>
                                                    <li><Link to={`/change-password`} className="dropdown-item">Đổi mật khẩu</Link>
                                                    </li>
                                                    <li><a className="dropdown-item" href="#">Báo cáo</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <ul className="navbar-nav login">
                                            <li className="nav-item">
                                                <a className="nav-link active" href="#">
                                                    Xin chào - {user.nameEmployee}
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link active" onClick={() => {
                                                    handleLogout()
                                                }}>
                                                    <i className="fa-solid fa-right-from-bracket"/>
                                                    Đăng xuất
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </header>
                        : <header className='header'>
                                <nav className="navbar navbar-expand-lg">
                                    <Link to={"/home"}><img className="navbar-brand" src={image}
                                                            alt='CodeGym Airline'/></Link>
                                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#navbarSupportedContent"
                                            aria-controls="navbarSupportedContent"
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
                                                    <i className="fa-solid fa-circle-info"/>
                                                    Thông tin hành trình
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink to="/admin/messages" className="nav-link active">
                                                    <i className="fa-solid fa-circle-info"/>
                                                    Chat
                                                </NavLink>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown"
                                                   role="button"
                                                   data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className="fa-solid fa-list-check"/>
                                                    Quản lý
                                                </a>
                                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                    <li><Link to={`/employee`} className="dropdown-item" href="#">Quản
                                                        lý
                                                        nhân
                                                        viên</Link></li>
                                                    <li><Link to={`/customers`} className="dropdown-item">Danh sách khách hàng</Link>
                                                    </li>
                                                    <li><Link to={`/change-password`} className="dropdown-item">Đổi mật khẩu</Link>
                                                    </li>
                                                    <li><a className="dropdown-item" href="#">Quản lý vé</a></li>
                                                    <li><a className="dropdown-item" href="#">Báo cáo</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <ul className="navbar-nav login">
                                            <li className="nav-item">
                                                <a className="nav-link active" href="#">
                                                    Xin chào - ADMIN
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link active" onClick={()=> handleLogout()}>
                                                    <i className="fa-solid fa-right-from-bracket"/>
                                                    Đăng xuất
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </header>

            }
            {/*}*/}
            {/*<HeaderEmployee/>*/}
            {/*<HeaderAdmin/>*/}
            {/*<HeaderCustomer/>*/}
        </>
    )
}