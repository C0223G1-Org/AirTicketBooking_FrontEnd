import { TicketContext } from "../searchTickets_KietNT/TicketContext";
import { searchTicketByNameAndIdCardPassenger } from "../../services/TicketService";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/search_ticket/style.css";

// import img_1 from "./css/search_ticket/img/img_1.png";
import Swal from "sweetalert2";
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
        0
      );
        console.log(tickets);
      updateTickets(tickets);
      navigate("/tickets/search-ticket-results/", { state: { tickets } });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Không tìm thấy thông tin!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <>
      <div id="booking-search">
        <div className="section-center">
          <div className="section container">
            <div className="row">
              <div className="col-md-5 col-sm-12" id="search_chuyenbay">
                <div className="booking-search-form" style={{ height: "100%" }}>
                  <div className="titleSearchPage" style={{ padding: "0px" }}>
                    <p
                      style={{
                        height: "100px",
                        paddingTop: "25px",
                        fontSize: "35px",
                      }}
                      className="title1"
                    >
                      Chuyến bay của tôi
                    </p>
                    <p
                      className="search-booking-search-title"
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
                    className="booking-search-form-padding"
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
                            CCCD/Passport{" "}
                            <span style={{ color: "red" }}>*</span>
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
                <img style={{ width: "100%" }} alt="" id="img_2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
