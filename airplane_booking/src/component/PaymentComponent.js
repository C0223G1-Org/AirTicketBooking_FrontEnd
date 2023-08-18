import React, { useEffect, useRef, useState } from 'react';
import '../css/payment/Payment.css';
import { getTicketByTicketId, updateTicketByIdTicket } from '../services/PaymentService';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios, { HttpStatusCode } from 'axios';


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
        const sss = () => {

            payments.forEach((name) => {

                if (name.seat.route.departure.nameDeparture === 'Hải Phòng(HPH) - Cát Bi') {
                    arr1.push(name)
                } else {
                    arr2.push(name)
                }
            })


        }

        sss()


        useEffect(() => {
            getTicket()
        }, []);
        useEffect(() => {
            document.title = 'Thanh toán'
        })



        let stateButton = 0;

        const renderPaypalButton = (payments) => {
            console.log(payments);


            const createOrder = (data, actions) => {
                try {
                    const totalAmount = document.getElementById("totalAmount").innerText;
                    const amountValueVND = parseFloat(totalAmount.replace(/[^\d.]/g, ''));
                    const exchangeRate = 23000; // T? giá VND sang USD
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
                        // G?i thông tin tr?ng thái thanh toán t?i Spring Boot
                        // const reponse = await updateTicketByIdTicket(1, order.status)
                        // console.log(order.status)
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
                                title: 'Thanh toán th?t b?i',
                                timer: 2000
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
                text: 'B?n có ch?c thông tin dã dúng ?',
                showCancelButton: true,
                showConfirmButton: true,
                confirmButtonColor: '#ffc439',
                cancelButtonColor: 'grey',
            }).then((result) => {
                if (result) {
                    if (stateButton === 0) {
                        renderPaypalButton(payments);
                        console.log(payments);
                        stateButton++;
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
            <div className="ticket">
                {/* <form onSubmit={sendEmail}> */}
                <h1 className="title">CHI TI?T CHUY?N BAY</h1>
                <div className="info">
                    <div className="row">
                        <div className="col-12">
                            <p className="label">Danh sách ngu?i di:</p>
                            {arr1.map((item) => {
                                return (
                                    <p className="value"> {item.namePassenger}</p>
                                )
                            })}

                        </div>
                    </div>
                    <div className="row">
                        <p className="route">Kh?i hành</p>
                    </div>

                    <div>
                        <div className="row">
                            <div className="col-3">
                                <p className="label">Noi di:</p>
                                <p className="value">{arr1[0]?.seat?.route?.departure?.nameDeparture}</p>
                            </div>
                            <div className="col-3">
                                <p className="label">Noi d?n:</p>
                                <p className="value">{arr1[0]?.seat?.route?.destination?.nameDestination}</p>
                            </div>
                            <div className="col-3">
                                <p className="label">Gi? bay:</p>
                                <p className="value">{arr1[0]?.seat?.route?.timeDeparture}</p>
                            </div>
                            <div className="col-3">
                                <p className="label">Gi? d?n:</p>
                                <p className="value">{arr1[0]?.seat?.route?.timeArrival}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <p className="label">{arr1[0]?.seat?.route?.nameRoute}</p>
                                <p className="value">{arr1[0]?.seat?.route?.airCraft?.nameAirCraft}</p>
                            </div>
                            <div className="col-3">
                                <p className="label">Ngày di:</p>
                                <p className="value">{arr1[0]?.seat?.route?.dateDeparture}</p>
                            </div>
                            <div className="col-3">
                                <p className="label">Ngày d?n:</p>
                                <p className="value">{arr1[0]?.seat?.route?.dateArrival}</p>
                            </div>
                            <div className="col-3">
                                <p className="label">Ti?n vé:</p>
                                <p className="value" style={{ width: '130px' }}>{formattedPrice} VND</p>
                            </div>
                        </div>
                    </div>


                    {arr2.length > 0 && (
                        <>
                            <div className="row">
                                <p className="route">Tr? v?</p>
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <p className="label">Noi di:</p>
                                    <p className="value">{arr2[0]?.seat?.route?.departure?.nameDeparture}</p>
                                </div>
                                <div className="col-3">
                                    <p className="label">Noi d?n:</p>
                                    <p className="value">{arr2[0]?.seat?.route?.destination?.nameDestination}</p>
                                    <div className="col-3">
                                        <p className="label">Gi? bay:</p>
                                        <p className="value">{arr2[0]?.seat?.route?.timeDeparture}</p>
                                    </div>
                                    <div className="col-3">
                                        <p className="label">Gi? d?n:</p>
                                        <p className="value">{arr2[0]?.seat?.route?.timeArrival}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-3">
                                        <p className="label">{arr2[0]?.seat?.route?.nameRoute}:</p>
                                        <p className="value">{arr2[0]?.seat?.route?.airCraft?.nameAirCraft}</p>
                                    </div>
                                    <div className="col-3">
                                        <p className="label">Ngày di:</p>
                                        <p className="value">{arr2[0]?.seat?.route?.dateDeparture}</p>
                                    </div>
                                    <div className="col-3">
                                        <p className="label">Ngày d?n:</p>
                                        <p className="value">{arr2[0]?.seat?.route?.dateArrival}</p>
                                    </div>
                                    <div className="col-3">
                                        <p className="label">Ti?n vé:</p>
                                        <p className="value" style={{ width: '130px' }}>{formattedPrice2}</p>
                                    </div>
                                </div>
                            </div> </>
                    )}


                    <div className="row">

                        <div className="col-4">
                            <p className="label">T?ng ti?n:</p>
                            <p className="value" id="totalAmount">{formattedPrice3}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            <p className="label">Ði?u ki?n giá vé:</p>
                            <p className="value">Giá vé dã bao g?m thu? và phí</p>
                            <p className="value">Hành lý xách tay: 7kg</p>
                        </div>
                        <div className="col-7 payment">
                            <p className="label" >Thanh toán</p>
                            <div id="paypal-button-container" > <button onClick={() => handlePayment()} className='btn btn-primary'>Ki?m tra</button></div>

                        </div>
                    </div>
                    <p className="thank-you">C?m on quý khách dã s? d?ng d?ch v? c?a chúng tôi!</p>
                </div>
            </div>

        )
    }
;

export default PaymentComponent;