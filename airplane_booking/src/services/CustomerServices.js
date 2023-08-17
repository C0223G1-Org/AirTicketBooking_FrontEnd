import axios from "axios";

export async function updateCustomer(customer){
   const response= await axios.put('/'+customer.idCustomer,customer)
   return response
}
export async function getCustomerById(id){
    const response =await axios.get('http://localhost:8080/customers/'+id)
    return response.data
}
export const CreateCustomer = async (obj)=>{
     await axios.post("http://localhost:8080/customers/",obj)
}

export const UpdateCustomer = async (obj)=>{
     await axios.put("http://localhost:8080/customers/"+obj.idCustomer,obj)
}

export const GetCustomerById = async (id) =>{
     const res = await axios.get("http://localhost:8080/customers/"+id)
     return res.data
}

export async function getListCustomers(page,name,email,nationality){

     const res= await axios.get(`http://localhost:8080/customers/list?page=${page}&&name=${name}&&email=${email}&&nationality=${nationality}`)
         return res.data;


 }

 // export async function getListSearchCustomers(page,name,email,nationality){

 //         const res= await axios.get(`http://localhost:8080/customers/search?page=${page}&&name=${name}&&email=${email}&&nationality=${nationality}`)
 //         return res.data;
 // }
 export async function deleteCustomers(id){
    await axios.put(`http://localhost:8080/customers/delete/${id}`)
 }

 export async function getCustomerByEmail(email) {
    const res = await axios.get("http://localhost:8080/customers/login/" + email);
    return res.data;
 }