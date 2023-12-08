import "../../css/ticket/info-passenger.css"
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getRouteById} from "../../services/RouteServices";
import {getTypeTicketById} from "../../services/TypeTicket";
import numeral from "numeral";
import moment from "moment/moment";
import {findLuggageById, getAllLuggage} from "../../services/LugguageServices";
import {ErrorMessage, Field, FieldArray, Form, Formik, validateYupSchema} from "formik";
import * as yup from "yup";
import {createNewTicket, deleteTicketFlagIsFalse} from "../../services/TicketService";
import {getTypePassengerById} from "../../services/TypePassenger";
import {getTypeSeatByName} from "../../services/TypeSeatServices";
import {getSeatByIdTypeSeat} from "../../services/SeatServices";
import {getCustomerByEmail, getCustomerById} from "../../services/CustomerServices";
import { RingLoader } from 'react-spinners';
import Swal      from "sweetalert2";


// let passengers = []
export default function InfoPassenger() {

    const [luggages, setLuggages] = useState([]);
    const [route, setRoute] = useState([]);
    const [routeDestination, setRouteDestination] = useState([]);
    const [typeTicket, setTypeTicket] = useState([]);
    const [typeSeat, setTypeSeat] = useState([]);
    const [typeSeatDeparture, setTypeSeatDeparture] = useState([]);
    const [typeSeatReturn, setTypeSeatReturn] = useState([]);
    const navigate = useNavigate();
    const {data} = useParams();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [loading3, setLoading3] = useState(true);
    const [loading4, setLoading4] = useState(true);
    const [loading5, setLoading5] = useState(true);
    const [loading6, setLoading6] = useState(true);
    // data

    // data
    const arr = data.split(",");
    // I- 1 chiều 1.loại vé, 2.id tuyến bay,3. loại ghế ,4. giá 1 vé, 5. Người lớn 6.Trẻ em
    // II 2 chiều //1.loại vé, 2.id tuyến đi,3. idtuyến vế ,4. loại ghế đi, 5. loại ghế về , 6. giá đi. 7.giá về, 8.Người lớn, 9.Trẻ em

    const getListLuggage = async () => {
        const data = await getAllLuggage();
        setLuggages(data);
        setLoading(false);
    }
    const getRouteDeparture = async () => {
        const data = await getRouteById(arr[1]);
        setRoute(data);
        setLoading1(false);
    };

    const getUserLogin = async() => {
        const data = await getCustomerByEmail(localStorage.getItem("username"));
        setUser(data);
        setLoading2(false);
    }

    const getTypeTicket = async () => {
        const data = await getTypeTicketById(arr[0]);
        setTypeTicket(data);
        setLoading3(false);
    };
    // nếu vé khứ hồi thì tìm tuyến bay về
    if (arr[0] == 1) {
        const getRouterDestination = async () => {
            const data = await getRouteById(arr[2]);
            setRouteDestination(data);
            setLoading4(false);
        }
        const getTypeSeatDeparture = async () => {
            const data = await getTypeSeatByName(arr[3]);
            setTypeSeatDeparture(data);
            setLoading5(false);
        }
        const getTypeSeatReturn = async () => {
            const data = await getTypeSeatByName(arr[4]);
            setTypeSeatReturn(data);
            setLoading6(false);
        }
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            getRouterDestination()
            getTypeSeatDeparture();
            getTypeSeatReturn();
        }, []);
    }

        const getTypeSeat = async () => {
            const data = await getTypeSeatByName(arr[2])
            setTypeSeat(data);
        }
        useEffect(() => {
            getTypeTicket();
            getRouteDeparture();
            getListLuggage();
            getTypeSeat();
            getUserLogin()
        }, []);


        if (!route){
            console.log("info");
            return null
           
        }
        

    //format tiền tệ vnđ two-Way, giá đi
    const priceTicket = route.priceRoute * typeSeatDeparture.priceExtra
    const priceTax = priceTicket * 0.6;
    const totalPrice = priceTicket + priceTax;
    const formattedPriceRouter = numeral(priceTicket).format('0,0 đ');
    const formattedPriceTax = numeral(priceTax).format('0,0 đ');
    const formattedTotalPrice = numeral(totalPrice).format('0,0 đ');
    //format tiền tệ vnđ two-Way, giá về
    const priceTicket2 = routeDestination.priceRoute * 1 * typeSeatReturn.priceExtra;
    const priceTax2 = priceTicket2 * 0.6;
    const totalPrice2 = priceTicket2 + priceTax2;
    const formattedPriceRouter2 = numeral(priceTicket2).format('0,0 đ');
    const formattedPriceTax2 = numeral(priceTax2).format('0,0 đ');
    const formattedTotalPrice2 = numeral(totalPrice2).format('0,0 đ');
    let formattedPriceRouter1;
    let formattedPriceTax1;
    let formattedTotalPrice1;
    let totalPrice1;
    let priceTicket1;
    let priceTax1;
    if (arr[0]==2) {
        //format tiền tệ vnd one-way
         priceTicket1 = route.priceRoute * typeSeat.priceExtra;
         priceTax1 = priceTicket1 * 0.6;
        totalPrice1 = priceTicket1 + priceTax1;
        formattedPriceRouter1 = numeral(priceTicket1).format('0,0 đ');
        formattedPriceTax1 = numeral(priceTax1).format('0,0 đ');
        formattedTotalPrice1 = numeral(totalPrice1).format('0,0 đ');
    }
    // format tiền hành lý

    // lặp hành khách
    const arrPas = () => {
        let array = [];
        if (arr[0] == 2) {
            for (let i = 0; i < arr[4]; i++) {
                array.push("c")
            }
        } else {
            for (let i = 0; i < arr[7]; i++) {
                array.push("c")
            }
        }
        return array
    }
    let numCustomer;
    if (arr[0] == 1) {
        numCustomer= (arr[7]* 1 + arr[8]*1) * 2;
    } else {
        numCustomer= (arr[4]* 1 + arr[5]*1);
    }
    
    const numberPassenger = arrPas();
    const arrBaby = () => {
        let array = [];
        if (arr[0] == 2) {
            for (let i = 0; i < arr[5]; i++) {
                array.push("c")
            }
        } else {
            for (let i = 0; i < arr[8]; i++) {
                array.push("c")
            }
        }
        return array
    }
    const numberChildren = arrBaby();

    const initialValues = {
        tickets: [
            {
                priceTicket: "",
                flagTicket: false,
                namePassenger: "",
                genderPassenger: "",
                emailPassenger: "",
                telPassenger: "",
                idCardPassenger: "",
                dateBooking: "",
                typeTicket: {},
                luggage: {},
                typePassenger: {},
                seat: {},
                customer: {},
            }
        ],
    };
    function handleSubmitCancelOneWay() {
        navigate(`/list/${route.departure.nameDeparture},${route.destination.nameDestination},${route.dateDeparture},,${0},${arr[4]},${arr[5]}`);
    }
    function handleSubmitCancelTwoWay(){
        navigate(`/list/${route.departure.nameDeparture},${route.destination.nameDestination},${route.dateDeparture},${routeDestination.dateArrival},${1},${arr[7]},${arr[8]}`);
    }

    // validate
