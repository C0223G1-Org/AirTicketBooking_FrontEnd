import {React, useEffect, useState} from 'react';
import {getAllDeparture} from '../../services/DepartureServices';
import {getAllDestination} from '../../services/DestinationServices';

import '../../css/home/Home.css';
import {useNavigate} from 'react-router-dom';
import {Carousel} from 'bootstrap';
import GetTop10Cheapest from "./Top10";
import Swal from "sweetalert2";
import Popup from "./ChatPopup";
import "../../css/search_ticket/style-popup.css";
import UserChat from '../chat_messenger/UserChat';


export default function Home() {
    const [departures, setDepartures] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [dateDeparture, setDateDeparture] = useState("");
    const [dateDestination, setDateDestination] = useState("");
    const [ticketType, setTicketType] = useState(0);
    const [adult, setAdult] = useState(0);
    const [children, setChildren] = useState(0);
    const navigate = useNavigate();
    const [selectedDeparture, setSelectedDeparture] = useState('');
    const [selectedDestination, setSelectedDestination] = useState('');



    const handleSearchTicket = () => {
        console.log(ticketType)
        if (ticketType != null) {
            if (ticketType == 1) {
                if (selectedDeparture != '') {
                    if (selectedDestination != '') {
                        if (dateDeparture != '') {
                            if (dateDestination != '') {
                                if (adult != '') {
                                    let sumPeople = 0;
                                    sumPeople += Number.parseInt(adult) + Number.parseInt(children);
                                    if (sumPeople <= 5) {
                                        const dateDP = new Date(dateDeparture);
                                        const dateDS = new Date(dateDestination);
                                        const currentDate = new Date();
                                        dateDP.setHours(0, 0, 0, 0);
                                        currentDate.setHours(0, 0, 0, 0);
                                        dateDS.setHours(0, 0, 0, 0);
                                        if (dateDP < currentDate) {
                                            Swal.fire({
                                                icon: 'warning',
                                                title: 'Bạn chọn ngày đi không đúng!',
                                                showConfirmButton: false,
                                                timer: 1500
                                            })
                                        } else if (dateDP >= currentDate && dateDS < dateDP) {
                                            Swal.fire({
                                                icon: 'warning',
                                                title: 'Bạn chọn sai ngày về',
                                                showConfirmButton: false,
                                                timer: 1500
                                            })
                                        } else {
                                            navigate(`/list/${selectedDeparture},${selectedDestination},${dateDeparture},${dateDestination},${ticketType},${adult},${children}`);
                                        }
                                    } else if (sumPeople > 5) {
                                        Swal.fire({
                                            icon: 'warning',
                                            title: 'Tổng số người tối đa cho 1 lần đặt là 5',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                    }
                                } else {
                                    Swal.fire({
                                        icon: 'warning',
                                        title: 'Vui lòng chọn điền vào trường người lớn!!!!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                }
                            } else {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Vui lòng chọn ngày đến!!!!',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        } else {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Vui lòng chọn ngày đi!!!!',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Vui lòng chọn điểm đến!!!!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Vui lòng chọn điểm khởi hành!!!!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            } else if (ticketType == 0) {
                if (selectedDeparture != '') {
                    if (selectedDestination != '') {
                        if (dateDeparture != '') {
                            if (adult != '') {
                                let sumPeople = 0;
                                sumPeople += Number.parseInt(adult) + Number.parseInt(children);
                                if (sumPeople <= 5) {
                                    const dateDP = new Date(dateDeparture);
                                    const currentDate = new Date();
                                    dateDP.setHours(0, 0, 0, 0);
                                    currentDate.setHours(0, 0, 0, 0);
                                    if (dateDP < currentDate) {
                                        Swal.fire({
                                            icon: 'warning',
                                            title: 'Bạn chọn ngày đi không đúng!',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                    } else {
                                        navigate(`/list/${selectedDeparture},${selectedDestination},${dateDeparture},${dateDestination},${ticketType},${adult},${children}`);
                                    }
                                } else if (sumPeople > 5) {
                                    Swal.fire({
                                        icon: 'warning',
                                        title: 'Tổng số người tối đa cho 1 lần đặt là 5',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                }
                            } else {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Vui lòng điền vào trường người lớn!!!',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        } else {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Vui lòng chọn ngày đi!!!',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Vui lòng chọn điểm đến!!!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Vui lòng chọn điểm khởi hành!!!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }

            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Vui lòng chọn loại vé!!!',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
    const setTicketTypeFunction = async (data) => {
        setTicketType(data);
    }

    const handleChangeTypeTicket = async (event) => {
        const data = event.target.value;
        await setTicketTypeFunction(data);
    }

    const getAllDepartureApi = async () => {
        const data = await getAllDeparture();
        setDepartures(data);
    }

    const getAllDestinationApi = async () => {
        const data = await getAllDestination();
        setDestinations(data);
    }

    console.log(selectedDestination)
    console.log(selectedDeparture)
    useEffect(() => {
        getAllDepartureApi();
        getAllDestinationApi();
    }, [ticketType]);
    return (
        <div>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0}
                            className="active" aria-current="true" aria-label="Slide 1"/>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1}
                            aria-label="Slide 2"/>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2}
                            aria-label="Slide 3"/>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://www.vietnamairlines.com/~/media/B316FB8463454B8780F71E2E32C7359E.ashx"
                             className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src="https://www.vietnamairlines.com/~/media/73798957242E4F2AA34B73B9DDB94896.ashx"
                             className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src="https://www.vietnamairlines.com/~/media/91BAD72CDD9647179F9922F154E48C5D.ashx"
                             className="d-block w-100" alt="..."/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"/>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"/>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="row form-search">
                <div className="col-md-6 col-md-offset-1">
                    <h2 className="find">Tìm kiếm các chuyến bay</h2>
                    <div className="booking-form-home">
                        {/* <form> */}
                        <div className="form-group">
                            <div className="form-checkbox">
                                <label htmlFor="roundtrip">
                                    <input type="radio" id="roundtrip" name="flight-type"
                                           value='1'
                                           onClick={(event) => {
                                               handleChangeTypeTicket(event);
                                           }
                                           }
                                           required
                                    />
                                    <span/>Khứ hồi
                                </label>
                                <label htmlFor="one-way">
                                    <input type="radio" id="one-way" name="flight-type"
                                           value='0'
                                           onClick={(event) => {
                                               handleChangeTypeTicket(event)
                                           }}
                                           required
                                    />
                                    <span/>Một chiều
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <span className="form-label">Điểm khởi hành</span>
                                    <select className='form-control'
                                            onChange={(e) => {
                                                setSelectedDeparture(e.target.value)
                                            }}
                                            required
                                    >
                                        <option value=''>Sân bay, Thành phố</option>
                                        {
                                            departures.map((dp) => {
                                                if (dp.nameDeparture !== selectedDestination)
                                                    return (
                                                        <option key={dp.idDeparture} value={dp.nameDeparture}>
                                                            {dp.nameDeparture}
                                                        </option>
                                                    )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <span className="form-label">Điểm đến</span>
                                    <select className='form-control'
                                            onChange={(e) => {
                                                setSelectedDestination(e.target.value)
                                            }}
                                            required
                                    >
                                        <option value=''>Sân bay, Thành phố</option>
                                        {
                                            destinations.map((ds) => {
                                                if (ds.nameDestination !== selectedDeparture)
                                                    return (
                                                        <option key={ds.idDestination}
                                                                value={ds.nameDestination}>
                                                            {ds.nameDestination}
                                                        </option>
                                                    )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>

                        {ticketType == 1 ?
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <span className="form-label">Ngày đi</span>
                                        <input className="form-control" type="date"
                                               min={new Date().toISOString().split('T')[0]}
                                               onChange={(e) => {
                                                   setDateDeparture(e.target.value)
                                               }}
                                               required/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <span className="form-label">Ngày về</span>
                                        <input className="form-control" type="date"
                                               min={new Date().toISOString().split('T')[0]}
                                               onChange={(e) => {
                                                   setDateDestination(e.target.value)
                                               }}
                                               required/>
                                    </div>
                                </div>
                            </div> :
                            <div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <span className="form-label">Ngày đi</span>
                                        <input className="form-control" type="date"
                                               min={new Date().toISOString().split('T')[0]}
                                               onChange={(e) => {
                                                   setDateDeparture(e.target.value)
                                               }}
                                               required/>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <span className="form-label">Người lớn</span>
                                    <select className="form-control"
                                            onChange={(e) => {
                                                setAdult(e.target.value)
                                            }}
                                            required
                                    >
                                        <option value=''>Chọn</option>
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                    </select>
                                    <span className="select-arrow"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <span className="form-label">Trẻ em (0-15 tuổi)</span>
                                    <select className="form-control" onChange={(e) => {
                                        setChildren(e.target.value)
                                    }}>
                                        <option value='0'>0</option>
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                    </select>
                                    <span className="select-arrow"/>
                                </div>
                            </div>
                        </div>
                        <div className="form-btn">
                            <button className="submit-btn home-btn" onClick={() => handleSearchTicket()}>Tìm vé
                            </button>
                        </div>
                        {/* </form> */}
                    </div>
                </div>
                <div className="col-md-6 col-md-offset-2 bonus">
                    <h2 className="title">Khám phá những điểm đến thú vị</h2>
                    <div className="row">
                        <div className="col-6 row-cols-md-1 g-4 first-card">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card text-white travel">
                                        <img
                                            src="https://dulichchat.com/wp-content/uploads/2021/01/du-lich-phu-quoc-dulichchat-25-1.jpg"
                                            className="card-img" alt="..."/>
                                        <div className="card-img-overlay">
                                            <h4 className="card-title">Phú Quốc - Hòn ngọc quý</h4>
                                            <button>Khám phá</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 img-down">
                                    <div className="card text-white travel">
                                        <img src="https://media.travel.com.vn/destination/tf_220726033156_024216.jpg"
                                             className="card-img" alt="..."/>
                                        <div className="card-img-overlay">
                                            <h4 className="card-title">Đà Lạt - Mộng mơ</h4>
                                            <button>Khám phá</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 row-cols-md-1 g-4 second-card">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card text-white travel">
                                        <img
                                            src="https://www.quangbinhtravel.vn/wp-content/uploads/2013/05/ca-chep-rong.jpg"
                                            className="card-img" alt="..."/>
                                        <div className="card-img-overlay">
                                            <h4 className="card-title">Đà Nẵng - Năng động</h4>
                                            <button>Khám phá</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 img-down">
                                    <div className="card text-white travel">
                                        <img
                                            src="https://static-images.vnncdn.net/files/publish/2022/7/27/ha-long-bay-1-852.jpg"
                                            className="card-img" alt="..."/>
                                        <div className="card-img-overlay">
                                            <h4 className="card-title">Hạ Long - Hùng vĩ</h4>
                                            <button>Khám phá</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row banner">
                <div className="col-2"/>
                <div className="col-2">
                    <img className="rounded-circle"
                         src="https://elmistibota.com/wp-content/uploads/2020/11/lam-passport-online-top.jpg"/>
                    <h6>Quy định chung</h6>
                </div>
                <div className="col-2">
                    <img className="rounded-circle"
                         src="https://i.pinimg.com/736x/2f/41/50/2f4150bb3504111adb674612ac8b1b89.jpg"/>
                    <h6>Ưu đãi cực đã</h6>
                </div>
                <div className="col-2">
                    <img className="rounded-circle"
                         src="https://i.pinimg.com/564x/d6/19/08/d61908e1da389de3fc4d9a87ec3f8787.jpg"/>
                    <h6>Tin tức phổ biến</h6>
                </div>
                <div className="col-2">
                    <img className="rounded-circle"
                         src="https://i.pinimg.com/564x/8e/59/5f/8e595f4bcfe87564134654f680be45e8.jpg"/>
                    <h6>Mua thêm hành lý</h6>
                </div>
                <div className="col-2"/>
            </div>
            <div>
            <UserChat />
            </div>
            <GetTop10Cheapest/>

        </div>
    )
}