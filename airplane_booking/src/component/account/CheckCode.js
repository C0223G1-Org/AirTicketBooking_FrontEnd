import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.css"
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as yup from "yup";
import {useNavigate, useParams} from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

export function CheckCode() {
    const [count, setCount] = useState(1);
    const navigate = useNavigate();
    const param = useParams();
    const [userName, setUserName] = useState('');
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
    return (
        <>
            <div className="row mt-lg-5">
                <div className="col-md-4"/>
                <div className="col-md-4 text-center">
                    <div className="row align-items-center mt-lg-5 bg-body" style={{borderRadius: "10px"}}>
                        <div className="header-text mb-4 mt-lg-3">
                            <h2>Xác nhận đăng ký</h2>
                        </div>
                        <p>Chúng tôi đã gửi mã xác nhận đến Email đăng ký của bạn, nhập mã xác nhận để kích hoạt tài
                            khoản!!!</p>
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
                                if (count < 4) {
                                    console.log("count2: " + count);
                                    try {
                                        values = {
                                            username: userName,
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
                                            navigate(`/`);
                                        }
                                        // navigate("/login/newPassword", {state: {data: response.data}})
                                    } catch (error) {
                                        console.log(error);
                                        setCount1();
                                        // toast.error(error.response.data.error);
                                        await Swal.fire({
                                            title: 'Sai mã xác nhận lần ' + count  + '.',
                                            text: '(Lưu ý: sai quá 3 lần mã xác nhận và tài khoản sẽ bị hủy)',
                                            icon: "warning",
                                            timer: 2000
                                        });
                                        console.log("count3: " + count);
                                    } finally {
                                        setSubmitting(false);
                                    }
                                } else {
                                    await Swal.fire({
                                        title: "Đã nhập sai quá 3 lần, mã sẽ bị hủy",
                                        icon: "warning",
                                        timer: 2000
                                    });
                                    navigate('/signup');
                                }
                            }}
                        >
                            <Form>
                                <div className="row mt-lg-3">
                                    <div className="col-3"/>
                                    <div className="col-6">
                                        <fieldset className="form-group position-relative has-icon-left">
                                            <Field
                                                name="verificationCode"
                                                type="text"
                                                id="txtUserName"
                                                className="form-control text-center"
                                                placeholder="Mã"
                                            />
                                            <ErrorMessage name="verificationCode" component="span" className="error-r"/>
                                        </fieldset>
                                    </div>
                                    <div className="col-3"/>
                                </div>
                                <div className="text-center" style={{marginBottom: "10px"}}>
                                    <button type="submit" className="btn"
                                            style={{
                                                margin: "5%",
                                                // paddingLeft: "15%",
                                                backgroundColor: "rgb(6, 133, 170)",
                                                color: "white",
                                                // fontWeight: "bold",
                                                fontSize: "18px"
                                            }}>
                                        Xác Nhận
                                    </button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
                <div className="col-md-4"/>
            </div>
        </>
    )
}