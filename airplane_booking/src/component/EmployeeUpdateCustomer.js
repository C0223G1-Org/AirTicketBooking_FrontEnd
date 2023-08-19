import React, { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup"
import Swal from 'sweetalert2';
import { GetCustomerById, UpdateCustomer } from '../services/CustomerServices';
import "../employeeCreateCustomer.css"
import { useNavigate, useParams } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase-chat';
import { v4 } from "uuid";


function EmployeeUpdateCustomer() {
    const [fileUpload, setFileUpload] = useState(null)
    const [oldUrl, setOldUrl] = useState("")

    const navigave = useNavigate()
    const params = useParams();
    const [customer, setCustomer] = useState({})

    const imgPreviewRef = useRef(null);

    const setOldImg = () => {
        var imgElement = document.getElementById("img-preview");
        if(oldUrl){
        imgElement.src = oldUrl;}
    }
    const onChange = (file) => {
        setFileUpload(file)
        const reader = new FileReader();
        reader.addEventListener("load", function () {
            imgPreviewRef.current.src = reader.result;
            imgPreviewRef.current.style.display = "block";
        });
        if (file) {
            reader.readAsDataURL(file);
          }
    }

    const getUrl = async (file) => {
        const imgRef = ref(storage, `images/${file.name + v4()}`);
        await uploadBytes(imgRef, file)
        const url = await getDownloadURL(imgRef)
        return url;
    }

    const getCustomer = async () => {
        try {
            const data = await GetCustomerById(params.id)
            console.log(data);
            setCustomer(data)
            
        }
        catch (error) {
            navigave("/customers")
            Swal.fire({
                icon: "error",
                title: "Không tìm thấy đối tượng này",
                timer: 2000,
                showConfirmButton: false
            })
        }
    }
    useEffect(() => {
        getCustomer()
    }, [params.id])
    useEffect(() => {
        setOldUrl(customer.imgCustomer)
    }, [customer])
    useEffect(() => {
        setOldImg()
    }, [oldUrl])

    return (
        <div className='hunglv'>
            {customer.idCustomer &&
                <Formik
                    initialValues={{
                        ...customer, imgCustomer: ""
                    }}

                    validationSchema={yup.object({
                        nameCustomer: yup.string()
                            .required("Không được để trống trường này")
                            .min(3, "Họ và tên tối thiểu 3 ký tự và tối đa 30 ký tự")
                            .max(30, "Họ và tên tối thiểu 3 ký tự và tối đa 30 ký tự")
                            .matches(/^[A-Z]{1}[a-z]*(\s[A-Z]{1}[a-z]*)*$/, "Bạn phải viết hoa chữ cái đầu của từng từ và có khoảng trắng giữa các từ"),
                        genderCustomer: yup.boolean().required("Không được để trống trường này"),
                        emailCustomer: yup.string()
                            .required("Không được để trống trường này")
                            .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Nhập theo định dạng: xxx@xxx.xxx với x không phải là ký tự đặc biệt ")
                            .min(12, "Email tối thiểu 12 ký tự và tối đa 50 ký tự")
                            .max(50, "Email tối thiểu 12 ký tự và tối đa 50 ký tự"),
                        telCustomer: yup.string()
                            .required("Không được để trống trường này")
                            .matches(/^(\+84|0)[1-9][0-9]{8}$/, "Nhập theo định dạng +84xxxxxxxxx hoặc 0xxxxxxxxx với x là ký tự số"),
                        addressCustomer: yup.string()
                            .required("Không được để trống trường này")
                            .min(10, "Địa chỉ tối thiểu 10 ký tự và tối đa 100 ký tự")
                            .max(100, "Địa chỉ tối thiểu 10 ký tự và tối đa 100 ký tự"),

                        nationalityCustomer: yup.string()
                            .required("Không được để trống trường này"),
                        idCardCustomer: yup.string()
                            .required("Không được để trống trường này")
                            .min(6, "CCCD/Passport tối thiểu 6 ký tự và tối đa 12 ký tự")
                            .max(12, "CCCD/Passport tối thiểu 6 ký tự và tối đa 12 ký tự")
                            .matches(/^([A-Z]|[0-9])+$/, "Nhập vào chữ viết hoa và ký tự"),
                        dateCustomer: yup.string()
                            .required("Không được để trống trường này")

                    })}
                    onSubmit={async (values) => {
                        let data = {}
                        if (fileUpload != null) {
                            const urlImage = await getUrl(fileUpload)
                            data = {
                                ...values, imgCustomer: urlImage
                            }
                        } else {
                            data = {
                                ...values, imgCustomer: oldUrl
                            }
                        }
                        console.log(data);
                        await UpdateCustomer(data)
                        navigave("/customers")
                        Swal.fire({
                            icon: 'success',
                            title: "Sửa đổi thành công",
                            timer: 2000,
                            showConfirmButton: false
                        }
                        )

                    }}
                >

                    <div id="booking" className="section">
                        <div className="section-center">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                                        <div>
                                        <img src="https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg" 
                    ref={imgPreviewRef} alt="Preview Image" id="img-preview" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-md-8 col-lg-8">
                                        <div className="booking-form">
                                            <div>
                                                <p>Thông Tin Khách Hàng</p>
                                            </div>
                                            <Form className="booking-form-padding">
                                                <Field type="hidden" name="idCustomer"></Field>
                                                <Field type="hidden" name="account" value={JSON.stringify(customer.account)} />
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <span className="form-label">Họ và tên (
                                                                <sup style={{ fontSize: '8px' }}>
                                                                    <sup>
                                                                        <i className="fa-solid fa-star-of-life" style={{ color: '#ff0019' }}>
                                                                        </i>
                                                                    </sup>
                                                                </sup>)
                                                            </span>
                                                            <Field className="form-control" name="nameCustomer" type="text" placeholder="Tên đầy đủ" />
                                                            <ErrorMessage className='error' name='nameCustomer' component={"div"} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <span className="form-label">Giới tính (
                                                                <sup style={{ fontSize: '8px' }}>
                                                                    <sup>
                                                                        <i className="fa-solid fa-star-of-life" style={{ color: '#ff0019' }}>
                                                                        </i>
                                                                    </sup>
                                                                </sup>)
                                                            </span>

                                                            <Field className="form-control" as="select" name="genderCustomer">
                                                                <option value="">Chọn giới tính</option>

                                                                <option value={true}>Nam</option>
                                                                <option value={false}>Nữ</option>

                                                            </Field>
                                                            <ErrorMessage className='error' name='genderCustomer' component={"div"} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <span className="form-label">CCCD/Passport (
                                                                <sup style={{ fontSize: '8px' }}>
                                                                    <sup>
                                                                        <i className="fa-solid fa-star-of-life" style={{ color: '#ff0019' }}>
                                                                        </i>
                                                                    </sup>
                                                                </sup>)
                                                            </span>
                                                            <Field className="form-control" name="idCardCustomer" type="text" placeholder="CCCD/Passport" />
                                                            <ErrorMessage className='error' name='idCardCustomer' component={"div"} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <span className="form-label">Số điện thoại (
                                                                <sup style={{ fontSize: '8px' }}>
                                                                    <sup>
                                                                        <i className="fa-solid fa-star-of-life" style={{ color: '#ff0019' }}>
                                                                        </i>
                                                                    </sup>
                                                                </sup>)
                                                            </span>
                                                            <Field className="form-control" name="telCustomer" type="text" placeholder="Số điện thoại" />
                                                            <ErrorMessage className='error' name='telCustomer' component={"div"} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <span className="form-label">Ngày sinh (
                                                                <sup style={{ fontSize: '8px' }}>
                                                                    <sup>
                                                                        <i className="fa-solid fa-star-of-life" style={{ color: '#ff0019' }}>
                                                                        </i>
                                                                    </sup>
                                                                </sup>)
                                                            </span>
                                                            <Field className="form-control" name="dateCustomer" type="date" />
                                                            <ErrorMessage className='error' name='dateCustomer' component={"div"} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group">
                                                        <span className="form-label" style={{ paddingLeft: '10px' }}>Địa chỉ (
                                                            <sup style={{ fontSize: '8px' }}>
                                                                <sup>
                                                                    <i className="fa-solid fa-star-of-life" style={{ color: '#ff0019' }}>
                                                                    </i>
                                                                </sup>
                                                            </sup>)
                                                        </span>
                                                        <Field className="form-control" name="addressCustomer" type="text" placeholder="Phường,Quận,Thành Phố" />
                                                        <ErrorMessage className='error' name='addressCustomer' component={"div"} />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <span className="form-label">Email (
                                                                <sup style={{ fontSize: '8px' }}>
                                                                    <sup>
                                                                        <i className="fa-solid fa-star-of-life" style={{ color: '#ff0019' }}>
                                                                        </i>
                                                                    </sup>
                                                                </sup>)
                                                            </span>
                                                            <Field className="form-control" name="emailCustomer" type="text" placeholder="Email" />
                                                            <ErrorMessage className='error' name='emailCustomer' component={"div"} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <span className="form-label">Quốc tịch (
                                                                <sup style={{ fontSize: '8px' }}>
                                                                    <sup>
                                                                        <i className="fa-solid fa-star-of-life" style={{ color: '#ff0019' }}>
                                                                        </i>
                                                                    </sup>
                                                                </sup>)
                                                            </span>
                                                            <Field className="form-control" as="select" name="nationalityCustomer">
                                                                <option value="">Chọn quốc tịch</option>

                                                                <option value="Việt Nam">Việt Nam</option>
                                                                <option value="Mỹ">Mỹ</option>
                                                                <option value="Nhật Bản">Nhật Bản</option>
                                                            </Field>
                                                            <ErrorMessage className='error' name='nationalityCustomer' component={"div"} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">

                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <span className="form-label" style={{ marginBottom: '20px' }}>Ảnh</span>
                                                            <Field className="form-control" style={{ paddingTop: '35px',color:"transparent"}} type="file" id="input-file" name='imgCustomer'
                                                               accept="img/*"  onChange={(event) => onChange(event.target.files[0])} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-btn" style={{ display: 'flex', justifyContent: 'right' }}>
                                                    <button className="submit-btn" type="submit" style={{ marginRight: '10px' }}>Chỉnh sửa</button>
                                                    <button className="submit-btn" type="reset">Hủy</button>

                                                </div>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </Formik>
            }
        </div>
    );
}

export default EmployeeUpdateCustomer