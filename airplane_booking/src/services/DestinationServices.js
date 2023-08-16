import axios from "axios";

export async function getAllDestination() {
    const res = await axios.get('http://localhost:8080/destination');
    return res.data;
}