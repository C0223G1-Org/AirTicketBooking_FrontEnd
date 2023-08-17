import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import Swal from 'sweetalert2'
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../css/ticket/updateTicket.css";
import { findTicketById, updateListTicket } from "../../services/TicketService";
/**
 * create by: VuDT
 * date: 15/08/2023
 * @function: updateTicket
 * @param: idTicket
 */
const UpdateTicket = () => {
    // const navigate = useNavigate();
    useEffect(() => {
        getTicket();
    }, [])
    const [ticket, setTicket] = useState([]);
    const param = useParams();
    const getTicket = async () => {
        const data = await findTicketById(param.idTicket);
        setTicket(data);
    }
    const handleEditTicket = async (values) => {
        await updateListTicket(values).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                text: 'Cập nhật vé thành công.',
            })
        })
    }
    return (
        <div className="img">
            <div className="background-image">
                <div className="table-title">
                    <div className="title">
                        <div className="update">
                            <h1>CHỈNH SỬA VÉ</h1>
                        </div>
                    </div>
                </div>
                {ticket.idTicket && (
                    <Formik
                        onSubmit={async (values) => {
                            const object = {
                                ...ticket,
                                namePassenger: values.namePassenger,
                                customer: {
                                    ...ticket.customer,
                                    emailCustomer: values.customer,
                                },
                            };
                            await handleEditTicket(object);
                            // navigate("/")
                        }}
                        initialValues={{
                            namePassenger: ticket?.namePassenger,
                            customer: ticket?.customer.emailCustomer,
                        }}

                    >
                        <Form>
                            <div className="container">
                                <div className="row">
                                    <div className="form-group col-sm-6 passenger">
                                        <b>Mã đặt chỗ:</b>
                                        <p name="seat" className="form-control">
                                            {ticket?.seat?.positionSeat}
                                        </p>
                                    </div>
                                    <div className="class form-group col-sm-6">
                                        <b>Giá: </b>
                                        <p className="form-control">{ticket?.priceTicket}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-sm-6 passenger">
                                        <b>Chuyến bay:</b>
                                        <p name="route" className="form-control">
                                            {`${ticket?.seat?.route?.departure?.nameDeparture} - ${ticket?.seat?.route?.destination?.nameDestination}`}
                                        </p>
                                    </div>
                                    <div className="class form-group col-sm-6">
                                        <b>Ngày:</b>
                                        <p type="text" className="form-control">
                                            {ticket?.seat?.route?.dateDeparture}
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-sm-6 passenger">
                                        <label htmlFor="namePassenger">
                                            <b>Tên người đi<span className="star">(*)</span>:</b>
                                        </label>
                                        <br></br>
                                        <Field
                                            id="namePassenger"
                                            type="text"
                                            name="namePassenger"
                                            className="form-control"
                                            placeholder="Vui lòng nhập tên người đi"
                                            style={{ background: "#F2F2F2" }}
                                        />
                                        <div style={{ color: "red" }}>
                                            <ErrorMessage name="namePassenger" />
                                        </div>
                                    </div>
                                    <div className="class form-group col-sm-6">
                                        <label htmlFor="customer">
                                            <b>Email thanh toán<span className="star">(*)</span>:</b>
                                        </label>
                                        <br></br>
                                        <Field
                                            id="customer"
                                            type="text"
                                            name="customer"
                                            className="form-control"
                                            placeholder="Vui lòng nhập email thanh toán"
                                            style={{ background: "#F2F2F2" }}
                                        />
                                        <div style={{ color: "red" }}>
                                            <ErrorMessage name="customer" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-buttons">
                                    <button type="submit" className="btn btn-primary">
                                        Xác nhận
                                    </button>
                                    <Link to="/" className="btn btn-secondary">
                                        Huỷ
                                    </Link>
                                    .
                                </div>
                            </div>
                        </Form>
                    </Formik>
                )}
            </div>
        </div>
    )
}
export default UpdateTicket;