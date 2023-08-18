import { useEffect, useState } from "react";
import { getListUnBookTicket, searchUnBookedTicket } from "../services/TicketService";
import { Link } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import Swal from "sweetalert2";

function TicketUnBook() {
    const [unTickets, setUnTickets] = useState([])
    const [page, setPage] = useState(0)
    const [loopCount, setLoopCount] = useState(0)
    const [unTicketObj,setUnTicketObj]=useState({});
    useEffect(() => {
        showUnBookTickets(page)
    }, [page,unTicketObj])
    const showUnBookTickets = () => {
        searchUnBookedTicket(page,unTicketObj).then((data) => {
            console.log(data.content)
            let numberPage
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
            setUnTickets(data.content)
        })
    }
    const transferPage = (value) => {
        if (value >= 0) {
            setPage(value)
        }

    }
    const findUnbooked = (value) => {
        setUnTicketObj(value)
        searchUnBookedTicket(page, unTicketObj).then((data) => {
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
                setUnTickets(data.content)
            }

        })
    }
    return (
        <div>
           <h1 className="h1-ticket">
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
                        onSubmit={(value) => {
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
                            <th>Mã Chuyến Bay</th>
                            <th>Tuyến Bay</th>
                            <th>Ngày Đi</th>
                            <th>Giá Vé</th>
                            <th>Số Lượng</th>

                        </tr>
                    </thead>
                    <tbody>
                        {unTickets && unTickets.map((ticket, index) => (
                            <tr key={index}>
                                <td  >{index + (page * 5)}</td>
                                <td >{ticket.nameRoute}</td>
                                <td >{ticket.nameDeparture}-{ticket.nameDestination}</td>
                                <td >{ticket.timeDeparture}</td>
                                <td>{ticket.priceTicket}</td>
                                <td>{ticket.countEmpty}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
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