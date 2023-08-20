import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { getListTicketByNameRoute } from "../services/HistoryPaymentService";
import { Link } from "react-router-dom";
import '.././css/payment/DetailHistory.css';



function DetailHistoryPaymentComponent() {
    const [wasPayments, setWasPayments] = useState([]);
    const param = useParams();



    const showListTicket = async () => {
        console.log(param);
        try {
            const paymentData = await getListTicketByNameRoute(param.departure, param.destination, param.dateBooking);
            setWasPayments(paymentData);
            console.log(paymentData);
        } catch (error) {
            console.error('Error occurred while getting payment data:', error)
        }
    };
    useEffect(() => {
        showListTicket();
    }, []);
    useEffect(() => {
        document.title = 'Lịch sử chi tiết';
    })

    if (!wasPayments) {
        return null;
    }
    const changePrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }


    return (
        <div className="background-detail-history">
        <div className="detail-history-ticket" id='detail-history'>
            <h1 className="title" style={{ marginLeft: '-5px' }}>CHI TIẾT VÉ</h1>

            <div className="info">
                {wasPayments.map((item) => {
                    return (
                        <>
                            <div className="row">
                                <div className="col-3">
                                    <p className="label">Tên khách hàng: </p>
                                    <p className="value">{item.namePassenger}</p>
                                </div>
                                <div className="col-3">
                                    <p className="label">Giới tính: </p>
                                    {item.genderCustomer == true ? <p className="value">Nam</p> : <p className="value">Nữ</p>}
                                  
                                </div>
                                <div className="col-3">
                                    <p className="label">CCCD/Passport:  </p>
                                    <p className="value">{item.idCardPassenger}</p>
                                </div>
                                <div className="col-3">
                                    <p className="label">Loại vé:  </p>
                                    <p className="value">{item.typeTicket.nameTypeTicket}</p>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <p className="label">Nơi đi:</p>
                                    <p className="value">{item.seat.route.departure.nameDeparture}</p>
                                </div>
                                <div className="col-3">
                                    <p className="label">Nơi đến:</p>
                                    <p className="value">{item.seat.route.destination.nameDestination}</p>
                                </div>
                                <div className="col-3">
                                    <p className="label">Hành lý:</p>
                                    <p className="value">{item.luggage.nameLuggage}</p>
                                </div>
                                <div className="col-3">
                                    <p className="label">Loại ghế:</p>
                                    <p className="value">{item.seat.typeSeat.nameTypeSeat}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <p className="label">Máy bay: </p>
                                    <p className="value"> {item.seat.route.airCraft.nameAirCraft}</p>
                                </div>
                                <div className="col-3">
                                    <p className="label">Giờ bay:</p>
                                    <p className="value">{item.seat.route.timeDeparture}</p>
                                </div>
                                <div className="col-3">
                                    <p className="label">Giờ đến:</p>
                                    <p className="value"> {item.seat.route.timeArrival}</p>
                                </div>
                                <div className="col-3">
                                    <p className="label">Tiền vé:</p>
                                    <p style={{ width: '200px' }} className="value">  {changePrice(item.priceTicket)} VND</p>
                                </div>
                            </div>
                            <hr></hr>

                        </>
                    )
                })}
                <button className="back-to-history" style={{
                    width: '95px',
                    height: '40px',
                    border: 'none',
                    borderRadius: '10px',
                    backgroundColor: '#dfa512',
                    outlineColor: 'blue',
                    marginLeft: '47%'
                }}><Link to={`/history-payment/${param.id}`} style={{textDecoration:'none', color: 'white', backgroundColor:'#dfa512'}}>Quay lại</Link>
                </button>
            </div>
        </div>
        </div>
    )
}
export default DetailHistoryPaymentComponent;