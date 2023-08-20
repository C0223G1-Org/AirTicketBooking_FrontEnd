import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.css"
import "../../css/account/login_signup.css"
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as yup from "yup";
import {useNavigate, useParams} from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import {ThreeDots} from "react-loader-spinner";
import {Logined} from "./Logined";

export function CheckCode() {
    const [count, setCount] = useState(1);
    const navigate = useNavigate();
    const param = useParams();
    const role = localStorage.getItem("role");
    const [userName, setUserName] = useState(param.data);
    const getUserName = async (data) => {
        setUserName(data);
        console.log("userName: " + userName);
        console.log("count0: " + count);
    }
    const setCount1 = () => {
        setCount(prevState => count + 1);
    }
    useEffect(() => {
        getUserName(param.data).then(r => null);
    }, [param.data])
    if (!userName) {
        return null;
    }
    if (role === 'ROLE_CUSTOMER' || role === 'ROLE_EMPLOYEE' || role === 'ROLE_ADMIN') {
        return <Logined/>;
    }
    return (
        <>
            <div className="bgimagebody " style={{padding: "3% 0"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3"/>
                        <div className="col-md-6">
                            <div className="text-center" style={{
                                width: "500px", borderRadius: "10px",
                                backgroundColor: "rgba(255, 255, 255, 0.84)", margin: "10% auto"
                                , padding: "5% 0"
                            }}>
                                <h1 style={{color: "rgb(6, 133, 170)", parddingTop: "5%"}}>Xác nhận đăng ký</h1>
                                <p style={{margin: "0 9%"}}>Chúng tôi đã gửi mã xác nhận đến Email đăng ký của bạn.
                                    Nhập mã xác nhận để kích hoạt tài khoản.</p>
                                <Formik
                                    initialValues={{
                                        verificationCode: ''
                                    }}
                                    validationSchema={yup.object({
                                        verificationCode: yup.number()
                                            .required('Chưa nhập mã xác nhận'),
                                    })}
                                    onSubmit={async (values, {setSubmitting, resetForm}) => {
                                        console.log(values);
                                        values = {
                                            username: userName,
                                            verificationCode: +values.verificationCode,
                                            count: count,
                                        }
                                        console.log(values);
                                        console.log("count1: " + count);
                                        // if (count < 4) {
                                        //     console.log("count2: " + count);
                                        try {
                                            if (count < 4) {
                                                values = {
                                                    emailCustomer: userName,
                                                    verificationCode: +values.verificationCode,
                                                    count: count,
                                                }
                                                const response = await axios.post('http://localhost:8080/api/account/checkCode', values)
                                                console.log(response);
                                                console.log(response.data.username);
                                                if (response.data.username === userName) {
                                                    await Swal.fire({
                                                        title: "Đăng ký thành công",
                                                        icon: "success",
                                                        timer: 2000
                                                    })
                                                    resetForm();
                                                    navigate(`/login`);
                                                }
                                            }
                                            // navigate("/login/newPassword", {state: {data: response.data}})
                                        } catch (error) {
                                            console.log(error);
                                            setCount1();
                                            // toast.error(error.response.data.error);
                                            if (count >= 3) {
                                                await Swal.fire({
                                                    title: "Đã nhập sai quá 3 lần, mã sẽ bị hủy",
                                                    icon: "warning",
                                                    timer: 2000
                                                });
                                                navigate('/signup');
                                            } else {
                                                await Swal.fire({
                                                    title: 'Sai mã xác nhận lần ' + count + '.',
                                                    text: '(Lưu ý: sai quá 3 lần mã xác nhận và tài khoản sẽ bị hủy)',
                                                    icon: "warning",
                                                    timer: 2000
                                                });
                                            }
                                            console.log("count3: " + count);
                                        } finally {
                                            setSubmitting(false);
                                        }
                                        // } else {
                                        //     await Swal.fire({
                                        //         title: "Đã nhập sai quá 3 lần, mã sẽ bị hủy",
                                        //         icon: "warning",
                                        //         timer: 2000
                                        //     });
                                        //     navigate('/signup');
                                        // }
                                    }}
                                >
                                    {({isSubmitting}) => (
                                        <Form>
                                            <div className="row mt-lg-3">
                                                <div className="col-3"/>
                                                <div className="col-6">
                                                    <fieldset
                                                        className="form-group position-relative has-icon-left">
                                                        <Field
                                                            name="verificationCode"
                                                            type="text"
                                                            id="txtUserName"
                                                            className="form-control text-center"
                                                            placeholder="Mã"
                                                        />
                                                        <div className="text-center">
                                                            <ErrorMessage name="verificationCode" component="span"
                                                                          style={{color: "red"}}/>
                                                        </div>
                                                    </fieldset>
                                                </div>
                                                <div className="col-3"/>
                                            </div>
                                            <div className="text-center" style={{marginBottom: "10px"}}>
                                                {
                                                    isSubmitting ?
                                                        <ThreeDots/>
                                                        :
                                                        <button type="submit" className="btn"
                                                                style={{
                                                                    margin: "3%",
                                                                    // paddingLeft: "15%",
                                                                    backgroundColor: "rgb(6, 133, 170)",
                                                                    color: "white",
                                                                    // fontWeight: "bold",
                                                                    fontSize: "18px"
                                                                }}>
                                                            Xác Nhận
                                                        </button>
                                                }
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                        <div className="col-md-3"/>
                    </div>
                </div>
            </div>
        </>
    )
}