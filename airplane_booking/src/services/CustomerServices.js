import axios from "axios";

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
