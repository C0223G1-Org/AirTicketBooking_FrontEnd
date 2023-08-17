import React, {useEffect, useRef, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as EmployeeService from "../../services/EmployeeServices";
import './employeeEdit.css';
import * as Yup from "yup";
import {Link, useNavigate} from "react-router-dom";


import {v4} from "uuid";
import {createEmployee} from "../../services/EmployeeServices";
import Swal from "sweetalert2";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../firebase-chat";


function CreateEmployee() {
    const navigate = useNavigate();
    // const [roleList, setRoleList] = useState([])
    // useEffect(() => {
    //     const listRole = async () => {
    //         let rs = await RoleService.findByRole();
    //         setRoleList(rs)
    //     }
    //     listRole()
    // }, [])
    const imgPreviewRef = useRef(null)
    const inputFileRef = useRef(null);
    const [imageUpload, setImageUpload] = useState(null);
    const savePost = (async (post) => {
        const fileName = `images/${imageUpload.name + v4()}`
        const imageRef = ref(storage, fileName);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async (url) => {
                console.log(url)

                await createEmployee({
                    ...post,
                    image: url
                }).then(
                    navigate("/employee")
                )
                console.log(url);
            })
        }).then(
            () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Tạo mới thành công !',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        )
    })
    const handleInputChange = (event) => {
        const file = event.target.files[0];
        if (file.size > 3000000) {
            Swal.fire({
                icon: 'error',
                title: 'Dung lượng ảnh tối đa 3MB',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }
        if (!file){
            Swal.fire({
                icon: 'error',
                title: 'vui long chon anh',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }
            setImageUpload(file)
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            imgPreviewRef.current.src = reader.result;
            imgPreviewRef.current.style.display = "block";
        });
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <div>
                <div id="booking" className="section">
                    <div className="section-center">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                                    <div>
                                        {/*<img*/}
                                        {/*    src="https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"*/}
                                        {/*    alt="Preview Image" id="img-preview"/>*/}
                                        <img style={{marginTop: '50px', marginLeft: '55px'}} name='image'
                                             id="img-preview"
                                             src="https://cdn-icons-png.flaticon.com/256/9131/9131529.png"
                                             ref={imgPreviewRef} alt="Preview Image"/>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-8 col-lg-8">
                                    <div className="booking-form">
                                        <div className="title" style={{padding: '0px'}}>
                                            <p>Thêm mới nhân viên</p>
                                        </div>
                                        <Formik initialValues={{
                                            nameEmployee: "",
                                            dateEmployee: "",
                                            telEmployee: "",
                                            image: "",
                                            gender: true,
                                            emailEmployee: "",
                                            passwordEmployee: "",
                                            confirmPasswordEmployee: "",
                                            typeEmployee: {
                                                idEmployee: 1
                                            }
                                        }}
                                                validationSchema={Yup.object({
                                                    nameEmployee: Yup.string()
                                                        .required("Vui lòng nhập.")
                                                        .min(5, "Tên quá ngắn,phải từ 5 kí tự.")
                                                        .max(50, "tên quá dài.")
                                                        .matches(/^[^!@#$%^&*()+=\[\]{};':"\\|.<>?`~/]+$/, "Tên không chứa ký tự đặc biệt như @#$.."),
                                                    dateEmployee: Yup.date()
                                                        .required("Vui lòng chọn.")
                                                        .test("is-over-18", "Bạn chưa đủ 18 . ", function (value) {
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
                                                        .required("Vui lòng chọn giới tính."),
                                                    emailEmployee: Yup.string()
                                                        .matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                                            "Email phải đúng định dạng xxx@gmail.com.")
                                                        .required("Vui lòng nhập email."),
                                                    // image: Yup.string()
                                                    //     .required("Vui lòng chọn ảnh."),
                                                    telEmployee: Yup.string()
                                                        .required("Vui lòng nhập số điện thoại.")
                                                        .matches(
                                                            /^(\+?84|0)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-9])[0-9]{7}$/,
                                                            "Số điện thoại không hợp lệ, phải từ 10 hoặc 11 số."
                                                        ),

                                                    passwordEmployee: Yup.string()
                                                        .required("Vui lòng nhập mật .")
                                                        .min(5, "Mật khẩu quá ngắn,phải từ 5 kí tự.")
                                                        .max(50, "Mật khẩu quá dài."),
                                                    confirmPasswordEmployee: Yup.string()
                                                        .required("Vui lòng nhập mật khẩu xác nhận.")
                                                        .oneOf([Yup.ref('passwordEmployee'), null], 'Mật khẩu xác nhận không khớp.')

                                                })}
                                                onSubmit={(values) => {
                                                    console.log(values)

                                                    savePost(values)


                                                }}
                                        >


                                            <Form className="booking-form-padding">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                        <span className="form-label">Họ và tên (<span
                                            style={{color: 'red'}}>*</span>)</span>
                                                            <Field name='nameEmployee' className="form-control"
                                                                   type="text"/>
                                                            <ErrorMessage name='nameEmployee' component='div'
                                                                          className='error_red_employee'/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                        <span className="form-label">Ngày sinh (<span
                                            style={{color: 'red'}}>*</span>)</span>
                                                            <Field name='dateEmployee' className="form-control"
                                                                   type="date"/>
                                                            <ErrorMessage name='dateEmployee' component='div'
                                                                          className='error_red_employee'/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                        <span className="form-label">Email (<span
                                            style={{color: 'red'}}>*</span>)</span>
                                                            <Field name='emailEmployee' className="form-control"
                                                                   type="text"/>
                                                            <ErrorMessage name='emailEmployee' component='div'
                                                                          className='error_red_employee'/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                             <span className="form-label">Giới tính (<span
                                                                 style={{color: 'red'}}>*</span>)</span>
                                                            <Field name='gender' className="form-control"
                                                                   as="select">
                                                                <option value={true}>Nam</option>
                                                                <option value={false}>Nữ</option>
                                                            </Field>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                           <span className="form-label">Mật khẩu (<span
                                               style={{color: 'red'}}>*</span>)</span>
                                                            <Field name='passwordEmployee' className="form-control"
                                                                   type="password"/>
                                                            <ErrorMessage name='passwordEmployee' component='div'
                                                                          className='error_red_employee'/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                <span className="form-label">Nhập lại mật khẩu (<span
                                                    style={{color: 'red'}}>*</span>)</span>
                                                            <Field className="form-control" type="password"
                                                                   name='confirmPasswordEmployee'/>
                                                            <ErrorMessage name='confirmPasswordEmployee' component='div'
                                                                          className='error_red_employee'/>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                            <span className="form-label">Số điện thoại (<span
                                                style={{color: 'red'}}>*</span>)</span>
                                                            <Field className="form-control" type="text"
                                                                   name='telEmployee'/>
                                                            <ErrorMessage name='telEmployee' component='div'
                                                                          className='error_red_employee'/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                        <span className="form-label">Cập nhật hình ảnh (<span
                                                            style={{color: 'red'}}>*</span>)</span>
                                                            <Field className="custom-file-input"
                                                                   accept="image/png, image/gif, image/jpeg" type="file"
                                                                   id="input-file"
                                                                   style={{
                                                                       marginTop: "30px",
                                                                       marginLeft: "30px",
                                                                       width: '50%'
                                                                   }}
                                                                   ref={inputFileRef} onChange={handleInputChange}
                                                                   name='image'/>
                                                            <ErrorMessage name='image' component='div'
                                                                          className='error_red_employee'/>
                                                        </div>
                                                    </div>
                                                    <div style={{textAlign: 'center'}}>
                                                        <Link to='/employee' className="btn"
                                                              style={{
                                                                  background: 'gray',
                                                                  marginRight: '10px',
                                                                  color: 'white'
                                                              }}>Quay
                                                            lại
                                                        </Link>
                                                        <button type='submit' className="btn"
                                                                style={{background: '#daa32a'}}>Thêm mới
                                                        </button>
                                                    </div>
                                                </div>
                                            </Form>
                                        </Formik>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateEmployee;