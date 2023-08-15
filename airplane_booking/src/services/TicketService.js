import axios from "axios";

export async function searchTicketByNameAndIdCardPassenger(name,idCard,page) {
    const res = await axios.get('http://localhost:8080/tickets/search-ticket/'+ name +'/' + idCard + '?page=' + page)
    return res.data;
}
export async function   searchTicketByNameAndIdCardPassengerResult(name,idCard,page) {
    const res = await axios.get('http://localhost:8080/tickets/search-ticket-result/'+ name +'/' + idCard + '?page=' + page)
    return res.data;
}

export async function updateListTicket(ticket){
        await axios.patch(`http://localhost:8080/tickets/updateTicket/`+ticket.idTicket,ticket);
}

export async function findTicketById(){
    const res= await axios.get(`http://localhost:8080/tickets/${1}`)
    return res.data;
}
export async function getListCustomer(){
    const res= await axios.get('http://localhost:8080/customers/list?page=0');
    return res.data;

}

export async function getListSeat(){
    const res= await axios.get('http://localhost:8080/seats/seat-empty/1');
    return res.data;
}
export async function getListTypeTicket(){
    const res= await axios.get('http://localhost:8080/type-tickets/1');
    return res.data;
}

export async function findByIdCustomer(idCustomer){
    const res= await axios.get(`http://localhost:8080/customers/${idCustomer}`)
    return res.data;
}
export async function findByIdPassenger(idPassengers){
    const res= await axios.get(`http://localhost:8080/passengers/${idPassengers}`);
    return res.data;
}
export async function getListTicket(){
    const res= await axios.get('http://localhost:8080/tickets');
    return res.data;
}
export const getListTickets=async(page)=>{
    const response = await axios.get("http://localhost:8080/tickets/booked/"+page)
    return response.data;
}
export const getListUnBookTicket=async(page)=>{
    const response = await axios.get("http://localhost:8080/tickets/unbooked/"+page)
    return response.data;
}
export const deleteTicketDB=async(id)=>{
    const response=await axios.delete("http://localhost:8080/tickets/"+id)
    return response.data;
}