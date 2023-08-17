import axios from "axios";
export  async function getTypePassengerById(id){
    const res =  await axios.get("http://localhost:8080/type-passenger/detail/"+id)
    return res.data
}