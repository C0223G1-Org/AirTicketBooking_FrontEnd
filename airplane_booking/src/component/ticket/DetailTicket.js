import {useState} from "react";
import "../../css/ticket/detail-ticket.css";
import {useParams, useNavigate} from "react-router-dom";
import {getRouteById} from "../../services/RouteServices";
import {useEffect} from "react";
import {getTypeTicketById} from "../../services/TypeTicket";
import numeral from 'numeral';
import moment from "moment";
import logobg from"../../logo-remove-background.png"
import {getTypeSeatByName} from "../../services/TypeSeatServices";
import { deleteTicketFlagIsFalse } from "../../services/TicketService";
import { getCustomerByEmail } from "../../services/CustomerServices";
import { RingLoader } from 'react-spinners';

export default function DetailTicket() {
   
    const [route, setRoute] = useState([]);
    const [routeDestination, setRouteDestination] = useState([]);
    const [typeTicket, setTypeTicket] = useState([]);
    const navigate = useNavigate();
    const {data} = useParams();
    const [typeSeat, setTypeSeat] = useState([]);
    const [typeSeatDeparture, setTypeSeatDeparture] = useState([]);
    const [typeSeatReturn, setTypeSeatReturn] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [loading3, setLoading3] = useState(true);
    const [loading4, setLoading4] = useState(true);
    const [loading5, setLoading5] = useState(true);
    // data
    const arr = data.split(",");
    
    // I- 1 chiều 1.loại vé, 2.id tuyến bay,3. loại ghế ,4. giá 1 vé, 5. Người lớn 6.Trẻ em
    // II 2 chiều //1.loại vé, 2.id tuyến đi,3. idtuyến vế ,4. loại ghế đi, 5. loại ghế về , 6. giá đi. 7.giá về, 8.Người lớn, 9.Trẻ em

    const getRouteDeparture = async () => {
        const data = await getRouteById(arr[1]);
        setRoute(data);
        setLoading(false); 
    };

    const getTypeTicket = async () => {
        const data = await getTypeTicketById(arr[0]);
        setTypeTicket(data);
        setLoading1(false);
    };

    if (arr[0] == 1) {
        const getRouterDestination = async () => {
            const data = await getRouteById(arr[2]);
            setRouteDestination(data);
            setLoading2(false)
        }
        const getTypeSeatDeparture = async () => {
            const data = await getTypeSeatByName(arr[3]);
            setTypeSeatDeparture(data);
            setLoading3(false)
        }
        const getTypeSeatReturn = async () => {
            const data = await getTypeSeatByName(arr[4]);
            setTypeSeatReturn(data);
            setLoading4(false)
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
        setLoading5(false)
    }
    useEffect(() => {
        getTypeTicket();
        getRouteDeparture();
        getTypeSeat();
    }, []);

    if(route===null){
        console.log("detail");
        return  null
    }

    //format tiền tệ vnđ two-Way, giá đi
    const priceTicket = route.priceRoute * typeSeatDeparture.priceExtra;
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

    //format tiền tệ vnd one-way
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

    //onSubmit
    const handleSubmitOneWay = () => {
        navigate(`/info-passenger/${2},${arr[1]},${arr[2]},${arr[3]},${arr[4]},${arr[5]}`);
        //1.loại vé, 2.id tuyến bay,3. loại ghế ,4. giá 1 vé,  5. Người lớn 6.Trẻ em
    }
    const handleSubmitTwoWay =async () => {
        const userData= await getCustomerByEmail(localStorage.getItem("username"))
    
       await deleteTicketFlagIsFalse(userData.idCustomer).then(()=>{navigate(`/info-passenger/${1},${arr[1]},${arr[2]},${arr[3]},${arr[4]},${arr[5]},${arr[6]},${arr[7]},${arr[8]}`)})
        ;
        //1.loại vé, 2.id tuyến đi,3. idtuyến vế ,4. loại ghế đi, 5.loại ghế về , 6. giá đi. 7.giá về
    }

    function handleSubmitCancelOneWay() {
        navigate(`/list/${route.departure.nameDeparture},${route.destination.nameDestination},${route.dateDeparture},,${0},${arr[4]},${arr[5]}`);
    }
    function handleSubmitCancelTwoWay(){
        navigate(`/list/${route.departure.nameDeparture},${route.destination.nameDestination},${route.dateDeparture},${routeDestination.dateArrival},${1},${arr[7]},${arr[8]}`);
    }

    // if(route===null){
    //     console.log("detail");
    //     return  null
    // }

    console.log(route);




    return (
        <>
          <div>
      {(loading==false&&loading1==false&&(arr[0]==1?loading2==false&&loading3==false&&loading4==false&&loading5==false:true)) ? (
        <div>
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
                       {arr[0] == 2 ?
                           <>
                               {/*một chiều*/}
                               <div className="row wrap">
                                   <div className="location">
                                       <p className="h4">
                                           <span> {(route.departure.nameDeparture).split("-")[0]} </span>
                                           <i className="fa-solid fa-plane-departure"/>
                                           <span> {(route.destination.nameDestination).split("-")[0]} </span>
                                       </p>
                                   </div>
                                   <div className="row">
                                       <div className="col-4 info-fight">
                                           <p className="">{(route.departure.nameDeparture).split("-")[0]}</p>
                                           <p className="outstanding">
                                                   <span>{route.timeDeparture.split(":")[0]+":"+route.timeDeparture.split(":")[1]} </span>
                                               <span>{moment(`${route.dateDeparture}`).format("DD-MM-YYYY")} </span>
                                           </p>
                                           <p>{(route.departure.nameDeparture).split("-")[1]}</p>
                                       </div>
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
                                               {/*<img src={logobg} alt="logo"/>*/}
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
                                           <p>Loại hành khách</p>
                                           <p>Người lớn : <span className="nam-passenger">{arr[4]}</span></p>
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
                                   <div className=" row info-third">
                                       <div className="col-6">
                                           <p className="h5">Điều kiện hành lý</p>
                                           <p>
                                               Hành lý xách tay : <span className="outstanding"> 10kg</span>
                                           </p>
                                           <p>
                                               Hành lý ký gửi : <span className="outstanding">23kg</span>
                                           </p>
                                       </div>
                                   </div>
                               </div>
                               <div className="detail-ticket-btn">
                                   <button onClick={() => {
                                    handleSubmitCancelOneWay();

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
                                   <div className="route">
                                       <i className="fa-solid fa-plane"></i>
                                       Chiều đi
                                   </div>
                                   <div className="location">
                                       <p className="h3">
                                           {/*//nơi i- nơi đến*/}
                                           <span> {(route.departure.nameDeparture).split("-")[0]} </span>
                                           <i className="fa-solid fa-plane-departure"/>
                                           <span> {(route.destination.nameDestination).split("-")[0]} </span>
                                       </p>
                                   </div>
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
                                           <p>Loại Hành khách</p>
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
                                   <div className=" row info-third">
                                       <div className="col-6">
                                           <p className="h5">Điều kiện hành lý</p>
                                           <p>
                                               Hành lý xách tay : <span className="outstanding"> 10kg</span>
                                           </p>
                                           <p>
                                               Hành lý ký gửi : <span className="outstanding">23kg</span>
                                           </p>
                                       </div>
                                   </div>
                               </div>
                               {/*chiều về*/}
                               <div className="row wrap">
                                   <div className="route">
                                       <i className="fa-solid fa-plane"></i>
                                       Chiều về
                                   </div>
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
                                           <p>Loại Hành khách</p>
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
                                           <p> Tổng giá mỗi vé</p>
                                           <p className="money">
                                               {formattedTotalPrice2} VND
                                           </p>
                                       </div>
                                   </div>
                                   <div className=" row info-third">
                                       <div className="col-6">
                                           <p className="h5">Điều kiện hành lý</p>
                                           <p>
                                               Hành lý xách tay : <span className="outstanding"> 10kg</span>
                                           </p>
                                           <p>
                                               Hành lý ký gửi : <span className="outstanding">23kg</span>
                                           </p>
                                       </div>
                                   </div>
                               </div>
                               <div className="detail-ticket-btn">
                                   <button onClick={() => {
                                     handleSubmitCancelTwoWay()

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
    </div>
           
        </>
    );
}
