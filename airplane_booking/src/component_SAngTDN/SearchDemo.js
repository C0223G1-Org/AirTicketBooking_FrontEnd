import { useState } from "react";
import { useNavigate } from "react-router-dom";


function SearchDemo(){
    const navigate = useNavigate();
    const [diemDi,setDiemDi] = useState("");
    const [diemDen,setDiemDen] = useState("");
    const [ngayDi,setNgayDi] = useState("");
    const [ngayDen,setNgayDen] = useState("");
    const [loaiVe,setLoaiVe] = useState(0);
    const [nguoiLon,setNguoiLon]= useState(0);
    const [treEm,setTreEm]= useState(0);
    const [emBe,setEmBe]= useState(0);
   

const handleOnClick = ()=>{
    navigate(`/list/${diemDi},${diemDen},${ngayDi},${ngayDen},${loaiVe},${nguoiLon},${treEm},${emBe}`)
}

const handleOnClickChangePass= ()=>{
    navigate("/change-password")
}

// const handleOnClick = ()=>{
//     navigate(`/list/${diemDi}`)
// }

    return(
        <>
        <label>Điểm đi: </label>
        <input type="text" onChange={(e)=>setDiemDi(e.target.value)}></input>
        <label>Ngày đi: </label>
        <input type="date" onChange={(e)=>setNgayDi(e.target.value)}></input>
        <br></br>
        <label>Điểm đến: </label>
        <input type ="text" onChange={(e)=>setDiemDen(e.target.value)}></input>
        <label>Ngày đến: </label>
        <input type="date" onChange={(e)=>setNgayDen(e.target.value)}></input>
        <br></br>
        <label>loại vé</label>
        <input type="number" onChange={(e)=>setLoaiVe(e.target.value)}></input>
        <br></br>
        <input type="number" placeholder="người lớn" onChange={(e)=>setNguoiLon(e.target.value)}></input>
        <input type="number" placeholder="trẻ em" onChange={(e)=>setTreEm(e.target.value)}></input>
        <input type="number" placeholder="em bé" onChange={(e)=>setEmBe(e.target.value)}></input>
        <br></br>
        <button onClick={handleOnClick}>Tìm kiếm</button>
        <button onClick={handleOnClickChangePass}>Đổi mật khẩu</button>

        </>
    )
}
export default SearchDemo;