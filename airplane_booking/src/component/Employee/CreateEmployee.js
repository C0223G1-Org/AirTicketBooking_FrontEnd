import React, {useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as EmployeeService from "../../services/EmployeeServices";
import './employeeEdit.css';
import * as Yup from "yup";
import * as AccountService from "../../services/AccountServices";
import * as RoleService from "../../services/RoleServices";
import {Link, useNavigate} from "react-router-dom";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../firebase-chat";

function CreateEmployee() {
    let navigate = useNavigate();
    const [roleList, setRoleList] = useState([])
    useEffect(() => {
        const listRole = async () => {
            let rs = await RoleService.findByRole();
            setRoleList(rs)
        }
        listRole()
    }, [])

    const [avatar, setAvatarFile] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [fileSelected, setFileSelected] = useState(false);

    const handleAvatarFileSelect = (event) => {
        handleFileSelect(event, setAvatarFile, setAvatarUrl);
    };
    const handleFileSelect = (event, setFile, setFileUrl) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
        }
    };
    const handleAvatarFileUpload = async () => {
        return handleFileUpload(avatar, setAvatarUrl);
    };
    const messageError = "Ảnh không được để trống!!";
    const handleFileUpload = async (file, setFile, setFileUrl) => {
        return new Promise((resolve, reject) => {
            if (!file) return reject("No file selected");
            const newName = "pawn_shop_topvn" + Date.now() + "_" + (file.name.length >= 5 ? file.name.slice(0, 5) : file.name);

            const storageRef = ref(storage, `files/${newName}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                },
                (error) => {
                    reject(error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setFile(downloadURL);
                    resolve(downloadURL);
                }
            );
        });
    };


    return (
        <>
            <div id="booking" className="section">
                <div className="section-center">
                    <div className="container">
                        <div className="booking-form">
                            <div className="title" style={{padding: '0px'}}>
                                <p>Thêm mới nhân viên</p>
                            </div>
                            <Formik initialValues={{
                                nameEmployee: '',
                                dateEmployee: '',
                                emailEmployee: '',
                                telEmployee: '',
                                image: '',
                                gender: false,
                                account: {
                                    username: '',
                                    password: '',
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
                                        gender:Yup.boolean()
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
                                        account:Yup.object({
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

                                            await AccountService.createAccount(accountData);

                                            const employeeData = {
                                                nameEmployee: values.nameEmployee,
                                                dateEmployee: values.dateEmployee,
                                                emailEmployee: values.emailEmployee,
                                                telEmployee: values.telEmployee,
                                                image: avatar.name,
                                                gender: values.gender,
                                                account: {...values.account, role: {idRole: +values.account.role}}
                                            };

                                            await EmployeeService.createEmployee(employeeData);

                                            alert("Thêm mới thành công");
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
                                                <ErrorMessage name='nameEmployee' style={{color:'red'}} className='mesError'/>
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
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                           <span className="form-label">Nhập user name <span
                                               style={{color: 'red'}}>*</span></span>
                                                <Field name='account.username' className="form-control" type="text"/>
                                                <ErrorMessage name='account.username'/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <span className="form-label">Mật khẩu <span
                                                    style={{color: 'red'}}>*</span></span>
                                                <Field className="form-control" type="password"
                                                       name='account.password'/>
                                                <ErrorMessage name='account.password' className='mesError'/>

                                            </div>
                                        </div>
                                    </div>
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
                                            <div className="form-group">
                                        <span className="form-label" style={{marginBottom: '30px'}}>Hình ảnh <span
                                            style={{color: 'red'}}>*</span></span>
                                            </div>

                                            {/*<Field name='image' className="form-control" type="file"*/}
                                            {/*       style={{marginLeft: '4%'}}/>*/}
                                            {/*<ErrorMessage name='image'/>*/}

                                            {avatar ? (
                                                <div>
                                                    <img
                                                        name='image'
                                                        id="avatar-img"
                                                        src={URL.createObjectURL(avatar)}
                                                        style={{width: "40%", margin: '20px'}}
                                                        alt="Image Loading.."/>
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger btn-sm mt-2"
                                                        onClick={() => {
                                                            setAvatarFile(null);
                                                            setAvatarUrl("");
                                                            setFileSelected(false);
                                                        }}
                                                    >
                                                        Xoá
                                                    </button>
                                                </div>
                                            ) : (
                                                <img
                                                    id="avatar-img"
                                                    src="https://politicalscience.columbian.gwu.edu/sites/g/files/zaxdzs4796/files/image/profile_graphic_1080x1080.png"
                                                    width="20%"
                                                    alt="Image Loading.."
                                                    name='image'
                                                    style={{width: "40%", margin: '20px'}}
                                                />
                                            )}

                                            <Field
                                                type="file"
                                                onChange={(event) => {
                                                    handleAvatarFileSelect(event);
                                                    setFileSelected(true);
                                                }}
                                                id="image"
                                                name="image"
                                                className="form-control-plaintext d-none"
                                            />

                                            {!avatar && (
                                                <label style={{width: '50%', height: '10%', padding: '0px'}}>
                                                    <label
                                                        htmlFor="image"
                                                        className='btn btn-success'
                                                        style={{width: '100%'}}

                                                    >
                                                        <i className="bi bi-upload"
                                                           style={{width: '20%', height: '10%'}}> Chọn hình ảnh</i>
                                                    </label>
                                                </label>
                                            )}


                                        </div>
                                        {fileSelected ? null : (
                                            <span className="text-danger"> {messageError}</span>
                                        )}
                                    </div>
                                    <div style={{textAlign: 'center'}}>
                                        <Link to='/' className="btn"
                                              style={{background: 'gray', marginRight: '10px', color: 'white'}}>Quay
                                            lại
                                        </Link>
                                        <button type='submit' className="btn" style={{background: '#daa32a'}}>Thêm mới
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateEmployee;