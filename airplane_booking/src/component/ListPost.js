import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import '../css/post/card2.css';
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { deletePost, getListPost, getNewsHot, searchPosts } from "../services/PostServices";
import moment from'moment';
import vinhHaLong from '../img/vinh-ha-long-01.jpg';
import phoCo from '../img/pho-co.jpg';
import sapa from '../img/sapa.jpg';
import daiNoiHue from '../img/21-dai-noi-hue.jpg'

export default function ListPost() {
    const [detail, setDetail] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const limit = 3;
    const [listPosts, setListPosts] = useState([]);
    const [news,setNews] = useState([]);
    const detailPost = (post,employee) => {
        setDetail(post);
        setEmployee(employee);
        console.log(employee);
    };
    const getNews = async () =>{
        const data = await getNewsHot();
        setNews(data);
    }
    useEffect(()=>{
       getNews(); 
    },[])
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
        try{
        const data = await searchPosts(value.title);
        setListPosts(data);
        }catch(error){
            Swal.fire({
                title: 'không có bài viết nào trong dữ liệu',
                icon: 'error',
                showCancelButton: true,
                reverseButtons: true
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
                    <nav className="navbar navbar-expand-lg  " style={{ background: '#0685aa', color: 'white' }}>
                        {/* <!-- Container wrapper --> */}
                        <div className="container-fluid">
                            {/* <!-- Toggle button --> */}
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-mdb-toggle="collapse"
                                data-mdb-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            ><i className="fas fa-bars"></i>
                            </button>
                            {/* <!-- Collapsible wrapper --> */}
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                {/* <!-- Navbar brand --> */}
                                <a className="navbar-brand mt-2 mt-lg-0" href="#" style={{ color: '#f1e89d', fontSize: '30px' }}>
                                    𝓒02 𝓐𝓲𝓻𝓵𝓲𝓷𝓮𝓼
                                </a>
                                {/* <!-- Left links --> */}
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <a className="nav-link" href="#" style={{ color: 'white' }}>Trang chủ</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#" style={{ color: 'white' }}>Khách Hàng</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#" style={{ color: 'white' }}>Nhân Viên</a>
                                    </li>
                                </ul>
                                {/* <!-- Left links --> */}
                            </div>
                            {/* <!-- Collapsible wrapper --> */}

                            {/* <!-- Right elements --> */}
                            <div className="d-flex align-items-center">
                                {/* <!-- Icon --> */}
                                <a className="text-reset me-3" href="#">
                                    <i className="fas fa-shopping-cart"></i>
                                </a>

                                {/* <!-- Notifications --> */}
                                <div className="dropdown">
                                    <a
                                        className="text-reset me-3 dropdown-toggle hidden-arrow"
                                        href="#"
                                        id="navbarDropdownMenuLink"
                                        role="button"
                                        data-mdb-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="fas fa-bell"></i>
                                        <span className="badge rounded-pill badge-notification bg-danger">1</span>
                                    </a>
                                    <ul
                                        className="dropdown-menu dropdown-menu-end"
                                        aria-labelledby="navbarDropdownMenuLink"
                                    >
                                        <li>
                                            <a className="dropdown-item" href="#">Some news</a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">Another news</a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">Something else here</a>
                                        </li>
                                    </ul>
                                </div>
                                {/* <!-- Avatar --> */}
                                <div className="dropdown">
                                    <a
                                        className="dropdown-toggle d-flex align-items-center hidden-arrow"
                                        href="#"
                                        id="navbarDropdownMenuAvatar"
                                        role="button"
                                        data-mdb-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                            className="rounded-circle"
                                            height="25"
                                            alt="Black and White Portrait of a Man"
                                            loading="lazy"
                                            style={{ width: '45px' }}
                                        />
                                    </a>
                                    <ul
                                        className="dropdown-menu dropdown-menu-end"
                                        aria-labelledby="navbarDropdownMenuAvatar"
                                    >
                                        <li>
                                            <a className="dropdown-item" href="#">My profile</a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">Settings</a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#">Logout</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* <!-- Right elements --> */}
                        </div>
                        {/* <!-- Container wrapper --> */}
                    </nav>
                </div>
                <div className="row container-fluid">
                    <div className="main col-12 col-lg-8 ">
                        <div className="h-auto justify-content-between d-flex">
                            <div>
                                <a className="news-button btn  btn-primary mt-3"> Thêm mới</a>
                            </div>
                            <div>
                                <Formik initialValues={{
                                    title: ''
                                }} validationSchema={yup.object({
                                    title: yup.string().required('Phải nhập để tìm kiếm').max(50, 'Không được quá 50 ký tự')
                                })}
                                    onSubmit={(value) => {
                                     searchPost(value)
                                    }}
                                >
                                    <Form>
                                        <Field className="news-button me-0 mt-3" type="text" id="title" name="title"
                                            placeholder="Search Title . . ." />
                                        <button className="mt-3 ms-0 news-button search" type="submit"><i
                                            className="fa fa-search"></i>Tìm Kiếm
                                        </button>
                                    </Form>
                                </Formik>
                            </div>

                        </div>
                        <ul className="cards_news">
                            {listPosts.map((post) => (
                                <li className="card_item_news" key={post.id}>
                                    <div className="card">
                                        <button onClick={()=>{detailPost(post,post.employee)}} data-bs-toggle="modal" data-bs-target="#exampleModalDetail">
                                            <div className="card_image_news">
                                                <img src={post.image}
                                                    alt="mixed vegetable salad in a mason jar." />
                                            </div>
                                        </button>
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
                        <button className={`btn btn-light btn-outline-secondary border-0 w-100 ${page === total - 1 ? 'd-none' : ''}`}
                            onClick={() => {
                                if (page < total - 1) {
                                    setPage((prev) => prev + 1)
                                }
                            }}
                        >Xem Thêm</button>
                    </div>
                    <div className="vertical_news col-12 col-lg-4">
                        <div>
                            <h4 className="text-uppercase" style={{ marginBottom: '16px', marginTop: '16px' }}>Tin nổi bật</h4>
                        </div>
                        <ul className="cards_news">
                            {news.map((newss)=>(
                            <li className="news-hots">
                                <div className="card">
                                    <button onClick={()=>{detailPost(newss,newss.employee)}} data-bs-toggle="modal" data-bs-target="#exampleModalDetail">
                                        <div className="card_image_news">
                                            <span className="note">Khám Phá</span>
                                            <img src={newss.image} alt="mixed vegetable salad in a mason jar." />
                                        </div>
                                    </button>
                                    <div className="card_content">
                                        <h2 className="card_title">{newss.title.length>quantity ?`${newss.title.slice(0, quantity)}...` : newss.title}</h2>
                                        <div className="card_text">
                                            <p>{newss.content.length>quantity ?`${newss.content.slice(0, quantity)}...` : newss.content}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="news-card-button">
                                        <a className="news-button btn btn-warning">Sửa</a>
                                        <a className="news-button btn btn-danger" onClick={()=>{checkDelete(`${newss.id}`,`${newss.title}`)}}>Xoá</a>
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
                                    <img className="d-flex position-relative" width="100%" height="200"
                                        src={detail.image}
                                        alt="mixed vegetable salad in a mason jar." />
                                    <div className="card_content">
                                        <h2 className="card_title">{detail.title}</h2>
                                        <div className="card_text">
                                            <strong><span>{employee.nameEmployee}</span> / <span>{moment(`${detail.datePost}`).format('YYYY-MM-DD HH:mm:ss')}</span></strong>
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