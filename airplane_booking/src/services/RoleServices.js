import axios from "axios";

export const findByRole = async () => {
    try {
        return (await axios.get(`http://localhost:8080/api/role`)).data
    } catch (e) {
        console.log(e);
    }
}