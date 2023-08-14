import axios from "axios";
import { date } from "yup";

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
