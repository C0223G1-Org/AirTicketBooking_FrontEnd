import axios from "axios";

export async function getAllTypeSeat() {
    const res = await axios.get('http://localhost:8080/type-seat');
    return res.data;
}
export  async function getTypeSeatById(id) {
    const res = await axios.get("http://localhost:8080/type-seat/detail/" + id)
}
export  async function getTypeSeatByName(name){
    try {
        const res =  await axios.get("http://localhost:8080/type-seat/search/"+name)
        return res.data
    }catch (error){
        console.log("Không tìm thấy loại ghế");
    }

}