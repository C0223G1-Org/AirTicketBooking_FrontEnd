import React, {useEffect, useState} from "react";
import {getListEmployee, searchEmployee, deleteEmployee, getEmployeeById} from "../../services/EmployeeServices";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

export default function EmployeeList() {
    const [employeeList, setEmployeeList] = useState([]);
    const [employeeDetail, setEmployeeDetail] = useState(null);
    const [employeeID, setEmployeeId] = useState(null);
    const [gender, setGender] = useState(null);
    const [name, setName] = useState('');


    const [searchPage, setSearchPage] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [showLastPageButton, setShowLastPageButton] = useState(false);

    const getEmployees = async (page, pageSize) => {
        const data = await getListEmployee(page, pageSize);
        setEmployeeList(data.content);
        setTotalPages(data.totalPages);
        setShowLastPageButton(page < data.totalPages - 1);
    };


    const getEmployee = async (id) => {
        try {
            const data = await getEmployeeById(id)
            console.log(data);
            setEmployeeDetail(data)
        } catch {
            alert("a")
        }
    }
    const handleSearch = async () => {
        try {
            const results = await searchEmployee(gender, name, currentPage, 1);
            setEmployeeList(results.content);
            setTotalPages(results.totalPages);

        } catch (error) {
            Swal.fire({
                    text: 'Không tìm thấy nhân viên với thông tin này!',
                    confirmButtonText: 'Xác nhận',
                    reverseButtons: true
                }
            )
        }
    };

    const handleDeleteEmployee = async (id, name) => {
        console.log(id);
        console.log(name);
        Swal.fire({
                title: 'Bạn muốn xoá nhân viên ' + name + ' có mã nhân viên ' + id + ' không?',
                html: '<p style = " color: red">Bạn sẽ không thể hoàn tác hành động này!</p>',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Xác nhận ',
                cancelButtonText: 'Huỷ',
                reverseButtons: true
            }
        ).then((res) => {
            if (res.isConfirmed) {
                deleteEmployee(id).then(() => {
                    console.log("10101");
                    getEmployees(0, 5).then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Xoá Thành công!!!!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
                });
            } else if (res.dismiss === Swal.DismissReason.cancel) {
            }
        })
    }


    // Hàm xử lý khi người dùng chuyển trang
    const handlePageChange = async (page) => {
        setCurrentPage(page);
        await getEmployees(page, 1);
    };

    useEffect(() => {
        getEmployees(currentPage, 1);

    }, [currentPage,]);

    const handleSearchPage = () => {
        const pageNumber = parseInt(searchPage, 10);
        if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= totalPages) {
            handlePageChange(pageNumber - 1);
        }
    };
    return (
        <>
            <div>
                <div className="container mx-auto px-4 sm:px-8">
                    <div style={{textAlign: 'center', marginBottom: '20px'}}>
                        <h1 className="text-7xl col leading-tight ">DANH SÁCH NHÂN VIÊN</h1>
                    </div>
                    <div className="container my-2 flex sm:flex-row flex-col">
                        <div className="flex col-ms col-4">
                            <div className="col-ms col">
                                <a href="#" className="btn font-semibold form_button_employee "
                                   style={{marginLeft: '10px'}}>
                                    <i className="fa-solid fa-plus"/> <span>Thêm mới nhân viên</span></a>
                            </div>
                        </div>
                        <div className="d-flex col-ms col-8">
                            <span className="search_gender_employee">Giới tính:</span>
                            <select className="search_gender_employee col-2 appearance-none h-full rounded-r border-t sm:rounded-r-none
                             sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 
                             px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}>
                                <option value="">Tất Cả</option>
                                <option value="true">Nam</option>
                                <option value="false">Nữ</option>
                            </select>
                            <div className="col-8 d-flex">
                                <label className="col-2 search_name_employee">Họ và tên:</label>
                                <input className=" form-control me-2" type="search" placeholder="Tìm kiếm"
                                       aria-label="Search" value={name}
                                       onChange={(e) => setName(e.target.value)}/>
                                <button className="btn search_button_employee " type="submit" onClick={handleSearch}>
                                    <i className="fa-solid fa-magnifying-glass"/></button>
                            </div>
                        </div>
                    </div>
                    <div className="container  sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal">
                                <thead>
                                <tr className="table_header_employee">
                                    <th className="col px-4 border-b-2  text-left text-xs   uppercase tracking-wider">
                                        STT
                                    </th>
                                    <th className="col border-b-2   text-left text-xs   uppercase tracking-wider">
                                        Họ Tên
                                    </th>
                                    <th className="col border-b-2   text-left text-xs   uppercase tracking-wider">
                                        Giới tính
                                    </th>
                                    <th className="col py-2 border-b-2   text-left text-xs   uppercase tracking-wider">
                                        Tài khoản
                                    </th>
                                    <th className="col py-2 border-b-2   text-left text-xs   uppercase tracking-wider">
                                        Ngày sinh
                                    </th>
                                    <th className="col border-b-2   text-left text-xs   uppercase tracking-wider">
                                        Số điện thoại
                                    </th>
                                    <th className="col border-b-2   text-left text-xs   uppercase tracking-wider">
                                        Thao tác
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {employeeList.map((e, index) => (
                                    <tr key={e.idEmployee}>
                                        <td class="col px-4 py-3 border-b border-gray-200 bg-white text-sm">{(currentPage) + index + 1}</td>
                                        <td class="col flex py-3 border-b border-gray-200 bg-white text-sm">
                                            <img class="image_employee"
                                                 src={e.image} alt=""/>
                                            <span class="py-3">{e.nameEmployee}</span></td>
                                        <td class="col py-3 border-b border-gray-200 bg-white text-sm">{e.gender ? "Nam" : "Nữ"}</td>
                                        <td class="col py-3 border-b border-gray-200 bg-white text-sm">{e.emailEmployee}</td>
                                        <td class="col py-3 border-b border-gray-200 bg-white text-sm">{e.dateEmployee}</td>
                                        <td class="col py-3 border-b border-gray-200 bg-white text-sm">{e.telEmployee}</td>
                                        <td class="col py-3 border-b border-gray-200 bg-white text-sm">
                                            {/*<a href="#" type="button" data-bs-toggle="modal" data-bs-target="#detailModal" title="Chi tiết"*/}
                                            {/*onClick={()=> getEmployee(e.idEmployee)}>*/}
                                            {/*    <i className="fa-solid fa-circle-info icon_detail_employee" />*/}
                                            {/*</a>*/}
                                            <a href="#" title="Sửa"><i
                                                className="fa-solid fa-pen-to-square icon_edit_employee"/></a>
                                            <a href="#" type="button" title="Xóa"
                                               onClick={() => {
                                                   handleDeleteEmployee(`${e.idEmployee}`, `${e.nameEmployee}`)
                                               }}>
                                                <i className="fa-solid fa-trash-can icon_delete_employee"/>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div
                                className="px-5 py-3 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                                <div className="inline-flex mt-2 xs:mt-0">
                                    <button
                                        className="text-sm font-semibold py-2 px-4 rounded-l"
                                        style={{background: 'rgb(223, 165, 18)', color: '#ffffff', marginRight: '10px'}}
                                        disabled={currentPage === 0}
                                        onClick={() => handlePageChange(currentPage - 1)}
                                    >
                                        Trước
                                    </button>

                                    {Array.from(Array(totalPages).keys())
                                        .slice(0, 3)
                                        .map((page) => (
                                            <button
                                                key={page}
                                                className={`text-sm font-semibold py-2 px-4 ${
                                                    page === currentPage ? 'bg-gray-500 text-white' : 'bg-yellow-600 text-black'
                                                } rounded`}
                                                style={{marginRight: '10px'}}
                                                onClick={() => handlePageChange(page)}
                                            >
                                                {page + 1}
                                            </button>
                                        ))}
                                    <div className="text-sm font-semibold py-2 px-2 rounded"
                                         style={{
                                             background: 'rgb(223, 165, 18)',
                                             color: '#ffffff',
                                             marginRight: '10px'
                                         }}>
                                        <input style={{
                                            width: '35px',
                                            height: '20px',
                                            paddingLeft: '20px',
                                            border: '1px solid black',
                                            marginRight: '5px'
                                        }}
                                               type="text"
                                               value={searchPage}
                                               onChange={(e) => setSearchPage(e.target.value)}
                                        />

                                        <button onClick={handleSearchPage}><i className="fa-solid fa-magnifying-glass"/>
                                        </button>
                                    </div>
                                    <button
                                        className="text-sm font-semibold py-2 px-4 rounded-r"
                                        style={{background: 'rgb(223, 165, 18)', color: '#ffffff', marginRight: '10px'}}
                                        disabled={currentPage === totalPages - 1}
                                        onClick={() => handlePageChange(currentPage + 1)}
                                    >
                                        Sau
                                    </button>
                                    {showLastPageButton && (
                                        <button
                                            className="text-sm font-semibold py-2 px-4 rounded"
                                            style={{background: 'rgb(223, 165, 18)', color: '#ffffff'}}
                                            onClick={() => handlePageChange(totalPages - 1)}
                                        >
                                            Trang cuối
                                        </button>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/*modal detail*/}
                <div className="modal fade" id="detailModal" tabIndex={-1} aria-labelledby="exampleModalLabel5"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header table_header_employee">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">CHI TIẾT NHÂN VIÊN</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                            </div>
                            {employeeDetail && (
                                <div className="modal-body">
                                    <div className="d-flex">
                                        <div className="col-md-4" style={{marginRight: '20px', paddingTop: '10px'}}>
                                            <img
                                                src="https://media.istockphoto.com/id/1322346877/vector/user-avatar-profile-icon.jpg?s=170667a&w=0&k=20&c=vsp2DIGo7MXd48Wjqi8cM4BikpzeAIO4oYZfWI_q1pQ="
                                                className="img-fluid rounded-start" alt="..."/>
                                        </div>
                                        <div className="col-md-8">
                                            <table>
                                                <tbody>

                                                <tr>
                                                    <td><p><b>Nhân viên:</b></p></td>
                                                    <td><p style={{
                                                        color: '#dfa512',
                                                        paddingLeft: '10px',
                                                        fontSize: '20px'
                                                    }}>{employeeDetail.nameEmployee}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><p>Giới tính: </p></td>
                                                    <td style={{paddingLeft: '10px'}}>
                                                        <p>{employeeDetail.gender ? "Nam" : "Nữ"}</p></td>
                                                </tr>
                                                <tr>
                                                    <td><p>Email: </p></td>
                                                    <td style={{paddingLeft: '10px'}}>
                                                        <p>{employeeDetail.emailEmployee}</p></td>
                                                </tr>
                                                <tr>
                                                    <td><p>Ngày sinh: </p></td>
                                                    <td style={{paddingLeft: '10px'}}>
                                                        <p>{employeeDetail.dateEmployee}</p></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="modal-footer">
                                <input type="hidden" name="idDetail" id="idDetail"/>
                                <button type="button" className="btn form_exit_employee" data-bs-dismiss="modal">Thoát
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
