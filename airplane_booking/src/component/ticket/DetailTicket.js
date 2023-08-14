import { useState } from "react";
import "../../css/ticket/detail-ticket.css";
import { useParams } from "react-router-dom";
import { getRouteById } from "../../services/RouteServices";
import { useEffect } from "react";
import { getTypeSeatById } from "../../services/TypeSeatServices";
import { getTypeTicketById } from "../../services/TypeTicket";
import numeral from 'numeral';
import {getTypePassengerById} from "../../services/TypePassenger";
// import"../js/detail-ticket"
export default function DetailTicket() {
    const [route, setRoute] = useState([]);
    const [typeSeat, setTypeSeat] = useState([]);
    const [typeTicket, setTypeTicket] = useState([]);
    const [typePassenger,setTypePassenger]= useState([]);

    // const {data} = useParams();
    // const arr=data.split(",");

    const getRoute = async () => {
        const data = await getRouteById(1);
        console.log(data);
        setRoute(data);
    };
    const getTypeSeat = async () => {
        const data = await getTypeSeatById(1);
        setTypeSeat(data);
    };

    const getTypeTicket = async () => {
        const data = await getTypeTicketById (1);
        setTypeTicket(data);
    };

    const getTypePassenger= async ()=>{
        const data =await getTypePassengerById(1);
        setTypePassenger(data);
    };
    useEffect(() => {
        getTypeTicket();
        getRoute();
        getTypeSeat();
        getTypePassenger();
    }, []);

    //format tiền tệ vnđ
    const priceTicket = route.priceRoute + route.priceRoute * typeSeat.priceExtra;
    const priceTax= priceTicket*0.6;
    const totalPrice = priceTicket+priceTax;
    const formattedPriceRouter  =numeral(priceTicket).format('0,0 đ');
    const formattedPriceTax = numeral(priceTax).format('0,0 đ');
    const formattedTotalPrice= numeral(totalPrice).format('0,0 đ');
    //

    return (
        <>
            <head>
                <meta charSet="UTF-8"/>
                        <title>Thông tin chuyến bay</title>

            </head>
            {route.idRoute==1 &&
                <div className="container" id="detail-ticket">
                    <div className="title text-center">
                        <p className="h1">Thông tin chuyến bay</p>
                    </div>

                    <div className="wrapper d-grid">
                        { typeTicket.idTypeTicket ==1?
                        <div className="row wrap">
                            <div className="location">
                                <p className="h3">
                                    <span> {(route.departure.nameDeparture).split("-")[0]} </span>
                                    <i className="fa-solid fa-plane-departure" />
                                    <span> {(route.destination.nameDestination).split("-")[0]} </span>
                                </p>
                            </div>
                            <div className="row">
                                <div className="col-4 info-fight">
                                    <p className="">{(route.departure.nameDeparture).split("-")[0]}</p>
                                    <p className="outstanding">
                                        <span>{route.timeArrival} </span>
                                        <span>{route.dateArrival} </span>
                                    </p>
                                     <p>{(route.departure.nameDeparture).split("-")[1]}</p>
                                </div>
                                <div className="col-4 info-fight">
                                    <p className="">{(route.destination.nameDestination).split("-")[0]}</p>
                                    <p className="outstanding">
                                        <span>{route.timeDeparture} </span>
                                        <span>{route.dateDeparture} </span>
                                    </p>
                                    <p>{(route.destination.nameDestination).split("-")[1]}</p>
                                </div>
                                <div className="col-4 info-fight">
                                    <div className="logo-image">
                                        {/* <img src="./image/VN.png" alt="logo"> */}
                                        <p className="vietnam-airline">CodeGym Airline</p>
                                    </div>
                                    <p>
                                        Chuyến bay:
                                        <span className="outstanding"> {route.nameRoute}</span>
                                    </p>
                                    <p>
                                        Loại ghế :
                                        <span className="outstanding"> {typeSeat.nameTypeSeat}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="row info-second">
                                <div className="col-2">
                                    <p>Loại hành khách</p>
                                    <p>{typePassenger.nameTypePassenger}</p>
                                </div>
                                <div className="col-2">
                                    <p>Loại vé</p>
                                    <p id="type-ticket" className="outstanding">
                                        {typeTicket.nameTypeTicket}
                                    </p>
                                </div>
                                <div className="col-2">
                                    <p>Giá mỗi vé</p>
                                    <p className="money">{formattedPriceRouter} VND</p>
                                </div>
                                <div className="col-2">
                                    <p>Thuế &amp; Phí</p>
                                    <p className="money">
                                        {formattedPriceTax} VND
                                    </p>
                                </div>
                                <div className="col-2">
                                    <p>Tổng giá</p>
                                    <p className="money">
                                        {formattedTotalPrice} VND
                                    </p>
                                </div>
                            </div>
                            <div className=" row info-third">
                                <div className="col-6">
                                    <p className="h5">Điều kiện hành lý</p>
                                    <p>
                                        hành lý xách tay : <span className="outstanding"> 10kg</span>
                                    </p>
                                    <p>
                                        hành lý ký gửi : <span className="outstanding">23kg</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="row wrap">
                            <div className="location">
                                <p className="h3">
                                    <span> {(route.departure.nameDeparture).split("-")[0]} </span>
                                    <i className="fa-solid fa-plane-departure" />
                                    <span> {(route.destination.nameDestination).split("-")[0]} </span>
                                </p>
                            </div>
                            <div className="row">
                                <div className="col-4 info-fight">
                                    <p className="">{(route.departure.nameDeparture).split("-")[0]}</p>
                                    <p className="outstanding">
                                        <span>{route.timeArrival} </span>
                                        <span>{route.dateArrival} </span>
                                    </p>
                                    <p>{(route.departure.nameDeparture).split("-")[1]}</p>
                                </div>
                                <div className="col-4 info-fight">
                                    <p className="">{(route.destination.nameDestination).split("-")[0]}</p>
                                    <p className="outstanding">
                                        <span>{route.timeDeparture} </span>
                                        <span>{route.dateDeparture} </span>
                                    </p>
                                    <p>{(route.destination.nameDestination).split("-")[1]}</p>
                                </div>
                                <div className="col-4 info-fight">
                                    <div className="logo-image">
                                        {/* <img src="./image/VN.png" alt="logo"> */}
                                        <p className="vietnam-airline">CodeGym Airline</p>
                                    </div>
                                    <p>
                                        Chuyến bay:
                                        <span className="outstanding"> {route.nameRoute}</span>
                                    </p>
                                    <p>
                                        Loại ghế :
                                        <span className="outstanding"> {typeSeat.nameTypeSeat}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="row info-second">
                                <div className="col-2">
                                    <p>Loại hành khách</p>
                                    <p>{typePassenger.nameTypePassenger}</p>
                                </div>
                                <div className="col-2">
                                    <p>Loại vé</p>
                                    <p id="type-ticket" className="outstanding">
                                        {typeTicket.nameTypeTicket}
                                    </p>
                                </div>
                                <div className="col-2">
                                    <p>Giá mỗi vé</p>
                                    <p className="money">{formattedPriceRouter} VND</p>
                                </div>
                                <div className="col-2">
                                    <p>Thuế &amp; Phí</p>
                                    <p className="money">
                                        {formattedPriceTax} VND
                                    </p>
                                </div>
                                <div className="col-2">
                                    <p>Tổng giá</p>
                                    <p className="money">
                                        {formattedTotalPrice} VND
                                    </p>
                                </div>
                            </div>
                            <div className=" row info-third">
                                <div className="col-6">
                                    <p className="h5">Điều kiện hành lý</p>
                                    <p>
                                        hành lý xách tay : <span className="outstanding"> 10kg</span>
                                    </p>
                                    <p>
                                        hành lý ký gửi : <span className="outstanding">23kg</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        }

                        <div className=" btn d-grid d-md-block">
                            <button>Hủy</button>
                            <button>Chọn</button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
