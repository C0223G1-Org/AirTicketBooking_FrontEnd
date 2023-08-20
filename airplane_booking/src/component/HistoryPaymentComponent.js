import React, {useEffect, useState} from "react";
import {getListHistoryByCustomerId, getListTicketByNameRoute} from "../services/HistoryPaymentService";
import {Link, useParams} from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as yup from "yup";
import {UpdateCustomer} from "../services/CustomerServices";
import {Unauthorzied} from "./Unauthorized";


function HistoryPaymentComponent() {
    const [payments, setPayments] = useState([]);

    let [page, setPage] = useState(0)
    const {id} = useParams();
    let [nameDeparture, setNameDeparture] = useState("")
    let [nameDestination, setNameDestination] = useState("")

    const showList = async (pageable, nameDeparture, nameDestination) => {
        try {
            const paymentData = await getListHistoryByCustomerId(id, pageable, nameDeparture, nameDestination);
            setPayments(paymentData);

        } catch (error) {
            console.error('Error occurred while getting payment data:', error)
        }
    };

    useEffect(() => {
        showList(page, nameDeparture, nameDestination)
    }, []);
    const setPageFunction = async (pageAfter) => {
        setPage(pageAfter)
    }
    const setDepartureFunction = async (departure) => {
        setNameDeparture(departure)
    }
    const setDestinationFunction = async (destination) => {
        setNameDestination(destination)
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Ngăn chặn hành vi mặc định của phím Enter
            performSearch();
        }
    }

    const nextPage = async () => {
        page += 1;
        if (page < payments.totalPages) {
            await setPageFunction(page).then((await showList(page, nameDeparture, nameDestination)))
        } else {
            page -= 1
        }
    }
    const previousPage = async () => {
        if (page >= 1) {
            page -= 1
        }
        await setPageFunction(page).then((await showList(page, nameDeparture, nameDestination)))
    }
    const searchPage = async () => {
        let numberPage = document.getElementById("numberPage").value * 1;
        numberPage = numberPage - 1;
        if (numberPage > payments.totalPages && numberPage < 1) {
            await setPageFunction(numberPage).then(await showList(page, nameDeparture, nameDestination))
            page = numberPage
        } else {
            await setPageFunction(0).then(await showList(0, nameDeparture, nameDestination))

            Swal.fire({
                icon: "error",
                title: 'Không tìm thấy trang!',
                showConfirmButton: false,
                timer: 5000
            })
        }
    }

    function handleButtonClick() {
        performSearch();
    }

    const performSearch = async () => {
        const departureSearch = document.getElementById("departure").value;
        const destinationSearch = document.getElementById("destination").value;
        await setDepartureFunction(departureSearch)
            .then(await setDestinationFunction(destinationSearch))
            .then(await setPageFunction(0))
            .then(showList(0, departureSearch, destinationSearch));
    }

    useEffect(() => {
        document.title = 'Lịch sử thanh toán'
    })

    const changePrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    if (!payments) {
        return null;
    }
    // const [role, setRole] = useState(localStorage.getItem("role"));
    // const [email, setEmail] = useState(localStorage.getItem("username"));
    // console.log("role " + role);
    // useEffect(() => {
    //     setRole(localStorage.getItem("role"));
    //     setEmail(localStorage.getItem("username"));
    // }, []);
    // if (role === 'ROLE_CUSTOMER') {
        return (
            <div className="background-customer">
                <div className="background-customer">
                    <meta charSet="UTF-8"/>


                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
                          rel="stylesheet"
                          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                          crossOrigin="anonymous"/>
                    <link rel="stylesheet"
                          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"/>
                    <link rel="stylesheet"
                          href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.4.6/tailwind.min.css"/>

                    <div className="container mx-auto px-4 sm:px-8 background-customer" id="customer"
                    >
                        <div className="py-8" style={{textAlign: 'center'}}>
                            <div className="title"
                                 style={{backgroundColor: '#166987', color: 'white', marginLeft: '-5px'}}>
                                <h1 style={{fontSize: '50px'}}>LỊCH SỬ GIAO DỊCH</h1>
                            </div>
                            <div className="my-2 flex sm:flex-row flex-col">

                                <div className="block relative">
                                    <input
                                        onKeyPress={handleKeyPress}
                                        placeholder="Tìm kiếm theo nơi đi" id="departure" defaultValue={""}
                                        className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"/>
                                </div>
                                <div className="block relative">
                                    <input
                                        onKeyPress={handleKeyPress}
                                        placeholder="Tìm kiếm theo nơi đến" id="destination" defaultValue={""}
                                        className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"/>
                                </div>
                                <button type="submit"
                                        onClick={handleButtonClick}
                                        className="text-sm  font-semibold py-2 px-4 "
                                        style={{background: 'rgb(223, 165, 18)', color: '#ffffff',}}>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>

                            </div>


                            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                    {
                                        <table className="min-w-full leading-normal myTable">
                                            <thead>
                                            <tr style={{background: 'rgb(6, 133, 170)', color: '#ffffff'}}>
                                                <th className=" col-md-1 py-3     text-x "
                                                    style={{textAlign: 'center'}}>
                                                    STT
                                                </th>

                                                <th className="text-x  " style={{textAlign: 'center'}}>
                                                    Tên chuyến bay
                                                </th>
                                                <th className="text-x  " style={{textAlign: 'center'}}>
                                                    Nơi đi
                                                </th>
                                                <th className="text-x " style={{textAlign: 'center'}}>
                                                    Nơi đến
                                                </th>

                                                <th className="text-x  " style={{textAlign: 'center'}}>
                                                    Ngày đặt vé
                                                </th>
                                                <th className="text-x  " style={{textAlign: 'center'}}>
                                                    Tổng tiền
                                                </th>
                                                <th className="text-x  " style={{textAlign: 'center'}}>
                                                    Chi Tiết
                                                </th>
                                            </tr>

                                            </thead>
                                            {payments.length !== 0 ?
                                                <tbody>
                                                {payments.content.map((item, index) =>
                                                    (
                                                        <tr key={`ctm_${index}`}>
                                                            <td className=" bg-white "
                                                                style={{textAlign: 'center', weight: "10px"}}>
                                                                <p>{(page * 4) + (index + 1)}</p>
                                                            </td>

                                                            <td className=" px-3 py-3   bg-white ">
                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                    {item.nameRoute}
                                                                </p>
                                                            </td>
                                                            <td className="  px-3 py-3   bg-white ">
                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                    {item.nameDeparture.split('-')[0]}
                                                                </p>
                                                            </td>
                                                            <td className="  px-3 py-3   bg-white ">
                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                    {item.nameDestination.split('-')[0]}
                                                                </p>
                                                            </td>


                                                            <td className=" py-3   bg-white ">
                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                    {moment(`${item.dateBooking}`).format('DD-MM-YYYY')}
                                                                </p>
                                                            </td>
                                                            <td className=" py-3   bg-white ">
                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                    {changePrice(item.priceTicket)} VND
                                                                </p>
                                                            </td>
                                                            <td className=" py-3   bg-white ">
                                                                <Link
                                                                    to={`/detail-history/${id}/${item.nameDeparture}/${item.nameDestination}/${item.dateBooking}`}>
                                                                    <i className="fa-solid fa-circle-info"
                                                                       style={{color: '#dfa512'}}></i>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}

                                                </tbody>
                                                :
                                                <tbody>
                                                <tr style={{height: '150px'}}>
                                                    <td style={{color: "red", fontSize: '50px'}} colSpan="9">Không có dữ
                                                        liệu
                                                    </td>
                                                </tr>
                                                </tbody>
                                            }
                                        </table>
                                    }
                                    {payments.length !== 0 ?
                                        <div
                                            className="px-3 py-1 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">

                                            <div className="inline-flex mt-2 xs:mt-0">


                                                {page !== 0 ? <button
                                                    onClick={async () => {

                                                        await previousPage()
                                                    }}
                                                    className="text-sm   py-2 px-3 rounded-l"
                                                    style={{background: 'rgb(223, 165, 18)', color: '#ffffff'}}>
                                                    Trước
                                                </button> : <button
                                                    onClick={async () => {

                                                        await previousPage()
                                                    }}
                                                    className="text-sm   py-2 px-3 rounded-l"
                                                    style={{
                                                        background: 'rgb(223, 165, 18)',
                                                        color: '#ffffff',
                                                        opacity: '0,6',
                                                        cursor: 'not-allowed'
                                                    }}>
                                                    Trước
                                                </button>}

                                                <button className="text-sm   py-2 px-3 rounded-l" style={{
                                                    background: 'rgb(223, 165, 18)',
                                                    color: '#ffffff',
                                                    marginLeft: '5px'
                                                }}>
                                                    {page + 1}/{payments.totalPages}
                                                </button>

                                                {page !== payments.totalPages - 1 ?
                                                    <button onClick={async () => {

                                                        await nextPage();
                                                    }} className="text-sm   py-2 px-3 rounded-l" style={{
                                                        background: 'rgb(223, 165, 18)',
                                                        color: '#ffffff',
                                                        marginLeft: '5px'
                                                    }}>
                                                        Sau
                                                    </button>
                                                    : <button onClick={async () => {

                                                        await nextPage();
                                                    }} className="text-sm   py-2 px-3 rounded-l" style={{
                                                        background: 'rgb(223, 165, 18)',
                                                        color: '#ffffff',
                                                        marginLeft: '5px', opacity: '0,6', cursor: 'not-allowed'
                                                    }}>
                                                        Sau
                                                    </button>}
                                                <div className="   py-2 px-3 rounded-l" style={{
                                                    background: 'rgb(223, 165, 18)',
                                                    color: 'black',
                                                    marginLeft: '5px',
                                                    borderRadius: '5px'
                                                }}>
                                                    <input id="numberPage" type="number"
                                                           style={{width: '50px', borderRadius: '5px'}}
                                                           onKeyDown={async (event) => {
                                                               if (event.keyCode === 13) {
                                                                   await searchPage()
                                                               }
                                                           }}/>
                                                    <button className=""
                                                            onClick={async () => {
                                                                await searchPage()
                                                            }}
                                                            style={{
                                                                marginLeft: '10px',
                                                                bodeRadius: '5px',
                                                                color: 'white'
                                                            }}>
                                                        <i
                                                            className="fa-solid fa-magnifying-glass"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        : ""}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    // }
    // return <Unauthorzied/>
    //

}

export default HistoryPaymentComponent;