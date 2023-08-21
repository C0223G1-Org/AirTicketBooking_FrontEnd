import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "../../css/account/login_signup.css";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as yup from "yup";
import axios from "axios";
// import {ToastContainer, toast} from "react-toastify";
import {max} from "moment";
import Swal from "sweetalert2";
import {ThreeDots} from "react-loader-spinner"
import {Logined} from "./Logined";

// import CheckCode from './CheckCode';

export function SignUp() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
    const [role, setRole] = useState(localStorage.getItem("role"));
    console.log("role " + role);
    useEffect(() => {
        setRole(localStorage.getItem("role"));
    }, []);
    return (
        <>
            {role !== "ROLE_CUSTOMER" ? (role !== "ROLE_ADMIN" ? (role !== "ROLE_EMPLOYEE" ?
                <Formik
                    initialValues={{
                        nameCustomer: "",
                        genderCustomer: 2,
                        emailCustomer: "",
                        telCustomer: "",
                        addressCustomer: "",
                        imgCustomer: "",
                        nationalityCustomer: "",
                        idCardCustomer: "",
                        dateCustomer: "",
                        flagCustomer: 0,
                        password: "",
                        passwordAgain: ""
                    }}
                    validationSchema={yup.object({
                        nameCustomer: yup.string().required('Không được để trống trường này.')
                            .min(2, 'Họ và tên phải hơn 2 ký tự và dưới 50 ký tự.')
                            .max(50, 'Họ và tên phải hơn 2 ký tự và dưới 50 ký tự.'),
                        genderCustomer: yup.number().required('Không được để trống trường này!')
                            .min(0, 'Không được để trống trường này.')
                            .max(1, 'Không được để trống trường này.'),
                        emailCustomer: yup.string().required('Không được để trống trường này.')
                            .matches(/^\w+@\w+(.\w+)$/, "Nhập theo định dạng: xxx@xxx.xxx với x không phải là ký tự đặc biệt.")
                            .min(6, 'Email tối đa 50 ký tự, ít nhất 6 ký tự.')
                            .max(50, 'Email tối đa 50 ký tự, ít nhất 12 ký tự.'),
                        telCustomer: yup.string().required('Không được để trống trường này.')
                            .matches(/^(\+84|0)[1-9][0-9]{8}$/, "Nhập theo định dạng +84xxxxxxxxx hoặc 0xxxxxxxxx với x là ký tự số."),
                        nationalityCustomer: yup.string().required('Không được để trống trường này.')
                            .min(1, 'Không được để trống trường này!'),
                        // .max(10, 'Không được để trống trường này!'),
                        idCardCustomer: yup.string().required('Không được để trống tường này.')
                            .matches(/^([A-Z][0-9]{5,12})|([0-9]{12})$/, "Hộ chiếu và CCCD phải từ 6-12 ký tự."),
                        dateCustomer: yup.date().required('Không được để trống trường này.')
                            .max(maxDate, 'Khách hàng phải trên 18 tuổi.')
                            .min(minDate, 'Khách hàng phải trên 18 tuổi và dưới 100 tuổi.'),
                        password: yup.string().required('Không được để trống trường này.')
                            .matches(/^(?=.*[A-Z])(?=.*[0-9]).{8,20}$/, "Mật khẩu phải từ 8 ký tự và ít hơn 20 ký tự, có chứa ký tự in hoa và ký tự số."),
                        passwordAgain: yup.string()
                            .oneOf([yup.ref('password'), null], 'Mật khẩu nhập lại không đúng.')
                            .required('Không được để trống trường này.'),

                    })}
                    onSubmit={async (values, {setSubmitting, resetForm}) => {
                        // setSubmitting(false);
                        console.log(values);
                        values = {
                            ...values,
                            genderCustomer: +values.genderCustomer
                        }
                        console.log(values);

                        try {
                            // Gửi yêu cầu đăng ký
                            const response = await axios.post(
                                "http://localhost:8080/api/account/signup", {
                                    ...values,
                                    genderCustomer: +values.genderCustomer
                                }
                            );
                            console.log(response.data.username)
                            console.log(userName);
                            // Kiểm tra response
                            if (response.data.username != null) {
                                setUserName(response.data.username.toString());
                            }
                            console.log(userName);
                            // resetForm();
                            // Đăng ký thành công, chuyển hướng hoặc thực hiện hành động khác
                            navigate(`/checkCode/${response.data.username}`);
                            // <CheckCode propData = {userName}/>;
                        } catch (e) {
                            // Xử lý lỗi đăng ký
                            // toast.error(e.response.data);
                            await Swal.fire({
                                title: "Đăng ký thất bại",
                                text: 'Email đăng ký đã tồn tại !',
                                icon: "warning",
                                timer: 2000
                            })
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({isSubmitting}) => (
                        <div className="bgimagebody" style={{paddingBottom: "50px"}}>
                            <h1 className="w3ls" style={{color: "rgb(6, 133, 170)"}}>
                                ĐĂNG KÝ
                            </h1>
                            <div className="content-w3ls" style={{
                                backgroundColor: "rgba(255, 255, 255, 0.7)",
                                borderRadius: "7px",
                                padding: "20px 0 5px"
                            }}>
                                <div className="row">
                                    <div className="col-md-5" style={{
                                        marginTop: "2%",
                                        paddingLeft: "8%",
                                        color: "rgb(6, 133, 170)",
                                        fontWeight: "bold"
                                    }}>
                                        <div className="content-agile2"
                                             style={{backgroundColor: "rgba(255, 255, 255, 0.7)"}}>
                                            {/*<span style={{fontSize: "18px"}}>&nbsp; / &nbsp;</span>*/}
                                            <div style={{margin: "10px", fontSize: "18px"}}>
                                                <p>- Tất cả các trường có dấu (<sup style={{fontSize: 8}}><sup><i
                                                    className="fa-solid fa-star-of-life"
                                                    style={{color: "#ff0019"}}/></sup></sup>
                                                    ) là bắt buộc</p>
                                                <p>- Qúy khách nhập đúng thông tin trong hộ chiếu /Chứng minh nhân
                                                    dân
                                                    /Căn cước công dân</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="content-agile2">
                                            <Form>
                                                <div className="row">
                                                    <div className="col-md-4"
                                                         style={{
                                                             marginTop: "2%",
                                                             paddingLeft: "7%",
                                                             color: "rgb(6, 133, 170)",
                                                             fontWeight: "bold"
                                                         }}
                                                    >
                                                        {/*                     style="margin-top: 2%;padding-left: 10%; color: rgb(6, 133, 170); font-weight: bold"*/}
                                                        <span>Email(<sup style={{fontSize: 8}}><sup><i
                                                            className="fa-solid fa-star-of-life"
                                                            style={{color: "#ff0019"}}/></sup></sup>
                                            )</span>
                                                        {/*                    <p style="color: red">Chưa nhập email</p>*/}
                                                    </div>
                                                    <div className="col-md-8">
                                                        <Field
                                                            type="email"
                                                            id="email"
                                                            name="emailCustomer"
                                                            placeholder="xxx@xxx.xxx"
                                                        />
                                                        <div className="row">
                                                            <div className="col-1"/>
                                                            <div className="col-10">
                                                                <ErrorMessage component="span" name="emailCustomer"
                                                                              className="err-mes"/>
                                                            </div>
                                                            <div className="col-1"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4"
                                                         style={{
                                                             marginTop: "2%",
                                                             paddingLeft: "7%",
                                                             color: "rgb(6, 133, 170)",
                                                             fontWeight: "bold"
                                                         }}
                                                    >
                                                        {/*                     style="margin-top: 2%;padding-left: 10%; color: rgb(6, 133, 170); font-weight: bold"*/}
                                                        <span>
                    Mật khẩu(
                    <sup style={{fontSize: 8}}>
                    <sup>
                    <i
                        className="fa-solid fa-star-of-life"
                        style={{color: "#ff0019"}}
                    />
                    </sup>
                    </sup>)
                    </span>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <Field
                                                            type="password"
                                                            className="lock"
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
                                                    <div className="col-md-4"
                                                         style={{
                                                             marginTop: "2%",
                                                             paddingLeft: "7%",
                                                             color: "rgb(6, 133, 170)",
                                                             fontWeight: "bold"
                                                         }}
                                                    >
                                                        {/*                     style="margin-top: 2%;padding-left: 10%; color: rgb(6, 133, 170); font-weight: bold"*/}
                                                        <span>
                    Nhập lại mật khẩu(
                    <sup style={{fontSize: 8}}>
                    <sup>
                    <i
                        className="fa-solid fa-star-of-life"
                        style={{color: "#ff0019"}}
                    />
                    </sup>
                    </sup>)
                    </span>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <Field
                                                            type="password"
                                                            className="lock"
                                                            name="passwordAgain"
                                                            placeholder="*****"
                                                            id="password2"
                                                            required=""
                                                        />
                                                        <div className="row">
                                                            <div className="col-1"/>
                                                            <div className="col-10">
                                                                <ErrorMessage component="span" name="passwordAgain"
                                                                              className="err-mes"/>
                                                            </div>
                                                            <div className="col-1"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4"
                                                         style={{
                                                             marginTop: "2%",
                                                             paddingLeft: "7%",
                                                             color: "rgb(6, 133, 170)",
                                                             fontWeight: "bold"
                                                         }}
                                                    >
                                                        {/*                     style="margin-top: 2%;padding-left: 10%; color: rgb(6, 133, 170); font-weight: bold"*/}
                                                        <span>
                    Điện thoại(
                    <sup style={{fontSize: 8}}>
                    <sup>
                    <i
                        className="fa-solid fa-star-of-life"
                        style={{color: "#ff0019"}}
                    />
                    </sup>
                    </sup>)
                    </span>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <Field
                                                            type="text"
                                                            id="firstname"
                                                            name="telCustomer"
                                                            placeholder="0123456789/+84123456789"
                                                        />
                                                        <div className="row">
                                                            <div className="col-1"/>
                                                            <div className="col-10">
                                                                <ErrorMessage component="span" name="telCustomer"
                                                                              className="err-mes"/>
                                                            </div>
                                                            <div className="col-1"/>
                                                        </div>
                                                        {/*<ErrorMessage component="span" name="" className="err-mes"/>*/}
                                                        {/*<p className="err-mes">Chưa nhập số điện thoại</p>*/}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4"
                                                         style={{
                                                             marginTop: "2%",
                                                             paddingLeft: "7%",
                                                             color: "rgb(6, 133, 170)",
                                                             fontWeight: "bold"
                                                         }}
                                                    >
                                                        {/*                     style="margin-top: 2%;padding-left: 10%; color: rgb(6, 133, 170); font-weight: bold"*/}
                                                        <span>
                    Họ và tên(
                    <sup style={{fontSize: 8}}>
                    <sup>
                    <i
                        className="fa-solid fa-star-of-life"
                        style={{color: "#ff0019"}}
                    />
                    </sup>
                    </sup>)
                    </span>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <Field
                                                            type="text"
                                                            id="firstname"
                                                            name="nameCustomer"
                                                            placeholder="Nguyen Van A"
                                                            title="Vui lòng nhập họ và tên theo CCCD"
                                                            required=""
                                                        />
                                                        <div className="row">
                                                            <div className="col-1"/>
                                                            <div className="col-10">
                                                                <ErrorMessage component="span" name="nameCustomer"
                                                                              className="err-mes"/>
                                                            </div>
                                                            <div className="col-1"/>
                                                        </div>
                                                        {/*<ErrorMessage component="span" name="" className="err-mes"/>*/}
                                                        {/*<p className="err-mes">Chưa nhập họ và tên</p>*/}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4"
                                                         style={{
                                                             marginTop: "2%",
                                                             paddingLeft: "7%",
                                                             color: "rgb(6, 133, 170)",
                                                             fontWeight: "bold"
                                                         }}
                                                    >
                                                        {/*                     style="margin-top: 2%;padding-left: 10%; color: rgb(6, 133, 170); font-weight: bold"*/}
                                                        <span>
                    Ngày sinh(
                    <sup style={{fontSize: 8}}>
                    <sup>
                    <i
                        className="fa-solid fa-star-of-life"
                        style={{color: "#ff0019"}}
                    />
                    </sup>
                    </sup>)
                    </span>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <Field
                                                            type="date"
                                                            id="email"
                                                            name="dateCustomer"
                                                            // placeholder="Chọn"
                                                        />
                                                        <div className="row">
                                                            <div className="col-1"/>
                                                            <div className="col-10">
                                                                <ErrorMessage component="span" name="dateCustomer"
                                                                              className="err-mes"/>
                                                            </div>
                                                            <div className="col-1"/>
                                                        </div>
                                                        {/*<ErrorMessage component="span" name="Customer" className="err-mes"/>*/}
                                                        {/*<p className="err-mes">Chưa chọn ngày sinh</p>*/}
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-4"
                                                         style={{
                                                             marginTop: "2%",
                                                             paddingLeft: "7%",
                                                             color: "rgb(6, 133, 170)",
                                                             fontWeight: "bold"
                                                         }}
                                                    >
                                                        {/*                     style="margin-top: 2%;padding-left: 10%; color: rgb(6, 133, 170); font-weight: bold"*/}
                                                        <span>
                    Giới tính(
                    <sup style={{fontSize: 8}}>
                    <sup>
                    <i
                        className="fa-solid fa-star-of-life"
                        style={{color: "#ff0019"}}
                    />
                    </sup>
                    </sup>)
                    </span>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <Field
                                                            as="select"
                                                            className="form-select"
                                                            id="email"
                                                            name="genderCustomer"
                                                            // required=""
                                                        >
                                                            <option value={2}>-- Chọn giới tính --</option>
                                                            <option value={0}>Nam</option>
                                                            <option value={1}>Nữ</option>
                                                            {/*<option value="3">Khác</option>*/}
                                                        </Field>
                                                        <div className="row">
                                                            <div className="col-1"/>
                                                            <div className="col-10">
                                                                <ErrorMessage component="span" name="genderCustomer"
                                                                              className="err-mes"/>
                                                            </div>
                                                            <div className="col-1"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4"
                                                         style={{
                                                             marginTop: "2%",
                                                             paddingLeft: "7%",
                                                             color: "rgb(6, 133, 170)",
                                                             fontWeight: "bold"
                                                         }}
                                                    >
                                                        {/*                     style="margin-top: 2%;padding-left: 10%; color: rgb(6, 133, 170); font-weight: bold"*/}
                                                        <span>
                    Hộ chiếu/CCCD(
                    <sup style={{fontSize: 8}}>
                    <sup>
                    <i
                        className="fa-solid fa-star-of-life"
                        style={{color: "#ff0019"}}
                    />
                    </sup>
                    </sup>)
                    </span>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <Field
                                                            type="text"
                                                            id="email"
                                                            name="idCardCustomer"
                                                            placeholder="A123456/123456123456"
                                                            // title="Please enter a valid email"
                                                            // required=""
                                                        />
                                                        <div className="row">
                                                            <div className="col-1"/>
                                                            <div className="col-10">
                                                                <ErrorMessage component="span" name="idCardCustomer"
                                                                              className="err-mes"/>
                                                            </div>
                                                            <div className="col-1"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4"
                                                         style={{
                                                             marginTop: "2%",
                                                             paddingLeft: "7%",
                                                             color: "rgb(6, 133, 170)",
                                                             fontWeight: "bold"
                                                         }}
                                                    >
                                                        {/*                     style="margin-top: 2%;padding-left: 10%; color: rgb(6, 133, 170); font-weight: bold"*/}
                                                        <span>
                    Quốc tịch(
                    <sup style={{fontSize: 8}}>
                    <sup>
                    <i className="fa-solid fa-star-of-life"
                       style={{color: "#ff0019"}}
                    />
                    </sup>
                    </sup>)
                    </span>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <Field
                                                            as="select"
                                                            className="form-select"
                                                            id="email"
                                                            name="nationalityCustomer"
                                                            // required=""
                                                        >
                                                            <option value=''>
                                                                <span style={{color: "rgb(6, 133, 170)"}}>
                                                                    -- Chọn quốc tịch --
                                                                </span>
                                                            </option>
                                                            <option value='Việt Nam'>Việt Nam</option>
                                                            <option value='Trung Quốc'>Trung Quốc</option>
                                                            <option value='Thái Lan'>Thái Lan</option>
                                                            <option value='Malaysia'>Malaysia</option>
                                                            <option value='Singapo'>Singapo</option>
                                                            <option value='Anh'>Anh</option>
                                                            <option value='Hàn Quốc'>Hàn Quốc</option>
                                                            <option value='Mỹ'>Mỹ</option>
                                                            <option value='Pháp'>Pháp</option>
                                                            <option value='Nhật Bản'>Nhật Bản</option>
                                                            <option value='Hong Kong'>Hong Kong</option>
                                                            <option value='Macau'>Macau</option>
                                                            <option value='Triều Tiên'>Triều Tiên</option>
                                                            <option value='Ấn Độ'>Ấn Độ</option>
                                                            <option value='Nga'>Nga</option>
                                                            <option value='Quatar'>Quatar</option>
                                                            <option value='Thổ Nhi Kỳ'>Thổ Nhi Kỳ</option>
                                                            <option value='Đan Mạch'>Đan Mạch</option>
                                                            <option value='Đức'>Đức</option>
                                                            <option value='Bỉ'>Bỉ</option>
                                                            <option value='Thụy Sĩ'>Thụy Sĩ</option>
                                                            <option value='Áo'>Áo</option>
                                                            <option value='Argentina'>Argentina</option>
                                                            <option value='Tây Ban Nha'>Tây Ban Nha</option>
                                                            <option value='Bồ Đào Nha'>Bồ Đào Nha</option>
                                                            <option value='Campuchia'>Campuchia</option>
                                                        </Field>
                                                        <div className="row">
                                                            <div className="col-1"/>
                                                            <div className="col-10">
                                                                <ErrorMessage component="span"
                                                                              name="nationalityCustomer"
                                                                              className="err-mes"/>
                                                            </div>
                                                            <div className="col-1"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4"
                                                         style={{
                                                             marginTop: "2%",
                                                             paddingLeft: "7%",
                                                             color: "rgb(6, 133, 170)",
                                                             fontWeight: "bold"
                                                         }}
                                                    >
                                                        {/*                     style="margin-top: 2%;padding-left: 10%; color: rgb(6, 133, 170); font-weight: bold"*/}
                                                        <span>Địa chỉ</span>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <Field
                                                            type="text"
                                                            id="email"
                                                            name="addressCustomer"
                                                            placeholder=""
                                                        />
                                                        <div className="row">
                                                            <div className="col-1"/>
                                                            <div className="col-10">
                                                                <ErrorMessage component="span"
                                                                              name="addressCustomer"
                                                                              className="err-mes"/>
                                                            </div>
                                                            <div className="col-1"/>
                                                        </div>
                                                        {/*<ErrorMessage component="span" name="" className="err-mes"/>*/}
                                                    </div>
                                                </div>
                                                <div className="row" style={{margin: "10px"}}>
                                                    <div className="col-3"/>
                                                    <div className="col-6 text-center">
                                                        {
                                                            isSubmitting ? <ThreeDots/> :
                                                                <button type="submit" className="btn"
                                                                        style={{
                                                                            marginTop: "10%",
                                                                            // paddingLeft: "15%",
                                                                            backgroundColor: "rgb(6, 133, 170)",
                                                                            color: "white",
                                                                            // fontWeight: "bold",
                                                                            fontSize: "18px"
                                                                        }}>
                                                                    Đăng Ký
                                                                </button>
                                                        }
                                                    </div>
                                                    <div className="col-3" style={{marginTop: "5%"}}>
                                                        <Link to='/login' style={{
                                                            textDecoration: "underline",
                                                            fontSize: "18px",
                                                            paddingRight: "2px"
                                                        }}>Đăng
                                                            nhập
                                                        </Link>
                                                    </div>
                                                </div>
                                            </Form>
                                            {/*<div className="text-center">*/}
                                            {/*    <button type="button" className="btn btn-primary" style={{margin: "1%"}}>*/}
                                            {/*        <i className="fab fa-facebook"/>*/}
                                            {/*    </button>*/}
                                            {/*    <button type="button" className="btn btn-danger">*/}
                                            {/*        <i className="fab fa-google"/>*/}
                                            {/*    </button>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                    <div className="col-md-1"/>
                                    {/*<div className="clear"/>*/}
                                </div>
                            </div>
                        </div>
                    )}
                </Formik>
                : <Logined/>) : <Logined/>) : <Logined/>
            }
        </>
    )
}