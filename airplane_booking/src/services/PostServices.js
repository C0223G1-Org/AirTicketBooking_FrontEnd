import axios from "axios";


axios.defaults.baseURL = "http://localhost:8080"
export const createPost=async (post)=>{
    try{
        await axios.post("/api/post",post)
    }catch (err) {
        console.log(err)
    }
}
export const getAllEmployee=async ()=>{
    try {
        const result=await axios.get("http://localhost:8080/api/employee")
        return result.data
    }catch (err) {
        console.log(err)
    }
}
export const updatePost=async (post)=>{
try {
    await axios.patch(`api/post/updatePost`,post)
}catch (e) {
    console.log(e)
}
}


export async function getListPost(page, limit) {
    const res = await axios.get('/api/post/' + page + '/' + limit);
    return res.data;
}
export async function findPostById(id){
    const res = await axios.get('/api/post/findPost/'+id);
    return res.data;
}
export async function deletePost(id){
    await axios.delete('/api/post/delete/'+id);
}
export async function searchPosts(title){
    const res = await axios.get('/api/post/search',{params:{title:title}});
    return res.data;
}
export async function getNewsHot(){
    const res = await axios.get('/api/post/hot-news');
    return res.data;
}