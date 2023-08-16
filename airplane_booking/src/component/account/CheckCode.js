import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.css"
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as yup from "yup";
import {useNavigate, useParams} from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

export function CheckCode() {
    const navigate = useNavigate();
    const param = useParams();
    const [userName, setUserName] = useState();
    const getUserName = async (data) => {
        setUserName(data);
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
                            onSubmit={async (values, {setSubmitting,resetForm}) => {
                                console.log(values);
                                values = {
                                    username: userName,
                                    verificationCode: +values.verificationCode,
                                }
                                console.log(values);
                                try {
                                    values = {
                                        username: userName,
                                        verificationCode: +values.verificationCode,
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
                                    console.log(error)
                                    // toast.error(error.response.data.error);
                                    await Swal.fire({
                                        title: error.response.data,
                                        text: 'Sai mã xác nhận.',
                                        icon: "warning",
                                        timer: 2000
                                    })
                                } finally {
                                    setSubmitting(false);
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