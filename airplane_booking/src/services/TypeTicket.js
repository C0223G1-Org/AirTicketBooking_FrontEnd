import axios from "axios";
export  async function getTypeTicketById(id){
    try {
        const res = await axios.get("http://localhost:8080/type-tickets/" + id)
        return res.data
    }catch (error){
        console.log("Không tìm thấy loại vé")
    }
}