import axios from "axios";
export  async function getAllLuggage(){
    const res =  await axios.get("http://localhost:8080/luggage/list")
    return res.data
}
export  async  function  findLuggageById(id){
    const  res =await  axios.get("http://localhost:8080/luggage/"+id)
    return res.data;
}