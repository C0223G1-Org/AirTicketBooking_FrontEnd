import React, {useEffect, useState} from "react";
import {getListEmployee, searchEmployee, deleteEmployee} from "../../services/EmployeeServices";
import Swal from "sweetalert2";
import '../../component/Employee/employeeEdit.css';
import {Link} from "react-router-dom";


/**
 * Create by: HuyHD
 * @returns {JSX.Element}
 * @constructor
 */
function EmployeeList() {
    const [employeeList, setEmployeeList] = useState([]);
    const [gender, setGender] = useState(null);
    const [name, setName] = useState('');
    const [flag, setFlag] = useState(true);
    const [allSearchResults, setAllSearchResults] = useState([]);
    const [currentSearchPage, setCurrentSearchPage] = useState(0);


    const [searchPage, setSearchPage] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [showLastPageButton, setShowLastPageButton] = useState(false);


    const getEmployees = async (page, pageSize) => {
        if (allSearchResults.length > 0 && page === currentSearchPage) {
            const startIndex = page * pageSize;
            const endIndex = startIndex + pageSize;
            const currentPageResults = allSearchResults.slice(startIndex, endIndex);

            setEmployeeList(currentPageResults);
            setShowLastPageButton(page < totalPages - 1);
            setCurrentPage(page);
        } else {
            const data = await getListEmployee(page, pageSize);
            setEmployeeList(data.content);
            setTotalPages(data.totalPages);
            setShowLastPageButton(page < data.totalPages - 1);
            setCurrentPage(page);
        }
    };


    // const getEmployee = async (id) => {
    //     try {
    //         const data = await getEmployeeById(id)
    //         console.log(data);
    //         setEmployeeDetail(data)
    //     } catch {
    //         alert("a")
    //     }
    // }

    const handleSearch = async () => {
        const results = await searchEmployee(gender, name, currentPage, 5);
        if (results.content == undefined) {
            await Swal.fire({
                text: 'Không tìm thấy nhân viên với thông tin này!',
                confirmButtonText: 'Xác nhận',
                reverseButtons: true
            });
            setName("");
            setGender("");
            return
        }
        setEmployeeList(results.content)
         // Lưu trữ kết quả tìm kiếm
        setAllSearchResults((prevResults) => [...prevResults, ...results.content]);
        setTotalPages(results.totalPages);
        setCurrentPage(0);
        setName("");
        setGender("");
    };

    const handleDeleteEmployee = async (id, name) => {
        console.log(id);
        console.log(name);
        Swal.fire({
                title: 'Bạn muốn xoá nhân viên ' + name + ' có mã nhân viên là ' + id + ' không?',
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
        if (allSearchResults.length > 0 && page === currentSearchPage) {
            setShowLastPageButton(page < totalPages - 1);
            setCurrentPage(page);
        } else {
            setCurrentSearchPage(page);
            await getEmployees(page, 5);
        }
    };

    useEffect(() => {
        getEmployees(currentPage, 5);

    }, [currentPage]);

    const handleSearchPage = () => {

        const pageNumber = parseInt(searchPage, 10);
        if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= totalPages) {
            handlePageChange(pageNumber - 1);

        } else {
            Swal.fire({
                    text: 'Trang không tồn tại!',
                    confirmButtonText: 'Xác nhận',
                    reverseButtons: true
                }
            )
        }
        setSearchPage('');
    };

    console.log(employeeList)

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    const handleKeyEnterPage = (e) => {
        if (e.key === 'Enter') {
            handleSearchPage();
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
                                <Link to="/employee/create" className="btn font-semibold form_button_employee "
                                      style={{marginLeft: '100px'}}>
                                    <i className="fa-solid fa-plus"/> <span>Thêm mới nhân viên</span></Link>
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
                                       onChange={(e) => setName(e.target.value)}
                                       onKeyPress={handleKeyPress}
                                />
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
                                        <td className="col px-4 py-3 border-b border-gray-200 bg-white text-sm">{(currentPage * 5) + index + 1}</td>
                                        <td className="col flex py-3 border-b border-gray-200 bg-white text-sm">
                                            <img className="image_employee"
                                                 src={e.image} alt=""/>
                                            <span className="py-3">{e.nameEmployee}</span></td>
                                        <td className="col py-3 border-b border-gray-200 bg-white text-sm">{e.gender ? "Nam" : "Nữ"}</td>
                                        <td className="col py-3 border-b border-gray-200 bg-white text-sm">{e.emailEmployee}</td>
                                        <td className="col py-3 border-b border-gray-200 bg-white text-sm">{new Date(e.dateEmployee).toLocaleDateString("en-GB")}</td>
                                        <td className="col py-3 border-b border-gray-200 bg-white text-sm">{e.telEmployee}</td>
                                        <td className="col py-3 border-b border-gray-200 bg-white text-sm">
                                            {/*<a href="#" type="button" data-bs-toggle="modal" data-bs-target="#detailModal" title="Chi tiết"*/}
                                            {/*onClick={()=> getEmployee(e.idEmployee)}>*/}
                                            {/*    <i className="fa-solid fa-circle-info icon_detail_employee" />*/}
                                            {/*</a>*/}
                                            <Link to={`/employee/update/${e.idEmployee}`} title="Sửa"><i
                                                className="fa-solid fa-pen-to-square icon_edit_employee"/></Link>
                                            <a type="button" title="Xóa"
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
                                        className="style_button_page text-sm font-semibold py-2 px-4 rounded-l"
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
                                                    page === currentPage ? 'bg-gray-500 text-black' : 'bg-yellow-600 text-white'
                                                } rounded`}
                                                style={{marginRight: '10px'}}
                                                onClick={() => handlePageChange(page)}
                                            >
                                                {page + 1}
                                            </button>
                                        ))}

                                    {totalPages > 3 && (
                                        <div className="style_button_page text-sm font-semibold py-2 px-2 rounded">
                                            <input
                                                className="style_button_search_page"
                                                type="number"
                                                value={searchPage}
                                                onChange={(e) => setSearchPage(e.target.value)}
                                                onKeyPress={handleKeyEnterPage}
                                            />
                                            <button onClick={handleSearchPage}>
                                                <i className="fa-solid fa-magnifying-glass"/>
                                            </button>
                                        </div>
                                    )}

                                    {currentPage !== totalPages - 1 && (
                                        <button
                                            className="text-sm font-semibold py-2 px-4 rounded-r"
                                            style={{
                                                background: 'rgb(223, 165, 18)',
                                                color: '#ffffff',
                                                marginRight: '10px'
                                            }}
                                            disabled={currentPage === totalPages - 1}
                                            onClick={() => handlePageChange(currentPage + 1)}
                                        >
                                            Sau
                                        </button>
                                    )}

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
            </div>
        </>
    );
}

export default EmployeeList;