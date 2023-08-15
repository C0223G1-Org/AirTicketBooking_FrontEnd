import { useEffect, useState } from "react";
import { getListUnBookTicket } from "../services/TicketService";
import { Link } from "react-router-dom";
import { Formik } from "formik";

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
    return (
        <div>
            <h1>
                Quản Lý Bán Vé
            </h1>
            <div className="section-ticket">
                <ul>
                    <li className="section-ticket-item">
                        <Link to={`/ticket/booked`}>
                            <button className="status-ticket" type="button">Vé Đã Đặt</button>
                        </Link>
                    </li>
                </ul>
                <ul>
                    
                        <li className="section-ticket-item">
                            <input type="text" placeholder="Mã Ghế" />
                        </li>
                        <li className="section-ticket-item">
                            <input type="text" placeholder="Mã Ghế" />
                        </li>
                        <li className="section-ticket-item">
                            <input placeholder="Ngày bay" type="text" onfocus="(this.type='date')" onblur="(this.type='text')" id="date" />
                        </li>
                        <li className="section-ticket-item">
                            <input type="text" placeholder="tìm kiếm" />
                        </li>
                        <li className="section-ticket-item">
                            <button type="button">Search</button>
                        </li>
               
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
                            <tr>
                                <td style={{ textAlign: 'center' }} key={index}>{index}</td>
                                <td style={{ textAlign: 'left' }}>{ticket.positionSeat}</td>
                                <td style={{ textAlign: 'center' }}>{ticket.nameRoute}</td>
                                <td style={{ textAlign: 'center' }}>{ticket.nameDeparture}-{ticket.nameDestination}</td>
                                <td style={{ textAlign: 'right' }}>{ticket.timeDeparture}</td>
                                <td style={{ textAlign: 'center' }}>{ticket.typeSeat}</td>
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