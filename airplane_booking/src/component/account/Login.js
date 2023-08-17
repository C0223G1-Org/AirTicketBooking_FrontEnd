import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import "../../css/account/login_signup.css"
import "../../css/account/login_signup_2.css"
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as yup from "yup";
import axios from "axios";
// import {ToastContainer, toast} from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";



export function Login() {
    const navigate = useNavigate();
    // const [userInfo, setUserInfo] = useState({
    //     token: '',
    //     username: '',
    //     role: ''
    // });
    // useEffect(() => {
    //     const hideURLBar = () => {
    //         window.scrollTo(0, 1);
    //     };
    //
    //     hideURLBar(); // Gọi hàm ngay khi component được render
    //
    //     // Gọi hàm hideURLBar khi sự kiện "load" được kích hoạt
    //     window.addEventListener("load", hideURLBar);
    //
    //     // Cleanup: Loại bỏ sự kiện khi component unmount
    //     return () => {
    //         window.removeEventListener("load", hideURLBar);
    //     };
    // }, []); // Tham số thứ hai của useEffect là một mảng rỗng để chỉ chạy một lần khi component mount

    return (
        <>
            <Formik
                initialValues={{
                    username: "",
                    password: ""
                }}
                validationSchema={yup.object({
                    username: yup.string()
                        .required('Chưa nhập email đăng nhập.')
                        // .email('Chưa đúng định dạng email: xxx@xxx.xxx')
                        .min(12, 'Ít nhất 12 ký tự.')
                        .max(50, 'Tối đa 50 ký tự.'),
                    // .matches(/^\\w+@\\w+(.\\w+)$/, 'Chưa đúng định dạng email (xxx@xxx.xxx) với x không phải là ký tự đặc biệt '),
                    password: yup.string()
                        .required('Chưa nhập mật khẩu.')
                        .matches(/^(?=.*[A-Z])(?=.*[0-9]).{8,20}$/, 'Mật khẩu phải từ 8 ký tự và ít hơn 20 ký tự, có chứa ký tự in hoa và ký tự số'),
                })}
                onSubmit={async (values, {setSubmitting, resetForm}) => {
                    // console.log(values);
                    try {
                        // Gửi yêu cầu đăng nhập
                        const response = await axios.post(
                            "http://localhost:8080/api/account/login",
                            values
                        );
                        // Kiểm tra nếu response có chứa token
                        if (response.data.token) {
                            // Giải mã token và lấy thông tin payload

                            // const decodedToken = jwt(response.data.token);
                            // Lưu trữ thông tin người dùng vào localStorage hoặc state
                            localStorage.setItem("token", response.data.token);
                            localStorage.setItem("username", response.data.username);
                            localStorage.setItem("role", response.data.role);
                            // localStorage.setItem('userId', decodedToken.userId);
                            console.log("resp: " + response);
                            console.log("Token:", localStorage.token);
                            console.log("Username:", localStorage.username);
                            console.log("Role:", localStorage.role);
                            // setUserInfo({
                            //     token: localStorage.getItem('role'),
                            //     username: response.data.username,
                            //     role: response.data.role
                            // });
                        }
                        resetForm();
                        // Đăng nhập thành công, chuyển hướng hoặc thực hiện hành động khác
                        navigate("/signup");
                    } catch (e) {
                        // Xử lý lỗi đăng nhập
                        // toast.error(e.response.data);
                        await Swal.fire({
                            title: e.response.data,
                            text: 'Sai mật khẩu hoặc email !',
                            icon: "warning",
                            timer: 2000
                        })
                    } finally {
                        setSubmitting(false);
                        // console.log(userInfo);
                    }
                }}
            >
                <Form>
                    {/*<h1 className="w3ls" style={{color: "rgb(6, 133, 170)"}}>*/}
                    {/*    ĐĂNG NHẬP*/}
                    {/*</h1>*/}
                    <div className="content-w3ls">
                        <div className="content-agile1">
                            <h2 className="agileits1" style={{padding: "25% 0"}}>
                                Đăng Nhập
                            </h2>
                            {/*<br/>*/}
                            {/*<h1 className="agileits1" style={{color: "rgb(6, 133, 170)", padding: "25% 0"}}>*/}
                            {/*    ĐĂNG NHẬP*/}
                            {/*</h1>*/}
                        </div>
                        <div className="content-agile2 bg-white">
                            <div className="row">
                                <div
                                    className="col-md-4"
                                    style={{
                                        marginTop: "2%",
                                        paddingLeft: "10%",
                                        color: "rgb(6, 133, 170)",
                                        fontWeight: "bold"
                                    }}
                                >
                                    <span style={{fontSize: 20}}>Email</span>
                                </div>
                                <div className="col-md-8">
                                    <Field
                                        className=" agileinfo"
                                        type="email"
                                        id="email"
                                        name="username"
                                        placeholder="xxx@xxx.xxx"
                                        // title="Chưa nhập email"
                                        required=""
                                    />
                                    {/*<p className="err-mes">Chưa nhập email</p>*/}
                                    <div className="row">
                                        <div className="col-1"/>
                                        <div className="col-10">
                                            <ErrorMessage component="span" name="username"
                                                          className="err-mes"/>
                                        </div>
                                        <div className="col-1"/>
                                    </div>

                                </div>
                            </div>
                            <div className="row">
                                <div
                                    className="col-md-4"
                                    style={{
                                        marginTop: "2%",
                                        paddingLeft: "10%",
                                        color: "rgb(6, 133, 170)",
                                        fontWeight: "bold"
                                    }}
                                >
                                    <span style={{fontSize: 20}}>Mật khẩu</span>
                                </div>
                                <div className="col-md-8">
                                    <Field
                                        className="agileinfo"
                                        type="password"
                                        name="password"
                                        placeholder="Nhập"
                                        id="password1"
                                        required=""
                                    />
                                    {/*<p className="err-mes">Chưa nhập mật khẩu</p>*/}
                                    <div className="row">
                                        <div className="col-1"/>
                                        <div className="col-10">
                                            <ErrorMessage component="span" name="password"
                                                          className="err-mes"/>
                                        </div>
                                        <div className="col-1"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div
                                    className="col-md-6"
                                    style={{
                                        marginTop: "2%",
                                        paddingLeft: "10%",
                                        color: "rgb(6, 133, 170)",
                                        fontWeight: "revert"
                                    }}
                                >
                                    <input type="checkbox" id="myCheckbox" className="myCheckbox"/>
                                    <label htmlFor="myCheckbox" className="myCheckbox">
                                        Ghi nhớ đăng nhập
                                    </label>
                                </div>
                                <div
                                    className="col-md-6"
                                    style={{
                                        marginTop: "2%",
                                        paddingLeft: "15%",
                                        color: "rgb(6, 133, 170)",
                                        fontWeight: "revert"
                                    }}
                                >
                                    <Link href="#">
                                        <p style={{textDecoration: "underline"}}>Quên mật khẩu?</p>
                                    </Link>
                                </div>
                            </div>
                            {/*<input type="submit" className="register" defaultValue="Đăng nhập" >Đăng nhập</input>*/}
                            <div className="text-center" style={{marginBottom: "10px"}}>
                                <button type="submit" className="btn"
                                        style={{
                                            marginTop: "2%",
                                            // paddingLeft: "15%",
                                            backgroundColor: "rgb(6, 133, 170)",
                                            color: "white",
                                            // fontWeight: "bold",
                                            fontSize: "18px"
                                        }}>
                                    Đăng Nhập
                                </button>
                            </div>
                            <div className="text-center">
                                {/*<button type="button" className="btn btn-primary" style={{margin: "1%"}}>*/}
                                {/*    <i className="fab fa-facebook"/>*/}
                                {/*</button>*/}
                                {/*<button type="button" className="btn btn-danger">*/}
                                {/*    <i className="fab fa-google"/>*/}
                                {/*</button>*/}
                                {/*<br/>*/}
                                <Link to='/signup' style={{textDecoration: "underline", fontSize:"18px"}}>Đăng ký</Link>
                            </div>
                        </div>
                        {/*<div className="clear"/>*/}
                    </div>
                </Form>
            </Formik>
            {/*<ToastContainer/>*/}
        </>
    )
}