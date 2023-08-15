import { useState, useEffect } from "react"
import { deleteTicketDB, getListTickets, getListUnBookTicket, searchBookedTicket } from "../services/TicketService"
import { Link } from "react-router-dom"
import ModalDeleteTicket from "./ModalDeleteTicket"
import * as yup from "yup"
import Swal from "sweetalert2"
import { Formik, Form, Field } from "formik"

function TicketBooked() {
    const [tickets, setTickets] = useState([])
    const [page, setPage] = useState(0)
    const [isSearch, setIsSearch] = useState(false);
    const [isTicketSearch, setTicketSearch] = useState(true);
    const [isSeatManage, setIsSeatManage] = useState(false);
    const [isRouteManage, setIsRouteManage] = useState(false);
    const [statusTicket, setStatusTicket] = useState(true)
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
        getTickets()
    }, [])
    const getTickets = () => {
        getListTickets(page).then((data) => {
            setTickets(data.content)
        })
    }
    const deleteTicket = async (id) => {
        deleteTicketDB(id).then(() => {
            getListTickets(page).then((data) => {
                setTickets(data.content)
            })
            Swal.fire({
                icon: 'success',
                title: 'Delete success fully!!!!',
                showConfirmButton: false,
                timer: 1500
            })
        })
    }
    const [inputType, setInputType] = useState('text');
    const [date, setDate] = useState('');

  
    const dataSearch = (obj) => {
        console.log(obj)
        searchBookedTicket(page,obj).then((data)=>{
            console.log(data.content)
            setTickets(data.content)
            setIsSearch(false)
        })
    }

    return (
        <>
            <div>
                <h1>
                    Quản Lý Bán Vé
                </h1>
                <div className="section-ticket">
                    <ul>
                        <li className="section-ticket-item">
                            <Link to={`/ticket/unbooked`}>
                                <button className="status-ticket" type="button">Vé Chưa Đặt</button>
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
                                <th>Tuyến Bay</th>
                                <th>Ngày Đi</th>
                                <th>Tổng Tiền</th>
                                <th>Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets && tickets.map((ticket, index) => (
                                <tr>
                                    <td style={{ textAlign: 'center' }} key={index}>{index}</td>
                                    <td style={{ textAlign: 'left' }}>{ticket.namePassenger}</td>
                                    <td style={{ textAlign: 'center' }}>{ticket.nameRoute}</td>
                                    <td style={{ textAlign: 'center' }}>{ticket.nameDeparture}-{ticket.nameDestination}</td>
                                    <td style={{ textAlign: 'right' }}>{ticket.timeDeparture}</td>
                                    <td style={{ textAlign: 'right' }}>{ticket.priceTicket}</td>
                                    <td className="icon-ticket">
                                        <ul>
                                            <li className="icon-ticket-item">
                                                <i className="fa-solid fa-pen-to-square" />

                                            </li>
                                            <li className="icon-ticket-item">
                                                <ModalDeleteTicket ticket={ticket} delete={() => deleteTicket(ticket.id)} icon={"fa-solid fa-trash mx-2"} />
                                            </li>
                                            <li className="icon-ticket-item">
                                                <i className="fa-sharp fa-solid fa-file-pdf mx-2" style={{ color: '#8c2626' }} />
                                            </li>
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
                                                idSearch:1
                                            }}

                                            onSubmit={(value) => {
                                                console.log(value)
                                                let newValue;
                                                console.log(statusTicket)
                                                if (statusTicket) {
                                                    newValue = {...value ,typeTicket: 1 }
                                                } else {
                                                    alert("nhan")
                                                    newValue = {  ...value,typeTicket: 2 }
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
                                                                <label>từ</label>
                                                                <Field as="select" name="departure">
                                                                    <option value={""}>Khởi Hành</option>
                                                                    <option value={"Hồ Chí Minh"}>Hồ Chí Minh</option>
                                                                    <option value={"Đà Nẵng"}>Đà Nẵng</option>
                                                                </Field>
                                                            </li>
                                                            <li className="show-search-ticket-body-input-item">
                                                                <label><i className="fa-solid fa-right-left" style={{ color: 'blue' }} /></label>
                                                                <Field as="select" name="destination">
                                                                    <option value={""}>Nơi Đến</option>
                                                                    <option value={"Hồ Chí Minh"}>Hồ Chí Minh</option>
                                                                    <option value={"Đà Nẵng"}>Đà Nẵng</option>
                                                                </Field>
                                                            </li>
                                                            <li className="show-search-ticket-body-input-item">
                                                                <Field type="text" name="departureDate" placeholder="Ngày khởi hành"
                                                                />
                                                            </li>
                                                            {statusTicket &&
                                                                <li className="show-search-ticket-body-input-item">
                                                                    <Field type="text" name="destinationDate" placeholder="Ngày Về"
                                                                    />
                                                                </li>
                                                            }
                                                        </ul>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="show-search-ticket-body-submit">
                                                        <ul>
                                                            <li className="show-search-ticket-body-input-passenger">
                                                                <label>Hành khách</label>
                                                                <Field type="text" name="passenger" placeholder="Hành Khách" />
                                                            </li>
                                                        </ul>
                                                        <ul>
                                                            <li className="show-search-ticket-body-input-passenger">
                                                                <button onClick={showSearch} type="button">Đóng</button>
                                                            </li>
                                                            <li className="show-search-ticket-body-input-passenger" style={{ marginLeft: '10px' }}>
                                                                <button  type="submit">Tìm Kiếm</button>
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
                                                idSearch:2
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
                                                idSearch:3
                                            }}
                                            onSubmit={(value) => {
                                                dataSearch(value);
                                            }}>
                                            <Form>
                                                <li>
                                                    <div className="show-route-ticket-body-input">
                                                        <ul>
                                                            <li className="show-route-ticket-body-input-item">
                                                                <Field type="text" name="routeCode" placeHolder="Mã Chuyễn Bay" />
                                                            </li>
                                                            <li className="show-route-ticket-body-input-item">
                                                                <Field type="text" placeholder="Ngày khởi hành" name="departureDate"

                                                                />
                                                            </li>
                                                            <li className="show-route-ticket-body-input-item">
                                                                <button  type="submit">Tìm Kiếm</button>
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
                    </div>

                }
                <div className="pagination-ticket">
                    <ul>
                        <li className="pagination-ticket-item">
                            <button type="button" style={{ borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px' }}>Trước</button>
                        </li>
                        <li className="pagination-ticket-item">
                            <button type="button">1</button>
                        </li>
                        <li className="pagination-ticket-item">
                            <button type="button">2</button>
                        </li>
                        <li className="pagination-ticket-item">
                            <button type="button">3</button>
                        </li>
                        <li className="pagination-ticket-item">
                            <button type="button">4</button>
                        </li>
                        <li className="pagination-ticket-item">
                            <button type="button" style={{ borderTopRightRadius: '5px', borderBottomRightRadius: '5px' }}>Sau</button>
                        </li>
                    </ul>
                </div>
            </div >
        </>
    );
}
export default TicketBooked;