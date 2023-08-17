import React, {useEffect, useRef, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as EmployeeService from "../../services/EmployeeServices";
import './employeeEdit.css';
import * as Yup from "yup";
import {Link, useNavigate, useParams} from "react-router-dom";

import {v4} from "uuid";
import {createEmployee, updateEmployee} from "../../services/EmployeeServices";
import Swal from "sweetalert2";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../firebase-chat";



function EditEmployee() {
    const navigate = useNavigate();
    const param = useParams();
    const imgPreviewRef = useRef(null)
    const inputFileRef = useRef(null);
    const [imageUpload, setImageUpload] = useState(null);
    const [employeeId, setEmployeesId] = useState(null);
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


    const savePost = async (post) => {
        const fileName = `images/${imageUpload.name + v4()}`
        const imageRef = ref(storage, fileName);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async (url) => {
                console.log(url)

                await updateEmployee({
                    ...post, image: url

                }).then(navigate("/employee"))
                console.log(url);
            })
        }).then(() => {
            Swal.fire({
                icon: 'success', title: 'Chỉnh sửa thành công !', showConfirmButton: false, timer: 1000
            })
        })
    }
    const handleInputChange = (event) => {
        const file = event.target.files[0];
        if (file.size > 3000000) {
            Swal.fire({
                icon: 'error', title: 'Dung lượng ảnh tối đa 3MB', showConfirmButton: false, timer: 1500
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


    return (<>
            <div>
                <div id="bookingQuoc" className="sectionQuoc">
                    <div className="sectionQuoc-center">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                                    <div>
                                        {/*<img*/}
                                        {/*    src="https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"*/}
                                        {/*    alt="Preview Image" id="img-preview"/>*/}
                                        <img style={{marginTop: '10px',marginLeft:'100px'}} name='image'
                                             id="img-preview" src={employeeId.image} ref={imgPreviewRef}
                                             alt="Preview Image"/>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-12 col-md-6 col-lg-6" style={{padding: '0px'}}>
                                    <div className="booking-formQuoc">
                                        <div className="" style={{width:'100%'}}>
                                            <p className='pQuoc'>Chỉnh sửa nhân viên</p>
                                        </div>
                                        <Formik initialValues={{
                                            idEmployee: employeeId.idEmployee,
                                            nameEmployee: employeeId.nameEmployee,
                                            dateEmployee: employeeId.dateEmployee,
                                            telEmployee: employeeId.telEmployee,
                                            // image: employeeId.image,
                                            gender: employeeId.gender,
                                            emailEmployee: employeeId.emailEmployee,
                                            passwordEmployee: employeeId.passwordEmployee, // confirmPasswordEmployee: employeeId.confirmPasswordEmployee,
                                            typeEmployee: {
                                                idEmployee: 1
                                            }
                                        }}
                                                validationSchema={Yup.object({
                                                    nameEmployee: Yup.string()
                                                        .required("Vui lòng nhập.")
                                                        .min(5, "Tên quá ngắn,phải từ 5 kí tự.")
                                                        .max(50, "tên quá dài.")
                                                        .matches(/^[^!@#$%^&*()+=\[\]{};':"\\|.<>?`~0-9]+$/, "Tên không chứa ký tự đặc biệt như @#$.. và số."),
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
                                                        })
                                                        .test("is-under-60", "Bạn đã quá 60 tuổi.", function (value) {
                                                            const currentDate = new Date();
                                                            const selectedDate = new Date(value);
                                                            const ageDiff = currentDate.getFullYear() - selectedDate.getFullYear();
                                                            return ageDiff <= 60;
                                                        }),
                                                    gender: Yup.boolean()
                                                        .required("Vui lòng chọn giới ."), // emailEmployee: Yup.string()
                                                    //     .matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                                    //         "Email phải đúng định dạng xxx@gmail.com")
                                                    //     .required("Vui lòng nhập email")
                                                    // ,
                                                    telEmployee: Yup.string()
                                                        .required("Vui lòng nhập số điện thoại.")
                                                        .matches(/^(\+?84|0)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-9])[0-9]{7}$/, "Số điện thoại không hợp lệ, phải từ 10 hoặc 11 số"), // passwordEmployee: Yup.string()
                                                    //     .required("Vui lòng nhập mật khẩu")
                                                    //     .min(5, "Mật khẩu quá ngắn,phải từ 5 kí tự")
                                                    //     .max(50, "Mật khẩu quá dài"),
                                                    // confirmPasswordEmployee: Yup.string()
                                                    //     .required("Vui lòng nhập mật khẩu xác nhận")
                                                    //     .oneOf([Yup.ref('passwordEmployee'), null], 'Mật khẩu xác nhận không khớp')

                                                })}
                                                onSubmit={(values) => {
                                                    console.log(values)
                                                    savePost(values)


                                                }}
                                        >


                                            <Form className="booking-formQuoc-padding">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                        <span className="form-label">Họ và tên (<span
                                            style={{color: 'red'}}>*</span>)</span>
                                                            <Field name='nameEmployee' className="form-control"
                                                                   type="text"/>
                                                            <ErrorMessage name='nameEmployee' component='div' className='error_red_employee'/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                        <span className="form-label">Ngày sinh (<span
                                            style={{color: 'red'}}>*</span>)</span>
                                                            <Field name='dateEmployee' className="form-control"
                                                                   type="date"/>
                                                            <ErrorMessage name='dateEmployee' component='div' className='error_red_employee'/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <span className="form-label">Email </span>

                                                            <div
                                                                className="form-control">{employeeId.emailEmployee}</div>
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
                                                    <span className="form-label">Số điện thoại (<span
                                                        style={{color: 'red'}}>*</span>)</span>
                                                            <Field className="form-control" type="text"
                                                                   name='telEmployee'/>
                                                            <ErrorMessage name='telEmployee' component='div' className='error_red_employee'/>
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
                                                            <ErrorMessage name='image' component='div' className='error_red_employee'/>
                                                        </div>
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
                                                            style={{background: '#daa32a'}}>Xác nhận
                                                    </button>
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
    )
        ;
}

export default EditEmployee;