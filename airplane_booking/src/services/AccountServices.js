import axios from "axios";

export async function changePassword(account){
    const res = await axios.patch("http://localhost:8080/api/account/"+account.id,account);
}