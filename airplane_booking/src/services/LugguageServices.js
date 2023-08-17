import axios from "axios";
export  async function getAllLuggage(){
    try {
        const res =  await axios.get("http://localhost:8080/luggage/list")
        return res.data
    }catch (error){
        console.log("Không có dữ liệu hành lý")
    }

}
export  async  function  findLuggageById(id){
    try {
        const  res =await  axios.get("http://localhost:8080/luggage/"+id)
        return res.data;
    }catch (error){
        console.log("Không tìm thấy hành lý")
    }

}