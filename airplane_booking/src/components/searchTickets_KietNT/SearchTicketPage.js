import { TicketContext } from "../searchTickets_KietNT/TicketContext";
import { searchTicketByNameAndIdCardPassenger } from "../../services/TicketService";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import "../../css/search_ticket/style.css";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";


export default function SearchTicketPage() {
  const navigate = useNavigate();
  const { updateTickets } = useContext(TicketContext);


  const searchTicket = async (values) => {
    try {
      const name = values.namePassenger;
      const idCard = values.idCardPassenger;
      const tickets = await searchTicketByNameAndIdCardPassenger(
        name,
        idCard,
        0
      );
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
      <Formik
        initialValues={{
          namePassenger: "",
          idCardPassenger: "",
        }}
        validationSchema={yup.object({
          namePassenger: yup
            .string()
            .required("Không được để trống trường này")
            .min(3, "Họ và tên tối thiểu 3 ký tự và tối đa 30 ký tự")
            .max(30, "Họ và tên tối thiểu 3 ký tự và tối đa 30 ký tự")
            .matches(
              /^[A-Z]{1}[a-z]*(\s[A-Z]{1}[a-z]*)*$/,
              "Bạn phải viết hoa chữ cái đầu của từng từ và có khoảng trắng giữa các từ"
            ),
          idCardPassenger: yup
            .string()
            .required("Không được để trống trường này")
            .min(6, "CCCD/Passport tối thiểu 6 ký tự và tối đa 12 ký tự")
            .max(12, "CCCD/Passport tối thiểu 6 ký tự và tối đa 12 ký tự")
            .matches(/^([A-Z]|[0-9])+$/, "Nhập vào chữ viết hoa và ký tự"),
        })}
        onSubmit={(values)=>{searchTicket(values)}}
      >
        <div id="booking-search">
          <div className="section-center">
            <div className="section container">
              <div className="row">
                <div className="col-md-5 col-sm-12" id="search_chuyenbay">
                  <div
                    className="booking-search-form"
                    style={{ height: "100%" }}
                  >
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
                        cùng chúng tôi, vui lòng nhập thông tin của bạn dưới đây
                        :
                      </p>
                    </div>
                    <Form
                      className="booking-search-form-padding"
                      style={{ margin: "20px 30px" }}
                    >
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <span className="form-label">
                              Họ Và tên <span style={{ color: "red" }}>*</span>
                            </span>
                            <Field
                              id="searchTicketByName"
                              name="namePassenger"
                              className="form-control"
                              type="text"
                            />
                            <ErrorMessage
                              className="error"
                              name="namePassenger"
                              component={"div"}
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
                            <Field
                              id="searchTicketByIdCard"
                              className="form-control"
                              type="text"
                              name="idCardPassenger"
                            />
                            <ErrorMessage
                              className="error"
                              name="idCardPassenger"
                              component={"div"}
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <button
                      
                          type="submit"
                          className="submit-btn"
                        >
                          Tìm kiếm
                        </button>
                      </div>
                    </Form>
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
      </Formik>
    </>
  );
}
