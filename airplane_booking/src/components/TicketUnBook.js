import { useEffect, useState } from "react";
import { getListSeat, getListUnBookTicket, searchUnBookedTicket } from "../services/TicketService";
import { Link } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import numeral from 'numeral';
import Swal from "sweetalert2";
import "../css/ticket/manage-ticket.css";
import { date } from "yup";
import { getUnSeatList } from "../services/SeatServices";

function TicketUnBook() {
    const [unTickets, setUnTickets] = useState([])
    const [page, setPage] = useState(0)
    const [loopCount, setLoopCount] = useState(0)
    const [unTicketObj, setUnTicketObj] = useState({});
    const [showDetail, setShowDetail] = useState(false)
    const [seatUnBooked, setSeatUnBooked] = useState([])
    const [unTicket, setUnTicket] = useState(null)
    useEffect(() => {
        showUnBookTickets(page)
    }, [page, unTicketObj])
    const showUnBookTickets = () => {
        searchUnBookedTicket(page, unTicketObj).then((data) => {
            // searchUnBookedTicket(page, unTicketObj).then((data) => {
                console.log(data.content);

                let numberPage = Math.ceil(data.totalElements / 5);
                if(!numberPage){
                    Swal.fire({
                        icon: "error",
                        title: 'Không tìm thấy!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setUnTicketObj({})
                }
                setLoopCount(numberPage);

                setUnTickets(data.content);
            // });
        })
        .catch(()=>{
            Swal.fire({
                icon: "error",
                title: 'Có Lỗi Hệ Thống!',
                showConfirmButton: false,
                timer: 2500
            })
            setUnTicketObj({})
        })
    }
    const transferPage = (value) => {
        if (value >= 0 && value < loopCount) {
            setPage(value);
        }
    };
    const showDetailTicket = (value) => {

        setUnTicket(value)
        console.log(value)
        getUnSeatList(value.id).then((data) => {
            console.log(data)
            setSeatUnBooked(data)
        })
            .catch(() => {
                alert("loi")
            })
        setShowDetail(true)

    }
    const closeDetailTicket = () => {
        setShowDetail(false)
    }
    const findUnbooked = (value) => {
        setPage(0);
        console.log(value)
        searchUnBookedTicket(page, value).then((data) => {
            if (!data.content) {
                Swal.fire({
                    icon: "error",
                    title: 'Không tìm thấy!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
        
                console.log(data.totalElements)
                let numberPage = Math.ceil(data.totalElements / 5);
                if(!numberPage){
                    Swal.fire({
                        icon: "error",
                        title: 'Không tìm thấy!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setUnTicketObj({})
                }
                setUnTickets(data.content);
                setUnTicketObj(value)
                setUnTickets(data.content)
                setLoopCount(numberPage)
            }

        }).catch(()=>{
            Swal.fire({
                icon: "error",
                title: 'Có Lỗi Hệ Thống!',
                showConfirmButton: false,
                timer: 2500
            })
            setUnTicketObj({})
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
                        }}
                        onSubmit={(value) => {
                            findUnbooked(value)
                        }}>
                        <Form>
                            <li className="section-unBook-ticket-item">
                                <Field type="text" name="routeCode" placeholder="Mã Chuyến Bay" />
                            </li>
                            <li className="section-unBook-ticket-item">
                                <button type="submit">Tìm Kiếm</button>
                            </li>
                        </Form>
                    </Formik>
                </ul>
            </div>
            <div className="table-ticket " >
                <table className="table-responsive">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã Chuyến Bay</th>
                            <th>Tuyến Bay</th>
                            <th>Giờ Bay</th>
                            <th>Giá Vé</th>
                            <th>Số Lượng</th>
                            <th>Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {unTickets && unTickets.map((ticket, index) => (
                            <tr key={index}>
                                <td  >{index + (page * 5)}</td>
                                <td >{ticket.nameRoute}</td>
                                <td >{ticket.nameDeparture}-{ticket.nameDestination}</td>
                                <td >{ticket.timeDeparture}-{ticket.departureDate}</td>
                                <td>{numeral(ticket.priceTicket).format('0,0 đ')}VND</td>
                                <td>{ticket.countEmpty}</td>
                                <td>
                                    <i onClick={() => { showDetailTicket(ticket) }} className="fa-solid fa-pen-to-square" />
                                </td>


                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ul className="pagination-ticket">
            <li className="pagination-ticket-item">
                <button  style={{ borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px' ,minWidth:'100px'}}>Trang {page}/{loopCount-1}</button>
            </li>
                {page !==0 && (
                    <>
                <li className="pagination-ticket-item">
                    <button
                        type="button"
                        onClick={() => transferPage(0)}
                       
                        className={page <= 10 ? 'active' : ''}
                    >
                       <i class="fa-solid fa-angles-left"></i>
                    </button>
                </li>
                
                <li className="pagination-ticket-item">
                    <button
                        type="button"
                        onClick={() => transferPage(page - 1)}
                        disabled={page === 0 }
                    >
                       <i class="fa-solid fa-angle-left"></i>
                    </button>
                </li>
                </>
                )}
                {Array.from({ length: loopCount }, (_, index) => {
                    if (
                        (index >= page - 2 && index <= page + 2) ||
                        (index === 10 && loopCount > 10) ||
                        (index === 20 && loopCount > 20) ||
                        (index === 30 && loopCount > 30) ||
                        (page === 25 && index === 10)
                    ) {
                        return (
                            <li className="pagination-ticket-item" key={index}>
                                <button
                                    type="button"
                                    onClick={() => transferPage(index)}
                                    className={page === index ? 'active' : ''} style={page === index ? { background: 'rgb(122, 88, 3)' } : {}}
                                >
                                    {index}
                                </button>
                            </li>
                        );
                    }
                    return null;
                })}
                <li className="pagination-ticket-item">
                    <button
                        type="button"
                        onClick={() => transferPage(page + 1)}
                        disabled={page === loopCount - 1}
                    >
                       <i class="fa-solid fa-angle-left fa-rotate-180"></i>
                    </button>
                </li>
                <li className="pagination-ticket-item">
                    <button
                        type="button"
                        onClick={() => transferPage(loopCount - 1)}
                        style={{ borderTopRightRadius: '5px', borderBottomRightRadius: '5px' }}
                        className={page === loopCount - 1 ? 'active' : ''}
                    >
                        <i class="fa-solid fa-angles-left fa-rotate-180"></i>
                    </button>
                </li>
            </ul>
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
            {showDetail &&
                <div className="show-unbooked">
                    <div className="show-unbooked-border">
                        <div className="content-unbooked">
                            <div className="content-unbooked-header">
                                <div className="name-route">Thông Tin Máy Bay {unTicket.nameRoute}</div>
                            </div>
                            <div className="body-unbooked-header">
                                <ul>
                                    <li className="content-unbooked-body">
                                        <div className="content-unbooked-body-plane">
                                            {unTicket.nameDeparture}
                                        </div>
                                        <i className="fa-solid fa-plane-departure" />
                                        <div className="content-unbooked-body-plane">
                                            {unTicket.nameDestination}
                                        </div>
                                    </li>
                                    <li className="content-unbooked-body" >
                                        <table>
                                            <thead>
                                                <tr >
                                                    <th>Ngày Bay</th>
                                                    <th style={{ textAlign: 'center' }}>Giờ Bay</th>
                                                    <th >Mã Chuyến Bay</th>
                                                    <th style={{ textAlign: 'center' }} >Giá Vé</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{unTicket.departureDate}</td>
                                                    <td style={{ textAlign: 'center' }}>{unTicket.timeDeparture}</td>
                                                    <td style={{ textAlign: 'center' }}>{unTicket.nameRoute}</td>
                                                    <td style={{ textAlign: 'center' }}>{numeral(unTicket.priceTicket).format('0,0 đ')}VND</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </li>
                                    <li className="content-unbooked-body">
                                        <div className="position-unbooked-seat" >Vị Trí Ghế Máy Bay</div>
                                    </li>
                                    <li className="content-unbooked-body">
                                        <ul>

                                            {seatUnBooked && seatUnBooked.map((unSeat) => (
                                                <li className="content-unbooked-body-chair" key={unSeat.positionSeat}>
                                                    <div className={`content-unbooked-body-seat ${unSeat.flatSeat ? 'active' : ''}`} style={unSeat.flatSeat ? { color: 'red', paddingLeft: '10px' } : { color: 'green', paddingLeft: '10px' }}>{unSeat.positionSeat}</div><div className="content-unbooked-body-seat">{unSeat.nameSeat}</div></li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li className="content-unbooked-body">
                                        <button onClick={() => { closeDetailTicket() }}>Đóng</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    )
}
export default TicketUnBook;