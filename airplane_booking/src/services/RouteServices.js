import axios from "axios";

export async function getListRouter(departure,destination,dateDeparture){
    const res = await axios.get(`http://localhost:8080/route/search-trips/${departure}/${destination}/${dateDeparture}`)
    return res.data
}
export  async function getRouteById(idRoute){
    const res =  await axios.get("http://localhost:8080/route/"+idRoute)
    return res.data
}