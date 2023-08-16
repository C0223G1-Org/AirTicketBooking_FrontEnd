
import "../../css/ticket/info-passenger.css"
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getRouteById} from "../../services/RouteServices";
import {getTypeTicketById} from "../../services/TypeTicket";
import numeral from "numeral";
import moment from "moment/moment";
import {getAllLuggage} from "../../services/LugguageServices";

export default function InfoPassenger() {
    const  [luggages,setLuggages]= useState([]);
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

 const getListLuggage = async  ()=>{
     const  data = await  getAllLuggage();
     setLuggages(data);
 }
    const getRouteDeparture = async () => {
        const data = await getRouteById(arr[1]);
        setRoute(data);
    };

    const getTypeTicket = async () => {
        const data = await getTypeTicketById(arr[0]);
        setTypeTicket(data);
    };

    const getRouterDestination = async () => {
        const data = await getRouteById(arr[2]);
        setRouteDestination(data);
    }


    useEffect(() => {
        getTypeTicket();
        getRouteDeparture();
        getRouterDestination()
        getListLuggage();

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
 // format tiền hành lý
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
        navigate();
    }

    // lặp hành khách
    const arrPas= ()=>{
        let array = [];
        if (arr[0]==1){
            for (let i = 0; i < arr[4]; i++) {
                array.push("c")
            }
        }else {
            for (let i = 0; i < arr[7]; i++) {
                array.push("c")
            }
        }
        return array
    }

   const numberPassenger = arrPas();
    const arrBaby= ()=>{
        let array = [];
        if (arr[0]==1){
            for (let i = 0; i < arr[5]; i++) {
                array.push("c")
            }
        }else {
            for (let i = 0; i < arr[8]; i++) {
                array.push("c")
            }
        }
        return array
    }
    const  numberChildren =arrBaby();


    return (
        <>
            <head>
                <meta charSet="UTF-8"/>
                <title>Thông Tin Hành Khách</title>
            </head>
            {route.idRoute &&
            <div>
                <div className="container" id="info-passenger">
                    <div className="title text-center">
                        <p className="h1">Thông tin hành khách</p>
                    </div>
                    {arr[0] == 2 ?
                        <>

                    <div className="wrapper">
                        <div className="row wrap">
                            <div className="route">
                                <i className="fa-solid fa-plane"></i>
                                Chiều đi
                            </div>
                            {/*khứ hồi*/}
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
                                    <p>người lớn : <span className="passenger">{arr[7]}</span></p>
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
                            <div className="info-four">
                                <p>
                                    Thông tin hành khách bay từ <span>{(route.departure.nameDeparture).split("-")[0]} </span>
                                    <i className="fa-solid fa-plane-departure"/> <span>{(route.destination.nameDestination).split("-")[0]}</span>
                                </p>
                                <p style={{fontStyle: "italic", color: "red", textTransform: "none"}}>
                                    Các thông tin có (*) là bắt buộc phải nhập
                                </p>

                                <div className="row info-customer">
                                    {numberPassenger.map((passenger,index)=>{
                                        return(
                                            <div className="row">
                                                <div className="check-children">
                                                    <p>Hành khách số {index+1} (Người lớn) :</p>
                                                    {/*<input type="checkbox" defaultChecked=""/> Có kèm em bé (nhỏ hơn*/}
                                                    {/*2 tuổi)*/}
                                                </div>
                                                <div className="col-6">
                                                    <div className="field">
                                                        <label htmlFor="fullname">Họ và tên (*):</label>
                                                        <input
                                                            type="text"
                                                            name="fullname"
                                                            id="fullname"
                                                            defaultValue=""
                                                        />
                                                    </div>
                                                    <div className="field">
                                                        <label htmlFor="gender">Giới tính (*) :</label>
                                                        <select name="gender" id="gender">
                                                            <option value="">Chọn giới tính</option>
                                                            <option value={false}>Nữ</option>
                                                            <option value={true}>Nam</option>

                                                        </select>
                                                    </div>
                                                    <div className="field">
                                                        <label htmlFor="phone-number">Số điện thoại :</label>
                                                        <input
                                                            type="text"
                                                            name="phone-number"
                                                            id="phone-number"
                                                            defaultValue=""
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="field">
                                                        <label htmlFor="luggage">Hành lý kí gửi :</label>
                                                        <select name="luggage" id="luggage">
                                                            <option value={0}>Chọn trọng lượng mua thêm</option>
                                                            {luggages.map((luggage)=>{
                                                                const price= numeral(luggage.priceLuggage).format('0,0 đ');
                                                                return(

                                                                    <option key={luggage.id} value={luggage.id}>{luggage.nameLuggage} - {price} VND</option>
                                                                )
                                                            })}

                                                        </select>
                                                    </div>
                                                    <div className="field">
                                                        <label htmlFor="email">Email :</label>
                                                        <input
                                                            type="text"
                                                            name="email"
                                                            id="email"
                                                            defaultValue=""
                                                        />
                                                    </div>
                                                    <div className="field" id="id-card-1">
                                                        <label htmlFor="id-card">CMND- Passport (*) :</label>
                                                        <input
                                                            type="text"
                                                            name="id-card"
                                                            id="id-card"
                                                            defaultValue=""
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    }
                                    {numberChildren.map((children,index)=>{
                                    return(
                                        <div className="row">
                                            <div className="check-children">
                                                <p>Hành khách số {arr[7]*1+index+1} (Trẻ em) :</p>

                                            </div>
                                            <div className="col-6">
                                                <div className="field">
                                                    <label htmlFor="fullname">Họ và tên (*):</label>
                                                    <input
                                                        type="text"
                                                        name="fullname"
                                                        id="fullname"
                                                        defaultValue=""
                                                    />
                                                    {/*<div className="text-red"> Tên không đúng định dạng</div>*/}
                                                </div>
                                                <div className="field">
                                                    <label htmlFor="gender">Giới tính (*):</label>
                                                    <select name="gender" id="gender">
                                                        <option value="">Chọn giới tính</option>
                                                        <option value={false}>Nữ</option>
                                                        <option value={true} >Nam</option>
                                                    </select>
                                                    {/*<div className="text-red">Vui lòng chọn giới tính</div>*/}
                                                </div>

                                            </div>
                                            <div className="col-6">
                                                <div className="field">
                                                    <label htmlFor="luggage">Hành lý kí gửi :</label>
                                                    <select name="luggage" id="luggage">
                                                        <option value={0}>Chọn trọng lượng mua thêm</option>
                                                        {luggages.map((luggage)=>{
                                                            const price= numeral(luggage.priceLuggage).format('0,0 đ');
                                                            return(

                                                                <option key={luggage.id} value={luggage.id}>{luggage.nameLuggage} - {price} VND</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="field">
                                                    <label htmlFor="id-card">Ngày sinh (*):</label>
                                                    <input
                                                        type="date"
                                                        name="id-card"
                                                        id="id-card"
                                                        placeholder="DD/MM/YYYY"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                    })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="line"></div>
                        <div className="row wrap" id="infor-ticket-2">
                            <div className="route">
                                <i className="fa-solid fa-plane"></i>
                                Chiều về
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
                                        <p>người lớn : <span className="passenger">{arr[7]}</span></p>
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
                            <div className="info-four">
                                <p>
                                    Thông tin hành khách bay từ <span>{(routeDestination.departure.nameDeparture).split("-")[0]}</span>
                                    <i className="fa-solid fa-plane-departure"/>{" "}
                                    <span>{(routeDestination.destination.nameDestination).split("-")[0]}</span>
                                </p>
                                <p style={{fontStyle: "italic", color: "red", textTransform: "none"}}>
                                    Các thông tin có (*) là bắt buộc phải nhập
                                </p>
                                <div className="row info-customer">
                                    {numberPassenger.map((passenger,index)=>{
                                        return(
                                            <div className="row">
                                                <div className="check-children">
                                                    <p>Hành khách số {index+1} (Người lớn) :</p>
                                                    {/*<input type="checkbox" defaultChecked=""/> Có kèm em bé (nhỏ hơn*/}
                                                    {/*2 tuổi)*/}
                                                </div>
                                                <div className="col-6">
                                                    <div className="field">
                                                        <label htmlFor="fullname">Họ và tên (*):</label>
                                                        <input
                                                            type="text"
                                                            name="fullname"
                                                            id="fullname"
                                                            defaultValue=""
                                                        />
                                                    </div>
                                                    <div className="field">
                                                        <label htmlFor="gender">Giới tính (*) :</label>
                                                        <select name="gender" id="gender">
                                                            <option value="">Chọn giới tính</option>
                                                            <option value={false}>Nữ</option>
                                                            <option value={true}>Nam</option>

                                                        </select>
                                                    </div>
                                                    <div className="field">
                                                        <label htmlFor="phone-number">Số điện thoại :</label>
                                                        <input
                                                            type="text"
                                                            name="phone-number"
                                                            id="phone-number"
                                                            defaultValue=""
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="field">
                                                        <label htmlFor="luggage">Hành lý kí gửi :</label>
                                                        <select name="luggage" id="luggage">
                                                            <option value={0}>Chọn trọng lượng mua thêm</option>
                                                            {luggages.map((luggage)=>{
                                                                const price= numeral(luggage.priceLuggage).format('0,0 đ');
                                                                return(

                                                                    <option key={luggage.id} value={luggage.id}>{luggage.nameLuggage} - {price} VND</option>
                                                                )
                                                            })}

                                                        </select>
                                                    </div>
                                                    <div className="field">
                                                        <label htmlFor="email">Email :</label>
                                                        <input
                                                            type="text"
                                                            name="email"
                                                            id="email"
                                                            defaultValue=""
                                                        />
                                                    </div>
                                                    <div className="field" id="id-card-1">
                                                        <label htmlFor="id-card">CMND- Passport (*) :</label>
                                                        <input
                                                            type="text"
                                                            name="id-card"
                                                            id="id-card"
                                                            defaultValue=""
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    }
                                    {numberChildren.map((children,index)=>{
                                        return(
                                            <div className="row">
                                                <div className="check-children">
                                                    <p>Hành khách số {arr[7]*1+index+1} (Trẻ em) :</p>

                                                </div>
                                                <div className="col-6">
                                                    <div className="field">
                                                        <label htmlFor="fullname">Họ và tên (*):</label>
                                                        <input
                                                            type="text"
                                                            name="fullname"
                                                            id="fullname"
                                                            defaultValue=""
                                                        />
                                                        {/*<div className="text-red"> Tên không đúng định dạng</div>*/}
                                                    </div>
                                                    <div className="field">
                                                        <label htmlFor="gender">Giới tính (*):</label>
                                                        <select name="gender" id="gender">
                                                            <option value="">Chọn giới tính</option>
                                                            <option value={false}>Nữ</option>
                                                            <option value={true} >Nam</option>
                                                        </select>
                                                        {/*<div className="text-red">Vui lòng chọn giới tính</div>*/}
                                                    </div>

                                                </div>
                                                <div className="col-6">
                                                    <div className="field">
                                                        <label htmlFor="luggage">Hành lý kí gửi :</label>
                                                        <select name="luggage" id="luggage">
                                                            <option value={0}>Chọn trọng lượng mua thêm</option>
                                                            {luggages.map((luggage)=>{
                                                                const price= numeral(luggage.priceLuggage).format('0,0 đ');
                                                                return(

                                                                    <option key={luggage.id} value={luggage.id}>{luggage.nameLuggage} - {price} VND</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <div className="field">
                                                        <label htmlFor="id-card">Ngày sinh (*):</label>
                                                        <input
                                                            type="date"
                                                            name="id-card"
                                                            id="id-card"
                                                            placeholder="DD/MM/YYYY"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className=" btn">
                            <button>Chọn lại chuyến bay</button>
                            <button>Đặt vé</button>
                        </div>
                    </div>
                        </>
                        :
                        <>
                            <div className="wrapper">
                            <div className="row wrap">
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
                                <div className="info-four">
                                    <p>
                                        Thông tin hành khách bay từ <span>{(route.departure.nameDeparture).split("-")[0]}</span>
                                        <i className="fa-solid fa-plane-departure"/>{" "}
                                        <span>{(route.departure.nameDeparture).split("-")[0]}</span>
                                    </p>
                                    <p style={{fontStyle: "italic", color: "red", textTransform: "none"}}>
                                        Các thông tin có (*) là bắt buộc phải nhập
                                    </p>
                                    <div className="row info-customer">
                                        {numberPassenger.map((passenger,index)=>{
                                            return(
                                                <div className="row">
                                                    <div className="check-children">
                                                        <p>Hành khách số {index+1} (Người lớn) :</p>
                                                        {/*<input type="checkbox" defaultChecked=""/> Có kèm em bé (nhỏ hơn*/}
                                                        {/*2 tuổi)*/}
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="field">
                                                            <label htmlFor="fullname">Họ và tên (*):</label>
                                                            <input
                                                                type="text"
                                                                name="fullname"
                                                                id="fullname"
                                                                defaultValue=""
                                                            />
                                                        </div>
                                                        <div className="field">
                                                            <label htmlFor="gender">Giới tính (*) :</label>
                                                            <select name="gender" id="gender">
                                                                <option value="">Chọn giới tính</option>
                                                                <option value={false}>Nữ</option>
                                                                <option value={true}>Nam</option>

                                                            </select>
                                                        </div>
                                                        <div className="field">
                                                            <label htmlFor="phone-number">Số điện thoại :</label>
                                                            <input
                                                                type="text"
                                                                name="phone-number"
                                                                id="phone-number"
                                                                defaultValue=""
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="field">
                                                            <label htmlFor="luggage">Hành lý kí gửi :</label>
                                                            <select name="luggage" id="luggage">
                                                                <option value={0}>Chọn trọng lượng mua thêm</option>
                                                                {luggages.map((luggage)=>{
                                                                    const price= numeral(luggage.priceLuggage).format('0,0 đ');
                                                                    return(

                                                                        <option key={luggage.id} value={luggage.id}>{luggage.nameLuggage} - {price} VND</option>
                                                                    )
                                                                })}

                                                            </select>
                                                        </div>
                                                        <div className="field">
                                                            <label htmlFor="email">Email :</label>
                                                            <input
                                                                type="text"
                                                                name="email"
                                                                id="email"
                                                                defaultValue=""
                                                            />
                                                        </div>
                                                        <div className="field" id="id-card-1">
                                                            <label htmlFor="id-card">CMND- Passport (*) :</label>
                                                            <input
                                                                type="text"
                                                                name="id-card"
                                                                id="id-card"
                                                                defaultValue=""
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        }
                                        {numberChildren.map((children,index)=>{
                                            return(
                                                <div className="row">
                                                    <div className="check-children">
                                                        <p>Hành khách số {arr[7]*1+index+1} (Trẻ em) :</p>

                                                    </div>
                                                    <div className="col-6">
                                                        <div className="field">
                                                            <label htmlFor="fullname">Họ và tên (*):</label>
                                                            <input
                                                                type="text"
                                                                name="fullname"
                                                                id="fullname"
                                                                defaultValue=""
                                                            />
                                                            {/*<div className="text-red"> Tên không đúng định dạng</div>*/}
                                                        </div>
                                                        <div className="field">
                                                            <label htmlFor="gender">Giới tính (*):</label>
                                                            <select name="gender" id="gender">
                                                                <option value="">Chọn giới tính</option>
                                                                <option value={false}>Nữ</option>
                                                                <option value={true} >Nam</option>
                                                            </select>
                                                            {/*<div className="text-red">Vui lòng chọn giới tính</div>*/}
                                                        </div>

                                                    </div>
                                                    <div className="col-6">
                                                        <div className="field">
                                                            <label htmlFor="luggage">Hành lý kí gửi :</label>
                                                            <select name="luggage" id="luggage">
                                                                <option value={0}>Chọn trọng lượng mua thêm</option>
                                                                {luggages.map((luggage)=>{
                                                                    const price= numeral(luggage.priceLuggage).format('0,0 đ');
                                                                    return(

                                                                        <option key={luggage.id} value={luggage.id}>{luggage.nameLuggage} - {price} VND</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                        <div className="field">
                                                            <label htmlFor="id-card">Ngày sinh (*):</label>
                                                            <input
                                                                type="date"
                                                                name="id-card"
                                                                id="id-card"
                                                                placeholder="DD/MM/YYYY"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        }
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className=" btn">
                                <button>Chọn lại chuyến bay</button>
                                <button>Đặt vé</button>
                            </div>
                        </>
                    }
                </div>
            </div>
            }
        </>
    )
}