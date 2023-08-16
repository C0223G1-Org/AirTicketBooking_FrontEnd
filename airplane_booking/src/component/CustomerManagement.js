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
    let [nationality, setNationality] = useState([])
    const [customers, setCustomers] = useState([])
    const getListCustomer = async (page, name, email, nationality) => {
        console.log(name);
        const setListCustomer = async () => {
            setCustomers(await getListCustomers(page, name, email, nationality))
        }
        setListCustomer().catch(async (err) => {
            await setEmailFunction("").then(await setNameFunction("")).then(await setNationalityFunction(""))
            Swal.fire({
                icon: 'error',
                title: 'Không tìm thấy!',
                showConfirmButton: false,
                timer: 1500
            })
        })
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
        <div>

            <div>
                <meta charSet="UTF-8"/>
                <title>Quản lí khách hàng</title>

                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
                      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                      crossOrigin="anonymous"/>
                <link rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"/>
                <link rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.4.6/tailwind.min.css"/>

                <div className="container mx-auto px-4 sm:px-8" id="customer">
                    <div className="py-8" style={{textAlign: 'center'}}>
                        <div className="title">
                            <h1 style={{fontSize: '50px'}}>QUẢN LÍ KHÁCH HÀNG</h1>
                        </div>
                        <div className="my-2 flex sm:flex-row flex-col">
                            <div className="flex flex-row mb-1 sm:mb-0">
                                <div className="relative">
                                    <select onKeyDown={
                                        async (event) => {
                                            if (event.keyCode == 13) {
                                                await searchDataPageable()
                                            }
                                        }}
                                            id="nationality" defaultValue={""}
                                            className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                        <option value={""}>Quốc tịch</option>
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
                            <Link to="/customers/add">
                                <button className="text-sm  font-semibold py-2 px-4 " style={{
                                    background: 'rgb(223, 165, 18)',
                                    color: '#ffffff',
                                    marginLeft: '2px',
                                    width: '250px'
                                }}>Thêm mới khách hàng
                                </button>

                            </Link>
                        </div>


                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                {
                                    <table className="min-w-full leading-normal myTable">
                                        <thead>
                                        <tr style={{background: 'rgb(6, 133, 170)', color: '#ffffff'}}>
                                            <th className=" py-3    text-left text-x "
                                                style={{textAlign: 'center', width: '10px'}}>
                                                STT
                                            </th>
                                            <th className=" py-3    text-left text-x "
                                                style={{textAlign: 'center', width: '5px'}}>
                                                Họ tên
                                            </th>
                                            <th className=" py-3    text-left text-x  " style={{textAlign: 'center'}}>
                                                Ngày sinh
                                            </th>
                                            <th className=" py-3    text-left text-x " style={{textAlign: 'center'}}>
                                                Giới tính
                                            </th>
                                            <th className=" py-3    text-left text-x " style={{textAlign: 'center'}}>
                                                Quốc tịch
                                            </th>
                                            <th className=" py-3    text-left text-x  " style={{textAlign: 'center'}}>
                                                Email
                                            </th>
                                            <th className=" py-3    text-left text-x  " style={{textAlign: 'center'}}>
                                                Hành động
                                            </th>
                                        </tr>

                                        </thead>
                                        {customers.length != 0 ?
                                            <tbody>
                                            {customers.content.map((item, index) =>
                                                (
                                                    <tr key={`ctm_${index}`}>
                                                        <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm"
                                                            style={{textAlign: 'center'}}>
                                                            <div><p>{(page * 5) + (index + 1)}</p></div>
                                                            {}
                                                        </td>
                                                        <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                                            <div className="flex items-center">
                                                                <div className="flex-shrink-0 w-10 h-10">
                                                                    <img className="w-full h-full rounded-full"
                                                                         src={item.imgCustomer} alt=""/>

                                                                </div>
                                                                <div className="ml-3">
                                                                    <p className=" whitespace-no-wrap">
                                                                        {item.nameCustomer}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                                            <p className="text-gray-900 whitespace-no-wrap">{moment(`${item.dateCustomer}`).format('DD-MM-YYYY')}</p>
                                                        </td>
                                                        <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {item.genderCustomer == true ? <p>Nam</p> : <p>Nữ</p>}
                                                            </p>
                                                        </td>
                                                        <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {item.nationalityCustomer}
                                                            </p>
                                                        </td>
                                                        <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {item.emailCustomer}

                                                            </p>
                                                        </td>
                                                        <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                <a
                                                                   onClick={async () => {

                                                                       await deleteCustomer(item)

                                                                   }}>
                                                                    <span style={{
                                                                        fontSize: '20px',
                                                                        marginRight: '10px',
                                                                        color: 'red'
                                                                    }}><i className="fa-solid fa-trash"/></span>
                                                                </a>
                                                                <Link to={`/customers/edit/${item.idCustomer}`}>
                                                                    <span
                                                                        style={{fontSize: '20px', color: '#c5c58f'}}><i
                                                                        className="fa-solid fa-pen-to-square"/></span>
                                                                </Link>

                                                            </p>
                                                        </td>
                                                    </tr>
                                                )
                                            )}

                                            </tbody>
                                            :
                                            <tbody>
                                            <tr style={{height: '150px'}}>
                                                <td style={{color: "red", fontSize: '150px',}} colSpan="7">Không có dữ
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
                                                className="text-sm  font-semibold py-2 px-4 rounded-l"
                                                style={{background: 'rgb(223, 165, 18)', color: '#ffffff'}}>
                                                Trước
                                            </button> : <button
                                                onClick={async () => {

                                                    await previousPage()
                                                }}
                                                className="text-sm  font-semibold py-2 px-4 rounded-l"
                                                style={{background: 'rgb(223, 165, 18)', color: '#ffffff',opacity:'0,6', cursor: 'not-allowed'}}>
                                                Trước
                                            </button>}

                                            <button className="text-sm  font-semibold py-2 px-4 rounded-r" style={{
                                                background: 'rgb(223, 165, 18)',
                                                color: '#ffffff',
                                                marginLeft: '5px'
                                            }}>
                                                {page + 1}/{customers.totalPages}
                                            </button>

                                            {page != customers.totalPages - 1 ?
                                                <button onClick={async () => {

                                                    await nextPage();
                                                }} className="text-sm  font-semibold py-2 px-4 rounded-r" style={{
                                                    background: 'rgb(223, 165, 18)',
                                                    color: '#ffffff',
                                                    marginLeft: '5px'
                                                }}>
                                                    Sau
                                                </button>
                                                : <button onClick={async () => {

                                                    await nextPage();
                                                }} className="text-sm  font-semibold py-2 px-4 rounded-r" style={{
                                                    background: 'rgb(223, 165, 18)',
                                                    color: '#ffffff',
                                                    marginLeft: '5px',opacity:'0,6', cursor: 'not-allowed'
                                                }}>
                                                    Sau
                                                </button>}
                                            <div className="  font-semibold py-2 px-4 " style={{
                                                background: 'rgb(223, 165, 18)',
                                                color: 'black',
                                                marginLeft: '5px',
                                                borderRadius:'5px'
                                            }}>
                                                <input id="numberPage" type="number"
                                                       style={{width: '50px',borderRadius:'5px'}}
                                                       onKeyDown={async (event) => {
                                                           if (event.keyCode == 13) {
                                                               await searchPage()
                                                           }
                                                       }}/>
                                                <button className=""
                                                        onClick={async () => {
                                                            await searchPage()
                                                        }}
                                                        style={{ marginLeft: '10px',bodeRadius:'5px',color:'white'}}>
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


        </div>
    );
}
