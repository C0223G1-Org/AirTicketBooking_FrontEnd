import axios from "axios";
export  async function getTypePassengerById(id){
    try {
        const res =  await axios.get("http://localhost:8080/type-passenger/detail/"+id)
        return res.data
    }
    catch (error){
        console.log("không tìm thấy loại khách")
    }

}