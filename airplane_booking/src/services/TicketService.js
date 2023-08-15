import axios from "axios";

export async function searchTicketByNameAndIdCardPassenger(name,idCard,page) {
    const res = await axios.get('http://localhost:8080/tickets/search-ticket/'+ name +'/' + idCard + '?page=' + page)
    return res.data;
}
export async function   searchTicketByNameAndIdCardPassengerResult(name,idCard,page) {
    const res = await axios.get('http://localhost:8080/tickets/search-ticket-result/'+ name +'/' + idCard + '?page=' + page)
    return res.data;
}
