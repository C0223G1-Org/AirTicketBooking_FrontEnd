import axios from "axios";
export  async function getTypeSeatByName(name){
    const res =  await axios.get("http://localhost:8080/type-seat/search/"+name)
    return res.data
}