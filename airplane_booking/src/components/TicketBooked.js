import { useState, useEffect } from "react"
import { deleteTicketDB, getListTickets, getListUnBookTicket } from "../services/TicketService"
import { Link } from "react-router-dom"
import ModalDeleteTicket from "./ModalDeleteTicket"
import Swal from "sweetalert2"

function TicketBooked() {
    const [tickets, setTickets] = useState([])
    const [page, setPage] = useState(0)
    const [isSearch, setIsSearch] = useState(false);
    const [isTicketSearch, setTicketSearch] = useState(true);
    const [isSeatManage, setIsSeatManage] = useState(false);

    const showSearch = () => {
        setIsSearch(!isSearch);
    };
    const searchTicket=()=>{
        setTicketSearch(false);
        setIsSeatManage(true)
    }
    const manageSeat=()=>{
        setIsSeatManage(true)
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
    return (
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
                {isSearch &&
                    <div className="show-search-ticket" id="modal-search">
                        <ul>
                            <li>
                                <div className="show-search-ticket-header">
                                    <div className="show-search-ticket-header-item item-one" onClick={searchTicket}><p><i className="fa-sharp fa-solid fa-plane" />Tìm
                                        Vé
                                    </p></div>
                                    <div className="show-search-ticket-header-item item-two" onclick={manageSeat}><p><i className="fa-solid fa-book" />Quản Lý Đặt
                                        Chỗ
                                    </p></div>
                                    <div className="show-search-ticket-header-item item-three" onclick="searchRoutes()"><p><i className="fa-sharp fa-solid fa-clock" />Tra
                                        Cứu Chuyến Bay</p></div>
                                </div>
                            </li>
                            {isTicketSearch &&
                                <div id="search-ticket">
                                    <li>
                                        <div className="show-search-ticket-sale-body">
                                            <div className="show-search-ticket-body-sale-selection">
                                                <ul>
                                                    <li className="show-search-ticket-body-sale-selection-item">
                                                        <button>Khứ Hồi</button>
                                                    </li>
                                                    <li className="show-search-ticket-body-sale-selection-item">
                                                        <button>Một Chiều</button>
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
                                                    <select>
                                                        <option>Hồ Chí Minh</option>
                                                        <option>Đà Nẵng</option>
                                                    </select>
                                                </li>
                                                <li className="show-search-ticket-body-input-item">
                                                    <label><i className="fa-solid fa-right-left" style={{ color: 'blue' }} /></label>
                                                    <select>
                                                        <option>Hồ Chí Minh</option>
                                                        <option>Đà Nẵng</option>
                                                    </select>
                                                </li>
                                                <li className="show-search-ticket-body-input-item">
                                                    <input type="date" placeholder="Ngày đi" onfocus="(this.type='date')" onblur="(this.type='text')" />
                                                </li>
                                                <li className="show-search-ticket-body-input-item">
                                                    <input type="date" placeholder="Ngày về" onfocus="(this.type='date')" onblur="(this.type='text')" />
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="show-search-ticket-body-submit">
                                            <ul>
                                                <li className="show-search-ticket-body-input-passenger">
                                                    <label>Hành khách</label>
                                                    <input type="text" placeholder="Hành Khách" />
                                                </li>
                                            </ul>
                                            <ul>
                                                <li className="show-search-ticket-body-input-passenger">
                                                    <button onclick="offModalSearch()" type="button">Đóng</button>
                                                </li>
                                                <li className="show-search-ticket-body-input-passenger" style={{ marginLeft: '10px' }}>
                                                    <button type="button">Tìm Kiếm</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </div>
                            }
                            {isSeatManage &&
                                <div id="manage-seat">
                                    <li>
                                        <div className="show-seat-ticket-body-input">
                                            <ul>
                                                <li className="show-seat-ticket-body-input-item">
                                                    <input type="text" placeholder="Mã Đặt Chỗ" />
                                                </li>
                                                <li className="show-seat-ticket-body-input-item">
                                                    <input type="text" placeholder="Tên Khách Hàng" />
                                                </li>
                                                <li className="show-seat-ticket-body-input-item">
                                                    <button type="button">Tìm Kiếm</button>
                                                </li>
                                                <li className="show-seat-ticket-body-input-item">
                                                    <button onclick="offModalSearch()" type="button">Đóng</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </div>
                            }
                            <div id="search-route">
                                <li>
                                    <div className="show-route-ticket-body-input">
                                        <ul>
                                            <li className="show-route-ticket-body-input-item">
                                                <input type="text" placeholder="Mã Chuyễn Bay" />
                                            </li>
                                            <li className="show-route-ticket-body-input-item">
                                                <input type="date" placeholder="Ngày khởi hành" onfocus="(this.type='date')" onblur="(this.type='text')" />
                                            </li>
                                            <li className="show-route-ticket-body-input-item">
                                                <button type="button">Tìm Kiếm</button>
                                            </li>
                                            <li className="show-route-ticket-body-input-item">
                                                <button onclick="offModalSearch()" type="button">Đóng</button>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </div>
                        </ul>
                    </div>
                }
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
        </div>
    );
}
export default TicketBooked;