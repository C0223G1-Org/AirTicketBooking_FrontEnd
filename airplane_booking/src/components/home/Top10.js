import React, {useEffect, useState} from "react";
import {getRouteById, getTop10CheapestRoute} from "../../services/RouteServices";
import '../../css/home/Top10.css';
import { useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import CurrencyFormat from "../format-currency/CurrencyFormat";
import moment from "moment";

export default function GetTop10Cheapest() {
    const [top10s, setTop10s] = useState([]);
    const [route, setRoute] = useState({});
    const [isOpen, setIsOpen] = useState(true);
    const [adult, setAdult] = useState(0);
    const [children, setChildren] = useState(0);
    const navigate = useNavigate();

    const getTop10 = async () => {
        try {
            const data = await getTop10CheapestRoute();
            setTop10s(data);
        } catch (error) {
            console.log("Không có dữ liệu top 10")
        }

    }

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const getRouteFunction = async (idRoute) => {
        const data = await getRouteById(idRoute);
        setRoute(data);
    }

    const getRouteFindById = async (id) => {
        await getRouteFunction(id);
        openModal();
    }

    const handleSubmit = () => {
        if (adult != '') {
            const totalPeople = Number.parseInt(adult) + Number.parseInt(children);
            if (totalPeople <= 5) {
                navigate(`/list/${route.departure.nameDeparture},${route.destination.nameDestination},${route.dateDeparture},,0,${adult},${children}`);
            } else {
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
                title: 'Trường người lớn là bắt buộc!!!',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }



    useEffect(() => {
        getTop10();
    }, [])

    return (
        <div id="top_10">
            <div className="row m-3">
                <div className="cheap">
                    <h3>Cùng khám phá những chuyến bay với giá cực hấp dẫn của chúng tôi</h3>
                </div>
                {
                    (route.idRoute && isOpen) &&
                    <div className="modal select-top10">
                        <div className="modal_overlay">
                        </div>
                        <div className="modal_body">
                            <div className="modal_inner">
                                <div className='title-bonus'>
                                    <h3>Đặt vé chuyến bay {route.nameRoute}</h3>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span className="form-label">Điểm khởi hành</span>
                                            <input className='form-control'
                                                   value={route.departure.nameDeparture} readOnly>
                                            </input>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span className="form-label">Điểm đến</span>
                                            <input className='form-control' value={route.destination.nameDestination}
                                                   readOnly>
                                            </input>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <span className="form-label">Ngày đi</span>
                                            <input value={route.dateDeparture} className="form-control" type="date"
                                                   readOnly/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span className="form-label">Người lớn</span>
                                            <select className="form-control"
                                                    onChange={(e) => {setAdult(e.target.value)}}
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
                                            <select className="form-control"
                                                    onChange={(e) => {setChildren(e.target.value)}}
                                                    required>
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
                                    <div className="row">
                                        <div className="col-6">
                                            <button className="submit-btn home-btn" onClick={()=> {handleSubmit()}}>Đặt</button>
                                        </div>
                                        <div className="col-6">
                                            <button onClick={() => closeModal()} className="submit-btn back-btn">Trở về
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className="col-12">
                    <div className="row row-cols-md-5">
                        {
                            top10s.map((route) => {
                                return (
                                    <div className="col-12">
                                        <div className="card" key={route.idRoute}>
                                            <img
                                                src={route.imageDestination}
                                                className="card-img-top" alt="..."/>
                                            <div className="card-body">
                                                <div className="row"><h6
                                                    style={{color: "#daa310"}}>{route.timeDeparture} - {route.timeArrival}</h6>
                                                </div>
                                                <div className="row"><h6
                                                    style={{color: "#daa310"}}>{moment(`${route.dateDeparture}`).format("DD-MM-YYYY")} </h6></div>
                                                <div className="row"><h6>{route.nameDeparture} đến</h6></div>
                                                <div className="row"><h6> {route.nameDestination}</h6></div>
                                                <div className="row"><h6 className='price-ticket'
                                                                         style={{color: "#daa310"}}>
                                                    Từ {<CurrencyFormat value={route.priceRoute} />} VNĐ (Một chiều)</h6></div>
                                                <div className="row"><button className="btn buy" onClick={() => {
                                                    getRouteFindById(route.idRoute)
                                                }}>Đến mua ngay</button></div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}