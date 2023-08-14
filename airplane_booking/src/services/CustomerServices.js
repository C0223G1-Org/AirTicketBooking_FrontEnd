import axios from "axios";

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

