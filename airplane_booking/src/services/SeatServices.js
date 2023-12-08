import axios from "axios";

export async function getSeatByIdTypeSeat(id,idRoute,number){
    try {
        const res = await axios.get("http://localhost:8080/seats/searchSeat/" + id + "/" + idRoute + "/" + number);
        return res.data;
    }catch (error){
        console.log("Không có ghế");
    }
}
export const getUnSeatList=async(id)=>{
    console.log("nhan")
    const response = await axios.get("http://localhost:8080/seats/seat-unBook/"+id);
    return response.data;
}