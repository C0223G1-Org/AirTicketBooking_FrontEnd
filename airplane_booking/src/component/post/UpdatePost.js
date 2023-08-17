import {useNavigate, useParams} from "react-router";
import React, {useEffect, useRef, useState} from "react";
import * as postService from "../../services/PostServices"
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";
import {storage} from "../../firebase-chat";
import {v4} from "uuid";
import {uploadBytes} from "firebase/storage";
import {updatePost} from "../../services/PostServices";
import Swal from "sweetalert2";
import CKEditorComponent from "./CKEditorComponent";
import moment from "moment";
import {FidgetSpinner} from "react-loader-spinner";

export function UpdatePost() {
    const [employees, setEmployee] = useState([]);
    const [post, setPost] = useState()
    const imgPreviewRef = useRef(null)
    const inputFileRef = useRef(null);
    const [imageUpload, setImageUpload] = useState(null);
    const param = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        const update = async () => {
            const result = await postService.findPostById(param.id)
            setPost(result)
        }
        update()
    }, [param.id])
    const formatDateTime = (dateTime) => {
        return moment(dateTime).format("DD/MM/YYYY HH:mm");
    };


    const update = (async (post) => {
        const fileName = `images/${imageUpload.name + v4()}`;
        const imageRef = ref(storage, fileName);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async (url) => {
                console.log(post)
                await updatePost({
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
                    title: 'Chỉnh sửa thành công !',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        )
    })


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
    if (!post) {
        return null
    }

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
        <>
            {post.id &&
            <Formik
                initialValues={{
                    id:post?.id,
                    title: post?.title,
                    employee: 1,
                    datePost: new Date(),
                    content: post?.content
                }}
                validationSchema={Yup.object({
                    title: Yup.string().required("Không được để trống"),
                    // image: Yup.string().required("Không được để trống"),
                    content: Yup.string().required("Không được để trống")
                })}
                onSubmit={(values,{setSubmitting}) => {
                    setTimeout(()=>{
                        update(values)
                        setSubmitting(false)
                    },4000)
                }}
            >
                {
                    ({isSubmitting})=>(
                        <div className="container-fluid" style={{marginBottom: "5rem"}}>
                            <div className="row  justify-content-center align-items-center" style={{display:"flex"}}>
                                <div className="col-md-6" style={{borderRadius: "4px"}}>
                                    <div className="card-update-post" style={{marginTop: "4rem", marginBottom: "2rem", paddingLeft: "0px", paddingTop: "0px", paddingRight: "0px"}}>
                                        <div style={{borderRadius: "4px", textAlign: "center", backgroundColor: "#4FA3E3", height: "57px", color: "white"}}>
                                            <h2 style={{paddingTop: "15px"}}>CHỈNH SỬA TIN TỨC</h2>
                                        </div>
                                        <Form style={{marginLeft: "40px", marginRight: "40px"}}>
                                            <div className="mt-4 inputs"><span>Tiêu đề <span style={{color: "red"}}>*</span></span>
                                                <Field type="text" className="form-control" id="title" name="title"/>
                                            </div>
                                            <div className="mt-2 inputs"><span>Ngày tạo <span style={{color: "red"}}>*</span>       {formatDateTime(new Date())}</span>
                                            </div>
                                            <div className="mt-2 inputs"><span>Upload hình ảnh <span style={{color: "red"}}>*</span></span>
                                                <Field className="custom-file-input"
                                                       accept="image/png, image/gif, image/jpeg" type="file"
                                                       ref={inputFileRef} onChange={handleInputChange} name='image'/>
                                                <img  src={post.image} width="100%"
                                                      ref={imgPreviewRef}  name='image'/>
                                            </div>

                                            <div className="mt-4 inputs">
                                                <span>Nội dung <span style={{color: "red"}}>*</span></span>
                                                <Field name="content" component={CKEditorComponent} value={post.content}/>
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
                                                                <b className="text-center1">Chỉnh sửa</b>
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
            }

        </>

    );
}