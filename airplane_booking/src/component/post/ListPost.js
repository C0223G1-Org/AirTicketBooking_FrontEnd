import {Field, Form, Formik} from "formik";
import '../../css/post/ListPost.css';
import {useEffect, useState} from "react";
import Swal from 'sweetalert2'
import {deletePost, getListPost, getNewsHot, searchPosts} from "../../services/PostServices";
import moment from 'moment';
import {NavLink} from "react-router-dom";
import BackToTop from "../../img/mui_ten_len.png"
import {FidgetSpinner} from "react-loader-spinner";

export default function ListPost() {
    const scrollToTop = () => {
        const scrollStep = window.scrollY / (200 / 15); // Tốc độ cuộn
        const scrollInterval = setInterval(() => {
            if (window.scrollY !== 0) {
                window.scrollBy(0, -scrollStep);
            } else {
                clearInterval(scrollInterval);
            }
        }, 15);

    };

    const [showButton, setShowButton] = useState(false);
    const [detail, setDetail] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const limit = 12;
    const [listPosts, setListPosts] = useState([]);
    const [news, setNews] = useState([]);
    const [messages, setMessages] = useState('');
    const [status, setStatus] = useState(true);
    const formatDateTime = (dateTime) => {
        return moment(dateTime).format("DD/MM/YYYY HH:mm:ss");
    };
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollThreshold = 500;
            setShowButton(scrollTop > scrollThreshold);
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])
    const detailPost = (post, employee) => {
        setDetail(post);
        setEmployee(employee);
    };
    const getNews = async () => {
        try {
            const data = await getNewsHot();
            setNews(data);
        } catch (error) {
            setNews([]);
            const message = 'Không có bài viết nào nổi bật. ';
            setMessages(message);
        }
    }
    useEffect(() => {
        getNews();
    }, [])
    const getPost = async () => {
        try {
            const data = await getListPost(page, limit);
            setListPosts([...listPosts, ...data.content]);
            setTotal(data.totalPages);
        } catch (error) {
            Swal.fire({
                title: 'Không có dữ liệu.',
                icon: 'error',
                showConfirmButton: false,
                timer: 3000,
                customClass: {
                    icon: 'icon-post',
                }

            })
        }

    };
    useEffect(() => {
        getPost();
    }, [page]);

    const getList = async () => {
        try {
            setPage(0);
            const data = await getListPost(page, limit);
            setListPosts(data.content);
            setTotal(data.totalPages);
        } catch (error) {
            setListPosts([]);
            Swal.fire({
                title: 'Không có dữ liệu.',
                icon: 'error',
                showConfirmButton: false,
                timer: 3000,
                customClass: {
                    icon: 'icon-post',
                }
            })
        }
    };

    const searchPost = async (value) => {
        try {
            const data = await searchPosts(value.title);
            setListPosts(data);
            setStatus(false);
        } catch (error) {
            await Swal.fire({
                title: 'Không có tên bài viết nào mà bạn cần.',
                icon: 'error',
                showConfirmButton: false,
                timer: 3000,
                customClass: {
                    icon: 'icon-post',
                }
            })
        }

    };

    const quantity = 30;
    const checkDelete = async (id, title) => {
        Swal.fire({
                title: 'Bạn muốn xoá bài viết có tên ' + title + ' ?',
                html: '<p style="color: red;">Bạn sẽ không thể khôi phục tập tin này.</p>',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Xác nhận ',
                cancelButtonText: 'Huỷ',
                reverseButtons: true,
                customClass: {
                    confirmButton: 'custom-confirm-button-employee',
                    icon: "icon-post"
                }
            }
        ).then((res) => {
            if (res.isConfirmed) {
                deletePost(id).then(() => {
                    getList().then(() => {
                        getNews().then(() => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Xoá Thành công.',
                                showConfirmButton: false,
                                timer: 2000,
                                customClass: {
                                    icon: 'icon-post',
                                }
                            })
                        })
                    })
                });
            } else if (res.dismiss === Swal.DismissReason.cancel) {
            }
        })
    }


    return (
        <>
            <button className={`scroll-to-top-button ${showButton ? 'show' : 'd-none'}`} onClick={scrollToTop}><img
                src={BackToTop} width={30} alt="Back to top"/></button>
            <body className="list-news overview-list-post">
            <div className="row container-fluid ">
                <div className="main-son col-12 col-lg-9 ">
                    <div className="justify-content-between" style={{display: 'flex', marginBottom: '16px'}}>
                        <div className="add-post">
                            <NavLink to="/createPost"
                                     className={`btn1 search-son mt-3 ${localStorage.role === 'ROLE_EMPLOYEE' || localStorage.role === 'ROLE_ADMIN' ? 'd-block' : 'd-none'}`}
                                     style={{color: 'black'}}> Thêm mới</NavLink>
                        </div>
                        <div className="search-post" style={{marginBottom: '0.5rem'}}>
                            <Formik initialValues={{
                                title: ''
                            }}
                                    onSubmit={(value) => {
                                        searchPost(value).then(() => {
                                        })
                                    }}
                            >
                                <Form>
                                    <Field className="me-0 mt-3" type="text" id="title" name="title"
                                           placeholder="Nhập tên bài viết . . ."/>
                                    <button className="search-son" type="submit">Tìm Kiếm
                                    </button>
                                </Form>
                            </Formik>
                        </div>
                    </div>

                    <ul className="cards_news">
                        {listPosts !== [] && (listPosts.map((post) => (
                            <li className="card_item_news" key={post.id}>
                                <div className="card-son card ">
                                    <a className="btn p-0 m-0" onClick={() => {
                                        detailPost(post, post.employee)
                                    }} data-bs-toggle="modal" data-bs-target="#exampleModalDetail">
                                        <div className="card_image_news">
                                            <span className="note">Tin tức</span>
                                            <img src={post.image} alt={post.title}/>
                                        </div>
                                    </a>
                                    <div className="card_content">
                                        <h5 className="card_title">{post.title.length > quantity ? `${post.title.slice(0, quantity)}...` : post.title}</h5>
                                        <div className="card_text">
                                            <div
                                                dangerouslySetInnerHTML={{__html: post.content.length > quantity ? `${post.content.slice(0, quantity)}...` : post.content}}>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="news-card-button ">
                                        <NavLink to={"/updatePost/" + post.id}
                                                 className={`btn1 news-button search  btn-warning ${localStorage.role === 'ROLE_EMPLOYEE' || localStorage.role === 'ROLE_ADMIN' ? 'd-block' : 'd-none'}`}>Sửa</NavLink>
                                        <a className={`btn1 news-button search  btn-warning ${localStorage.role === 'ROLE_EMPLOYEE' || localStorage.role === 'ROLE_ADMIN' ? 'd-block' : 'd-none'}`}
                                           onClick={() => {
                                               checkDelete(`${post.id}`, `${post.title}`)
                                           }}>Xoá</a>
                                        {/* <button className="news-button btn btn-danger" onClick={() => { setShowModal(true) }} >Xoá</button> */}
                                    </div>
                                </div>
                            </li>
                        )))}
                    </ul>
                    <button
                        className={`btn btn-light btn-outline-secondary  border-0 w-100 ${page === total - 1 ? 'd-none' : ''} ${status ? '' : 'd-none'} ${listPosts.length === 0 ? 'd-none' : ''}`}
                        onClick={() => {
                            if (page < total - 1) {
                                setPage((prev) => prev + 1)
                            }
                        }}
                    >Xem Thêm
                    </button>
                </div>

                <div className="vertical_news col-12 col-lg-3">
                    <div>
                        <h4 className="text-uppercase h2" style={{marginBottom: '16px', marginTop: '16px'}}>Tin nổi
                            bật</h4>
                    </div>
                    <ul className="cards_news">
                        <li className={`news-hots text-center w-100 ${messages === '' ? 'd-none' : 'd-block'}`}>
                            <p>{messages}</p>
                        </li>
                        {news !== [] && (news.map((newss, index) => (
                            <li className="news-hots" key={index}>
                                <div className="card-son card">
                                    <button className="btn p-0 m-0" onClick={() => {
                                        detailPost(newss, newss.employee)
                                    }} data-bs-toggle="modal" data-bs-target="#exampleModalDetail">
                                        <div className="card_image_news">
                                            <span className="note">Nổi bật</span>
                                            <img src={newss.image} alt="mixed vegetable salad in a mason jar."/>
                                        </div>
                                    </button>
                                    <div className="card_content">
                                        <h5 className="card_title ">{newss.title.length > quantity ? `${newss.title.slice(0, quantity)}...` : newss.title}</h5>
                                        <div className="card_text">
                                            <div
                                                dangerouslySetInnerHTML={{__html: newss.content.length > quantity ? `${newss.content.slice(0, quantity)}...` : newss.content}}>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="news-card-button">
                                        <NavLink to={"/updatePost/" + newss.id}
                                                 className={`news-button search btn1  btn-warning ${localStorage.role === 'ROLE_EMPLOYEE' || localStorage.role === 'ROLE_ADMIN' ? 'd-block' : 'd-none'}`}>Sửa</NavLink>
                                        <a className={`news-button search btn1 btn-warning ${localStorage.role === 'ROLE_EMPLOYEE' || localStorage.role === 'ROLE_ADMIN' ? 'd-block' : 'd-none'} `}
                                           onClick={() => {
                                               checkDelete(`${newss.id}`, `${newss.title}`)
                                           }}>Xoá</a>
                                    </div>
                                </div>
                            </li>
                        )))}
                    </ul>
                </div>
            </div>
            {/* <!--chi tiêt--> */}
            <div className="modal fade" id="exampleModalDetail" tabIndex={-1} aria-labelledby="exampleModalLabel1"
                 aria-hidden="true">
                <div className="modal-dialog modal-fullscreen modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header bg-info h-10">
                            <h5 className="modal-title" id="exampleModalLabel1">Chi tiết bài viết</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{padding: 0}}>
                            <div className="row container-fluid title-detail mt-1 mb-5" style={{flexDirection: "row"}}>
                                <div className="col-4 img-detail" style={{height: '10rem', position: 'relative'}}>
                                    <img
                                        style={{width: "95%", height: "100%", objectFit: "cover", position: "absolute"}}
                                        src={detail.image} alt="mixed vegetable salad in a mason jar."/>
                                </div>
                                <div className="col-8 card_content" style={{position: "relative"}}>
                                    <div className="note-detail" style={{
                                        width: "100%",
                                        height: "100%",
                                        position: "absolute",
                                        top: "10px",
                                        left: "5px"
                                    }}>
                                        <p className="m-0">Người đăng: {employee.nameEmployee}</p>
                                        <p>Thời gian: {formatDateTime(detail.datePost)}</p>
                                        <h1 className="card_title_detail">{detail.title}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="row card_text container-fluid text-justify">
                                <div className="col-12">
                                    <div dangerouslySetInnerHTML={{__html: detail.content}}></div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer" style={{maxHeight: '70px'}}>
                            <button type="button" className="btn1 btn-warning" data-bs-dismiss="modal">Thoát</button>
                        </div>
                    </div>
                </div>
            </div>
            </body>
        </>
    );
}