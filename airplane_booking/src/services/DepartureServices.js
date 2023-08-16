import axios from "axios";

export async function getAllDeparture() {
    const res = await axios.get('http://localhost:8080/departure');
    return res.data;
}