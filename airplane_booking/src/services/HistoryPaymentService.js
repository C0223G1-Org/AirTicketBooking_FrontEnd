import axios from "axios";

export async function getListHistoryByCustomerId(id,page,nameDeparture,nameDestination) {
    const resolve = await axios.get(`http://localhost:8080/payment/history/${id}?page=${page}&&departure=${nameDeparture}&&destination=${nameDestination}`)
    return resolve.data
}
export async function getListTicketByNameRoute(nameDeparture, nameDestination,dateBooking) {
    // console.log(nameDeparture);
    // console.log(nameDestination);
    // console.log(dateBooking);
    const resolve = await axios.get(`http://localhost:8080/payment/detail-history/${nameDeparture}/${nameDestination}/${dateBooking}`)
    return resolve.data;
}