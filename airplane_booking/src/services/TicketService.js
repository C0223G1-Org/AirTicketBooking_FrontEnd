import axios from "axios";
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