import {ErrorMessage, Field, Form, Formik} from "formik";
import {useNavigate} from "react-router";
import React, {useEffect, useState} from "react";
import * as postService from "../services/PostServices";
import "../css/post.css";
import * as Yup from "yup"
import moment from "moment";
import Swal from "sweetalert2";
import {storage} from "./firebase";
import {getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";

export function CreatePost() {
    const [employees, setEmployee] = useState([]);
    const [selectedFile, setSelectedFile] = useState();
    const [firebaseImg, setImg] = useState();
    const [progress, setProgress] = useState(0);
    const [imgErr, setImgErr] = useState("");
    const navigate = useNavigate();
    const formatDateTime = (datePost) => {
        return moment(datePost).format("DD/MM/YYYY HH:mm:ss");
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        setImgErr("");
        if (file) {
            setSelectedFile(file);
        }
    };
    const getIdEmployee = (id) => {
        for (let e of employees) {
            if (e.id === id) {
                return e
            }
        }
    }

    const handleSubmitAsync = async () => {
        return new Promise((resolve, reject) => {
            const file = selectedFile;
            if (!file) {
                console.error("No file selected");
                return reject("Chưa có file nào được chọn ");
            }
            const storageRef = ref(storage, `files/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                },
                (error) => {
                    reject(error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    setImg(downloadURL);
                    resolve(downloadURL);
                }
            );
        });
    };

    const save = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Thêm mới tin thành công ',
            showConfirmButton: false,
            timer: 1500
        })
    }

    useEffect(() => {
        const findAllEmployees = async () => {
            const result = await postService.getAllEmployee()
            setEmployee(result)
        }
        findAllEmployees()
    }, [])
    useEffect(() => {
        document.title = "Thêm mới tin tức "; // Thay đổi title

        window.scrollTo(0, 0)
    }, []);

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
                title: Yup.string().required("Không được để trống"),
                // image: Yup.string().required("Không được để trống"),
                content: Yup.string().required("Không được để trống")
            })}
            onSubmit={(values, {resetForm}) => {
                console.log(values);
                const create = async () => {
                    const imageUrl = await handleSubmitAsync();

                    const newValue = {
                        ...values,
                        image: imageUrl,
                        employee: getIdEmployee(+values.employee)
                    };

                    await postService.createPost(newValue);
                    save();
                    navigate("/listPost");
                    resetForm(false);
                };
                create();
            }}
                >
                <div className="container " style={{marginBottom: "5rem"}}>
                <div className="row height d-flex justify-content-center align-items-center">
                <div className="col-md-6" style={{borderRadius: "4px"}}>
                <div
                className="card"
                style={{
                marginTop: "4rem",
                marginBottom: "4rem",
                paddingLeft: "0px",
                paddingTop: "0px",
                paddingRight: "0px"
            }}
                >
                <div
                style={{
                borderRadius: "4px",
                textAlign: "center",
                backgroundColor: "#4FA3E3",
                height: "57px",
                color: "white"
            }}
                >
                <h2 style={{marginTop: "9px"}}>THÊM MỚI THÔNG TIN</h2>
                </div>
                <Form style={{marginLeft: "40px", marginRight: "40px"}}>
                <div className="mt-4 inputs">
                <span>
                Tiêu đề <span style={{color: "red"}}>*</span>
                </span>
                <Field
                type="text"
                className="form-control"
                id="title"
                name="title"
                />


                </div>
                <div className="mt-2 inputs">
                {/*<span>*/}
                {/*  Nhân viên <span style={{ color: "red" }}>*</span>*/}
                {/*</span>*/}
                {/*                  <Field*/}
                {/*                      type="number"*/}
                {/*                      value="1"*/}
                {/*                      className="form-control"*/}
                {/*                      id="employee"*/}
                {/*                      name="employee"*/}
                {/*                      readOnly*/}
                {/*                  />*/}
                {/*              </div>*/}
                <div className="mt-2 inputs">
                <span>
                Ngày tạo <span style={{color: "red"}}>*</span>
                </span>
                <Field
                type="text"
                className="form-control"
                name="datePost"
                />
                </div>
                <div className="mt-2 inputs">
                <span>
                Upload hình ảnh <span style={{color: "red"}}>*</span>
                </span>
                <Field
                type="file"
                onChange={(e) => handleFileSelect(e)}
                id="image"
                name={"image"}
                />
                </div>
                {selectedFile && (
                <img
                className={"mt-2"}
                src={URL.createObjectURL(selectedFile)}
                style={{width: "100%"}}
                alt=""/>
                )}

                <div className="mt-4 inputs">
                <span>
                Nội dung <span style={{color: "red"}}>*</span>
                </span>
                <Field
                as="textarea"
                type="text"
                className="form-control"
                id="content"
                name="content"
                />
                </div>
                <div className="mt-4 btn-group">
                <div className="text-center m-auto">
                <button
                type="button"
                className="btn btn-secondary"
                style={{width: "100px"}}
                >
                <b className="text-center">Quay lại</b>
                </button>
                </div>
                <div className="text-center m-auto">
                <button
                type="submit"
                className="btn btn-warning "
                data-mdb-toggle="modal"
                data-mdb-target="#exampleModalToggle1"
                >
                <b className="text-center">Thêm mới</b>
                </button>
                </div>
                </div>
                </div>
                </Form>
                </div>
                </div>
                </div>
                </div>
                </Formik>
                );
                }