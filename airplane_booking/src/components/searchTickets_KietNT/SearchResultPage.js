import React, { useContext, useState, useEffect } from "react";
import { TicketContext } from "./TicketContext";
import { searchTicketByNameAndIdCardPassengerResult } from "../../services/TicketService";
import "../../css/search_ticket/search-result.css";

export default function SearchResultPage() {
  const { tickets, setTickets } = useContext(TicketContext);
  const [searchTicket, setSearchTicket] = useState([]);
  console.log(searchTicket.content);

  let [page, setPage] = useState(0);
  console.log(page);

  const nextPage = async () => {
    let nextPageValue = page + 1;
    if (nextPageValue < searchTicket.totalPages) {
      setPage(nextPageValue);
      console.log(nextPageValue);
      const data = await searchTicketByNameAndIdCardPassengerResult(
        tickets.content?.[0]?.namePassenger,
        tickets.content?.[0]?.idCardPassenger,
        nextPageValue
      );
      setSearchTicket(data);
    }
  };

  const previousPage = async () => {
    let previousPageValue = page - 1;
    if (previousPageValue >= 0) {
      setPage(previousPageValue);
      console.log(previousPageValue);
      const data = await searchTicketByNameAndIdCardPassengerResult(
        tickets.content?.[0]?.namePassenger,
        tickets.content?.[0]?.idCardPassenger,
        previousPageValue
      );
      setSearchTicket(data);
    }
  };

  useEffect(() => {
    (async () => {
      const data = await searchTicketByNameAndIdCardPassengerResult(
        tickets.content?.[0]?.namePassenger,
        tickets.content?.[0]?.idCardPassenger,
        page
      );
      setSearchTicket(data);
    })();
  }, [page]);
  return (
    <>
      {searchTicket.content && (
        <div id="search-result">
          <div className="container">
            <div
              id="detail-ticket-search"
              style={{ paddingTop: "20px", paddingBottom: "20px" }}
            >
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
                    <div className="row">
                    <div
                      className="inline-flex mt-2 xs:mt-0 pad"
                    
                    >
                      <button
                        className="text-sm   py-2 px-3 rounded-l"

                        onClick={async () => {
                          await previousPage();
                        }}
                      >
                        Trước
                      </button>

                      <button
                        className="text-sm   py-2 px-3 rounded-l"
                        style={{
                          background: "rgb(223, 165, 18)",
                          color: "#ffffff",
                          marginLeft: "5px",
                        }}
                      >
                        {page + 1}
                      </button>
                      <button
                        className="text-sm   py-2 px-3 rounded-l"
                        style={{
                          marginLeft: "5px",
                          opacity: "0,6",
                        }}
                        onClick={async () => {
                          await nextPage();
                        }}
                      >
                        Sau
                      </button>
                    </div>
                    </div>
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
