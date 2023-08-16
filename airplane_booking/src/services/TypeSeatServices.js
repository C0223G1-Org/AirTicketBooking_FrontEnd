import axios from "axios";

export async function getAllTypeSeat() {
    const res = await axios.get('http://localhost:8080/type-seat');
    return res.data;
}
export  async function getTypeSeatById(id){
    const res =  await axios.get("http://localhost:8080/type-seat/detail/"+id)
    return res.data
}