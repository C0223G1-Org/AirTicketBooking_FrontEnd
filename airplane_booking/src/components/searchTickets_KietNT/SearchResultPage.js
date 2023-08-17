import React, { useContext, useState, useEffect } from "react";
import { TicketContext } from "./TicketContext";
import { searchTicketByNameAndIdCardPassengerResult} from "../../services/TicketService";
import "../../css/search_ticket/search-result.css";
export default function SearchResultPage() {
  const { tickets, setTickets } = useContext(TicketContext);
  const [searchTicket, setSearchTicket] = useState([]);
  console.log(searchTicket.content);

  let [page, setPage] = useState(0);
  console.log(page);
  // const getTicketList = async () => {
  //   const data = await searchTicketByNameAndIdCardPassengerResult(
  //     tickets.content[0].namePassenger,
  //     tickets.content[0].idCardPassenger,
  //     page
  //   );
  //   console.log(page);
  //   setSearchTicket(data);
  // };
  const nextPage = async () => {
    page += 1;
    if (page < searchTicket.totalPages) {
      setPage(page);
      console.log(page);
      console.log(page);
      const data = await searchTicketByNameAndIdCardPassengerResult(
        tickets.content[0].namePassenger,
        tickets.content[0].idCardPassenger,
        page
      );
      setSearchTicket(data);
    } else {
      page -= 1;
    }
  };

  const previousPage = async () => {
   page -= 1;
    if (page >= 0) {
      setPage(page);
      console.log(page);
      const data = await searchTicketByNameAndIdCardPassengerResult(
        tickets.content[0].namePassenger,
        tickets.content[0].idCardPassenger,
        page
      );
      setSearchTicket(data);
      console.log(page);
    } else {
      page += 1;
     
    }
  };

  // useEffect(() => {
  //   getTicketList();
  // }, [page]);
  useEffect(() => {
    (async () =>
      setSearchTicket(
        await searchTicketByNameAndIdCardPassengerResult(
          tickets.content[0].namePassenger,
          tickets.content[0].idCardPassenger,
          page
        )
      ))();
  }, [page]);
  return (
    <>
      {searchTicket.content && (
        <div id="search-result">
        <div id="detail-ticket-search" >
          <div className="container" >
            <div className="title-search text-center">
              <p className="h1">Lịch Sử chuyến bay</p>
            </div>
            {searchTicket.content.map((ticket, index) => {
              return (
                <div className="wrapper d-grid">
                  <div className="row wrap">
                    <div className="location">
                      <p className="h3">
                        <span>{ticket.nameDeparture}</span>{" "}
                        <i class="fa-solid fa-plane-departure"></i>{" "}
                        <span>{ticket.nameDestination}</span>
                      </p>
                    </div>
                    <div className="row">
                      <div className="col-4 info-fight">
                        <p className="">{ticket.nameDeparture}</p>
                        <p className="outstanding">
                          <span>Giờ đi : {ticket.timeDeparture}</span>{" "}
                        </p>
                        <p className="outstanding">
                          <span>Ngày đi : {ticket.dateDeparture}</span>{" "}
                        </p>
                      </div>
                      <div className="col-4 info-fight">
                        <p className="">{ticket.nameDestination}</p>
                        <p className="outstanding">
                          <span>Giờ đến : {ticket.timeArrival}</span>{" "}
                        </p>
                        <p className="outstanding">
                          <span>Ngày đến : {ticket.dateArrival}</span>{" "}
                        </p>
                      </div>
                      <div className="col-4 info-fight">
                        <div className="logo-image">
                          <p className="vietnam-airline">CodeGym Airline</p>
                        </div>
                        <p>
                          Chuyến bay :{" "}
                          <span className="outstanding">
                            {ticket.nameRoute}
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                    <div className="row info-second">
                      <div className="col-2">
                        <p>Tên Máy Bay</p>
                        <p className="outstanding">{ticket.nameAirCraft}</p>
                      </div>
                      <div className="col-2">
                        <p>Loại ghế</p>
                        <p value="2" id="type-ticket" className="outstanding">
                          {ticket.nameTypeSeat}
                        </p>
                      </div>
                      <div className="col-2">
                        <p>Vị Trí Ghế</p>
                        <p className="outstanding">{ticket.positionSeat}</p>
                      </div>
                      <div className="col-2">
                        <p>Loại vé</p>
                        <p value="2" id="type-ticket" className="outstanding">
                          {ticket.nameTypeTicket}
                        </p>
                      </div>
                      <div className="col-2">
                        <p>Loại hành khách</p>
                        <p className="outstanding">
                          {ticket.nameTypePassenger}
                        </p>
                      </div>
                    </div>
                    <div className="row info-second">
                      <div className="col-2">
                        <p>Tên Hành Khách</p>
                        <p className="money">{ticket.namePassenger}</p>
                      </div>
                      <div className="col-2">
                        <p>CCCD/Passport:</p>
                        <p className="money">{ticket.idCardPassenger}</p>
                      </div>
                      <div className="col-2">
                        <p>Số Điện Thoại</p>
                        <p className="money">{ticket.telPassenger}</p>
                      </div>
                      <div className="col-2">
                        <p>Ngày Booking</p>
                        <p value="2" id="type-ticket" className="money">
                          {ticket.dateBooking}
                        </p>
                      </div>
                      <div className="col-3">
                        <p>Giá Vé</p>
                        <p className="money">{ticket.priceTicket}</p>
                      </div>
                    </div>
                    <div className=" row info-third">
                      <div className="col-6">
                        <p className="h5">Điều kiện hành lý</p>
                        <p>
                          Loại Hành Lý :{" "}
                          <span className="outstanding">
                            {" "}
                            {ticket.nameLuggage}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <ul className="d-flex">
                    <li
                      className="btn btn-dark"
                      style={{ listStyleType: "none" }}
                      onClick={async () => {
                        await previousPage();
                      }}
                    >
                      Trước
                    </li>
                    
                    <li
                      className="btn btn-success"
                      style={{ listStyleType: "none" }}
                    >
                      {page + 1}
                    </li>
                    <li
                      className="btn btn-dark"
                      style={{ listStyleType: "none" }}
                      onClick={async () => {
                        await nextPage();
                      }}
                    >
                      Sau
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
        </div>
      )}
    </>
  );
}
