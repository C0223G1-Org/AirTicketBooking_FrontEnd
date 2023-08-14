import axios from 'axios';

export async function getTop10CheapestRoute() {
    const res = await axios.get('http://localhost:8080/route/top10');
    return res.data;
}