import axios from "axios";

export async function getListHistoryByCustomerId(page,nameDeparture,nameDestination) {
    const resolve = await axios.get(`http://localhost:8080/payment/history/1?page=${page}&&departure=${nameDeparture}&&destination=${nameDestination}`)
    return resolve.data
}

// export async function getCustomerById(id) {
//     const resolve = await axios.get(`http://localhost:8080/payment/history/1`)
//     return resolve.data;
// }