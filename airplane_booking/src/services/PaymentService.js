import axios from "axios";

export async function getTicketByTicketId (id) {
    const resolve = await axios.get(`http://localhost:8080/payment/payment/2`)
    return resolve.data
}
export async function updateTicketByIdTicket (id) {
    const resolve = await axios.patch(`http://localhost:8080/payment/callback/${id}`)
    return resolve.data;
}