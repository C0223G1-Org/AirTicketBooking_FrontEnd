import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import '../../css/post/card2.css';
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { deletePost, getListPost, getNewsHot, searchPosts } from "../../services/PostServices";
import moment from 'moment';

export default function ListPost() {
    const [detail, setDetail] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const limit = 3;
    const [listPosts, setListPosts] = useState([]);
    const [news, setNews] = useState([]);
    const [messages , setMessage] = useState('');
    const detailPost = (post, employee) => {
        setDetail(post);
        setEmployee(employee);
        console.log(employee);
    };
    const getNews = async () => {
        try{
        const data = await getNewsHot();
         setNews(data);
        }catch(error){
            const message = 'Không có bài viết nào nổi bật. ';
            setMessage(message);
        }
       
    }
    useEffect(() => {
        getNews();
    }, [])
    const getPost = async () => {
        const data = await getListPost(page, limit);
        setListPosts([...listPosts, ...data.content]);
        setTotal(data.totalPages);
    };
    useEffect(() => {
        getPost();
    }, [page]);
    const getList = async () => {
        const data = await getListPost(page, limit);
        setListPosts(data.content);
        setTotal(data.totalPages);
    };
    const searchPost = async (value) => {
        try {
            const data = await searchPosts(value.title);
            setListPosts(data);
            setPage(total-1);
        } catch (error) {
            Swal.fire({
                title: 'Không có tên bài viết nào như vậy trong dữ liệu.',
                icon: 'error',
                showConfirmButton: false,
                timer:1500
            })
        }

    };


    const quantity = 30;
    const checkDelete = async (id, title) => {
        Swal.fire({
            title: 'Bạn muốn xoá bài viết có tên ' + title + ' ?',
            html: '<p style="color: red;">Bạn sẽ không thể khôi phục tập tin này!</p>',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận ',
            cancelButtonText: 'Huỷ',
            reverseButtons: true
        }
        ).then((res) => {
            if (res.isConfirmed) {
                deletePost(id).then(() => {
                    console.log("10101");
                    getList().then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Xoá Thành công!!!!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
                });
            } else if (res.dismiss === Swal.DismissReason.cancel) {
            }
        })
    }

    return (
        <>
            <body className="list-news">
                <div className="row container-fluid">
                    <div className="main col-12 col-lg-8 ">
                        <div className="h-auto justify-content-between d-flex">
                            <div className="add-post">
                                <a className="news-button btn btn-primary mt-3"> Thêm mới</a>
                            </div>
                            <div className="search-post">
                                <Formik initialValues={{
                                    title: ''
                                }} validationSchema={yup.object({
                                    title: yup.string().required('Phải nhập để tìm kiếm').max(50, 'Không được quá 50 ký tự')
                                })}
                                    onSubmit={(value) => {
                                        searchPost(value)
                                    }}
                                >
                                    <Form >
                                        <Field className="me-0 mt-3" type="text" id="title" name="title"
                                            placeholder="Search Title . . ." />
                                        <button className="search" type="submit">Tìm Kiếm
                                        </button>
                                    </Form>
                                </Formik>
                            </div>

                        </div>
                        <ul className="cards_news">
                            {listPosts.map((post) => (
                                <li className="card_item_news" key={post.id}>
                                    <div className="card">
                                        <a className="btn p-0" onClick={() => { detailPost(post, post.employee) }} data-bs-toggle="modal" data-bs-target="#exampleModalDetail">
                                            <div className="card_image_news">
                                                <img src={post.image}
                                                    alt="mixed vegetable salad in a mason jar." />
                                            </div>
                                        </a>
                                        <div className="card_content">

                                            <h2 className="card_title">{post.title.length > quantity ? `${post.title.slice(0, quantity)}...` : post.title}</h2>
                                            <div className="card_text">
                                                <p>{post.content.length > quantity ? `${post.content.slice(0, quantity)}...` : post.content}
                                                </p>    
                                            </div>
                                        </div>
                                        <div className="news-card-button">
                                            <a className="news-button btn btn-warning">Sửa</a>
                                            <a className="news-button btn btn-danger" onClick={() => { checkDelete(`${post.id}`, `${post.title}`) }} >Xoá</a>
                                            {/* <button className="news-button btn btn-danger" onClick={() => { setShowModal(true) }} >Xoá</button> */}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button className={`btn btn-light btn-outline-secondary  border-0 w-100 ${page === total - 1 ? 'd-none' : ''}`}
                            onClick={() => {
                                if (page < total - 1) {
                                    setPage((prev) => prev + 1)
                                }
                            }}
                        >Xem Thêm </button>
                    </div>
                    <div className="vertical_news col-12 col-lg-4">
                        <div>
                            <h4 className="text-uppercase" style={{ marginBottom: '16px', marginTop: '16px' }}>Tin nổi bật</h4>
                        </div>
                        <ul className="cards_news">
                            <li className={`text-center w-100 ${messages ? '': 'd-none'}`}>
                                <p >{messages}</p>
                            </li>
                            {news.map((newss) => (
                                <li className="news-hots">
                                    <div className="card">
                                        <button className="btn p-0" onClick={() => { detailPost(newss, newss.employee) }} data-bs-toggle="modal" data-bs-target="#exampleModalDetail">
                                            <div className="card_image_news">
                                                <span className="note">Khám Phá</span>
                                                <img src={newss.image} alt="mixed vegetable salad in a mason jar." />
                                            </div>
                                        </button>
                                        <div className="card_content">
                                            <h2 className="card_title">{newss.title.length > quantity ? `${newss.title.slice(0, quantity)}...` : newss.title}</h2>
                                            <div className="card_text">
                                                <p>{newss.content.length > quantity ? `${newss.content.slice(0, quantity)}...` : newss.content}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="news-card-button">
                                            <a className="news-button btn btn-warning">Sửa</a>
                                            <a className="news-button btn btn-danger" onClick={() => { checkDelete(`${newss.id}`, `${newss.title}`) }}>Xoá</a>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* <!--chi tiêt--> */}
                <div className="modal fade" id="exampleModalDetail" tabIndex={-1} aria-labelledby="exampleModalLabel1"
                    aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header bg-info">
                                <h5 className="modal-title" id="exampleModalLabel1">Chi tiết bài viết</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div className="modal-body" style={{ padding: 0 }}>

                                <div>
                                    <img className="d-flex position-relative" width="100%" height="300"
                                        src={detail.image}
                                        alt="mixed vegetable salad in a mason jar." />
                                    <div className="card_content">
                                        <h2 className="card_title">{detail.title}</h2>
                                        <div className="card_text">
                                                    <strong><span>{employee.nameEmployee}</span> / <span>{moment(`${detail.datePost}`).format('DD-MM-YYYY HH:mm:ss')}</span></strong>
                                            <p>{detail.content}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Thoát</button>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </>
    );
}