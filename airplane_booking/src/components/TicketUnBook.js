import { useEffect, useState } from "react";
import { getListUnBookTicket, searchUnBookedTicket } from "../services/TicketService";
import { Link } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import Swal from "sweetalert2";

function TicketUnBook() {
    const [unTickets, setUnTickets] = useState([])
    const [page, setPage] = useState(0)
    useEffect(() => {
        showUnBookTickets(page)
    }, [page])
    const showUnBookTickets = () => {
        getListUnBookTicket(page).then((data) => {
            setUnTickets(data.content)
        })
    }
    const findUnbooked=(value)=>{
        searchUnBookedTicket(page,value).then((data)=>{
            if (!data.content) {
                Swal.fire({
                    icon: "error",
                    title: 'Không tìm thấy!',
                    showConfirmButton: false,
                    timer: 1500
                })
                showUnBookTickets(page)
            } else {
                setUnTickets(data.content)
            }
           
        })
    }
    return (
        <div>
            <h1>
                Quản Lý Bán Vé
            </h1>
            <div className="section-unBook-ticket">
                <ul>
                    <li className="section-unBook-ticket-item">
                        <Link to={`/ticket/booked`}>
                            <button className="status-ticket" type="button">Vé Đã Đặt</button>
                        </Link>
                    </li>
                </ul>
                <ul>
                    <Formik
                        initialValues={{
                            routeCode: "",
                            chairCode: ""
                        }}
                        onSubmit={(value)=>{
                            findUnbooked(value)
                        }}>
                        <Form>
                            <li className="section-unBook-ticket-item">
                                <Field type="text" name="routeCode" placeholder="Mã Chuyến Bay" />
                            </li>
                            <li className="section-unBook-ticket-item">
                                <Field type="text" name="chairCode" placeholder="Mã Ghế" />
                            </li>
                            <li className="section-unBook-ticket-item">
                                <button type="submit">Tìm Kiếm</button>
                            </li>
                        </Form>
                    </Formik>
                </ul>
            </div>
            <div className="table-ticket">
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã Ghế</th>
                            <th>Mã Chuyến Bay</th>
                            <th>Tuyến Bay</th>
                            <th>Ngày Đi</th>
                            <th>Loại Vé</th>

                        </tr>
                    </thead>
                    <tbody>
                        {unTickets.map((ticket, index) => (
                            <tr key={index}>
                                <td  >{index}</td>
                                <td >{ticket.positionSeat}</td>
                                <td >{ticket.nameRoute}</td>
                                <td >{ticket.nameDeparture}-{ticket.nameDestination}</td>
                                <td >{ticket.timeDeparture}</td>
                                <td >{ticket.typeSeat}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
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
            {/*<div class="show-search-ticket">*/}
            {/*    <div class="show-search-ticket-header">*/}
            {/*        <ul>*/}
            {/*            <li class="show-search-ticket-header-item">*/}
            {/*                <i class="fa-sharp fa-solid fa-plane"></i> Tìm vé*/}
            {/*            </li>*/}
            {/*            <li class="show-search-ticket-header-item">*/}
            {/*                <i class="fa-solid fa-book"></i> Quản Lý Đặt Chỗ*/}
            {/*            </li>*/}
            {/*            <li class="show-search-ticket-header-item">*/}
            {/*                <i class="fa-sharp fa-solid fa-clock"></i> Tra Cứu Chuyến Bay*/}
            {/*        </ul>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}
export default TicketUnBook;