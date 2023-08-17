import axios from "axios";

export async function getTicketByTicketId (id) {
    const resolve = await axios.get(`http://localhost:8080/payment/payment/${id}`)
    return resolve.data
}
export async function updateTicketByIdTicket (id, paymentStatus) {

    const resolve = await axios.patch(`http://localhost:8080/payment/callback/1/${paymentStatus}`)
    return resolve.data;
}