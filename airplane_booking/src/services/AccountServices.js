import axios from "axios";

export const createAccount = async (account) => {
    try {
        await axios.post(`http://localhost:8080/api/account/q`, account)
    } catch (e) {
        console.log(e)
    }
}

export async function changePassword(account){
    const res = await axios.patch("http://localhost:8080/api/account/"+account.id,account);
}
export const editAccount = async (account) => {
    try {
        await axios.patch(`http://localhost:8080/api/account/q`, account)
    } catch (e) {
        console.log(e)
    }
}

export const findById = async (id) => {
    try {
        return (await axios.get(`http://localhost:8080/api/account/q/${id}`)).data
    }catch (e){
        console.log(e)
    }
}

export const getAccountByGmail = async (gmail) =>{
    const res = await axios.get("http://localhost:8080/api/account/email/"+gmail)
    return res.data
}
