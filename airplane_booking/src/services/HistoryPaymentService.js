import axios from "axios";

export async function getListHistoryByCustomerId(id,page,nameDeparture,nameDestination) {
    const token = localStorage.getItem('token');
    try {
        const resolve = await axios.get(`http://localhost:8080/payment/history/${id}?page=${page}&&departure=${nameDeparture}&&destination=${nameDestination}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        return resolve.data
    }catch(error) {
        console.log("Không tìm thấy dữ liệu");
    }

}
export async function getListTicketByNameRoute(nameDeparture, nameDestination,dateBooking) {
   try{
    const resolve = await axios.get(`http://localhost:8080/payment/detail-history/${nameDeparture}/${nameDestination}/${dateBooking}`)
    return resolve.data;
   }catch (error) {
       console.log("Không tìm thấy dữ liệu")
   }
}