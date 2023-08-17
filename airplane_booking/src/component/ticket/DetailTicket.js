import {useState} from "react";
import "../../css/ticket/detail-ticket.css";
import {useParams, useNavigate} from "react-router-dom";
import {getRouteById} from "../../services/RouteServices";
import {useEffect} from "react";
import {getTypeTicketById} from "../../services/TypeTicket";
import numeral from 'numeral';
import moment from "moment";
import image from "../../logo_5.png";
export default function DetailTicket() {
    const [route, setRoute] = useState([]);
    const [routeDestination, setRouteDestination] = useState([]);
    const [typeTicket, setTypeTicket] = useState([]);
    const navigate = useNavigate();
    const {data} = useParams();
    // data
    const arr = data.split(",");
    console.log(arr);
    // I- 1 chiều 1.loại vé, 2.id tuyến bay,3. loại ghế ,4. giá 1 vé, 5. người lớn 6.trẻ em
    // II 2 chiều //1.loại vé, 2.id tuyến đi,3. idtuyến vế ,4. loại ghế đi, 5. loại ghế về , 6. giá đi. 7.giá về, 8.người lớn, 9.trẻ em


    const getRouteDeparture = async () => {
        const data = await getRouteById(arr[1]);
        setRoute(data);
    };

    const getTypeTicket = async () => {
        const data = await getTypeTicketById(arr[0]);
        setTypeTicket(data);
    };

    if (arr[0]==2){
        const getRouterDestination = async () => {
            const data = await getRouteById(arr[2]);
            setRouteDestination(data);
        }
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            getTypeTicket();
            getRouteDeparture();
            getRouterDestination()

        }, []);
    }
    useEffect(() => {
        getTypeTicket();
        getRouteDeparture();

    }, []);

    //format tiền tệ vnđ two-Way, giá đi
    const priceTicket = arr[5] * 1;
    const priceTax = priceTicket * 0.6;
    const totalPrice = priceTicket + priceTax;
    const formattedPriceRouter = numeral(priceTicket).format('0,0 đ');
    const formattedPriceTax = numeral(priceTax).format('0,0 đ');
    const formattedTotalPrice = numeral(totalPrice).format('0,0 đ');
    //format tiền tệ vnđ two-Way, giá về
    const priceTicket2 = arr[6] * 1;
    const priceTax2 = priceTicket2 * 0.6;
    const totalPrice2 = priceTicket2 + priceTax2;
    const formattedPriceRouter2 = numeral(priceTicket2).format('0,0 đ');
    const formattedPriceTax2 = numeral(priceTax2).format('0,0 đ');
    const formattedTotalPrice2 = numeral(totalPrice2).format('0,0 đ');

    //format tiền tệ vnd one-way
    const priceTicket1 = arr[3] * 1;
    const priceTax1 = priceTicket1 * 0.6;
    const totalPrice1 = priceTicket1 + priceTax1;
    const formattedPriceRouter1 = numeral(priceTicket1).format('0,0 đ');
    const formattedPriceTax1 = numeral(priceTax1).format('0,0 đ');
    const formattedTotalPrice1 = numeral(totalPrice1).format('0,0 đ');

    //onSubmit
    const handleSubmitOneWay = () => {
        navigate(`/info-passenger/${1},${arr[1]},${arr[2]},${arr[3]},${arr[4]},${arr[5]}`);
        //1.loại vé, 2.id tuyến bay,3. loại ghế ,4. giá 1 vé,  5. người lớn 6.trẻ em
    }
    const handleSubmitTwoWay = () => {
        navigate(`/info-passenger/${2},${arr[1]},${arr[2]},${arr[3]},${arr[4]},${arr[5]},${arr[6]},${arr[7]},${arr[8]}`);
        //1.loại vé, 2.id tuyến đi,3. idtuyến vế ,4. loại ghế đi, 5.loại ghế về , 6. giá đi. 7.giá về
    }

    function handleSubmitCancel() {
        navigate("/list");
    }

    return (
        <>
            <head>
                <meta charSet="UTF-8"/>
                <title>Thông Tin Chuyến Bay</title>
            </head>
            {route.idRoute &&
                <div className="container" id="detail-ticket">
                    <div className="title text-center">
                        <p className="h1">Thông tin chuyến bay</p>
                    </div>

                    <div className="wrapper d-grid">
                        {arr[0] == 1 ?
                            <>
                                <div className="row wrap">
                                    <div className="location">
                                        <p className="h3">
                                            <span> {(route.departure.nameDeparture).split("-")[0]} </span>
                                            <i className="fa-solid fa-plane-departure"/>
                                            <span> {(route.destination.nameDestination).split("-")[0]} </span>
                                        </p>
                                    </div>
                                    <div className="row">
                                        <div className="col-4 info-fight">
                                            <p className="">{(route.departure.nameDeparture).split("-")[0]}</p>
                                            <p className="outstanding">
                                                <span>{route.timeArrival} </span>
                                                <span>{moment(`${route.dateArrival}`).format("DD-MM-YYYY")} </span>
                                            </p>
                                            <p>{(route.departure.nameDeparture).split("-")[1]}</p>
                                        </div>
                                        <div className="col-4 info-fight">
                                            <p className="">{(route.destination.nameDestination).split("-")[0]}</p>
                                            <p className="outstanding">
                                                <span>{(route.timeDeparture)} </span>
                                                <span>{moment(`${route.dateDeparture}`).format("DD-MM-YYYY")} </span>
                                            </p>
                                            <p>{(route.destination.nameDestination).split("-")[1]}</p>
                                        </div>
                                        <div className="col-4 info-fight">
                                            <div className="logo-image">
                                                {image}
                                                <p className="vietnam-airline">CodeGym Airline</p>
                                            </div>
                                            <p>
                                                Chuyến bay:
                                                <span className="outstanding"> {route.nameRoute}</span>
                                            </p>
                                            <p>
                                                Loại ghế :
                                                <span className="outstanding"> {arr[2]}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row info-second">
                                        <div className="col-2">
                                            <p>số lượng hành khách</p>
                                            <p>người lớn : <span className="passenger">{arr[4]}</span></p>
                                            <p>trẻ em : <span className="passenger">{arr[5]}</span></p>
                                        </div>
                                        <div className="col-2">
                                            <p>Loại vé</p>
                                            <p id="type-ticket" className="outstanding">
                                                {typeTicket.nameTypeTicket}
                                            </p>
                                        </div>
                                        <div className="col-2">
                                            <p>Giá mỗi vé</p>
                                            <p className="money">{formattedPriceRouter1} VND</p>
                                        </div>
                                        <div className="col-2">
                                            <p>Thuế &amp; Phí</p>
                                            <p className="money">
                                                {formattedPriceTax1} VND
                                            </p>
                                        </div>
                                        <div className="col-2">
                                            <p>Tổng giá</p>
                                            <p className="money">
                                                {formattedTotalPrice1} VND
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
                                <div className=" btn d-grid d-md-block">
                                    <button onClick={() => {

                                    }
                                    }>Hủy
                                    </button>
                                    <button onClick={() => {
                                        handleSubmitOneWay();
                                    }
                                    }> Chọn
                                    </button>
                                </div>
                            </>
                            :
                            // vé khứ hồi
                            <>
                                {/*//chiều đi*/}
                                <div className="row wrap">
                                    <div className="location">
                                        <p className="h3">
                                            <span> {(route.departure.nameDeparture).split("-")[0]} </span>
                                            <i className="fa-solid fa-plane-departure"/>
                                            <span> {(route.destination.nameDestination).split("-")[0]} </span>
                                        </p>
                                    </div>
                                    <div className="row">
                                        <div className="col-4 info-fight">
                                            <p className="">{(route.departure.nameDeparture).split("-")[0]}</p>
                                            <p className="outstanding">
                                                <span>{route.timeArrival} </span>
                                                <span>{moment(`${route.dateArrival}`).format("DD-MM-YYYY")} </span>
                                            </p>
                                            <p>{(route.departure.nameDeparture).split("-")[1]}</p>
                                        </div>
                                        <div className="col-4 info-fight">
                                            <p className="">{(route.destination.nameDestination).split("-")[0]}</p>
                                            <p className="outstanding">
                                                <span>{(route.timeDeparture)} </span>
                                                <span>{moment(`${route.dateDeparture}`).format("DD-MM-YYYY")} </span>
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
                                                <span className="outstanding"> {arr[3]}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row info-second">
                                        <div className="col-2">
                                            <p>Loại hành khách</p>
                                            <p>người lớn:<span className="passenger">{arr[7]}</span></p>
                                            <p>trẻ em : <span className="passenger">{arr[8]}</span></p>
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
                                {/*chiều về*/}
                                <div className="row wrap">
                                    <div className="location">
                                        <p className="h3">
                                            <span> {(routeDestination.departure.nameDeparture).split("-")[0]} </span>
                                            <i className="fa-solid fa-plane-departure"/>
                                            <span> {(routeDestination.destination.nameDestination).split("-")[0]} </span>
                                        </p>
                                    </div>
                                    <div className="row">
                                        <div className="col-4 info-fight">
                                            <p className="">{(routeDestination.departure.nameDeparture).split("-")[0]}</p>
                                            <p className="outstanding">
                                                <span>{routeDestination.timeArrival} </span>
                                                <span>{moment(`${route.dateArrival}`).format("DD-MM-YYYY")} </span>
                                            </p>
                                            <p>{(routeDestination.departure.nameDeparture).split("-")[1]}</p>
                                        </div>
                                        <div className="col-4 info-fight">
                                            <p className="">{(routeDestination.destination.nameDestination).split("-")[0]}</p>
                                            <p className="outstanding">
                                                <span>{routeDestination.timeDeparture} </span>
                                                <span>{moment(`${route.dateDeparture}`).format("DD-MM-YYYY")} </span>
                                            </p>
                                            <p>{(routeDestination.destination.nameDestination).split("-")[1]}</p>
                                        </div>
                                        <div className="col-4 info-fight">
                                            <div className="logo-image">
                                                {/* <img src="./image/VN.png" alt="logo"> */}
                                                <p className="vietnam-airline">CodeGym Airline</p>
                                            </div>
                                            <p>
                                                Chuyến bay:
                                                <span className="outstanding"> {routeDestination.nameRoute}</span>
                                            </p>
                                            <p>
                                                Loại ghế :
                                                <span className="outstanding"> {arr[4]}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row info-second">
                                        <div className="col-2">
                                            <p>Loại hành khách</p>
                                            <p>người lớn:<span className="passenger">{arr[7]}</span></p>
                                            <p>trẻ em : <span className="passenger">{arr[8]}</span></p>
                                        </div>
                                        <div className="col-2">
                                            <p>Loại vé</p>
                                            <p id="type-ticket" className="outstanding">
                                                {typeTicket.nameTypeTicket}
                                            </p>
                                        </div>
                                        <div className="col-2">
                                            <p>Giá mỗi vé</p>
                                            <p className="money">{formattedPriceRouter2} VND</p>
                                        </div>
                                        <div className="col-2">
                                            <p>Thuế &amp; Phí</p>
                                            <p className="money">
                                                {formattedPriceTax2} VND
                                            </p>
                                        </div>
                                        <div className="col-2">
                                            <p>Tổng giá</p>
                                            <p className="money">
                                                {formattedTotalPrice2} VND
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
                                <div className=" btn d-grid d-md-block">
                                    <button onClick={() => {
                                        handleSubmitCancel()

                                    }
                                    }>Hủy
                                    </button>
                                    <button onClick={() => {
                                        handleSubmitTwoWay();
                                    }
                                    }> Chọn
                                    </button>
                                </div>
                            </>
                        }
                    </div>
                </div>
            }
        </>
    );
}
