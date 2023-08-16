import axios from "axios";
export  async function createNewTicket(ticket){
     await axios.post("http://localhost:8080/tickets",ticket)

}