// if (route==null){
//     console.log("info");
//     return null
   
// }

console.log(route);



    return (
        <>
         
      {/* {(loading==false&&loading1==false&&(arr[0]==1?loading2==false&&loading3==false&&loading4==false&&loading5==false:true)) ? ( */}
  {(loading==false&&loading1==false&&loading2==false&&loading3==false&&(arr[0]==1?loading6==false&&loading4==false&&loading5==false:true)) ? (

        <div>
               <head>
                <meta charSet="UTF-8"/>
                <title>Thông Tin Hành Khách Thực Hiện Chuyến Bay</title>
            </head>

            {route.idRoute &&

                <div>
                    <div className="container" id="info-passenger">
                        <div className="title text-center">
                            <p className="h1">Thông tin hành khách</p>
                        </div>
                        {arr[0] == 1 && route.departure.nameDeparture ?
                            <Formik
                                initialValues={initialValues}
                                onSubmit={async (values) => {
                                    // Swal.fire({
                                    //     title:"Bạn có chắc chắn muốn đặt vé không?",
                                    //     icon: "question",
                                    //     showCancelButton: true,
                                    //     confirmButtonText: 'Xác nhận',
                                    //     cancelButtonText: 'Không',
                                    //     reverseButtons: true
                                    // }).then(async (res) => {
                                    //     if(res.isConfirmed) {
                                    //         console.log(values)
                                            await new Promise((r) => setTimeout(r, 500));
                                            //giá vé chiều đi
                                            const priceDeparture = totalPrice;
                                            //giá vé chiều về
                                            const priceReturn = totalPrice2;
                                            const typeTicketObj = {...typeTicket};
                                            const customer = await getCustomerByEmail(localStorage.getItem("username"));
                                            {
                                                values.tickets.map(async (ticket, index) => {
                                                    // console.log(JSON.stringify(ticket))
                                                    let luggageDeparture
                                                    let luggageReturn
                                                    //hành lý chiều đi
                                                    try {
                                                        luggageDeparture = await findLuggageById(ticket.luggage);
                                                        luggageReturn = await findLuggageById(ticket.luggage2);
                                                    } catch (error) {
                                                        console.log("chưa chọn hành lý")
                                                    }

                                                    //hành lý chiều về

                                                    //loại khách
                                                    let typePassengerObj = {};
                                                    if (index + 1 <= numberPassenger.length) {
                                                        typePassengerObj = await getTypePassengerById(1);
                                                    } else {
                                                        typePassengerObj = await getTypePassengerById(2);
                                                    }
                                                    // ghế chiều đi
                                                    const typeSeatDeparture = await getTypeSeatByName(arr[3]);
                                                    const seatDeparture = await getSeatByIdTypeSeat(typeSeatDeparture.idTypeSeat, route.idRoute, index);
                                                    // ghế chiều về
                                                    const typeSeatReturn = await getTypeSeatByName(arr[4]);
                                                    const seatReturn = await getSeatByIdTypeSeat(typeSeatReturn.idTypeSeat, routeDestination.idRoute, index);

                                                    // alert((JSON.stringify(ticket)))
                                                    //chiều đi
                                                    let objectDeparture;
                                                    let objectReturn;
                                                    if (index + 1 > numberPassenger.length) {
                                                        objectDeparture = {
                                                            ...ticket,
                                                            flagTicket: false,
                                                            priceTicket: priceDeparture,
                                                            typeTicket: typeTicketObj,
                                                            luggage: luggageDeparture,
                                                            typePassenger: typePassengerObj,
                                                            seat: seatDeparture,
                                                            customer: customer,
                                                            dateBooking: "",
                                                            emailPassenger: "",
                                                            idCardPassenger: "",
                                                            telPassenger: ""

                                                        }
                                                        objectReturn = {
                                                            ...ticket,
                                                            flagTicket: false,
                                                            priceTicket: priceReturn,
                                                            typeTicket: typeTicketObj,
                                                            luggage: luggageReturn,
                                                            typePassenger: typePassengerObj,
                                                            seat: seatReturn,
                                                            customer: customer,
                                                            dateBooking: "",
                                                            emailPassenger: "",
                                                            idCardPassenger: "",
                                                            telPassenger: ""

                                                        }

                                                    } else {
                                                        objectDeparture = {
                                                            ...ticket,
                                                            flagTicket: false,
                                                            priceTicket: priceDeparture,
                                                            typeTicket: typeTicketObj,
                                                            luggage: luggageDeparture,
                                                            typePassenger: typePassengerObj,
                                                            seat: seatDeparture,
                                                            customer: customer,
                                                            dateBooking: "",
                                                        }
                                                        objectReturn = {
                                                            ...ticket,
                                                            flagTicket: false,
                                                            priceTicket: priceReturn,
                                                            typeTicket: typeTicketObj,
                                                            luggage: luggageReturn,
                                                            typePassenger: typePassengerObj,
                                                            seat: seatReturn,
                                                            customer: customer,
                                                            dateBooking: "",
                                                        }
                                                    }

                                                    try {
                                                        await createNewTicket(objectDeparture);
                                                        await createNewTicket(objectReturn);
                                                    } catch (error) {
                                                        console.log("Lỗi rồi")
                                                    }

                                                })
                                            }
                                            navigate(`/payment/${route.departure.nameDeparture}/${numCustomer}`)

                                    // })

                                }

                                }
                            >
                                <Form className="wrapper" id="profileForm">
                                    <FieldArray name="ticket">
                                        <div className="row wrap">
                                            <div className="route">
                                                <i className="fa-solid fa-plane"></i>
                                                Chiều đi
                                            </div>
                                            {/*khứ hồi*/}
                                            <div className="row">
                                                {/*nơi đi*/}
                                                <div className="col-4 info-fight">
                                                    <p className="">{(route.departure.nameDeparture).split("-")[0]}</p>
                                                    <p className="outstanding">
                                                        <span>{route.timeDeparture.split(":")[0]+":"+route.timeDeparture.split(":")[1]} </span>
                                                        <span>{moment(`${route.dateDeparture}`).format("DD-MM-YYYY")} </span>
                                                    </p>
                                                    <p>{(route.departure.nameDeparture).split("-")[1]}</p>
                                                </div>
                                                {/*nơi đến*/}
                                                <div className="col-4 info-fight">
                                                    <p className="">{(route.destination.nameDestination).split("-")[0]}</p>
                                                    <p className="outstanding">
                                                        <span>{(route.timeArrival.split(":")[0]+":"+route.timeArrival.split(":")[1])} </span>
                                                        <span>{moment(`${route.dateArrival}`).format("DD-MM-YYYY")} </span>
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
                                                    <p className="person">Người lớn : <span
                                                        className="nam-passenger">{arr[7]}</span></p>
                                                    <p className="person">Trẻ em : <span
                                                        className="nam-passenger">{arr[8]}</span></p>
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
                                                    <p>Tổng giá mỗi vé</p>
                                                    <p className="money">
                                                        {formattedTotalPrice} VND
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="fist-line"></div>
                                            {/*//chiều về*/}
                                            <div className="row wrap">
                                                <div className="route">
                                                    <i className="fa-solid fa-plane"></i>
                                                    Chiều về
                                                </div>
                                                <div className="row">
                                                    <div className="col-4 info-fight">
                                                        <p className="">{(routeDestination.departure.nameDeparture).split("-")[0]}</p>
                                                        <p className="outstanding">
                                                            <span>{routeDestination.timeDeparture.split(":")[0]+":"+routeDestination.timeDeparture.split(":")[1]} </span>
                                                            <span>{moment(`${routeDestination.dateDeparture}`).format("DD-MM-YYYY")} </span>
                                                        </p>
                                                        <p>{(routeDestination.departure.nameDeparture).split("-")[1]}</p>
                                                    </div>
                                                    <div className="col-4 info-fight">
                                                        <p className="">{(routeDestination.destination.nameDestination).split("-")[0]}</p>
                                                        <p className="outstanding">
                                                            <span>{routeDestination.timeArrival.split(":")[0]+":"+routeDestination.timeArrival.split(":")[1]} </span>
                                                            <span>{moment(`${routeDestination.dateArrival}`).format("DD-MM-YYYY")} </span>
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
                                                        <p>Người lớn:<span className="nam-passenger">{arr[7]}</span></p>
                                                        <p>Trẻ em : <span className="nam-passenger">{arr[8]}</span></p>
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
                                                        <p>Tổng giá mỗi vé</p>
                                                        <p className="money">
                                                            {formattedTotalPrice2} VND
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="info-four">
                                                <p className="el-form-header">
                                                    Thông tin hành khách thực hiện chuyến bay
                                                </p>
                                                <p style={{
                                                    fontStyle: "italic",
                                                    color: "red",
                                                    textTransform: "none"
                                                }}>
                                                    Các thông tin có (*) là bắt buộc phải nhập
                                                </p>

                                                <div className="row info-customer">
                                                    {numberPassenger.map((ticket, index) => {
                                                        return (
                                                            <div className="row"
                                                                 key={ticket[index]}>
                                                                <div className="list-passenger">
                                                                    <p>
                                                                        <i className="fa-solid fa-user-tie"></i>
                                                                        Hành khách số {index + 1} (Người lớn) :
                                                                    </p>
                                                                </div>
                                                                <div className="col-6">
                                                                    <div className="field">
                                                                        <label
                                                                            htmlFor={`tickets.${index}.namePassenger`}>Họ
                                                                            và tên (*):</label>
                                                                        <Field className="fullName"
                                                                               type="text"
                                                                               name={`tickets.${index}.namePassenger`}
                                                                               id={`tickets.${index}.namePassenger`}
                                                                               required
                                                                        />
                                                                        <ErrorMessage
                                                                            name={`tickets.${index}.namePassenger`}
                                                                            component="div"
                                                                            className="text-red"></ErrorMessage>
                                                                    </div>
                                                                    <div className="field">
                                                                        <label
                                                                            htmlFor={`tickets.${index}.genderPassenger`}>Giới
                                                                            tính (*) :</label>
                                                                        <Field as="select"
                                                                               name={`tickets.${index}.genderPassenger`}
                                                                               id={`tickets.${index}.genderPassenger`}
                                                                               required
                                                                        >
                                                                            <option value={""}>Chọn giới
                                                                                tính
                                                                            </option>
                                                                            <option value={false}>Nữ
                                                                            </option>
                                                                            <option value={true}>Nam
                                                                            </option>
                                                                        </Field>
                                                                        <ErrorMessage
                                                                            name={`tickets.${index}.genderPassenger`}
                                                                            component="div"
                                                                            className="text-red"></ErrorMessage>
                                                                    </div>
                                                                    <div className="field">
                                                                        <label
                                                                            htmlFor={`tickets.${index}.telPassenger`}>Số
                                                                            điện thoại
                                                                            :</label>
                                                                        <Field type="text"
                                                                               name={`tickets.${index}.telPassenger`}
                                                                               id={`tickets.${index}.telPassenger`}
                                                                               defaultValue=""
                                                                        />
                                                                        <ErrorMessage
                                                                            name={`tickets.${index}.telPassenger`}
                                                                            component="div"
                                                                            className="text-red"></ErrorMessage>
                                                                    </div>
                                                                </div>
                                                                <div className="col-6">
                                                                    <div className="field">
                                                                        <label
                                                                            htmlFor={`tickets.${index}.luggage`}>Hành
                                                                            lý kí gửi chiều đi :</label>
                                                                        <Field as="select"
                                                                               name={`tickets.${index}.luggage`}
                                                                               id={`tickets.${index}.luggage`}>
                                                                            {luggages.map((luggage) => {
                                                                                const price = numeral(luggage.priceLuggage).format('0,0 đ');
                                                                                return (
                                                                                    <option key={luggage.idLuggage}
                                                                                            value={luggage.idLuggage}>{luggage.nameLuggage} - {price} VND</option>
                                                                                )
                                                                            })}
                                                                        </Field>
                                                                    </div>
                                                                    <div className="field">
                                                                        <label
                                                                            htmlFor={`tickets.${index}.luggage2`}>Hành
                                                                            lý kí gửi chiều về :</label>
                                                                        <Field as="select"
                                                                               name={`tickets.${index}.luggage2`}
                                                                               id={`tickets.${index}.luggage2`}>
                                                                            {luggages.map((luggage) => {
                                                                                const price = numeral(luggage.priceLuggage).format('0,0 đ');
                                                                                return (

                                                                                    <option key={luggage.idLuggage}
                                                                                            value={luggage.idLuggage}>{luggage.nameLuggage} - {price} VND</option>
                                                                                )
                                                                            })}

                                                                        </Field>
                                                                    </div>
                                                                    <div className="field">
                                                                        <label
                                                                            htmlFor={`tickets.${index}.emailPassenger`}>Email
                                                                            :</label>
                                                                        <Field
                                                                            type="text"
                                                                            name={`tickets.${index}.emailPassenger`}
                                                                            id={`tickets.${index}.emailPassenger`}
                                                                        />
                                                                        <ErrorMessage
                                                                            name={`tickets.${index}.emailPassenger`}
                                                                            component="div"
                                                                            className="text-red"></ErrorMessage>

                                                                    </div>
                                                                    <div className="field" id="id-card-1">
                                                                        <label
                                                                            htmlFor={`tickets.${index}.idCardPassenger`}>CCCD-
                                                                            Passport (*) :</label>
                                                                        <Field
                                                                            type="text"
                                                                            name={`tickets.${index}.idCardPassenger`}
                                                                            id={`tickets.${index}.idCardPassenger`}
                                                                            required

                                                                        />
                                                                        <ErrorMessage
                                                                            name={`tickets.${index}.idCardPassenger`}
                                                                            component="div"
                                                                            className="text-red"></ErrorMessage>
                                                                    </div>
                                                                </div>
                                                                <div className="line"></div>
                                                            </div>
                                                        )
                                                    })
                                                    }
                                                    {numberChildren.map((children, index) => {
                                                        return (
                                                            <div className="row"
                                                                 key={children[index]}>
                                                                <div className="list-passenger">

                                                                    <p>
                                                                        <i className="fa-solid fa-user-tie"></i>
                                                                        Hành khách số {index + 1 + arr[7] * 1} (Trẻ em)
                                                                        :</p>
                                                                </div>
                                                                <div className="col-6">
                                                                    <div className="field">
                                                                        <label
                                                                            htmlFor={`tickets.${index + arr[7] * 1}.namePassenger`}>Họ
                                                                            và tên (*):</label>
                                                                        <Field
                                                                            type="text"
                                                                            name={`tickets.${index + arr[7] * 1}.namePassenger`}
                                                                            id={`tickets.${index + arr[7] * 1}.namePassenger`}
                                                                        />
                                                                        <ErrorMessage
                                                                            name={`tickets.${index + arr[7] * 1}.namePassenger`}
                                                                            component="div"
                                                                            className="text-red"></ErrorMessage>
                                                                    </div>
                                                                    <div className="field">
                                                                        <label
                                                                            htmlFor={`tickets.${index + arr[7] * 1}.genderPassenger`}>Giới
                                                                            tính (*)
                                                                            :</label>
                                                                        <Field as="select"
                                                                               name={`tickets.${index + arr[7] * 1}.genderPassenger`}
                                                                               id={`tickets.${index + arr[7] * 1}.genderPassenger`}
                                                                               required
                                                                        >
                                                                            <option value={""}>Chọn giới tính</option>
                                                                            <option value={false}>Nữ
                                                                            </option>
                                                                            <option value={true}>Nam
                                                                            </option>
                                                                        </Field>
                                                                        <ErrorMessage
                                                                            name={`tickets.${index + arr[7] * 1}.genderPassenger`}
                                                                            component="div"
                                                                            className="text-red"></ErrorMessage>
                                                                    </div>
                                                                </div>
                                                                <div className="col-6">
                                                                    <div className="field">
                                                                        <label
                                                                            htmlFor={`tickets.${index + arr[7] * 1}.luggage`}>Hành
                                                                            lý kí gửi chiều đi :</label>
                                                                        <Field as="select"
                                                                               name={`tickets.${index + arr[7] * 1}.luggage`}
                                                                               id={`tickets.${index + arr[7] * 1}.luggage`}>
                                                                            {luggages.map((luggage) => {
                                                                                const price = numeral(luggage.priceLuggage).format('0,0 đ');
                                                                                return (

                                                                                    <option key={luggage.idLuggage}
                                                                                            value={luggage.idLuggage}>{luggage.nameLuggage} - {price} VND</option>
                                                                                )
                                                                            })}
                                                                        </Field>
                                                                    </div>
                                                                    <div className="field">
                                                                        <label
                                                                            htmlFor={`tickets.${index + arr[7] * 1}.luggage`}>Hành
                                                                            lý kí gửi chiều về :</label>
                                                                        <Field as="select"
                                                                               name={`tickets.${index + arr[7] * 1}.luggage2`}
                                                                               id={`tickets.${index + arr[7] * 1}.luggage2`}>
                                                                            {luggages.map((luggage) => {
                                                                                const price = numeral(luggage.priceLuggage).format('0,0 đ');
                                                                                return (

                                                                                    <option key={luggage.idLuggage}
                                                                                            value={luggage.idLuggage}>{luggage.nameLuggage} - {price} VND</option>
                                                                                )
                                                                            })}
                                                                        </Field>
                                                                    </div>
                                                                </div>
                                                                <div className="line"></div>
                                                            </div>
                                                        )
                                                    })
                                                    }
                                                </div>

                                            </div>

                                            {/*chiều về*/}

                                            <div className="detail-ticket-btn">
                                                <button onClick={() => {
                                                handleSubmitCancelTwoWay()}
                                                }>Chọn lại chuyến bay</button>
                                                <button type="submit">Đặt vé</button>
                                            </div>
                                        </div>
                                    </FieldArray>
                                </Form>
                            </Formik>
                            :
                            // một chiều
                            <>
                                <Formik
                                    initialValues={initialValues}
                                    onSubmit={async (values) => {
                                        // Swal.fire({
                                        //     title:"Bạn có chắc chắn muốn đặt vé không?",
                                        //     icon: "question",
                                        //     showCancelButton: true,
                                        //     confirmButtonText: 'Xác nhận',
                                        //     confirmButtonColor:"#333",
                                        //     cancelButtonText: 'Không',
                                        //     reverseButtons: true
                                        // }).then( async (res) => {
                                            // if (res.isConfirmed) {
                                                await new Promise((r) => setTimeout(r, 500));
                                                const price = totalPrice1;
                                                const typeTicketObj = {...typeTicket};
                                                const customer = await getCustomerByEmail(localStorage.getItem("username"));
                                                {
                                                    values.tickets.map(async (ticket, index) => {
                                                        const luggageObj = await findLuggageById(ticket.luggage)
                                                        let typePassengerObj = {};
                                                        if (index + 1 <= numberPassenger.length) {
                                                            typePassengerObj = await getTypePassengerById(1);
                                                        } else {
                                                            typePassengerObj = await getTypePassengerById(2);
                                                        }
                                                        const typeSeatObj = await getTypeSeatByName(arr[2]);

                                                        const seatObj = {
                                                            typeSeat: typeSeatObj,
                                                            route: route,
                                                        }
                                                        const seat = await getSeatByIdTypeSeat(seatObj.typeSeat.idTypeSeat, route.idRoute, index);
                                                        let object;
                                                        if (index + 1 > numberPassenger.length) {
                                                            object = {
                                                                ...ticket,
                                                                flagTicket: false,
                                                                priceTicket: price,
                                                                typeTicket: typeTicketObj,
                                                                luggage: luggageObj,
                                                                typePassenger: typePassengerObj,
                                                                seat: seat,
                                                                customer: customer,
                                                                dateBooking: "",
                                                                emailPassenger: "",
                                                                idCardPassenger: "",
                                                                telPassenger: ""

                                                            }

                                                        } else {
                                                            object = {
                                                                ...ticket,
                                                                flagTicket: false,
                                                                priceTicket: price,
                                                                typeTicket: typeTicketObj,
                                                                luggage: luggageObj,
                                                                typePassenger: typePassengerObj,
                                                                seat: seat,
                                                                customer: customer,
                                                                dateBooking: "",
                                                            }
                                                        }
                                                        // alert((JSON.stringify(ticket)))


                                                        // console.log(object)
                                                        await createNewTicket(object);
                                                    })
                                                }
                                                navigate(`/payment/${route.departure.nameDeparture}/${numCustomer}`)
                                            // } else {
                                            //     return
                                            // }


                                    }
                                    }
                                >
                                    <Form className="wrapper">
                                        <FieldArray name="ticket">
                                            <div className="row wrap">
                                                <div className="row">
                                                    {/*nơi đi*/}
                                                    <div className="col-4 info-fight">
                                                        <p className="">{(route.departure.nameDeparture).split("-")[0]}</p>
                                                        <p className="outstanding">
                                                            <span>{route.timeDeparture.split(":")[0]+":"+route.timeDeparture.split(":")[1]} </span>
                                                            <span>{moment(`${route.dateDeparture}`).format("DD-MM-YYYY")} </span>
                                                        </p>
                                                        <p>{(route.departure.nameDeparture).split("-")[1]}</p>
                                                    </div>
                                                    {/*nơi đến*/}
                                                    <div className="col-4 info-fight">
                                                        <p className="">{(route.destination.nameDestination).split("-")[0]}</p>
                                                        <p className="outstanding">
                                                            <span>{(route.timeArrival.split(":")[0]+":"+route.timeArrival.split(":")[1])} </span>
                                                            <span>{moment(`${route.dateArrival}`).format("DD-MM-YYYY")} </span>
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
                                                        <p>Người lớn : <span className="nam-passenger">{arr[4]}</span>
                                                        </p>
                                                        <p>Trẻ em : <span className="nam-passenger">{arr[5]}</span></p>
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
                                                        <p>Tổng giá mỗi vé</p>
                                                        <p className="money">
                                                            {formattedTotalPrice1} VND
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="info-four">
                                                    <p className="el-form-header">
                                                        Thông tin hành khách thực hiện chuyến bay
                                                    </p>
                                                    <p style={{
                                                        fontStyle: "italic",
                                                        color: "red",
                                                        textTransform: "none"
                                                    }}>
                                                        Các thông tin có (*) là bắt buộc phải nhập
                                                    </p>

                                                    <div className="row info-customer">
                                                        {numberPassenger.map((ticket, index) => {
                                                            return (
                                                                <div className="row" id={"form"}
                                                                     key={ticket[index]}>
                                                                    <div className="list-passenger">
                                                                        <p>
                                                                            <i className="fa-solid fa-user-tie"></i>
                                                                            Hành khách số {index + 1} (Người lớn) :</p>

                                                                    </div>
                                                                    <div className="col-6">
                                                                        <div className="field">
                                                                            <label
                                                                                htmlFor={`tickets.${index}.namePassenger`}>Họ
                                                                                và tên (*):</label>
                                                                            <Field className="fullName"
                                                                                   type="text"
                                                                                   name={`tickets.${index}.namePassenger`}
                                                                                   id={`tickets.${index}.namePassenger`}
                                                                                   required
                                                                            />
                                                                            <ErrorMessage
                                                                                name={`tickets.${index}.namePassenger`}
                                                                                component="div"
                                                                                className="text-red"></ErrorMessage>
                                                                        </div>
                                                                        <div className="field">
                                                                            <label
                                                                                htmlFor={`tickets.${index}.genderPassenger`}>Giới
                                                                                tính (*) :</label>
                                                                            <Field as="select"
                                                                                   name={`tickets.${index}.genderPassenger`}
                                                                                   id={`tickets.${index}.genderPassenger`}
                                                                                   required
                                                                            >
                                                                                <option value={""}>Chọn giới
                                                                                    tính
                                                                                </option>
                                                                                <option value={false}>Nữ
                                                                                </option>
                                                                                <option value={true}>Nam
                                                                                </option>
                                                                            </Field>
                                                                            <ErrorMessage
                                                                                name={`tickets.${index}.genderPassenger`}
                                                                                component="div"
                                                                                className="text-red"></ErrorMessage>
                                                                        </div>
                                                                        <div className="field">
                                                                            <label
                                                                                htmlFor={`tickets.${index}.telPassenger`}>Số
                                                                                điện thoại
                                                                                :</label>
                                                                            <Field type="text"
                                                                                   name={`tickets.${index}.telPassenger`}
                                                                                   id={`tickets.${index}.telPassenger`}
                                                                                   defaultValue=""
                                                                            />
                                                                            <ErrorMessage
                                                                                name={`tickets.${index}.telPassenger`}
                                                                                component="div"
                                                                                className="text-red"></ErrorMessage>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <div className="field">
                                                                            <label
                                                                                htmlFor={`tickets.${index}.luggage`}>Hành
                                                                                lý kí gửi :</label>
                                                                            <Field as="select"
                                                                                   name={`tickets.${index}.luggage`}
                                                                                   id={`tickets.${index}.luggage`}>
                                                                                {luggages.map((luggage) => {
                                                                                    const price = numeral(luggage.priceLuggage).format('0,0 đ');
                                                                                    return (
                                                                                        <option key={luggage.idLuggage}
                                                                                                value={luggage.idLuggage}>
                                                                                            {luggage.nameLuggage} - {price} VND
                                                                                        </option>
                                                                                    )
                                                                                })}

                                                                            </Field>
                                                                        </div>
                                                                        <div className="field">
                                                                            <label
                                                                                htmlFor={`tickets.${index}.emailPassenger`}>Email
                                                                                :</label>
                                                                            <Field
                                                                                type="text"
                                                                                name={`tickets.${index}.emailPassenger`}
                                                                                id={`tickets.${index}.emailPassenger`}
                                                                            />
                                                                            <ErrorMessage
                                                                                name={`tickets.${index}.emailPassenger`}
                                                                                component="div"
                                                                                className="text-red"></ErrorMessage>

                                                                        </div>
                                                                        <div className="field" id="id-card-1">
                                                                            <label
                                                                                htmlFor={`tickets.${index}.idCardPassenger`}>CCCD-
                                                                                Passport (*) :</label>
                                                                            <Field
                                                                                type="text"
                                                                                name={`tickets.${index}.idCardPassenger`}
                                                                                id={`tickets.${index}.idCardPassenger`}
                                                                                required

                                                                            />
                                                                            <ErrorMessage
                                                                                name={`tickets.${index}.idCardPassenger`}
                                                                                component="div"
                                                                                className="text-red"></ErrorMessage>
                                                                        </div>
                                                                    </div>
                                                                    <div className="line"></div>
                                                                </div>
                                                            )
                                                        })
                                                        }
                                                        {numberChildren.map((children, index) => {
                                                            return (
                                                                <div className="row" id={"form"}
                                                                     key={children[index]}>
                                                                    <div className="list-passenger">
                                                                        <p>
                                                                            <i className="fa-solid fa-user-tie"></i>
                                                                            Hành khách số {index + 1 + arr[4] * 1} (Trẻ
                                                                            em) :</p>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <div className="field">
                                                                            <label
                                                                                htmlFor={`tickets.${index + arr[4] * 1}.namePassenger`}>Họ
                                                                                và tên (*):</label>
                                                                            <Field
                                                                                type="text"
                                                                                name={`tickets.${index + arr[4] * 1}.namePassenger`}
                                                                                id={`tickets.${index + arr[4] * 1}.namePassenger`}
                                                                                required
                                                                            />
                                                                            <ErrorMessage
                                                                                name={`tickets.${index + arr[4] * 1}.namePassenger`}
                                                                                component="div"
                                                                                className="text-red"></ErrorMessage>
                                                                        </div>
                                                                        <div className="field">
                                                                            <label
                                                                                htmlFor={`tickets.${index + arr[4] * 1}.genderPassenger`}>Giới
                                                                                tính (*)
                                                                                :</label>
                                                                            <Field as="select"
                                                                                   name={`tickets.${index + arr[4] * 1}.genderPassenger`}
                                                                                   id={`tickets.${index + arr[4] * 1}.genderPassenger`}
                                                                                   required
                                                                            >
                                                                                <option value={""}>Chọn giới tính
                                                                                </option>
                                                                                <option value={false}>Nữ
                                                                                </option>
                                                                                <option value={true}>Nam
                                                                                </option>
                                                                            </Field>
                                                                            <ErrorMessage
                                                                                name={`tickets.${index + arr[4] * 1}.genderPassenger`}
                                                                                component="div"
                                                                                className="text-red"></ErrorMessage>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <div className="field">
                                                                            <label
                                                                                htmlFor={`tickets.${index + arr[4] * 1}.luggage`}>Hành
                                                                                lý kí gửi :</label>
                                                                            <Field as="select"
                                                                                   name={`tickets.${index + arr[4] * 1}.luggage`}
                                                                                   id={`tickets.${index + arr[4] * 1}.luggage`}>
                                                                                {luggages.map((luggage) => {
                                                                                    const price = numeral(luggage.priceLuggage).format('0,0 đ');
                                                                                    return (

                                                                                        <option key={luggage.idLuggage}
                                                                                                value={luggage.idLuggage}>{luggage.nameLuggage} - {price} VND</option>
                                                                                    )
                                                                                })}
                                                                            </Field>
                                                                        </div>
                                                                    </div>
                                                                    <div className="line"></div>
                                                                </div>
                                                            )
                                                        })
                                                        }
                                                    </div>
                                                </div>
                                                <div className="detail-ticket-btn">
                                                    <button onClick={() => {
                                                        handleSubmitCancelOneWay()
                                                    }
                                                    }>Chọn lại chuyến bay
                                                    </button>
                                                    <button type="submit">Đặt vé</button>
                                                </div>
                                            </div>
                                        </FieldArray>
                                    </Form>
                                </Formik>
                            </>
                        }
                    </div>
                </div>
            }
        </div>

) : (
    <div style={{
        display: "flex",
justifyContent: "center",
alignItems: "center",
height: "100vh",
    }}>
      <RingLoader size={150} color={'#123abc'} loading={loading} />
    </div>
    )}

         
        </>
    )
}