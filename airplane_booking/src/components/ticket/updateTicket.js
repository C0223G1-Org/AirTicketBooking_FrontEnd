import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import Swal from 'sweetalert2'
import { useParams } from "react-router-dom";
import "../../css/ticket/updateTicket.css";
import { findTicketById, updateListTicket } from "../../services/TicketService";
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
    const handleEditTicket = async (values) =>{
        

        const data = { ...values };
        console.log("1233"+data)
        await updateListTicket(data).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Thành công!',
                text: 'Cập nhật vé thành công.',
            })
        })
    }

    return (

        <div className="background-image">
            <div className="table-title">
                <div className="row">
                    <div className="col-sm-6">
                        <h2>CHỈNH SỬA <b>VÉ</b></h2>
                    </div>
                </div>
            </div>

            <div>
                {ticket.idTicket && (
                    <Formik
                    onSubmit={async (values) => {
                        console.log("SSSSSSSSSSSSS");

                       const object={
                        ...values,
                       }
                       console.log(object);
                        await handleEditTicket(object);
                        // navigate("/")
                    }}
                        initialValues={{
                            idTicket:ticket?.idTicket,
                            priceTicket: ticket?.priceTicket,
                            namePassenger: ticket?.namePassenger,
                            dateBooking: ticket?.dateBooking,
                            seat: ticket?.seat.positionSeat,
                            departure: ticket?.seat.route.departure.idDeparture,
                            destination: ticket?.seat.route.destination.idDestination,
                            emailPassenger: ticket?.emailPassenger,
                        }}
                        validationSchema={yup.object({                       
                            namePassenger: yup.string().required("Tên không được để trống.").min(5,"Tên không được ít hơn 5 kí tự.").max(30,"Tên không được quá 30 kí tự.").matches(/^[a-zA-Z\s']+$/u,"Tên không được chứa kí tự số và kí tự đặc biệt."),
                            emailPassenger: yup.string().required("Email không được để trống").matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, "Email không đúng định dạng.").max(50,"Không được quá 50 kí tự"),

                        })}
                     
                    >
                        <Form>
                            <div className="form-group">
                                <p >Mã đặt chỗ:</p>
                                <p name='seat'  className="form-control" >{ticket?.seat?.positionSeat}</p>
                            
                            </div>
                            <div className="form-group">
                                <label htmlFor='namePassenger'>Tên người đi:</label>
                                <Field id='namePassenger' type="text" name='namePassenger' className="form-control" />
                                <ErrorMessage name="namePassenger" className='text-area' />
                            </div>
                            <div className="form-group">
                                <p>Chuyến bay:</p>
                                <p name="route"
                                    className="form-control">
                                          {`${ticket?.seat?.route?.departure?.nameDeparture} - ${ticket?.seat?.route?.destination?.nameDestination}`}
                                        </p>
                            
                            </div>
                            <div className="form-group">
                                <p >Ngày:</p>
                                <p type="text"className="form-control" >
                                    {ticket?.dateBooking}
                                </p>
                              
                            </div>
                            <div className="form-group">
                                <p>Giá: </p>
                                <p className="form-control" >
                                    {ticket?.priceTicket}
                                    </p>
                             
                            </div>
                            <div className="form-group">
                                <label htmlFor='emailPassenger'>Email thanh toán:</label>
                                <Field id='emailPassenger' type="text" name='emailPassenger' className="form-control" />
                                <ErrorMessage name="emailPassenger" className='text-area' />
                            </div>
                            <div className="form-buttons">
                                <button type="submit" className="btn btn-primary">Xác nhận</button>
                               <button type="button" className="btn btn-secondary">Huỷ</button>.
                            </div>
                        </Form>
                    </Formik>
                )}
            </div >
        </div>
    )
}

export default UpdateTicket;