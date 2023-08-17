import axios from "axios";

export async function getSeatByIdTypeSeat(id,idRoute,number){
    try {
        const res = await axios.get("http://localhost:8080/seats/searchSeat/" + id + "/" + idRoute + "/" + number);
        return res.data;
    }catch (error){
        console.log("Không có ghế");
    }
}