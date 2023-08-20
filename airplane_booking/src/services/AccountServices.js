import axios from "axios";

export const createAccount = async (account) => {
    try {
        await axios.post(`http://localhost:8080/api/account/q`, account)
    } catch (e) {
        console.log(e)
    }
}

export async function changePassword(account) {
    const token = localStorage.getItem('token');
    const res = await axios.patch("http://localhost:8080/api/account/" + account.id, account,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
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
    } catch (e) {
        console.log(e)
    }
}

export const getAccountByGmail = async (gmail) => {
    const token = localStorage.getItem('token');
    const res = await axios.get("http://localhost:8080/api/account/email/" + gmail,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    return res.data
}
