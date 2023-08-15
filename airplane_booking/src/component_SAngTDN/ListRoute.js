import { Await, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getListRouter } from "../services/RouteServices";
import Swal from "sweetalert2";

function ListRouter() {
  const { data } = useParams();
  const [info, setInfor] = useState({});
  const [flights, setFlights] = useState([]);
  const [flag,setFlag] = useState(true);

  const [departurePriceTicket, setDeparturePriceTicket] = useState(0);
  const [departureTimeDeparture, setDepartureTimeDeparture] = useState("");
  const [departureTimeArrival, setDepartureTimeArrival] = useState("");
  const [departureNameRoute, setDepartureNameRoute] = useState("");
  const [departureTypeSeat, setDeparturetypeSeat] = useState("");
  const [selecTicketDeparture, setSelecTicketDeparture] = useState("");
  const [departureTime,setDepartureTime] = useState();

  const [arrivalPriceTicket, setArrivalPriceTicket] = useState(0);
  const [arrivalTimeDeparture, setArrivalTimeDeparture] = useState("");
  const [arrivalTimeArrival, setArrivalTimeArrival] = useState("");
  const [arrivalNameRoute, setArrivalNameRoute] = useState("");
  const [arrivalTypeSeat, setArrivalTypeSeat] = useState("");
  const [selecTicketArrival, setSelecTicketArrival] = useState("");
  const [arrivalTime,setArrivalTime] = useState();

  const totalPrice = (departurePriceTicket*1+arrivalPriceTicket*1)*1.6


  const transferDatatoArr = () => {
    return data.split(",");
  };

  const array = transferDatatoArr();

  const partsDate1 = () => {
    let dateParts
    if(flag===true){
      dateParts = array[2].split("-");
    }else{
      dateParts = array[3].split("-");
    }
    let year = parseInt(dateParts[0]);
    let month = parseInt(dateParts[1]) - 1;
    let day = parseInt(dateParts[2]);
    let date = new Date(year, month, day);
    date.setDate(date.getDate() - 2);
    return date;
  };

  const partsDate2 = () => {
    let dateParts
    if(flag===true){
      dateParts = array[2].split("-");
    }else{
      dateParts = array[3].split("-");
    }
    let year = parseInt(dateParts[0]);
    let month = parseInt(dateParts[1]) - 1;
    let day = parseInt(dateParts[2]);
    let date = new Date(year, month, day);
    date.setDate(date.getDate() - 1);
    return date;
  };

  const partsDate = () => {
    let dateParts = array[2].split("-");
    let year = parseInt(dateParts[0]);
    let month = parseInt(dateParts[1]) - 1;
    let day = parseInt(dateParts[2]);
    let date = new Date(year, month, day);
    date.setDate(date.getDate());
    return date;
  };

  const dateRoot = partsDate();

  const partsDate3 = () => {
    let dateParts
    if(flag===true){
      dateParts = array[2].split("-");
    }else{
      dateParts = array[3].split("-");
    }
    let year = parseInt(dateParts[0]);
    let month = parseInt(dateParts[1]) - 1;
    let day = parseInt(dateParts[2]);
    let date = new Date(year, month, day);
    date.setDate(date.getDate());
    return date;
  };

  const partsDate4 = () => {
    let dateParts
    if(flag===true){
      dateParts = array[2].split("-");
    }else{
      dateParts = array[3].split("-");
    }
    let year = parseInt(dateParts[0]);
    let month = parseInt(dateParts[1]) - 1;
    let day = parseInt(dateParts[2]);
    let date = new Date(year, month, day);
    date.setDate(date.getDate() + 1);
    return date;
  };

  const partsDate5 = () => {
    let dateParts
    if(flag===true){
      dateParts = array[2].split("-");
    }else{
      dateParts = array[3].split("-");
    }
    let year = parseInt(dateParts[0]);
    let month = parseInt(dateParts[1]) - 1;
    let day = parseInt(dateParts[2]);
    let date = new Date(year, month, day);
    date.setDate(date.getDate() + 2);
    return date;
  };

  const date3 = partsDate3();
  const date1 = partsDate1();
  const date2 = partsDate2();
  const date4 = partsDate4();
  const date5 = partsDate5();

  const dayOfDate = () => {
    const arr = array[2].split("-");
    const day = parseInt(arr[arr.length - 1]);
    return day;
  };

  const [departureDay, setDepartureDay] = useState(partsDate3());
  const [departureDayOfTicket, setdepartureDayOfTicket] = useState();
  const [arrivalDayOfTicket, setArrivalDayOfTicket] = useState();

  const updateTimes = (day,time)=>{
    let originalDate = new Date(day);
    let newTime = time;
    let [newHours, newMinutes, newSeconds] = newTime.split(":").map(Number);
    originalDate.setHours(newHours);
    originalDate.setMinutes(newMinutes);
    originalDate.setSeconds(newSeconds);
    return originalDate;
  }

  const handleOnChangeBuyTicket = (e,price,timeDeparture, timeArrival,nameRoute,typeSeat)=>{
    if(flag){
      const departureTimeCheck = updateTimes(departureDay,timeDeparture)
      if((arrivalTime-departureTimeCheck<3 * 3600 * 1000)){
        Swal.fire(
          "chyến về phải sau chuyến đi ít nhất 3 tiếng",
          '',
          'warning'
        )
      }else{
      setSelecTicketDeparture(e.target.value);
      setDeparturePriceTicket(price);
    setDepartureTimeDeparture(timeDeparture);
    setDepartureTimeArrival(timeArrival);
    setDepartureNameRoute(nameRoute);
    setDeparturetypeSeat(typeSeat);
    setdepartureDayOfTicket(departureDay);
    setDepartureTime(departureTimeCheck)
      }
    }else{
      const arrivalTimeCheck = updateTimes(departureDay,timeDeparture)
      if((arrivalTimeCheck-departureTime<3 * 3600 * 1000)){
        Swal.fire(
          "chyến về phải sau chuyến đi ít nhất 3 tiếng",
          '',
          'warning'
        )
      }else{
      setArrivalTime(arrivalTimeCheck)
      setSelecTicketArrival(e.target.value);
      setArrivalPriceTicket(price);
      setArrivalTimeDeparture(timeDeparture);
      setArrivalTimeArrival(timeArrival);
      setArrivalNameRoute(nameRoute);
      setArrivalTypeSeat(typeSeat);
      setArrivalDayOfTicket(departureDay);
      }
    }
  }
  
  console.log("aa"+departureTime);
  console.log("bb"+arrivalTime);
 

  const tabsTime = [date1, date2, date3, date4, date5];

  const handleData = () => {
    const arr = data.split(",");
    const obj = {
      diemDi: arr[0],
      diemDen: arr[1],
      ngayDi: arr[2],
      ngayDen: arr[3],
      loaiVe: arr[4],
      nguoiLon: arr[5],
      treEm: arr[6],
      emBe: arr[7],
    };
    setInfor(obj);
  };

  const showListRoute = async () => {
    const data = await getListRouter(array[0], array[1], array[2]);
    setFlights(data);
  };

  useEffect(() => {
    handleData();
    showListRoute();
  }, []);

  const dayOfWeek = (date)=>{
    const dayIndex = date.getDay();
    const daysOfWeek = ['CN', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
return daysOfWeek[dayIndex];
  }

  const formatDateToDDMMYYYY = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }

  const formatDateToDDMMYYYYSearch = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${year}-${month}-${day}`;
  }

  const handleTabClick = async(dateIndex) => {
    if(flag){
    setDepartureDay(dateIndex);
    const formattedDate = formatDateToDDMMYYYYSearch(dateIndex);
    const data = await getListRouter(array[0], array[1], formattedDate);
    setFlights(data);
  }
  if(flag==false){
    setDepartureDay(dateIndex);
    const formattedDate = formatDateToDDMMYYYYSearch(dateIndex);
    const data = await getListRouter(array[1], array[0],formattedDate);
    setFlights(data);
  }
  };

    
  const showListRouteArrival = async () => {
    const data = await getListRouter(array[1], array[0], array[3]);
    setFlights(data);
  };

  // const changeSetDepartureDayToPromise = () => {
  //   return new Promise((resolve, reject) => {
  //     setDepartureDay(partsDate3());
  //     resolve();
  //   });
  // };
  
  // const changeSetFlagToPromise = (bolean) => {
  //   return new Promise((resolve, reject) => {
  //     setFlag(bolean);
  //     resolve();
  //   });
  // };  
  
  // const handleOnClickArrival = async () => {
  //   try {
  //     await changeSetFlagToPromise(false);
  //     await changeSetDepartureDayToPromise();
  //     await showListRouteArrival();
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  // const handleOnClickDeparture = async () => {
  //   try {
  //     await changeSetFlagToPromise(true);
  //     await changeSetDepartureDayToPromise();
  //     await showListRoute();
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };
  

const handleOnClickDeparture = ()=>{
  setFlag(true);
  setDepartureDay(partsDate3());
  showListRoute();
 }

 const changeFlagFalse =async (flag) =>{
  setFlag(flag)
 }

 const updateDepartureDa = async (departure)=>{
  setDepartureDay(departure);
  
 }

 useEffect (()=>{
  updateDepartureDa(partsDate3())
 },[flag])

 const handleOnClickArrival = async()=>{
  if(departurePriceTicket==0){
    Swal.fire(
      'Bạn chưa chọn vé chuyến đi',
      '',
      'warning'
    )
  }else{
    await changeFlagFalse(false)
    await showListRouteArrival();
  }
 }


  return (
    <>
      <div className="container">
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>List Route</title>
        <link
          rel="stylesheet"
          href="../css-SangTDN/assets/css/styles.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
        />
        {/*  Body Wrapper */}
        <div
          className="page-wrapper"
          id="main-wrapper"
          data-layout="vertical"
          data-sidebartype="full"
        >
          {/* Sidebar Start */}
          <aside className="left-sidebar" style={{ padding: "0px" }}>
            {/* Sidebar scroll*/}
            <div>
              <div className="brand-logo d-flex align-items-center justify-content-between">
                <a href="/#" className="text-nowrap logo-img">
                  <img
                    src="../css-SangTDN/assets/images/logos/vietnam-airline-logo.jpg"
                    width={180}
                    alt=""
                  />
                </a>
                <p>(logo mẫu)</p>
              </div>
              {/* Sidebar navigation*/}
              <br />
              {/* <div>
                <h6>SẮP XẾP</h6>
                <div id="sort">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      {" "}
                      Đề xuất
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      defaultChecked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault2"
                    >
                      {" "}
                      Giá (thấp đến cao){" "}
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault3"
                      defaultChecked
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault3"
                    >
                      {" "}
                      Thời gian khởi hành{" "}
                    </label>
                  </div>
                </div>
              </div> */}
              
              <div>
                <h6 style={{ marginTop: "20px" }}>THÔNG TIN ĐẶT CHỖ</h6>
                <div style={{ border: "solid 1px" }}>
                  <div style={{ padding: "10px" }}>
                    <p>
                      <b>Chuyến đi</b>
                    </p>
                    <p style={{ width: "100%", marginBottom: "0px" }}>
                      <b>{info.diemDi}</b>
                    </p>
                    <i
                      style={{ color: "rgb(223, 165, 18)" }}
                      className="fa-solid fa-plane"
                    />
                    <p>
                      <b>{info.diemDen}</b>
                    </p>
                    {departurePriceTicket==0?<p></p>:<p>{dayOfWeek(departureDayOfTicket)} {formatDateToDDMMYYYY(departureDayOfTicket)} | {departureTimeDeparture.slice(0,5)} - {departureTimeArrival.slice(0,5)} | {departureNameRoute} | {departureTypeSeat} </p>}
                    <p
                      style={{
                        background: "#f1f1f1",
                        padding: "10px 0px",
                        width: "100%",
                      }}
                    >
                      Giá vé{" "}
                      <span style={{ float: "right" }}>
                      {departurePriceTicket==0?<p>----------</p>:<b style={{color: "rgb(85, 85, 85)"}}>{new Intl.NumberFormat("de-DE").format((departurePriceTicket*(array[5]*1+array[6]*1)))} VND</b>}
                      </span>
                    </p>
                    <p
                      style={{
                        background: "#f1f1f1",
                        padding: "10px 0px",
                        width: "100%",
                      }}
                    >
                      Thuế, phí{" "}
                      <span style={{ float: "right" }}>
                      
                        {departurePriceTicket==0?<p>----------</p>:<b style={{color: "rgb(85, 85, 85)"}}>{new Intl.NumberFormat("de-DE").format((departurePriceTicket * 0.6*(array[5]*1+array[6]*1)))} VND</b>}
                      </span>
                    </p>
                  </div>
                  <hr style={{ margin: "0px" }} />
                  {info.loaiVe != 0 && (
                    <div style={{ padding: "10px" }}>
                    <p>
                      <b>Chuyến về</b>
                    </p>
                    <p style={{ width: "100%", marginBottom: "0px" }}>
                      <b>{info.diemDen}</b>
                    </p>
                    <i
                      style={{ color: "rgb(223, 165, 18)" }}
                      className="fa-solid fa-plane"
                    />
                    <p>
                      <b>{info.diemDi}</b>
                    </p>
                    {arrivalPriceTicket==0?<p></p>:<p>{dayOfWeek(arrivalDayOfTicket)} {formatDateToDDMMYYYY(arrivalDayOfTicket)} | {arrivalTimeDeparture.slice(0,5)} - {arrivalTimeArrival.slice(0,5)} | {arrivalNameRoute} | {arrivalTypeSeat} </p>}
                    <p
                      style={{
                        background: "#f1f1f1",
                        padding: "10px 0px",
                        width: "100%",
                      }}
                    >
                      Giá vé{" "}
                      <span style={{ float: "right" }}>
                      {arrivalPriceTicket==0?<p>----------</p>:<b style={{color: "rgb(85, 85, 85)"}}>{new Intl.NumberFormat("de-DE").format((arrivalPriceTicket*(array[5]*1+array[6]*1)))} VND</b>}
                      </span>
                    </p>
                    <p
                      style={{
                        background: "#f1f1f1",
                        padding: "10px 0px",
                        width: "100%",
                      }}
                    >
                      Thuế, phí{" "}
                      <span style={{ float: "right" }}>
                      
                        {arrivalPriceTicket==0?<p>----------</p>:<b style={{color: "rgb(85, 85, 85)"}}>{new Intl.NumberFormat("de-DE").format((arrivalPriceTicket * 0.6*(array[5]*1+array[6]*1)))} VND</b>}
                      </span>
                    </p>
                  </div>
                  
                  )}
                  <div></div>
                </div>
              </div>
              <div>
                <p style={{ margin: "10px", fontSize: "1.1rem" }}>
                  <b>
                    TỔNG TIỀN{" "}
                    <span style={{ float: "right" }}>{new Intl.NumberFormat("de-DE").format((totalPrice))} VND</span>
                  </b>
                </p>
              </div>
              {(array[4]==0&&departurePriceTicket!==0)?
              <div style={{ float: "right" }}>
              <button
                type="button"
                className="btn"
                style={{
                  background: "rgb(223, 165, 18)",
                  color: "white",
                  fontSize: "1.2rem",
                }}
              >
                <b>Xác nhận</b>
              </button>
            </div>:(array[4]!=0 && flag==false &&departurePriceTicket!==0&& arrivalPriceTicket!==0)?
             <div style={{ float: "right" }}>
             <button
               type="button"
               className="btn"
               style={{
                 background: "rgb(223, 165, 18)",
                 color: "white",
                 fontSize: "1.2rem",
               }}
             >
               <b>Xác nhận</b>
             </button>
           </div>:""

              }
              {/* <div style={{ float: "right" }}>
                <button
                  type="button"
                  className="btn"
                  style={{
                    background: "rgb(223, 165, 18)",
                    color: "white",
                    fontSize: "1.2rem",
                  }}
                >
                  <b>Xác nhận</b>
                </button>
              </div> */}
            </div>
          </aside>
          <div className="body-wrapper">
            <div style={{ margin: "30px", }}>
            {info.loaiVe != 0 && (
              <>
              <button
                type="button"
                className="btn"
                style={flag===true?{background: "rgb(223, 165, 18)", color: "white", marginRight: "10px" }: {background: "rgb(6, 133, 170)", color: "white", marginRight: "10px" }}
                onClick={handleOnClickDeparture}
              >
                Chọn vé chuyến đi
              </button>
              
                <button
                  type="button"
                  className="btn"
                  style={flag===false?{background: "rgb(223, 165, 18)", color: "white"}: {background: "rgb(6, 133, 170)", color: "white", marginRight: "10px" }}
                  onClick={handleOnClickArrival}
                >
                  Chọn vé chuyến về
                </button>
                </>
              )}
            </div>
            <div style={{ margin: "30px" }}>
              <h6>
                CHUYẾN BAY {info.loaiVe == 0 ? <span>1</span> : <span>2</span>}{" "}
                CHIỀU | {info.nguoiLon} người lớn
                {info.treEm != 0 && <span> - {info.treEm} trẻ em</span>}
                {info.emBe != 0 && <span> - {info.emBe} em bé</span>}
              </h6>

              {flag==true?<p>
                Điểm khởi hành &nbsp;&nbsp;
                <i
                  style={{ color: "rgb(223, 165, 18)" }}
                  className="fa-solid fa-location-dot"
                />
                <span>
                  <b>&nbsp;{info.diemDi}</b>
                </span>
                <span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Điểm
                  đến &nbsp;&nbsp;
                </span>
                <i
                  style={{ color: "rgb(6, 133, 170)" }}
                  className="fa-solid fa-location-dot"
                />
                <span>
                  <b>&nbsp;{info.diemDen}</b>
                </span>
              </p>:<p>
                Điểm khởi hành &nbsp;&nbsp;
                <i
                  style={{ color: "rgb(223, 165, 18)" }}
                  className="fa-solid fa-location-dot"
                />
                <span>
                  <b>&nbsp;{info.diemDen}</b>
                </span>
                <span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Điểm
                  đến &nbsp;&nbsp;
                </span>
                <i
                  style={{ color: "rgb(6, 133, 170)" }}
                  className="fa-solid fa-location-dot"
                />
                <span>
                  <b>&nbsp;{info.diemDi}</b>
                </span>
              </p>}
            </div>
            <div>
              <div className="pricing">
                <div>
                  <div
                    // className="table-responsive"
                    style={{ textAlign: "center", marginLeft: "70px" }}
                  >
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <table
                        style={{
                          textAlign: "center",
                          float: "right",
                          background: "rgb(238,208,140)",
                        }}
                        className="table-bordered"
                      >
                        <tbody>
                          <tr>
                            {tabsTime.map((dayIndex, index) => {
                              return (
                                <td width="150px" key={index}
                                className={`time-tab-item ${dayIndex.getDate() === departureDay.getDate()? 'selected' : ''}`}
      onClick={() => handleTabClick(dayIndex)}>
                                  <div>
                                    <p>{
                                      dayOfWeek(dayIndex)
                                      }</p>
                                    <p>{dayIndex.getDate()} tháng {dayIndex.getMonth()+1}</p>
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <br />
                    {flights.length!==0?
                    <table
                      className="table table-bordered table-responsive"
                      style={{ textAlign: "center", border: "#9a9292" }}
                    >
                      {/* Heading */}
                      <thead>
                        <tr style={{ fontSize: "20px" }}>
                          <th style={{ width: "200px" }}>
                            {/* <div style={{color: "rgb(223, 165, 18)"}}> */}
                            <i
                              style={{
                                fontSize: "25px",
                                color: "rgb(6, 133, 170)",
                                paddingRight : "15px",
                                paddingLeft : "10px"
                              }}
                              className="fa-solid fa-plane-departure"
                            />
                            <i
                              style={{
                                fontSize: "25px",
                                color: "rgb(6, 133, 170)",
                                paddingRight : "5px"
                              }}
                              className="fa-solid fa-plane"
                            />
                            <i
                              style={{
                                fontSize: "25px",
                                color: "rgb(223, 165, 18) ",
                                paddingRight : "5px"
                              }}
                              className="fa-solid fa-earth-americas"
                            />
                            <i
                              style={{
                                fontSize: "25px",
                                color: "rgb(6, 133, 170)",
                                paddingRight : "10px"
                              }}
                              className="fa-solid fa-plane-arrival"
                            />
                            {/* </div> */}
                            &nbsp;
                          </th>
                          <th
                            style={{
                              color: "rgb(223, 165, 18)",
                              background: "rgb(6, 133, 170)",
                            }}
                          >
                            BUSINESS
                          </th>
                          <th
                            style={{
                              color: "rgb(223, 165, 18)",
                              background: "rgb(6, 133, 170)",
                            }}
                          >
                            skyBOSS
                          </th>
                          <th
                            style={{
                              color: "rgb(223, 165, 18)",
                              background: "rgb(6, 133, 170)",
                            }}
                          >
                            VELUXE
                          </th>
                          <th
                            style={{
                              color: "rgb(223, 165, 18)",
                              background: "rgb(6, 133, 170)",
                            }}
                          >
                            ECO
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {flights.map((f) => {
                          return (
                            <>
                             <tr key={f.idRoute}>
                                <td style={{ background: "rgb(211,177,88)" }}>
                                  <div
                                    style={{
                                      textAlign: "center",
                                      paddingTop: "10px",
                                    }}
                                  >
                                    <p style={{ marginBottom: "0rem" }}>
                                      {f.nameRoute}
                                    </p>
                                    <h4 style={{color:" #555555"}}>
                                      {f.timeDeparture.slice(0, 5)}
                                      <span style={{ fontSize: "15px", color: "black" }}>
                                        {" "}
                                        đến{" "}
                                      </span>
                                      {f.timeArrival.slice(0, 5)}
                                    </h4>
                                    <small>{f.nameAirCraft}</small>
                                  </div>
                                </td>
                                <td>
                                  {/* <img width="150px" src="https://saoviettravel.com.vn/images/icon-hetcho.svg" /> */}
                                  {((array[5]*1+array[6]*1)>f.seatsBussinessRemaining)?<img width="150px" src="https://saoviettravel.com.vn/images/icon-hetcho.svg" />:
                                  <div>
                                  <h3>
                                    {new Intl.NumberFormat("de-DE").format(
                                      (f.priceRoute * f.priceExtraBussiness) /
                                        1000
                                    )}
                                  </h3>
                                  <p>000 VND</p>
                                  <hr style={{ margin: "10px" }} />
                                  <div className="row">
                                    <div className="col-6">
                                      <label>Đặt vé &nbsp;</label>
                                      <input type="radio" checked={(selecTicketDeparture === f.idRoute+"-a")||(selecTicketArrival === f.idRoute+"-a")} value={f.idRoute+"-a"} onChange={(e)=>handleOnChangeBuyTicket(e,f.priceRoute * f.priceExtraBussiness,f.timeDeparture, f.timeArrival,f.nameRoute,"Bussiness")} name="ticket" />
                                    </div>
                                    <div
                                      className="col-6"
                                      style={{ padding: "0px" }}
                                    >
                                      <a>Xem chi tiết </a>
                                    </div>
                                  </div>
                                  </div>
                        }
                                </td>
                                <td>
                                {((array[5]*1+array[6]*1)>f.seatsSkybossRemaining)?<img width="150px" src="https://saoviettravel.com.vn/images/icon-hetcho.svg" />:
                                  <div>
                                  <h3>
                                    {new Intl.NumberFormat("de-DE").format(
                                      (f.priceRoute * f.priceExtraSkyboss) /
                                        1000
                                    )}
                                  </h3>
                                  <p>000 VND</p>
                                  <hr style={{ margin: "10px" }} />
                                  <div className="row">
                                    <div className="col-6">
                                      <label>Đặt vé &nbsp;</label>
                                      <input type="radio" name="ticket" checked={(selecTicketDeparture === f.idRoute+"-b")||(selecTicketArrival === f.idRoute+"-b")} value={f.idRoute+"-b"} onChange={(e)=>handleOnChangeBuyTicket(e,f.priceRoute * f.priceExtraSkyboss,f.timeDeparture, f.timeArrival,f.nameRoute,"Skyboss")} />
                                    </div>
                                    <div
                                      className="col-6"
                                      style={{ padding: "0px" }}
                                    >
                                      <a>Xem chi tiết </a>
                                    </div>
                                  </div>
                                  </div>
                        }
                                </td>
                                <td>
                                {((array[5]*1+array[6]*1)>f.seatsVeluxeRemaining)?<img width="150px" src="https://saoviettravel.com.vn/images/icon-hetcho.svg" />:
                                  <div>
                                  <h3>
                                    {new Intl.NumberFormat("de-DE").format(
                                      (f.priceRoute * f.priceExtraVeluxe) / 1000
                                    )}
                                  </h3>
                                  <p>000 VND</p>
                                  <hr style={{ margin: "10px" }} />
                                  <div className="row">
                                    <div className="col-6">
                                      <label>Đặt vé &nbsp;</label>
                                      <input type="radio" name="ticket" checked={(selecTicketDeparture === f.idRoute+"-c")||(selecTicketArrival === f.idRoute+"-c")} value={f.idRoute+"-c"} onChange={(e)=>handleOnChangeBuyTicket(e,f.priceRoute * f.priceExtraVeluxe,f.timeDeparture, f.timeArrival,f.nameRoute,"Veluxe")} />
                                    </div>
                                    <div
                                      className="col-6"
                                      style={{ padding: "0px" }}
                                    >
                                      <a>Xem chi tiết </a>
                                    </div>
                                  </div>
                                  </div>
                        }
                                </td>
                                <td>
                                {((array[5]*1+array[6]*1)>f.seatsEcoRemaining)?<img width="150px" src="https://saoviettravel.com.vn/images/icon-hetcho.svg" />:
                                  <div>
                                  <h3>
                                    {new Intl.NumberFormat("de-DE").format(
                                      (f.priceRoute * f.priceExtraEco) / 1000
                                    )}
                                  </h3>
                                  <p>000 VND</p>
                                  <hr style={{ margin: "10px" }} />
                                  <div className="row">
                                    <div className="col-6">
                                      <label>Đặt vé &nbsp;</label>
                                      <input type="radio" name="ticket" checked={(selecTicketDeparture === f.idRoute+"-d")||(selecTicketArrival === f.idRoute+"-d")} value={f.idRoute+"-d"} onChange={(e)=>handleOnChangeBuyTicket(e,f.priceRoute * f.priceExtraEco,f.timeDeparture, f.timeArrival,f.nameRoute,"Eco")} />
                                    </div>
                                    <div
                                      className="col-6"
                                      style={{ padding: "0px" }}
                                    >
                                      <a>Xem chi tiết </a>
                                    </div>
                                  </div>
                                  </div>
                        }
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{ padding: "5px", border: "none" }}
                                />
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                    :<p><b>----Không có chuyến bay nào----</b></p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListRouter;
