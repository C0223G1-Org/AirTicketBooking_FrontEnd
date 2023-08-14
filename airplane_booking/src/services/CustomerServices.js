import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080/customers'

export async function updateCustomer(customer){
   const response= await axios.put('/'+customer.idCustomer,customer)
   return response
}
export async function getCustomerById(id){
    const response =await axios.get('/'+id)
    return response.data
}

