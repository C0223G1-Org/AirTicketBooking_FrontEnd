import axios from "axios";

// export async function updateCustomer(customer){
//    const response= await axios.put('/'+customer.idCustomer,customer)
//    return response
// }

export async function getCustomerById(id) {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:8080/customers/' + id,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    return response.data
}

export const CreateCustomer = async (obj) => {
    const token = localStorage.getItem('token');
    await axios.post("http://localhost:8080/customers/", obj,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
}

export const UpdateCustomer = async (obj) => {
    const token = localStorage.getItem('token');
    await axios.put("http://localhost:8080/customers/" + obj.idCustomer, obj,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
}

export const GetCustomerById = async (id) => {
    const token = localStorage.getItem('token');
    const res = await axios.get("http://localhost:8080/customers/" + id,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    return res.data
}

export async function getListCustomers(page, name, email, nationality) {
const token = localStorage.getItem('token');
    const res = await axios.get(`http://localhost:8080/customers/list?page=${page}&&name=${name}&&email=${email}&&nationality=${nationality}`,
        {
            headers : {
                Authorization: `Bearer ${token}`,
            }
        })
    return res.data;


}

// export async function getListSearchCustomers(page,name,email,nationality){

//         const res= await axios.get(`http://localhost:8080/customers/search?page=${page}&&name=${name}&&email=${email}&&nationality=${nationality}`)
//         return res.data;
// }
export async function deleteCustomers(id) {
    await axios.put(`http://localhost:8080/customers/delete/${id}`)
}

export async function getCustomerByEmail(email) {
    const res = await axios.get("http://localhost:8080/customers/login/" + email);
    return res.data;
}