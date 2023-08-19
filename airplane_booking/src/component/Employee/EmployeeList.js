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
        if (allSearchResults.length > 0) {
            const startIndex = page * pageSize;
            const endIndex = startIndex + pageSize;
            const currentPageResults = allSearchResults.slice(startIndex, endIndex);


            setEmployeeList(currentPageResults);
            setShowLastPageButton(page < totalPages - 1);
            setCurrentPage(page);
            console.log("aaaa" + totalPages)
        } else {
            const data = await getListEmployee(page, pageSize);
            setEmployeeList(data.content);
            setTotalPages(data.totalPages);
            setShowLastPageButton(page < data.totalPages - 1);
            setCurrentPage(page);
        }
    };


    const handleSearch = async () => {
        if (currentPage !== 1 || currentSearchPage !== 1) {
            setCurrentPage(0);
            const results = await searchEmployee(gender, name, 0, 5);


            console.log(results)
            let allResults = results.content || [];

            let totalPages = results.totalPages || 0;
            let nextPage = currentPage + 1;

            while (nextPage < totalPages) {
                const additionalResults = await searchEmployee(gender, name, nextPage, 5);
                allResults = [...allResults, ...(additionalResults.content || [])];
                nextPage++;
            }
            if (results.content == undefined) {
                await Swal.fire({
                    text: 'Không tìm thấy nhân viên với thông tin này!',
                    confirmButtonText: 'Xác nhận',
                    reverseButtons: true,
                    customClass: {
                        confirmButton: 'custom-confirm-button-employee',
                    }
                });
                setName("");
                setGender("");
                return
            }
            setEmployeeList(results.content);
            setAllSearchResults(allResults);
            setTotalPages(results.totalPages);
            setCurrentSearchPage(results.totalPages)
            setCurrentPage(0);
            setName("");
            setGender("");
        }
    };

    const handleDeleteEmployee = async (id, name) => {
        console.log(id);
        console.log(name);
        Swal.fire({
                title: 'Bạn muốn xoá nhân viên ' + name + ' không?',
                html: '<p style = " color: red">Bạn sẽ không thể hoàn tác hành động này!</p>',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Xác nhận ',
                cancelButtonText: 'Huỷ',
                reverseButtons: true,
                customClass: {
                    confirmButton: 'custom-confirm-button-employee',
                }
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
                            timer: 1500,

                        })
                    })
                });
            } else if (res.dismiss === Swal.DismissReason.cancel) {
            }
        })
    }


    // Hàm xử lý khi người dùng chuyển trang
    const handlePageChange = async (page) => {
        console.log("bbbb" + currentSearchPage)
        if (allSearchResults.length > 0) {
            setShowLastPageButton(page < totalPages - 1);
            setTotalPages(currentSearchPage);
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
                    reverseButtons: true,
                    customClass: {
                        confirmButton: 'custom-confirm-button-employee',
                    }
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
    function formatDate(date) {
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const year = d.getFullYear().toString();
        return `${day}-${month}-${year}`;
    }
    function formatPhoneNumber(phoneNumber) {
        const formattedPhoneNumber = phoneNumber.slice(0, 4) + '-' + phoneNumber.slice(4, 7) + '-' + phoneNumber.slice(7);
        return formattedPhoneNumber;
    }
    return (
        <>
            <div>
                <meta charSet="UTF-8"/>
                <title>Quản lí nhân viên</title>


                <link rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.4.6/tailwind.min.css"/>
                <div className="container mx-auto  sm:px-8">
                    <div style={{textAlign: 'center', marginTop: '20px', background: '#166987'}}>
                        <p style={{fontSize: '50px', color: 'white'}}>DANH SÁCH NHÂN VIÊN</p>
                    </div>
                    <div className="my-2 flex sm:flex-row flex-col">
                        <div className="col-ms col-4 ">
                            <div className="col-ms col ">
                                <Link to="/employee/create" className="btn   font-semibold form_button_employee "
                                      style={{marginLeft: ''}}>
                                    <i className="fa-solid fa-plus "/> <span className="h5">Thêm mới nhân viên</span></Link>
                            </div>
                        </div>
                        <div className=" col-ms col-8 mt-2">
                            <div className="ml-10 col-md-4 inline-flex justify-end" style={{position:'relative'}}>
                                <span className="search_gender_employee">Giới tính:</span>
                                <select className="mt-1 h6" style={{border:'1px solid black'}}
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}>
                                    <option value="">Tất Cả</option>
                                    <option value="true">Nam</option>
                                    <option value="false">Nữ</option>
                                </select>
                            </div>
                            <div className="col-md-7 inline-flex " >
                                <label className="col-3 items-end search_name_employee justify-end text-#166987"><b>Họ và tên:</b></label>
                                <div className="col-8 inline-flex">
                                <input className=" form-control h-10 " type="search" placeholder="Tìm kiếm"
                                       aria-label="Search" value={name}
                                       onChange={(e) => setName(e.target.value)}
                                       onKeyPress={handleKeyPress}
                                />
                                <button className="btn1 search_button_employee  h-10 " type="submit" onClick={handleSearch}>
                                    <i className="fa-solid fa-magnifying-glass "/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 pt-1 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg ">

                            <table className="container">
                                <thead>
                                <tr className="table_header_employee">
                                    <th className="col-1 px-5 border-b-2 text-left text-xs uppercase tracking-wider">
                                        STT
                                    </th>
                                    <th className="col-2 border-b-2 text-left text-xs uppercase tracking-wider">
                                        Họ Tên
                                    </th>
                                    <th className="col-1 border-b-2 text-left text-xs uppercase tracking-wider">
                                        Giới tính
                                    </th>
                                    <th className="col-2 py-3 border-b-2 text-left text-xs uppercase tracking-wider">
                                        Tài khoản
                                    </th>
                                    <th className="col-1 py-2 border-b-2 text-left text-xs uppercase tracking-wider">
                                        Ngày sinh
                                    </th>
                                    <th className="col-1 border-b-2 text-left text-xs uppercase tracking-wider">
                                        Số điện thoại
                                    </th>
                                    <th className="col-1 border-b-2 text-left text-xs uppercase tracking-wider">
                                        Thao tác
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {employeeList.map((e, index) => (
                                    <tr key={e.idEmployee}>
                                        <td className=" px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                            {(currentPage * 5) + index + 1}
                                        </td>
                                        <td className="col flex py-3 border-b border-gray-200 bg-white text-sm">
                                            <img className="image_employee" src={e.image} alt="" />
                                            <span className="py-3">{e.nameEmployee}</span>
                                        </td>
                                        <td className=" py-3 border-b border-gray-200 bg-white text-sm">
                                            {e.gender ? "Nam" : "Nữ"}
                                        </td>
                                        <td className=" py-3 border-b border-gray-200 bg-white text-sm">
                                            {e.emailEmployee}
                                        </td>
                                        <td className="py-3 border-b border-gray-200 bg-white text-sm">
                                            {formatDate(e.dateEmployee)}
                                        </td>
                                        <td className="py-3 border-b border-gray-200 bg-white text-sm">
                                            {formatPhoneNumber(e.telEmployee)}
                                        </td>
                                        <td className=" py-3 border-b border-gray-200 bg-white text-sm">
                                            {/*<a href="#" type="button" data-bs-toggle="modal" data-bs-target="#detailModal" title="Chi tiết"*/}
                                            {/*onClick={()=> getEmployee(e.idEmployee)}>*/}
                                            {/*    <i className="fa-solid fa-circle-info icon_detail_employee" />*/}
                                            {/*</a>*/}
                                            <Link to={`/employee/update/${e.idEmployee}`} title="Sửa">
                                                <i className="fa-solid fa-pen-to-square icon_edit_employee" />
                                            </Link>
                                            <a
                                                type="button"
                                                title="Xóa"
                                                onClick={() => {
                                                    handleDeleteEmployee(`${e.idEmployee}`, `${e.nameEmployee}`);
                                                }}
                                            >
                                                <i className="fa-solid fa-trash-can icon_delete_employee" />
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            <div
                                className="px-3 py-1 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                                <div className=" inline-flex mt-2 xs:mt-0">
                                    <button
                                        className="style_button_page text-sm font-semibold py-2 px-4 rounded-l"
                                        disabled={currentPage === 0}
                                        onClick={() => handlePageChange(currentPage - 1)}
                                    >
                                        Trước
                                    </button>

                                    <button
                                        key={currentPage}
                                        className="text-sm font-semibold py-2 px-4 style_button_page  rounded"
                                        style={{ marginRight: '10px' }}
                                        onClick={() => handlePageChange(currentPage)}
                                    >
                                        {currentPage + 1 } / { totalPages}
                                    </button>


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

                                    {/*{showLastPageButton && (*/}
                                    {/*    <button*/}
                                    {/*        className="text-sm font-semibold py-2 px-4 rounded"*/}
                                    {/*        style={{background: 'rgb(223, 165, 18)', color: '#ffffff'}}*/}
                                    {/*        onClick={() => handlePageChange(totalPages - 1)}*/}
                                    {/*    >*/}
                                    {/*        Trang cuối*/}
                                    {/*    </button>*/}
                                    {/*)}*/}
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
                    crossorigin="anonymous"></script>
        </>
    );
}

export default EmployeeList;