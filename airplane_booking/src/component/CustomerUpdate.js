import { Formik, Form, ErrorMessage, Field } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCustomerById, updateCustomer } from '../services/CustomerServices';
import Swal from 'sweetalert2'
import * as yup from "yup";
import { v4 } from 'uuid';
import {
    ref,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import { storage } from '../firebase-chat';
import "../css/customer/customer_update_details.css"
// import "../css/customer/bootstrap.min.css"



export default function CustomerUpdate() {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
    const [customer, setCustomer] = useState({})
    const param = useParams()
    const [imageUpload, setImageUpload] = useState(null);
    // const imagesListRef = ref(storage, "images/");
    const [status, setStatus] = useState(true)
    const navigate = useNavigate()
    const getCustomer = async() => {
        try{       
        const customer = await getCustomerById(param.id)
                setCustomer(customer)}
                catch(error){
                        Swal.fire({
                            icon:"error",
                            timer:2000,
                            title: "Không tìm thấy đối tượng này"
                        })
                        
                }
        }
    

    const updateCus = (async (update) => {
        console.log(status);
        // setStatus(false)
        // console.log(status);
        if (imageUpload == null) {
            await updateCustomer({ ...update, imgCustomer: customer.imgCustomer }).then(
                navigate(`/customers/details/${customer.idCustomer}`),
                // getCustomer()
            ).then(
                () => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Chỉnh sửa thành công.  ',
                        showConfirmButton: false,
                        timer: 1500
                    })
                });
        }
        else {
            const fileName = `images/${imageUpload.name + v4()}`
            const imageRef = ref(storage, fileName);
            uploadBytes(imageRef, imageUpload).then((snapshot) => {
                getDownloadURL(snapshot.ref).then(async (url) => {
                    await updateCustomer({ ...update, imgCustomer: url }).then(
                        navigate(`/customers/details/${customer.idCustomer}`),
                        // getCustomer()
                    );
                    console.log(url);
                })
            }).then(
                () => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Chỉnh sửa thành công.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
        }
    })

    useEffect(() => {
        getCustomer()
    }, [param.id])

    const inputFileRef = useRef(null);
    const imgPreviewRef = useRef(null);

    const handleInputChange = (event) => {
        const file = event.target.files[0];
        if (file.size > 3000000) {
            Swal.fire({
                icon: 'error',
                title: 'Dung lượng ảnh tối đa 3MB.',
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
            {customer.idCustomer &&
                <div id="booking" className="section" >
                    <div className="section-center">
                        <Formik
                            initialValues={{
                                idCustomer: customer.idCustomer, nameCustomer: customer.nameCustomer, genderCustomer: customer.genderCustomer,
                                idCardCustomer: customer.idCardCustomer, telCustomer: customer.telCustomer, dateCustomer: customer.dateCustomer,
                                addressCustomer: customer.addressCustomer, emailCustomer: customer.emailCustomer,
                                nationalityCustomer: customer.nationalityCustomer, account: customer.account, flagCustomer: customer.flagCustomer
                            }}

                            validationSchema={yup.object({
                                nameCustomer: yup.string().min(3, "Họ và tên tối thiểu 3 ký tự.").max(100, "Họ và tên tối đa 100 ký tự. ").required("Vui lòng nhập họ và tên.")
                                // .matches(/^[\\p{Lu}][\\p{Ll}]*([\\s][\\p{Lu}][\\p{Ll}]*)*$/," không chứa các kí tự đặc biệt hoặc số")
                                , genderCustomer: yup.string().required("Vui lòng chọn giới tính."),
                                // email_customer:yup.string().min("Email tối thiểu 12 ký tự").max("Email tối đa 50 ký tự").matches(/^[\w-]+@([\w-])+[\w-]{2,4}$/,"Nhập theo định dạng: xxx@xxx.xxx với x không phải là ký tự đặc biệt").required("Vui lòng điền email"),
                                telCustomer: yup.string().matches(/^(\+84|0)[1-9][0-9]{8}$/, "Không chứa các kí tự đặc biệt").required("Vui lòng nhập số điện thoại."),
                                addressCustomer: yup.string().min(10, "Địa chỉ tối thiểu 10 kí tự.").max(100, "Địa chỉ tối đa chỉ 100 kí tự.").required("Vui lòng nhập địa chỉ."),
                                nationalityCustomer: yup.string().required("Vui lòng chọn quốc tịch của bạn."),
                                idCardCustomer: yup.string().min(6, "CCCD/Pasport tối thiểu 6 kí tự.").max(12, "CCCD/Pasport tối đa 12 kí tự.").matches(/^([A-Z][0-9]{6,12})|([0-9]{12})$/, "CCCD/Password không chứa kí tự đặc biệt.").required("Vui lòng nhập CCCD/Passport."),
                                dateCustomer: yup.date().max(maxDate, 'Khách hàng phải trên 18 tuổi.')
                                    .min(minDate, 'Khách hàng phải trên 18 tuổi và dưới 100 tuổi.')
                                    .required("Vui lòng nhập ngày tháng năm sinh.")
                            })}

                            onSubmit={(values) => {
                                console.log(values);
                                setStatus(false)
                                updateCus(values)
                            }}
                        >
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-sm-12 col-md-4 col-lg-4">
                                        <div>
                                            <img style={{ marginTop: 50 }} name='imgCustomer' src={customer.imgCustomer != "" ? customer.imgCustomer : "https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"} id="img-preview" ref={imgPreviewRef} alt="Preview" />
                                        </div>
                                    </div>

                                    <div className="col-12 col-sm-12 col-md-8 col-lg-8">
                                        <div className="booking-form">
                                            <div>
                                                <p style={{ fontWeight: "500", textAlign: "center" }}>CHỈNH SỬA THÔNG TIN</p>
                                            </div>
                                            <Form className="booking-form-padding">
                                                <Field type='hidden' name='idCustomer' />
                                                <Field type='hidden' name='account' value={JSON.stringify(customer.account)} />
                                                <Field type='hidden' name='flagCustomer' />
                                                <Field type="hidden" name='emailCustomer' />
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <span className="form-label">Họ và tên
                                                                (<sup style={{ fontSize: '8px' }}>
                                                                    <sup>
                                                                        <i className="fa-solid fa-star-of-life" style={{ color: '#ff0019' }}>
                                                                        </i>
                                                                    </sup>
                                                                </sup>)
                                                            </span>
                                                            <Field className="form-control" type="text" name='nameCustomer' />
                                                            <ErrorMessage component='div' id='error' name='nameCustomer' />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <span className="form-label">Giới tính
                                                                ( <sup style={{ fontSize: '8px' }}>
                                                                    <sup>
                                                                        <i className="fa-solid fa-star-of-life" style={{ color: '#ff0019' }}>
                                                                        </i>
                                                                    </sup>
                                                                </sup>)
                                                            </span>
                                                            <Field className="form-control" as="select" name='genderCustomer'>
                                                                <option value={""}>--Chọn giới tính--</option>
                                                                <option value={false}>Nam</option>
                                                                <option value={true}>Nữ</option>
                                                                {/* <option value={null}>Khác</option> */}
                                                            </Field>
                                                            <ErrorMessage component='div' id='error' name='genderCustomer' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <span className="form-label">CCCD/Passport
                                                                (<sup style={{ fontSize: '8px' }}>
                                                                    <sup>
                                                                        <i className="fa-solid fa-star-of-life" style={{ color: '#ff0019' }}>
                                                                        </i>
                                                                    </sup>
                                                                </sup>)
                                                            </span>
                                                            <Field className="form-control" type="text" name='idCardCustomer' />
                                                            <ErrorMessage component='div' id='error' name='idCardCustomer' />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <span className="form-label">Số điện thoại
                                                                ( <sup style={{ fontSize: '8px' }}>
                                                                    <sup>
                                                                        <i className="fa-solid fa-star-of-life" style={{ color: '#ff0019' }}>
                                                                        </i>
                                                                    </sup>
                                                                </sup>)
                                                            </span>
                                                            <Field className="form-control" type="text" name='telCustomer' />
                                                            <ErrorMessage component='div' id='error' name='telCustomer' />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <span className="form-label">Ngày sinh
                                                                (<sup style={{ fontSize: '8px' }}>
                                                                    <sup>
                                                                        <i className="fa-solid fa-star-of-life" style={{ color: '#ff0019' }}>
                                                                        </i>
                                                                    </sup>
                                                                </sup>)
                                                            </span>
                                                            <Field className="form-control" type="date" name='dateCustomer' />
                                                            <ErrorMessage component='div' id='error' name='dateCustomer' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <span className="form-label">Địa chỉ
                                                                (<sup style={{ fontSize: '8px' }}>
                                                                    <sup>
                                                                        <i className="fa-solid fa-star-of-life" style={{ color: '#ff0019' }}>
                                                                        </i>
                                                                    </sup>
                                                                </sup>)
                                                            </span>
                                                            <Field className="form-control" type="text" name='addressCustomer' />
                                                            <ErrorMessage component='div' id='error' name='addressCustomer' />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="row">
                                                <div className="form-group">
                                                    <span className="form-label">Email
                                                        (<sup style={{ fontSize: '8px' }}>
                                                            <sup>
                                                                <i className="fa-solid fa-star-of-life" style={{ color: '#ff0019' }}>
                                                                </i>
                                                            </sup>
                                                        </sup>)
                                                    </span>
                                                    <Field className="form-control" type="text" name='emailCustomer' />
                                                    <ErrorMessage component='div' id='error' name='emailCustomer' />
                                                </div>
                                            </div> */}
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <span className="form-label" style={{ marginBottom: '20px' }}>Ảnh</span>
                                                            <Field className="custom-file-input" style={{ paddingTop: '35px' }} accept="image/png, image/gif, image/jpeg" type="file" id="input-file" ref={inputFileRef} onChange={handleInputChange} name='imgCustomer' />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <span className="form-label">Quốc tịch
                                                                ( <sup style={{ fontSize: '8px' }}>
                                                                    <sup>
                                                                        <i className="fa-solid fa-star-of-life" style={{ color: '#ff0019' }}>
                                                                        </i>
                                                                    </sup>
                                                                </sup>)
                                                            </span>
                                                            <Field className="form-control" as="select" name='nationalityCustomer'>
                                                                <option value={""}>--Quốc tịch--</option>
                                                                <option value='Việt Nam'>Việt Nam</option>
                                                                <option value='Mỹ'>Mỹ</option>
                                                                <option value='Lào'>Lào</option>
                                                                <option value='Campuchia'>Campuchia</option>
                                                            </Field>
                                                            <ErrorMessage component='div' id='error' name='nationalityCustomer' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-btn" style={{ display: 'flex', justifyContent: 'right' }}>
                                                    <button type='submit' disabled={status == false} className="submit-btn" style={{ marginRight: '10px' }}>Lưu</button>
                                                    <button type='button' className="submit-btn" onClick={() => { navigate(`/customers/details/${customer.idCustomer}`) }}>Hủy</button>
                                                </div>
                                            </Form>

                                        </div>
                                    </div>

                                </div>
                            </div></Formik>
                    </div>
                </div>
            }
        </>
    )
}