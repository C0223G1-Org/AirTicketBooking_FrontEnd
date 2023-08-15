import axios from "axios";
export  async function getTypeTicketById(id){
    const res =  await axios.get("http://localhost:8080/type-tickets/"+id)
    return res.data
}