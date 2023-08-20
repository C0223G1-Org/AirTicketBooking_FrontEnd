import axios from "axios";

export async function getTicketByCustomerId (id, num) {
    const resolve = await axios.get(`http://localhost:8080/payment/payment/${id}/${num}`)
    return resolve.data
}
export async function updateTicketByIdTicket (id, paymentStatus) {
    const resolve = await axios.patch(`http://localhost:8080/payment/callback/${id}/${paymentStatus}`)
    return resolve.data;
}