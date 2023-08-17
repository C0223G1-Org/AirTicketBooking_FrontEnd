import './employeeEdit.css';
import * as Yup from "yup";

// import {storage} from "./firebare";
import React, {useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {Link, useNavigate, useParams} from 'react-router-dom';
import * as EmployeeService from '../../services/EmployeeServices';
import * as AccountService from '../../services/AccountServices';
import * as RoleService from '../../services/RoleServices';
// import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';


export default function EditEmployee() {
    let navigate = useNavigate();
    let param = useParams();
    const [roleList, setRoleList] = useState([]);
    const [employeeId, setEmployeesId] = useState(null);
    const [accountId,setAccountId]=useState(null)
    const [avatar, setAvatarFile] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [fileSelected, setFileSelected] = useState(false);

    useEffect(() => {
        const list = async () => {
            const rs=await RoleService.findByRole()
            setRoleList(rs)
        }
        list()
    }, [])

    useEffect(()=>{
        const findByAccount =async ()=>{
            const rs =await AccountService.findById(param.id)
            setAccountId(rs)
        }
        findByAccount()
    },[param.id])

    useEffect(() => {
        const fetchEmployeeById = async () => {
            const rs = await EmployeeService.findById(param.id)
            console.log(rs)
            setEmployeesId(rs)
        }
        fetchEmployeeById()
    }, [param.id])


    if (!employeeId) {
        return null;
    }


    return (
        <>
            <div id="booking" className="section">
                <div className="section-center">
                    <div className="container">
                        <div className="booking-form">
                            <div className="title" style={{padding: '0px'}}>
                                <p>Chỉnh sửa thông tin nhân viên</p>
                            </div>
                            <Formik initialValues={{
                                nameEmployee: employeeId.nameEmployee,
                                dateEmployee: employeeId.dateEmployee,
                                emailEmployee: employeeId.emailEmployee,
                                telEmployee: employeeId.telEmployee,
                                image: employeeId.image,
                                gender: employeeId.gender,
                                account: {
                                    username: accountId.username,
                                    password: accountId.password,
                                    role: {
                                        idRole: 1
                                    }
                                }
                            }}
                                    validationSchema={Yup.object({
                                        nameEmployee: Yup.string()
                                            .required("Vui lòng nhập")
                                            .min(5, "Tên quá ngắn,phải từ 5 kí tự")
                                            .max(50, "tên quá dài")
                                            .matches(/^[^!@#$%^&*()+=\[\]{};':"\\|.<>?`~/]+$/, "Tên không chứa ký tự đặc biệt như @#$.."),
                                        dateEmployee: Yup.date()
                                            .required("Vui lòng chọn")
                                            .test("is-over-18", "Bạn chưa đủ 18 tuổi ", function (value) {
                                                const currentDate = new Date();
                                                const selectedDate = new Date(value);
                                                const ageDiff =
                                                    currentDate.getFullYear() - selectedDate.getFullYear();
                                                if (ageDiff < 18) {
                                                    return false;
                                                }
                                                return true;
                                            }),
                                        gender: Yup.boolean()
                                            .required("Vui lòng chọn giới tính"),
                                        emailEmployee: Yup.string()
                                            .matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                                "Email phải đúng định dạng xxx@gmail.com")
                                            .required("Vui lòng nhập email")
                                        ,
                                        telEmployee: Yup.string()
                                            .required("Vui lòng nhập số điện thoại")
                                            .matches(
                                                /^(\+?84|0)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-9])[0-9]{7}$/,
                                                "Số điện thoại không hợp lệ, phải từ 10 hoặc 11 số"
                                            ),
                                        account: Yup.object({
                                            username: Yup.string()
                                                .required("Vui lòng nhập tài khoản")
                                                .min(5, "Tài khoản quá ngắn,phải từ 5 kí tự")
                                                .max(50, "Tài khoản quá dài"),
                                            password: Yup.string()
                                                .required("Vui lòng nhập mật khẩu")
                                                .min(5, "Mật khẩu quá ngắn,phải từ 5 kí tự")
                                                .max(50, "Mật khẩu quá dài")
                                        })

                                    })}
                                    onSubmit={async (values) => {
                                        console.log(values)
                                        console.log(avatar)
                                        try {
                                            console.log(values)
                                            const accountData = {
                                                username: values.account.username,
                                                password: values.account.password,
                                                role: {idRole: +values.account.role},
                                            };

                                            await AccountService.editAccount(accountData);

                                            const employeeData = {
                                                nameEmployee: values.nameEmployee,
                                                dateEmployee: values.dateEmployee,
                                                emailEmployee: values.emailEmployee,
                                                telEmployee: values.telEmployee,
                                                image: values.image,
                                                gender: values.gender,
                                                account: {...values.account, role: {idRole: +values.account.role}}
                                            };

                                            await EmployeeService.updateEmployee(employeeData);

                                            alert("Chỉnh sửa thành công");
                                            navigate('/')
                                        } catch (error) {
                                            console.error('Lỗi khi thêm mới:', error);
                                        }
                                    }}

                            >

                                <Form className="booking-form-padding">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                        <span className="form-label">Họ và tên <span
                                            style={{color: 'red'}}>*</span></span>
                                                <Field name='nameEmployee' className="form-control" type="text"/>
                                                <ErrorMessage name='nameEmployee' style={{color: 'red'}}
                                                              className='mesError'/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                        <span className="form-label">Ngày sinh <span
                                            style={{color: 'red'}}>*</span></span>
                                                <Field name='dateEmployee' className="form-control" type="date"/>
                                                <ErrorMessage name='dateEmployee'/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                        <span className="form-label">Email <span
                                            style={{color: 'red'}}>*</span></span>
                                                <Field name='emailEmployee' className="form-control" type="text"/>
                                                <ErrorMessage name='emailEmployee'/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-checkbox" style={{marginTop: '4px'}}>
                                                <label style={{paddingLeft: '20px', marginBottom: '20px'}}
                                                       id="id_gioi_tinh_employee">
                                                    <span/>Giới tính <span style={{color: 'red'}}>*</span>
                                                </label>
                                                <label htmlFor="one-way">
                                                    <Field type="radio" id="one-way" name="gender" value='false'/>
                                                    <span/>Nam
                                                </label>
                                                <label htmlFor="multi-city">
                                                    <Field type="radio" id="multi-city" name="gender" value='true'/>
                                                    <span/>Nữ
                                                    <ErrorMessage name='gender'/>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    {/*<div className="row">*/}
                                    {/*    <div className="col-md-6">*/}
                                    {/*        <div className="form-group">*/}
                                    {/*       <span className="form-label">Nhập user name <span*/}
                                    {/*           style={{color: 'red'}}>*</span></span>*/}
                                    {/*            <Field name='account.username' className="form-control" type="text"/>*/}
                                    {/*            <ErrorMessage name='account.username'/>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*    <div className="col-md-6">*/}
                                    {/*        <div className="form-group">*/}
                                    {/*            <span className="form-label">Mật khẩu <span*/}
                                    {/*                style={{color: 'red'}}>*</span></span>*/}
                                    {/*            <Field className="form-control" type="password"*/}
                                    {/*                   name='account.password'/>*/}
                                    {/*            <ErrorMessage name='account.password' className='mesError'/>*/}

                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                            <span className="form-label">Số điện thoại <span
                                                style={{color: 'red'}}>*</span></span>
                                                <Field className="form-control" type="text" name='telEmployee'/>
                                                <ErrorMessage name='telEmployee'/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <span className="form-label">Phân quyền <span
                                                    style={{color: 'red'}}>*</span></span>
                                                <Field component='select' name='account.role' className="form-control">
                                                    {
                                                        roleList.map((value, index) => (
                                                            <option key={index} value={value.idRole}>
                                                                {value.nameRole}
                                                            </option>
                                                        ))
                                                    }
                                                </Field>
                                                <span className="select-arrow"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                        {/*    <div className="form-group">*/}
                                        {/*<span className="form-label" style={{marginBottom: '30px'}}>Hình ảnh <span*/}
                                        {/*    style={{color: 'red'}}>*</span></span>*/}
                                        {/*    </div>*/}

                                            {/*<Field name='image' className="form-control" type="file"*/}
                                            {/*       style={{marginLeft: '4%'}}/>*/}
                                            {/*<ErrorMessage name='image'/>*/}

                                        </div>
                                    </div>
                                    <div style={{textAlign: 'center'}}>
                                        <Link to='/' className="btn"
                                              style={{background: 'gray', marginRight: '10px', color: 'white'}}>Quay
                                            lại
                                        </Link>
                                        <button type='submit' className="btn" style={{background: '#daa32a'}}>Chỉnh sửa
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>);
}

