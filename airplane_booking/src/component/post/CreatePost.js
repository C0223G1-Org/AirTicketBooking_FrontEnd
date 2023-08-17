import {ErrorMessage, Field, Form, Formik} from "formik";
import {useNavigate} from "react-router";
import React, {useEffect, useRef, useState} from "react";
import * as postService from "../../services/PostServices";
import "../../css/post.css";
import * as Yup from "yup"
import moment from "moment";
import Swal from "sweetalert2";
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {storage} from '../../firebase-chat';
import {v4} from "uuid";
import CKEditorComponent from "./CKEditorComponent";
import {createPost} from "../../services/PostServices";
import {FidgetSpinner} from "react-loader-spinner"


export function CreatePost() {
    const navigate = useNavigate();
    const [employees, setEmployee] = useState([]);
    const imgPreviewRef = useRef(null)
    const inputFileRef = useRef(null);
    const [imageUpload, setImageUpload] = useState(null);
    const formatDateTime = (dateTime) => {
        return moment(dateTime).format("DD/MM/YYYY HH:mm");
    };


    const savePost = (async (post) => {
        const fileName = `images/${imageUpload.name + v4()}`
        const imageRef = ref(storage, fileName);
       await  uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async (url) => {

                await createPost({
                    ...post,
                    image: url,
                    employee: employees.find(es => es.idEmployee == post.employee)
                }).then(
                    navigate("/listPost")
                )
                console.log(url);
            })
        }).then(
            () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Tạo mới thành công !',
                    showConfirmButton: false,
                    timer: 1000
                })
            }
        )
    })


    // const formatDateTime = (datePost) => {
    //     return moment(datePost).format("DD/MM/YYYY HH:mm:ss");
    // };


    useEffect(() => {
        const findAllEmployees = async () => {
            const result = await postService.getAllEmployee()
            setEmployee(result)
        }
        findAllEmployees()
    }, [])
    useEffect(() => {
        document.title = "Thêm mới tin tức ";
        window.scrollTo(0, 0)
    }, []);

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
        <Formik
            initialValues={{
                title: '',
                employee: 1,
                datePost: new Date(),
                image: '',
                content: ''
            }}
            validationSchema={Yup.object({
                title: Yup.string().required("Không được để trống."),
                // image: Yup.string().required("Không được để trống."),
                content: Yup.string().required("Không được để trống.")
            })}
            onSubmit={(values,{setSubmitting}) => {
                setTimeout(() => {
                  savePost(values)
                    setSubmitting(false)
                },4000)

            }}>
            {
                ({isSubmitting})=>(
                    <div className="container-fluid " style={{marginBottom: "5rem"}}>
                        <div className="row justify-content-center align-items-center" style={{display:"flex"}}>
                            < div className="col-md-6" style={{borderRadius: "4px"}}>
                                <div className="card-update-post" style={{
                                    marginTop: "4rem",
                                    marginBottom: "4rem",
                                    paddingLeft: "0px",
                                    paddingTop: "0px",
                                    paddingRight: "0px"
                                }}>
                                    <div style={{
                                        borderRadius: "4px",
                                        textAlign: "center",
                                        backgroundColor: "#4FA3E3",
                                        height: "57px",
                                        color: "white"
                                    }}>
                                        <h2 style={{paddingTop: "15px"}}>THÊM MỚI TIN TỨC</h2>
                                    </div>
                                    <Form style={{marginLeft: "40px", marginRight: "40px"}}>
                                        <div className="mt-4 inputs"><span>Tiêu đề <span style={{color: "red"}}>*</span></span>
                                            <Field
                                                type="text"
                                                className="form-control"
                                                id="title"
                                                name="title"
                                            />
                                            <ErrorMessage name="title" component="span" style={{color:"red"}}/>
                                        </div>
                                        <div className="mt-2 inputs">
                                    <span>Ngày tạo <span
                                        style={{color: "red"}}>*</span>   {formatDateTime(new Date())}</span>
                                        </div>
                                        <div className="mt-2 inputs">
                                            <span>Tải lên hình ảnh <span style={{color: "red"}}>*</span></span>
                                            <div className="custom-file" style={{ position: "relative", overflow: "hidden" }}>
                                                <input
                                                    className="custom-file-input"
                                                    accept="image/png, image/gif, image/jpeg"
                                                    type="file"
                                                    ref={inputFileRef}
                                                    onChange={handleInputChange}
                                                    name="image"
                                                />
                                                <span className="custom-file-control"></span>
                                            </div>
                                            <img name="image" width="100%" ref={imgPreviewRef} style={{ display: "none" }}/>
                                            {/*<ErrorMessage name="image" component="span" style={{color:"red"}}/>*/}
                                        </div>

                                        <div className="mt-4 inputs">
                                            <span>Nội dung <span style={{color: "red"}}>*</span></span>
                                            <Field
                                                name="content"
                                                component={CKEditorComponent}
                                            />
                                            <ErrorMessage name="content" component="span" style={{color:"red"}}/>
                                        </div>

                                            {
                                                isSubmitting ?
                                                    <FidgetSpinner
                                                        visible={true}
                                                        height="80"
                                                        width="80"
                                                        ariaLabel="dna-loading"
                                                        wrapperStyle={{}}
                                                        wrapperClass="dna-wrapper"
                                                        ballColors={['#ff0000', '#00ff00', '#0000ff']}
                                                        backgroundColor="#F4442E"
                                                    />:
                                                    <div className="mt-4 btn-group ">
                                                        <div className="text-center m-auto">
                                                            <button type="button" className="btn btn-secondary1">
                                                                <b className="text-center1">Quay lại</b>
                                                            </button>
                                                        </div>
                                                    <div className="text-center m-auto">
                                                        <button type="submit"
                                                                className="btn btn-warning "
                                                                data-mdb-toggle="modal"
                                                                data-mdb-target="#exampleModalToggle1">
                                                            <b className="text-center1">Thêm mới</b>
                                                        </button>
                                                    </div>
                                                    </div>
                                            }
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }


        </Formik>
    );
}