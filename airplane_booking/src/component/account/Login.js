import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import "../../css/account/login_signup.css"
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as yup from "yup";
import axios from "axios";
// import {ToastContainer, toast} from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import {ThreeDots} from "react-loader-spinner"
import {Logined} from "./Logined";


export function Login() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState(localStorage.getItem("user_name"));
    const [password, setPassword] = useState(localStorage.getItem("password"));
    const setPwUs = async (u, p) => {
        setUserName(u);
        setPassword(p);
        // console.log(userName, password);
    };
    useEffect(() => {
        setPwUs(localStorage.getItem("user_name"), localStorage.getItem("password"))
            .then(r => null);
    }, [])
    const [role, setRole] = useState(localStorage.getItem("role"));
    useEffect(() => {
        setRole(localStorage.getItem("role"));
    }, []);
    return (
        <>
            {role !== "ROLE_CUSTOMER" ? (role !== "ROLE_ADMIN" ? (role !== "ROLE_EMPLOYEE" ?
                <Formik
                    initialValues={{
                        username: userName,
                        password: password,
                        check: '',
                    }}
                    validationSchema={yup.object({
                        username: yup.string()
                            .required('Chưa nhập email đăng nhập.')
                            .email('Chưa đúng định dạng email: xxx@xxx.xxx')
                            .min(6, 'Ít nhất 6 ký tự.')
                            .max(50, 'Tối đa 50 ký tự.'),
                        // .matches(/^\\w+@\\w+(.\\w+)$/, 'Chưa đúng định dạng email (xxx@xxx.xxx) với x không phải là ký tự đặc biệt '),
                        password: yup.string()
                            .required('Chưa nhập mật khẩu.')
                            .matches(/^(?=.*[A-Z])(?=.*[0-9]).{8,20}$/, 'Mật khẩu phải từ 8 ký tự và ít hơn 20 ký tự, có chứa ký tự in hoa và ký tự số'),
                    })}
                    onSubmit={async (values, {setSubmitting, resetForm}) => {
                        // setSubmitting(false);
                        // console.log(values);
                        if (values.check.length === 1) {
                            localStorage.setItem("user_name", values.username);
                            localStorage.setItem("password", values.password);

                        } else {
                            localStorage.setItem("user_name", '');
                            localStorage.setItem("password", '');
                        }
                        values = {
                            username: values.username,
                            password: values.password,
                        }
                        // console.log(localStorage.getItem("user_name"), localStorage.getItem("password"));
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
                                // console.log("resp: " + response);
                                // console.log("Token:", localStorage.token);
                                // console.log(localStorage.username);
                                // console.log(localStorage.role);
                                // Đăng nhập thành công, chuyển hướng hoặc thực hiện hành động khác
                            }
                            // await handleSubmit(values);
                            resetForm();
                            await navigate("/home");
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
                        }
                    }}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <div className="bgimagebody" style={{paddingBottom: "50px"}}>
                                <h1 className="w3ls" style={{color: "rgb(6, 133, 170)"}}>
                                    ĐĂNG NHẬP
                                </h1>
                                <div className="content-w3ls"
                                     style={{borderRadius: "7px", padding: "20px 0"}}>
                                    <div className="row ">
                                        <div className=" col-3">
                                        </div>
                                        <div className="col-6">
                                            <div className="content-agile2"
                                                 style={{backgroundColor: "rgba(255, 255, 255, 0.7)"}}>
                                                <div className="row">
                                                    <div
                                                        className="col-md-4"
                                                        style={{
                                                            marginTop: "2%",
                                                            paddingLeft: "8%",
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
                                                            paddingLeft: "8%",
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
                                                            placeholder="*****"
                                                            id="password1"
                                                            required=""
                                                        />
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
                                                        className="col-md-5"
                                                        style={{
                                                            marginTop: "3%",
                                                            paddingLeft: "12%",
                                                            color: "rgb(6, 133, 170)",
                                                            fontWeight: "revert"
                                                        }}
                                                    >
                                                        <Field type="checkbox" name="check" value="1" id="myCheckbox"
                                                               className="myCheckbox"/>
                                                        <label id="dn" htmlFor="myCheckbox" className="myCheckbox">
                                                            Ghi nhớ đăng nhập
                                                        </label>
                                                    </div>
                                                    <div
                                                        className="col-md-7"
                                                        style={{
                                                            marginTop: "3%",
                                                            paddingLeft: "15%",
                                                            color: "rgb(6, 133, 170)",
                                                            fontWeight: "revert",
                                                            display: "flex"
                                                        }}
                                                    >
                                                        <Link to='/signup' style={{
                                                            textDecoration: "underline",
                                                            fontSize: "16px",
                                                            paddingRight: "2px"
                                                        }}>Đăng
                                                            ký
                                                        </Link>
                                                        <span style={{fontSize: "18px"}}>&nbsp; / &nbsp;</span>
                                                        <Link href="#" to={''}>
                                                            <p style={{
                                                                textDecoration: "underline",
                                                                fontSize: "16px"
                                                            }}>Quên
                                                                mật
                                                                khẩu?</p>
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="text-center" style={{marginBottom: "10px"}}>
                                                    {
                                                        isSubmitting ?
                                                            <ThreeDots/> :
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
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-3"/>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
                : <Logined/>) : <Logined/>) : <Logined/>
            }
        </>
    )
}