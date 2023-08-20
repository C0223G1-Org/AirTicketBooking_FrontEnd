import React, { useEffect, useRef, useState } from 'react';
import '../css/payment/Payment.css';
import { getTicketByTicketId, updateTicketByIdTicket } from '../services/PaymentService';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios, { HttpStatusCode } from 'axios';
import img from './../logo-remove-background.png'




const PaymentComponent = () => {
    const [payments, setPayment] = useState([]);
    const { id } = useParams();
    
    const negative = useNavigate();
    const getTicket = () => {
        const getTicketById = async () => {
            try {
                const paymentData = await getTicketByTicketId(id);
                setPayment(paymentData);

            } catch (error) {
                console.error('Error occurred while getting payment data:', error)
            }
        };
        getTicketById();
    }

    let arr1 = [];
    let arr2 = [];
    const listArr = () => {
        payments.forEach((name) => {
            if (name.seat.route.departure.nameDeparture === 'Hải Phòng(HPH) - Cát Bi') {
                arr1.push(name)
            } else {
                arr2.push(name)
            }
        })
    }
    listArr()
    useEffect(() => {
        getTicket()
    }, []);
    useEffect(() => {
        document.title = 'Thanh toán'
    })
    let stateButton = 0;

    const renderPaypalButton = (payments) => {
        const createOrder = (data, actions) => {
            try {
                const totalAmount = document.getElementById("totalAmount").innerText;
                const amountValueVND = parseFloat(totalAmount.replace(/[^\d.]/g, ''));
                const exchangeRate = 23000; 
                const amountValueUSD = amountValueVND / exchangeRate;
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                currency_code: 'USD',
                                value: amountValueUSD.toFixed(2),
                            },
                        },
                    ],
                });
            } catch (error) {
                console.error('Error creating order:', error);
                throw error;
            }
        };

        window.paypal
            .Buttons({
                style: {
                    color: 'gold',
                    layout: 'vertical',
                    shape: 'rect',
                    label: 'pay',
                    height: 40,
                    marginLeft: 400,
                },
                createOrder: createOrder,
                onApprove: async (data, actions) => {

                    const order = await actions.order.capture();
                    console.log(order.status);
                    console.log(payments);
                    payments.forEach((item) => {
                        updateTicketByIdTicket(item.idTicket, order.status)
                    })
                    // Gửi thông tin trạng thái thanh toán tới Spring Boot

                    if (order.status === 'COMPLETED' || order.status === 200 || order.status === HttpStatusCode.Ok
                        || order.status === 'thành công') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Thanh toán thành công',
                            timer: 3000
                        })
                        negative('/home')

                    } else if (order.status === 422 || order.status === 404 || order.status === 'CANCELLED' ||
                        order.status === 'DECLINED' || order.status === 'FAILED' || order.status === 'EXPIRED' ||
                        order.status === 'PENDING') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Thanh toán thất bại',
                            timer: 3000
                        })
                        negative('/failed')
                            ;
                    }
                },
            }).render('#paypal-button-container');
    };

    const handlePayment = () => {
        Swal.fire({
            icon: 'warning',
            text: 'Bạn đã xác nhận thông tin đã đúng và muốn thanh toán ?',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#ffc439',
            cancelButtonColor: 'grey',
            confirmButtonText: "Xác nhận",
            cancelButtonText: 'Huỷ bỏ'
        }).then((result) => {
            if (result && result.value) {
                if (stateButton === 0) {
                    renderPaypalButton(payments);
                    console.log(payments);
                    stateButton++;

                    const kiemTraButton = document.querySelector('#paypal-button-container button');
                    kiemTraButton.style.display = 'none';
                }
            }
        })  

    };

    const price = arr1[0]?.priceTicket * arr1.length || 0;
    const price2 = arr2[0]?.priceTicket * arr2.length || 0;
    const total = price + price2;

    const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const formattedPrice2 = price2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const formattedPrice3 = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');


    if (!payments) {
        return null;
    }
    return (
        //    <form onSubmit={sendEmail}>
        <div className="payment-ticket" id='payment'>
            {/* <form onSubmit={sendEmail}> */}
            <h1 className="title">CHI TIẾT CHUYẾN BAY</h1>
            <div className="info">
                <div className="row">
                    <div className="col-7">
                        <p className="label">Danh sách người đi:</p>
                        {arr1.map((item) => {
                            return (
                                <p className="value"> {item.namePassenger}</p>
                            )
                        })}

                    </div>
                    <div className="col-5 thanh-logo">
                    <img src={img} alt="Image Description" />
                    <p className='thanh-codegym-airline'>codegym airline</p>
                    </div>
                </div>
                <div className="row">
                    <p className="route">Khởi hành</p>
                </div>

                <div>
                    <div className="row">
                        <div className="col-3">
                            <p className="label">Nơi đi:</p>
                            <p className="value">{arr1[0]?.seat?.route?.departure?.nameDeparture}</p>
                        </div>
                        <div className="col-3">
                            <p className="label">Nơi đến:</p>
                            <p className="value">{arr1[0]?.seat?.route?.destination?.nameDestination}</p>
                        </div>
                        <div className="col-3">
                            <p className="label">Giờ bay:</p>
                            <p className="value">{arr1[0]?.seat?.route?.timeDeparture}</p>
                        </div>
                        <div className="col-3">
                            <p className="label">Giờ đến:</p>
                            <p className="value">{arr1[0]?.seat?.route?.timeArrival}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <p className="label">{arr1[0]?.seat?.route?.nameRoute}</p>
                            <p className="value">{arr1[0]?.seat?.route?.airCraft?.nameAirCraft}</p>
                        </div>
                        <div className="col-3">
                            <p className="label">Ngày đi:</p>
                            <p className="value">{arr1[0]?.seat?.route?.dateDeparture}</p>
                        </div>
                        <div className="col-3">
                            <p className="label">Ngày đến:</p>
                            <p className="value">{arr1[0]?.seat?.route?.dateArrival}</p>
                        </div>
                        <div className="col-3">
                            <p className="label">Tiền vé:</p>
                            <p className="value" style={{ width: '140px' }}>{formattedPrice} VND</p>
                        </div>
                    </div>
                </div>


                {arr2.length > 0 && (
                    <div>
                        <div className="row">
                            <p className="route">Trở về</p>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <p className="label">Nơi đi:</p>
                                <p className="value">{arr2[0]?.seat?.route?.departure?.nameDeparture}</p>
                            </div>
                            <div className="col-3">
                                <p className="label">Nơi đến:</p>
                                <p className="value">{arr2[0]?.seat?.route?.destination?.nameDestination}</p>
                            </div>
                            <div className="col-3">
                                <p className="label">Giờ bay:</p>
                                <p className="value">{arr2[0]?.seat?.route?.timeDeparture}</p>
                            </div>
                            <div className="col-3">
                                <p className="label">Giờ đến:</p>
                                <p className="value">{arr2[0]?.seat?.route?.timeArrival}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <p className="label">{arr2[0]?.seat?.route?.nameRoute}</p>
                                <p className="value">{arr2[0]?.seat?.route?.airCraft?.nameAirCraft}</p>
                            </div>
                            <div className="col-3">
                                <p className="label">Ngày đi:</p>
                                <p className="value">{arr2[0]?.seat?.route?.dateDeparture}</p>
                            </div>
                            <div className="col-3">
                                <p className="label">Ngày đến:</p>
                                <p className="value">{arr2[0]?.seat?.route?.dateArrival}</p>
                            </div>
                            <div className="col-3">
                                <p className="label">Tiền vé:</p>
                                <p className="value" style={{ width: '140px' }}>{formattedPrice2} VND</p>
                            </div>
                        </div>
                    </div>
                )}


                <div className="row">

                    <div className="col-4">
                        <p className="label">Tổng tiền:</p>
                        <p className="value" id="totalAmount">{formattedPrice3} VND</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-7">
                        <p className="label">Điều kiện giá vé:</p>
                        <p className="value">Giá vé đã bao gồm thuế và phí</p>
                        <p className="value">Hành lý xách tay: 7kg</p>
                    </div>
                    <div className="col-5 payment">
                        <p className="label" >Thanh toán</p>
                        <div id="paypal-button-container" > <button onClick={() => handlePayment()} className='btn btn-primary'>Kiểm tra</button></div>

                    </div>
                </div>
                <p className="thank-you">Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi!</p>
            </div>
        </div>

    )
}
    ;

export default PaymentComponent;