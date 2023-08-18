import { useState, useEffect } from "react"
import { deleteTicketDB, getListTickets, getListUnBookTicket, searchBookedTicket } from "../services/TicketService"
import { Link } from "react-router-dom"
import ModalDeleteTicket from "./ModalDeleteTicket"
import * as yup from "yup"

import Swal from "sweetalert2"
import { Formik, Form, Field } from "formik"
import { getAllDestination } from "../services/DestinationServices"
import { getAllDeparture } from "../services/DepartureServices"

function TicketBooked() {
    const [tickets, setTickets] = useState([])
    const [page, setPage] = useState(0)
    const [isSearch, setIsSearch] = useState(false);
    const [isTicketSearch, setTicketSearch] = useState(true);
    const [isSeatManage, setIsSeatManage] = useState(false);
    const [isRouteManage, setIsRouteManage] = useState(false);
    const [statusTicket, setStatusTicket] = useState(true)
    const [loopCount, setLoopCount] = useState(0)
    const [destinations, setDestination] = useState([])
    const [departures, setDeparture] = useState([])
    const [ticketObj, setTicketObj] = useState({});

    const showSearch = () => {
        setIsSearch(!isSearch);
    };
    const searchTicket = () => {
        setTicketSearch(true);
        setIsSeatManage(false)
        setIsRouteManage(false)
    }
    const manageSeat = () => {
        setTicketSearch(false);
        setIsSeatManage(true)
        setIsRouteManage(false)
    }
    const searchRoutes = () => {
        setTicketSearch(false);
        setIsSeatManage(false)
        setIsRouteManage(true)
    }
    const changeStatusTicket = (status) => {
        setStatusTicket(status)
    }
    useEffect(() => {
        takeDeparture()
        takeDestination()
        getTickets()
    }, [page, ticketObj])
    const getTickets = () => {
        searchBookedTicket(page, ticketObj).then((data) => {
            console.log(ticketObj)
            let numberPage
            console.log(data.totalElements)
            if (data.totalElements > 5) {
                numberPage = data.totalElements % 5;
                console.log(numberPage)
            } else {
                numberPage = 0;
            }
            if ((data.totalElements / 5 - data.totalElements % 5) > 0) {
                numberPage += 1;
            }
            setLoopCount(numberPage)
            setTickets(data.content)
        })
    }
    const takeDestination = () => {
        getAllDestination().then((data) => {
            console.log(data)
            setDestination(data)
        })
    }
    const takeDeparture = () => {
        getAllDeparture().then((data) => {
            setDeparture(data)
        })
    }
    const deleteTicket = async (ticket) => {
        Swal.fire({
            title: 'Bạn có muốn xóa khách hàng ' + ticket.namePassenger + " ?"
            ,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTicketDB(ticket.id).then(() => {
                    getTickets(page)
                })
                Swal.fire({
                    icon: 'success',
                    title: 'Xóa thành công!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }


    const dataSearch = (obj) => {
        console.log(obj)
        setTicketObj(obj)
        console.log(ticketObj)
        searchBookedTicket(page, ticketObj).then((data) => {
            if (!data.content) {
                Swal.fire({
                    icon: "error",
                    title: 'Không tìm thấy!',
                    showConfirmButton: false,
                    timer: 1500
                })

            } else {
                let numberPage
                console.log(data.totalElements)
                if (data.totalElements > 5) {
                    numberPage = data.totalElements % 5;
                    console.log(numberPage)
                } else {
                    numberPage = 0;
                }
                if ((data.totalElements / 5 - data.totalElements % 5) > 0) {
                    numberPage += 1;
                }
                setLoopCount(numberPage)
                console.log(data.content)
                setTickets(data.content)
            }

            setIsSearch(false)
        }).catch(() => {

        })
    }
    const transferPage = (value) => {
        if (value >= 0) {
            setPage(value)
        }

    }
    return (
        <>
            <div>
                <h1 className="h1-ticket">
                    Quản Lý Bán Vé
                </h1>
                <div className="section-ticket">
                    <ul>
                        <li className="section-ticket-item">
                            <Link to={`/ticket/unbooked`}>
                                <button type="button">Vé Chưa Đặt</button>
                            </Link>
                        </li>
                    </ul>
                    <ul>
                        <li className="section-ticket-item">
                            <button type="button" onClick={showSearch}>Tìm Kiếm</button>
                        </li>
                    </ul>
                </div>
                <div className="table-ticket">
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên Khác Hàng</th>
                                <th>Mã Chuyến Bay</th>
                                {/* <th>Ngày Đặt Vé</th> */}
                                <th>Tuyến Bay</th>
                                <th>Ngày Đi</th>
                                <th>Tổng Tiền</th>
                                <th>Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets && tickets.map((ticket, index) => (
                                <tr key={index}>
                                    <td >{index + (page * 5)}</td>
                                    <td >{ticket.namePassenger}</td>
                                    <td >{ticket.nameRoute}</td>
                                    {/* <td>{ticket.dateBooking}</td> */}
                                    <td >{ticket.nameDeparture}-{ticket.nameDestination}</td>
                                    <td >{ticket.timeDeparture}</td>
                                    <td >{ticket.priceTicket}</td>
                                    <td className="icon-ticket">
                                        <ul>
                                        <Link to={`/tickets/updateTicket/${ticket.id}`}>
                                            <li className="icon-ticket-item">
                                                <i className="fa-solid fa-pen-to-square" />

                                            </li>
                                                </Link>
                                            <li className="icon-ticket-item">

                                                    <i onClick={()=>deleteTicket(ticket)} className="fa-solid fa-trash mx-2" style={{ color: '#eb0f1a' }}></i>
                                                {/* <ModalDeleteTicket ticket={ticket} delete={() => deleteTicket(ticket.id)} icon={"fa-solid fa-trash mx-2"} /> */}
                                            </li>
                                            <Link to={`/printTicket/${ticket.id}`}>
                                            <li className="icon-ticket-item">
                                                <i className="fa-sharp fa-solid fa-file-pdf mx-2" style={{ color: '#8c2626' }} />
                                            </li>
                                            </Link>
                                    </ul>
                                </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

            </div>
            {isSearch &&


                <div className="modal-search">
                    <div className="show-search-ticket" id="modal-search">
                        <ul>
                            <li>
                                <div className="show-search-ticket-header">
                                    <div className="show-search-ticket-header-item item-one" onClick={searchTicket}><p><i className="fa-sharp fa-solid fa-plane" />Tìm
                                        Vé
                                    </p></div>
                                    <div className="show-search-ticket-header-item item-two" onClick={manageSeat}><p><i className="fa-solid fa-book" />Quản Lý Đặt
                                        Chỗ
                                    </p></div>
                                    <div className="show-search-ticket-header-item item-three" onClick={searchRoutes}><p><i className="fa-sharp fa-solid fa-clock" />Tra
                                        Cứu Chuyến Bay</p></div>
                                </div>
                            </li>
                            {isTicketSearch &&
                                <div id="search-ticket">
                                    <Formik
                                        initialValues={{
                                            typeTicket: 1,
                                            departure: "",
                                            destination: "",
                                            departureDate: "",
                                            destinationDate: "",
                                            passenger: "",
                                            idSearch: 1,
                                            hasParameter: true
                                        }}

                                        onSubmit={(value) => {
                                            console.log(value)
                                            let newValue;
                                            console.log(statusTicket)
                                            if (statusTicket) {
                                                newValue = { ...value, typeTicket: 1 }
                                            } else {
                                                alert("nhan")
                                                newValue = { ...value, typeTicket: 2 }
                                                console.log(newValue)
                                            }
                                            console.log(newValue)
                                            dataSearch(newValue);
                                        }}>
                                        <Form>
                                            <li>
                                                <div className="show-search-ticket-sale-body">
                                                    <div className="show-search-ticket-body-sale-selection">
                                                        <ul>
                                                            <li className="show-search-ticket-body-sale-selection-item">
                                                                <button type="button" onClick={() => changeStatusTicket(true)}>Khứ Hồi</button>
                                                            </li>
                                                            <li className="show-search-ticket-body-sale-selection-item">
                                                                <button type="button" onClick={() => changeStatusTicket(false)}>Một Chiều</button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>

                                                <div className="show-search-ticket-body-input">
                                                    <ul>
                                                        <li className="show-search-ticket-body-input-item">
                                                            <Field as="select" className="select" name="departure">
                                                                <option value={""}>Khởi Hành</option>
                                                                {departures && departures.map((departure) => {
                                                                    return (
                                                                        <option key={departure.idDeparture} value={departure.nameDeparture}>
                                                                            {departure.nameDeparture}
                                                                        </option>
                                                                    )
                                                                })}
                                                            </Field>
                                                        </li>
                                                        <li className="show-search-ticket-body-input-item">
                                                            {statusTicket ? (
                                                                <i className="fa-solid fa-right-left" style={{ color: 'blue' }} />
                                                            ) : (
                                                                <i className="fa-sharp fa-solid fa-arrow-right" style={{ color: 'blue' }} />
                                                            )}

                                                            <Field as="select" className="select" name="destination">
                                                                <option value={""}>Nơi Đến</option>
                                                                {destinations && destinations.map((destination) => {
                                                                    return (
                                                                        <option key={destination.idDestination} value={destination.nameDestination}>
                                                                            {destination.nameDestination}
                                                                        </option>
                                                                    )
                                                                })}
                                                            </Field>
                                                        </li>
                                                        <li className="show-search-ticket-body-input-item">
                                                            <label>Ngày Bay</label>
                                                            <Field type="date" name="departureDate" placeHolder="Ngày khởi hành" />

                                                        </li>
                                                        <li className="show-search-ticket-body-input-item">
                                                            <Field type="text" name="passenger" placeholder="Hành Khách" />
                                                        </li>


                                                    </ul>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="show-search-ticket-body-submit">
                                                    <ul>
                                                        {statusTicket &&
                                                            <li className="show-search-ticket-body-input-passenger">
                                                                <label>Ngày về</label>
                                                                <Field type="date" name="destinationDate" placeholder="Ngày Về"
                                                                />
                                                            </li>
                                                        }
                                                    </ul>

                                                    <ul>
                                                        <li style={{ marginLeft: '30px' }} className="show-search-ticket-body-input-passenger">
                                                            <button onClick={showSearch} type="button">Đóng</button>
                                                        </li>
                                                        <li className="show-search-ticket-body-input-passenger" style={{ marginLeft: '10px' }}>
                                                            <button type="submit">Tìm Kiếm</button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </Form>
                                    </Formik>
                                </div>
                            }
                            {isSeatManage &&
                                <div id="manage-seat">
                                    <Formik
                                        initialValues={{
                                            passenger: "",
                                            chairCode: "",
                                            idSearch: 2,
                                            hasParameter: true
                                        }}
                                        onSubmit={(value) => {
                                            dataSearch(value);
                                        }}>
                                        <Form>
                                            <li>
                                                <div className="show-seat-ticket-body-input">
                                                    <ul>
                                                        <li className="show-seat-ticket-body-input-item">
                                                            <Field type="text" name="seatCode" placeholder="Mã Đặt Chỗ" />
                                                        </li>
                                                        <li className="show-seat-ticket-body-input-item">
                                                            <Field type="text" name="passenger" placeholder="Tên Khách Hàng" />
                                                        </li>
                                                        <li className="show-seat-ticket-body-input-item">
                                                            <button onClick={showSearch} type="button">Đóng</button>
                                                        </li>
                                                        <li className="show-seat-ticket-body-input-item">
                                                            <button type="submit">Tìm Kiếm</button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </Form>
                                    </Formik>
                                </div>
                            }
                            {isRouteManage &&
                                <div id="search-route">
                                    <Formik
                                        initialValues={{
                                            departure: "",
                                            departureDate: "",
                                            routeCode: "",
                                            idSearch: 3,
                                            hasParameter: true
                                        }}
                                        onSubmit={(value) => {
                                            dataSearch(value);
                                        }}>
                                        <Form>
                                            <li>
                                                <div className="show-route-ticket-body-input">
                                                    <ul>
                                                        <li className="show-route-ticket-body-input-item">
                                                            <Field type="text" name="routeCode" placeHolder="Mã Chuyến Bay" />
                                                        </li>
                                                        <li className="show-route-ticket-body-input-item">
                                                            <Field type="text" placeholder="Ngày khởi hành" name="departureDate"

                                                            />
                                                        </li>
                                                        <li className="show-route-ticket-body-input-item">
                                                            <button type="submit">Tìm Kiếm</button>
                                                        </li>
                                                        <li className="show-route-ticket-body-input-item">
                                                            <button onClick={showSearch} type="button">Đóng</button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </Form>
                                    </Formik>
                                </div>
                            }
                        </ul>
                    </div>
                </div >

            }
            <div className="pagination-ticket">
                <ul>
                    <li className="pagination-ticket-item">
                        <button type="button" onClick={() => { transferPage(page - 1) }} style={{ borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px' }}>Trước</button>
                    </li>
                    {Array.from({ length: loopCount }, (_, index) => (
                        <li className="pagination-ticket-item" key={index}>
                            <button type="button" onClick={() => { transferPage(index) }}>{index}</button>
                        </li>
                    ))}
                    <li className="pagination-ticket-item">
                        <button type="button" onClick={() => { if (page < (loopCount - 1)) { transferPage(page + 1) } }} style={{ borderTopRightRadius: '5px', borderBottomRightRadius: '5px' }}>Sau</button>
                    </li>
                </ul>
            </div>
        </div >
        </>
    );
}
export default TicketBooked;