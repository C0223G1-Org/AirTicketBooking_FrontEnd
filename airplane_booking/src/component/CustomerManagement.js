import {useState, useEffect} from "react";
import {getListCustomers, deleteCustomers} from "../services/CustomerServices";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import "../css/customer/taipm.css"
import moment from "moment";
// let page=0
export default function CustomerManagement() {

    let [page, setPage] = useState(0)
    let [name, setName] = useState("")
    let [email, setEmail] = useState("")
    let [nationality, setNationality] = useState("")
    const [customers, setCustomers] = useState([])
    const [customer, setCustomer] = useState({})
    const getListCustomer = async (page, name, email, nationality) => {
        const setListCustomer = async () => {
            setCustomers(await getListCustomers(page, name, email, nationality))
        }
        setListCustomer().catch(async (err) => {
            await setEmailFunction("").then(await setNameFunction("")).then(await setNationalityFunction(""))
            Swal.fire({
                icon: 'error',
                title: 'Không tìm thấy khách hàng !',
                showConfirmButton: false,
                timer: 1500
            })
        })
    }
    const detailCustomer = async (customer) => {
        setCustomer(customer)
    }
    const deleteCustomer = async (item) => {
        Swal.fire({
            title: 'Bạn có muốn xóa khách hàng ' + item.nameCustomer + " ?"
            ,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không',
            reverseButtons: true
        }).then(async (res) => {
            if (res.isConfirmed) {
                try {
                    await deleteCustomers(item.idCustomer)
                    setCustomers(await getListCustomers(page, name, email, nationality))
                    Swal.fire({
                        icon: 'success',
                        title: 'Xóa thành công!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } catch (e) {
                    setPageFunction(0).then(await setNameFunction("")).then(await setNationalityFunction("")).then(await setEmailFunction(""))
                    setCustomers(await getListCustomers(0, "", "", ""))
                    Swal.fire({
                        icon: 'success',
                        title: 'Xóa thành công!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }


            }
        })
    }
    const nextPage = async () => {
        page += 1;
        if (page < customers.totalPages) {
            await setPageFunction(page).then(setCustomers(await getListCustomers(page, name, email, nationality)))
        } else {
            page -= 1
        }
    }
    const previousPage = async () => {
        if (page >= 1) {
            page -= 1
        }
        await setPageFunction(page).then(setCustomers(await getListCustomers(page, name, email, nationality)))
    }
    const searchPage = async () => {
        try {
            let numberPage = document.getElementById("numberPage").value * 1;
            numberPage = numberPage - 1;

            await setPageFunction(numberPage).then(setCustomers(await getListCustomers(numberPage, name, email, nationality)))
            page = numberPage
            document.getElementById("numberPage").value = '';

        } catch (error) {

            await setPageFunction(0).then(setCustomers(await getListCustomers(page, name, email, nationality)))
            document.getElementById("numberPage").value = '';
            Swal.fire({
                icon: "error",
                title: 'Không tìm thấy trang!',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
    const setPageFunction = async (pageAfter) => {
        setPage(pageAfter)
    }
    const setNameFunction = async (name) => {
        setName(name)
    }
    const setEmailFunction = async (email) => {
        setEmail(email)
    }
    const setNationalityFunction = async (nationality) => {
        setNationality(nationality)
    }

    console.log(customers)

    useEffect(() => {
        getListCustomer(page, name, email, nationality);
    }, [])
    const searchDataPageable = async () => {
        try {
            let nationalitySearch = document.getElementById("nationality").value;
            let emailSearch = document.getElementById("email").value;
            let nameSearch = document.getElementById("name").value;
            await setEmailFunction(emailSearch).then(await setNameFunction(nameSearch)).then(await setNationalityFunction(nationalitySearch)).then(await setPageFunction(0))
            await getListCustomer(0, nameSearch, emailSearch, nationalitySearch)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: 'Không tìm thấy dữ liệu!',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
    const onChangeNationalitySearch = (events) => {

    }
    return (
        <div className="background-customer">

            <div className="background-customer">
                <meta charSet="UTF-8"/>
                <title>Quản lí khách hàng</title>

                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
                      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                      crossOrigin="anonymous"/>
                <link rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"/>
                <link rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.4.6/tailwind.min.css"/>

                <div className=" mx-auto px-4 sm:px-8" id="customer">
                    <div style={{textAlign: 'center'}}>
                        <div className="title">
                            <h1 style={{fontSize: '50px'}}>QUẢN LÍ KHÁCH HÀNG</h1>
                        </div>
                        <div className="my-2 flex sm:flex-row flex-col">
                            <div className="flex flex-row mb-1 sm:mb-0">
                                <Link to="/customers/add">
                                    <button className="text-sm  font-semibold py-2 px-4 " style={{
                                        background: 'rgb(223, 165, 18)',
                                        color: '#ffffff',
                                        marginLeft: '2px',
                                        width: '250px'
                                    }}>Thêm mới khách hàng
                                    </button>

                                </Link>
                                <div className="relative">
                                    <select onKeyDown={
                                        async (event) => {
                                            if (event.keyCode == 13) {
                                                await searchDataPageable()
                                            }
                                        }}
                                            id="nationality" defaultValue={""}
                                            className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                        <option value={""}>Quốc tịch &darr;</option>
                                        <option value={"Nhật Bản"}>Nhật Bản</option>
                                        <option value={"Việt Nam"}>Việt Nam</option>
                                        <option value={"Lào"}>Lào</option>
                                    </select>

                                </div>
                            </div>
                            <div className="block relative">
                                <input
                                    onKeyDown={
                                        async (event) => {
                                            if (event.keyCode == 13) {
                                                await searchDataPageable()
                                            }
                                        }}
                                    placeholder="Tìm kiếm theo email" id="email" defaultValue={""}
                                    className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"/>
                            </div>
                            <div className="block relative">
                                <input
                                    onKeyDown={
                                        async (event) => {
                                            if (event.keyCode == 13) {
                                                await searchDataPageable()
                                            }
                                        }}
                                    placeholder="Tìm kiếm theo tên" id="name" defaultValue={""}
                                    className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"/>
                            </div>
                            <button
                                onClick={async () => {
                                    await searchDataPageable()
                                }}
                                className="text-sm  font-semibold py-2 px-4 "
                                style={{background: 'rgb(223, 165, 18)', color: '#ffffff',}}>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>

                        </div>


                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                {
                                    <table className="min-w-full leading-normal myTable">
                                        <thead>
                                        <tr style={{background: 'rgb(6, 133, 170)', color: '#ffffff'}}>
                                            <th className=" col-md-1 py-3     text-x "
                                                style={{textAlign: 'center'}}>
                                                STT
                                            </th>
                                            <th className=" col-md-2 py-3     text-x "
                                                style={{textAlign: 'center', width: '5px'}}>
                                                Họ tên
                                            </th>
                                            <th className=" col-md-2 py-3     text-x  " style={{textAlign: 'center'}}>
                                                Ngày sinh
                                            </th>
                                            <th className=" col-md-1 py-3     text-x " style={{textAlign: 'center'}}>
                                                Giới tính
                                            </th>
                                            <th className="col-md-2 py-3     text-x " style={{textAlign: 'center'}}>
                                                Quốc tịch
                                            </th>
                                            <th className="col-md-2 py-3     text-x  " style={{textAlign: 'center'}}>
                                                Email
                                            </th>
                                            <th className="col-md-2 py-3     text-x  " style={{textAlign: 'center'}}>
                                                Hành động
                                            </th>
                                        </tr>

                                        </thead>
                                        {customers.length != 0 ?
                                            <tbody>
                                            {customers.content.map((item, index) =>
                                                (
                                                    <tr key={`ctm_${index}`} style={{maxWeight: "250px"}}>
                                                        <td className="col-md-1  bg-white "
                                                            style={{textAlign: 'center', weight: "10px"}}>
                                                            <p>{(page * 5) + (index + 1)}</p>

                                                        </td>
                                                        <td className=" col-md-2  py-3   bg-white"
                                                            style={{maxWeight: "250px"}}>
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 w-10 h-10">
                                                                    <img className="w-full h-full rounded-full"
                                                                         src={item.imgCustomer} alt=""/>

                                                                </div>
                                                                <div className=" col-md-10  py-2   bg-white">
                                                                    <p className=" whitespace-no-wrap">
                                                                        {item.nameCustomer}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="col-md-2 px-5 py-3   bg-white ">
                                                            <p className="text-gray-900 whitespace-no-wrap">{moment(`${item.dateCustomer}`).format('DD-MM-YYYY')}</p>
                                                        </td>
                                                        <td className=" col-md-1 px-5 py-3   bg-white ">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {item.genderCustomer == true ? <p>Nam</p> : <p>Nữ</p>}
                                                            </p>
                                                        </td>
                                                        <td className="col-md-2 px-5 py-3   bg-white ">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {item.nationalityCustomer}
                                                            </p>
                                                        </td>
                                                        <td className="col-md-2  py-3   bg-white "
                                                            style={{maxWeight: "250px"}}>
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {item.emailCustomer}

                                                            </p>
                                                        </td>
                                                        <td className="col-md-2  py-3   bg-white ">
                                                            <p className="text-gray-900 whitespace-no-wrap ">
                                                                <span
                                                                    onClick={async () => {
                                                                        await detailCustomer(item)
                                                                    }}
                                                                    className="icon_detail_employee"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#exampleModalDetail">
                                                                    <i className="fa-solid fa-circle-info"></i> </span>

                                                                <Link to={`/customers/edit/${item.idCustomer}`}>
                                                                    <span
                                                                        className="icon_edit_employee"><i
                                                                        className="fa-solid fa-pen-to-square"/></span>
                                                                </Link>
                                                                <a
                                                                    onClick={async () => {

                                                                        await deleteCustomer(item)

                                                                    }}
                                                                    className="icon_delete_employee">
                                                                    <span><i className="fa-solid fa-trash"/></span>
                                                                </a>

                                                            </p>
                                                        </td>
                                                    </tr>
                                                )
                                            )}

                                            </tbody>
                                            :
                                            <tbody>
                                            <tr style={{height: '150px'}}>
                                                <td style={{color: "red", fontSize: '50px',}} colSpan="7">Không có dữ
                                                    liệu
                                                </td>
                                            </tr>
                                            </tbody>
                                        }
                                    </table>
                                }
                                {customers.length != 0 ?
                                    <div
                                        className="px-3 py-1 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">

                                        <div className="inline-flex mt-2 xs:mt-0">


                                            {page != 0 ? <button
                                                onClick={async () => {

                                                    await previousPage()
                                                }}
                                                className="text-sm   py-2 px-3 rounded-l"
                                                style={{background: 'rgb(223, 165, 18)', color: '#ffffff'}}>
                                                Trước
                                            </button> : <button
                                                onClick={async () => {

                                                    await previousPage()
                                                }}
                                                className="text-sm   py-2 px-3 rounded-l"
                                                style={{
                                                    background: 'rgb(223, 165, 18)',
                                                    color: '#ffffff',
                                                    opacity: '0,6',
                                                    cursor: 'not-allowed'
                                                }}>
                                                Trước
                                            </button>}

                                            <button className="text-sm   py-2 px-3 rounded-l" style={{
                                                background: 'rgb(223, 165, 18)',
                                                color: '#ffffff',
                                                marginLeft: '5px'
                                            }}>
                                                {page + 1}/{customers.totalPages}
                                            </button>

                                            {page != customers.totalPages - 1 ?
                                                <button onClick={async () => {

                                                    await nextPage();
                                                }} className="text-sm   py-2 px-3 rounded-l" style={{
                                                    background: 'rgb(223, 165, 18)',
                                                    color: '#ffffff',
                                                    marginLeft: '5px'
                                                }}>
                                                    Sau
                                                </button>
                                                : <button onClick={async () => {

                                                    await nextPage();
                                                }} className="text-sm   py-2 px-3 rounded-l" style={{
                                                    background: 'rgb(223, 165, 18)',
                                                    color: '#ffffff',
                                                    marginLeft: '5px', opacity: '0,6', cursor: 'not-allowed'
                                                }}>
                                                    Sau
                                                </button>}
                                            <div className="   py-2 px-3 rounded-l" style={{
                                                background: 'rgb(223, 165, 18)',
                                                color: 'black',
                                                marginLeft: '5px',
                                                borderRadius: '5px'
                                            }}>
                                                <input id="numberPage" type="number"
                                                       style={{width: '50px', borderRadius: '5px'}}
                                                       onKeyDown={async (event) => {
                                                           if (event.keyCode == 13) {
                                                               await searchPage()
                                                           }
                                                       }}/>
                                                <button className=""
                                                        onClick={async () => {
                                                            await searchPage()
                                                        }}
                                                        style={{marginLeft: '10px', bodeRadius: '5px', color: 'white'}}>
                                                    <i
                                                        className="fa-solid fa-magnifying-glass"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    : ""}
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            <div id="details">
                <div className="modal fade" id="exampleModalDetail" tabIndex={-1} aria-labelledby="exampleModalLabel1"
                     aria-hidden="true">
                    <div className="modal-dialog modal-fullscreen-md-down ">
                        <div className="modal-content">
                            <div className="modal-header " style={{justifyContent: "center", alignItems: "center"}}>
                                <h3 style={{fontSize: "20px"}} className="modal-title" id="exampleModalLabel1">CHI TIẾT
                                    KHÁCH HÀNG</h3>
                                {/* <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button> */}
                            </div>
                            <div className="modal-body" style={{padding: 0}}>
                                <div className="row container-fluid   ">

                                    <div className=" card_content ">
                                        <div className="wai"><img id="zhaopian" src={customer.imgCustomer}/></div>
                                        <div className="tai">
                                            <p><span className="biaoqing"><i class="fa-solid fa-user"></i>   Họ và tên:</span> {customer.nameCustomer}
                                            </p>
                                            <p><span className="biaoqing"><i class="fa-solid fa-calendar-days"></i> Năm sinh:</span> {moment(`${customer.dateCustomer}`).format('DD-MM-YYYY')}
                                            </p>
                                            <p><span className="biaoqing">{customer.genderCustomer ?
                                                <i class="fa-solid fa-mars"></i> :
                                                <i class="fa-solid fa-venus"></i>} Giới tính:</span> {customer.genderCustomer ?
                                                <span>Nam</span> : <span>Nữ</span>}</p>
                                            <p><span className="biaoqing"><i class="fa-solid fa-earth-americas"></i>    Quốc gia:</span>
                                                <span>{customer.nationalityCustomer}</span></p>
                                            <p><span className="biaoqing"><i
                                                class="fa-solid fa-envelope"></i>  Email:</span> {customer.emailCustomer}
                                            </p>
                                            <p><span className="biaoqing"><i class="fa-solid fa-phone"></i> Số điện thoại:</span> {customer.telCustomer}
                                            </p>
                                            <p><span className="biaoqing"><i class="fa-solid fa-location-dot"></i>  Địa chỉ:</span> {customer.addressCustomer}
                                            </p>
                                            <p><span className="biaoqing"><i class="fa-solid fa-address-card"></i>   CCCD/Passport:</span> {customer.idCardCustomer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row card_text mt-3 container-fluid text-justify">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

