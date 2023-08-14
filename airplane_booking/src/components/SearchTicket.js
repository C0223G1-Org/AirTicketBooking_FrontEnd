import { TicketContext } from "./TicketContext";
import { searchTicketByNameAndIdCardPassenger } from "../services/TicketService";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import SearchResultPage from "./SearchResultPage";

export default function SearchTicketPage() {
  const navigate = useNavigate();
  const { updateTickets } = useContext(TicketContext);
  const searchTicket = async () => {
    try {
      const name = document.getElementById("searchTicketByName").value;
      const idCard = document.getElementById("searchTicketByIdCard").value;
      const tickets = await searchTicketByNameAndIdCardPassenger(
        name,
        idCard,
        0,
      );
      console.log(tickets);
      updateTickets(tickets);
      navigate("/tickets/search-ticket-results/", { state: { tickets } });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div id="booking">
        <div className="section-center">
          <div className="section container">
            <div className="row">
              <div className="col-md-5 col-sm-12" id="search_chuyenbay">
                <div
                  className="booking-form"
                  style={{ height: "100%", borderRadius: "15px 0px 0px 15px" }}
                >
                  <div className="titleSearchPage" style={{ padding: "0px" }}>
                    <p
                      style={{
                        borderRadius: "15px 0px 0px 0px",
                        height: "100px",
                        paddingTop: "25px",
                        fontSize: "35px",
                      }}
                      className="title1"
                    >
                      Chuyến bay của tôi
                    </p>
                    <p
                      className="search-booking-title"
                      style={{
                        margin: "20px 40px 20px 60px",
                        fontFamily: "sans-serif",
                        fontSize: "20px",
                      }}
                    >
                      Bạn muốn nhìn lại những hành trình mà bạn đã đồng hành
                      cùng chúng tôi, vui lòng nhập thông tin của bạn dưới đây :
                    </p>
                  </div>
                  <form
                    className="booking-form-padding"
                    style={{ margin: "20px 30px" }}
                  >
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <span className="form-label">
                            Họ Và tên <span style={{ color: "red" }}>*</span>
                          </span>
                          <input
                            id="searchTicketByName"
                            className="form-control"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div
                          className="form-group"
                          style={{ marginTop: "10px" }}
                        >
                          <span className="form-label">
                            CCCD/CMND <span style={{ color: "red" }}>*</span>
                          </span>
                          <input
                            id="searchTicketByIdCard"
                            className="form-control"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <button
                        onClick={() => searchTicket()}
                        type="button"
                        className="submit-btn"
                      >
                        Tìm kiếm
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div
                className="col-md-7 col-sm-12 col-md-offset-1"
                id="search_chuyenbay1"
              >
                <div>
                  <img
                    src="../css/search/img/img_1.png"
                    style={{ width: "100%", borderRadius: "0px 15px 15px 0px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
