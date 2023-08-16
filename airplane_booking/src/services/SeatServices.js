import axios from "axios";

export async function getSeatByIdTypeSeat(id,idRoute,number){
    const res = await axios.get("http://localhost:8080/seats/searchSeat/"+id+"/"+idRoute+"/"+number);
    return res.data;
}