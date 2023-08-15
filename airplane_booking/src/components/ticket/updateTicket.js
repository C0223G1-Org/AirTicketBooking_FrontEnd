import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import Swal from 'sweetalert2'
import { Link, useParams } from "react-router-dom";
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
        const data = await findTicketById(param.id);
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
                        <div className="col">
                            <h2>CHỈNH SỬA VÉ</h2>
                        </div>
                    </div>
                </div>
                <div className="container">
                    {ticket.idTicket && (
                        <Formik
                            onSubmit={async (values) => {
                                const object = {
                                    ...ticket,
                                    namePassenger: values.namePassenger,
                                    customer: {
                                        ...ticket.customer,
                                        emailCustomer: values.customer
                                    }
                                }
                                console.log(object);
                                await handleEditTicket(object);
                                // navigate("/")
                            }}
                            initialValues={{
                                namePassenger: ticket?.namePassenger,
                                customer: ticket?.customer.emailCustomer,
                            }}
                            validationSchema={yup.object({
                                namePassenger: yup.string().required("Tên không được để trống.").min(5, "Tên không được ít hơn 5 kí tự.").max(30, "Tên không được quá 30 kí tự.").matches(/^(?:[A-Z][a-z]*\s)*[A-Z][a-zA-Z]*$/u, "Tên viết hoa sau mỗi dấu cách, không được chứa kí tự số và kí tự đặc biệt."),
                                customer: yup.string().required("Email không được để trống").matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, "Email không đúng định dạng.").max(50, "Không được quá 50 kí tự"),

                            })}
                        >
                            <Form>

                                <div className="form-group">
                                    <b>Mã đặt chỗ:</b>
                                    <p name='seat' className="form-control">{ticket?.seat?.positionSeat}</p>
                                </div>
                            
                                <div className="form-group">
                                    <label htmlFor='namePassenger'><b>Tên người đi<span style={{color:"red"}}>(*)</span>:</b></label>
                                    <Field id='namePassenger' type="text" name='namePassenger' className="form-control" />
                                    <ErrorMessage name="namePassenger" className='text-area' />
                                </div>

                                <div className="form-group">
                                    <b>Chuyến bay:</b>
                                    <p name="route" className="form-control">
                                        {`${ticket?.seat?.route?.departure?.nameDeparture} - ${ticket?.seat?.route?.destination?.nameDestination}`}
                                    </p>
                                </div>

                                <div className="form-group">
                                    <b>Ngày:</b>    
                                    <p type="text" className="form-control">
                                        {ticket?.seat?.route?.dateDeparture}
                                    </p>
                                </div>

                                <div className="form-group">
                                    <b>Giá: </b>
                                    <p className="form-control">
                                        {ticket?.priceTicket}
                                    </p>
                                </div>

                                <div className="form-group">
                                    <label htmlFor='customer'><b>Email thanh toán<span style={{color:"red"}}>(*)</span>:</b></label>
                                    <Field id='customer' type="text" name='customer' className="form-control" />
                                    <ErrorMessage name="customer" className='text-area' />
                                </div>

                                <div className="form-buttons">
                                    <button type="submit" className="btn btn-primary">Xác nhận</button>
                                    <Link to="/" className="btn btn-secondary">Huỷ</Link>.
                                </div>

                            </Form>
                        </Formik>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UpdateTicket;

