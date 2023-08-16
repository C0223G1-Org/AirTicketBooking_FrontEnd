import React, { useEffect, useState } from 'react';
import '../css/payment/Payment.css';
import { getTicketByTicketId, updateTicketByIdTicket } from '../services/PaymentService';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios, { HttpStatusCode } from 'axios';

const PaymentComponent = () => {
    const [payment, setPayment] = useState([])
    // const { id } = useParams();
    const negative = useNavigate();
    const getTicket = () => {
        const getTicketById = async () => {
            try {
                const paymentData = await getTicketByTicketId();
                setPayment(paymentData);
                console.log(payment);
            } catch (error) {
                console.error('Error occurred while getting payment data:', error)
            }
        };
        getTicketById();
    }
    useEffect(() => {
        console.log("aaaaa");
        getTicket()
    }, []);
    useEffect( () => {
        document.title = 'Thanh toán'
        })

    let typeTicket = payment?.typeTicket?.nameTypeTicket;
    let stateTicket = 0;
    if (typeTicket === 'Khứ hồi') {
        stateTicket = 1;
    }

    let stateButton = 0;

    const renderPaypalButton = () => {
        const createOrder = (data, actions) => {
            try {
                const totalAmount = document.getElementById("totalAmount").innerText;
                const amountValueVND = parseFloat(totalAmount.replace(/[^\d.]/g, ''));
                const exchangeRate = 23000; // Tỷ giá VND sang USD
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
                  
                    // Gửi thông tin trạng thái thanh toán tới Spring Boot
                    await updateTicketByIdTicket(1, order.status)
                    console.log(order.status)
                    if (order.status === 'COMPLETED' || order.status === 200 || order.status === HttpStatusCode.Ok
                        || order.status === 'thành công') {                   
                        Swal.fire({
                            icon: 'success',
                            title: 'Thanh toán thành công',
                            timer: 2000
                        }).then(() => {
                            negative('/success')
                        });
                    } else if (order.status === 422 || order.status === 404 || order.status === 'CANCELLED' ||
                    order.status === 'DECLINED'||  order.status === 'FAILED' ||  order.status === 'EXPIRED' ||
                    order.status === 'PENDING') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Thanh toán thất bại',
                            timer: 2000
                        }).then(() => {
                            negative('/failed')
                        });
                    }
                },
            }).render('#paypal-button-container');
    };

    useEffect(() => {
        if (stateButton === 0) {
            renderPaypalButton();
            stateButton++;
        }
    }, []);
    const price = payment?.priceTicket || 0;
    const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return (
        <div className="ticket">
            <h1 className="title">CHI TIẾT CHUYẾN BAY</h1>
            <div className="info">
                <div className="row">
                    <div className="col-12">
                        <p className="label">Danh sách người đi:</p>
                        <p className="value"> {payment.namePassenger}</p>
                        <p className="value">{payment.namePassenger}</p>
                    </div>
                </div>
                <div className="row">
                    <p className="route">Khởi hành</p>
                </div>
                <div className="row">
                    <div className="col-3">
                        <p className="label">Nơi đi:</p>
                        <p className="value">{payment?.seat?.route?.departure?.nameDeparture}</p>
                    </div>
                    <div className="col-3">
                        <p className="label">Nơi đến:</p>
                        <p className="value">{payment?.seat?.route?.destination?.nameDestination}</p>
                    </div>
                    <div className="col-3">
                        <p className="label">Giờ bay:</p>
                        <p className="value">{payment?.seat?.route?.timeDeparture}</p>
                    </div>
                    <div className="col-3">
                        <p className="label">Giờ đến:</p>
                        <p className="value">{payment?.seat?.route?.timeArrival}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <p className="label">{payment?.seat?.route?.nameRoute}</p>
                        <p className="value">{payment?.seat?.route?.airCraft?.nameAirCraft}</p>
                    </div>
                    <div className="col-3">
                        <p className="label">Ngày đi:</p>
                        <p className="value">{payment?.seat?.route?.dateDeparture}</p>
                    </div>
                    <div className="col-3">
                        <p className="label">Ngày đến:</p>
                        <p className="value">{payment?.seat?.route?.dateArrival}</p>
                    </div>
                    <div className="col-3">
                        <p className="label">Tiền vé:</p>
                        <p className="value" style={{ width: '130px' }}>{formattedPrice} VND</p>
                    </div>
                </div>
                {stateTicket === 1 && (
                    <>
                        <div className="row">
                            <p className="route">Trở về</p>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <p className="label">Nơi đi:</p>
                                <p className="value">Hồ Chí Minh</p>
                            </div>
                            <div className="col-3">
                                <p className="label">Nơi đến:</p>
                                <p className="value">Đà Nẵng</p>
                            </div>
                            <div className="col-3">
                                <p className="label">Giờ bay:</p>
                                <p className="value">15:30 PM</p>
                            </div>
                            <div className="col-3">
                                <p className="label">Giờ đến:</p>
                                <p className="value">17:00 PM</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <p className="label">SGN-DAN:</p>
                                <p className="value">ABC123</p>
                            </div>
                            <div className="col-3">
                                <p className="label">Ngày đi:</p>
                                <p className="value">14/08/2023</p>
                            </div>
                            <div className="col-3">
                                <p className="label">Ngày đến:</p>
                                <p className="value">14/08/2023</p>
                            </div>
                            <div className="col-3">
                                <p className="label">Tiền vé:</p>
                                <p className="value" value="700000" style={{ width: '130px' }}>700,000 VND</p>
                            </div>
                        </div>
                    </>
                )}

            </div>
            <div className="row">

                <div className="col-4">
                    <p className="label">Tổng tiền:</p>
                    <p className="value" id="totalAmount">2,200,000 VND</p>
                </div>
            </div>
            <div className="row">
                <div className="col-5">
                    <p className="label">Điều kiện giá vé:</p>
                    <p className="value">Giá vé đã bao gồm thuế và phí</p>
                    <p className="value">Hành lý xách tay: 7kg</p>
                </div>
                <div className="col-7 payment">
                    <p className="label">Thanh toán</p>
                    <div id="paypal-button-container"></div>

                </div>
            </div>
            <p className="thank-you">Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi!</p>
        </div>

    )
};

export default PaymentComponent;