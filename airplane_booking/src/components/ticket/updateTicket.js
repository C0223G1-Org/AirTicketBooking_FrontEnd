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
    const handldEditTicket = async (values) => {
     
        const customer = await findTicketById(values.customer);
        
      const  customerobj={
            ...customer
        }
        const data = { ...values, customer: customerobj };
        console.log("1233"+data)
        await updateListTicket(data).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Ticket update successfully.',
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
                        await handldEditTicket(object);
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
                            customer: ticket?.customer?.emailCustomer,
                        }}
                        validationSchema={yup.object({                       
                            namePassenger: yup.string().required(),
                            customer: yup.string().required(),

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
                                <label htmlFor='customer'>Email thanh toán:</label>
                                <Field id='customer' type="text" name='customer' className="form-control" />
                                <ErrorMessage name="customer" className='text-red' />
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