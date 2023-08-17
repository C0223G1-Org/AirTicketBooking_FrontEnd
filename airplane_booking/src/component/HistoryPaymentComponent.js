// import React, { useEffect, useState } from "react";
// import { getCustomerById, getListHistoryByCustomerId } from "../services/HistoryPaymentService";
// import { useParams } from "react-router-dom";
// import Swal from "sweetalert2";
//
//
// function HistoryPaymentComponent() {
//   const [payments, setPayments] = useState([]);
//   let [page, setPage] = useState(0)
//
//   // const  param = useParams();
//   // const [customer, setCustomer] = useState({})
//
//   // const getIdCustomer = async () => {
//   //   try {
//   //     const customerData = await getListHistoryByCustomerId();
//
//   //     setCustomer(customerData);
//   //   } catch (error) {
//   //     console.error('Error occurred while getting customer data:', error);
//   //   }
//   // };
//   console.log(payments);
//
//   const showList = async (pageable) => {
//     try {
//       const paymentData = await getListHistoryByCustomerId(pageable);
//       setPayments(paymentData);
//
//     } catch (error) {
//       console.error('Error occurred while getting payment data:', error)
//     }
//   };
//
//
//   useEffect(() => {
//     showList()
//   }, []);
//   const setPageFunction = async (pageAfter) => {
//     setPage(pageAfter)
//   }
//
//   // const paginationList = () => {
//   //   const startIndex = (page - 1) * limit;
//   //   const endIndex = startIndex + limit;
//   //   return payments.slice(startIndex, endIndex);
//   // };
//
//   // const paginatedList = paginationList();
//
//   return (
//     <div>
//       {payments.content &&
//         <div className="container mx-auto px-4 sm:px-8">
//           <div className="py-8">
//             <div>
//               <h2 className="text-2xl font-semibold leading-tight" style={{ textAlign: 'center' }}>LỊCH SỬ GIAO DỊCH</h2>
//             </div>
//             <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
//               <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
//                 <table className="min-w-full leading-normal">
//                   <thead>
//                     <tr style={{ background: 'rgb(6, 133, 170)', color: '#ffffff' }}>
//                       <th className="px-4 py-2 border-b-2   text-left text-xs   uppercase tracking-wider">
//                         Mã vé
//                       </th>
//                       <th className="px-3 py-3 border-b-2   text-left text-xs   uppercase tracking-wider">
//                         Nơi đi
//                       </th>
//                       <th className="px-3 py-3 border-b-2   text-left text-xs   uppercase tracking-wider">
//                         Nơi đến
//                       </th>
//                       <th className="px-3 py-3 border-b-2   text-left text-xs   uppercase tracking-wider">
//                         Ngày đi
//                       </th>
//                       <th className="px-3 py-3 border-b-2   text-left text-xs   uppercase tracking-wider">
//                         Ngày đến
//                       </th>
//                       <th className="px-3 py-3 border-b-2   text-left text-xs   uppercase tracking-wider">
//                         Giờ bay
//                       </th>
//                       <th className="px-3 py-3 border-b-2   text-left text-xs   uppercase tracking-wider">
//                         Giờ đến
//                       </th>
//                       <th className="px-3 py-3 border-b-2   text-left text-xs   uppercase tracking-wider">
//                         Tổng tiền
//                       </th>
//                       <th className="px-3 py-3 border-b-2   text-left text-xs   uppercase tracking-wider">
//                         Ngày đặt vé
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {payments.content.map((item, count) => {
//                       return (
//                         <tr key={item.idTicket}>
//                           <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
//                             <div className="flex items-center">
//                               <div className="ml-3">
//                                 <p className="text-gray-900 whitespace-no-wrap">
//                                   {count}
//                                 </p>
//                               </div>
//                             </div>
//                           </td>
//                           <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
//                             <p className="text-gray-900 whitespace-no-wrap">
//                               {item.seat.route.destination.nameDestination}
//                             </p>
//                           </td>
//                           <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
//                             <p className="text-gray-900 whitespace-no-wrap">
//                               {item.seat.route.departure.nameDeparture}
//                             </p>
//                           </td>
//                           <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
//                             <p className="text-gray-900 whitespace-no-wrap">
//                               {item.seat.route.dateArrival}
//                             </p>
//                           </td>
//                           <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
//                             <p className="text-gray-900 whitespace-no-wrap">
//                               {item.seat.route.dateDeparture}
//                             </p>
//                           </td>
//                           <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
//                             <p className="text-gray-900 whitespace-no-wrap">
//                               {item.seat.route.timeArrival}
//                             </p>
//                           </td>
//                           <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
//                             <p className="text-gray-900 whitespace-no-wrap">
//                               {item.seat.route.timeDeparture}
//                             </p>
//                           </td>
//                           <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
//                             <p className="text-gray-900 whitespace-no-wrap">
//                               {item.priceTicket}
//                             </p>
//                           </td>
//                           <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
//                             <p className="text-gray-900 whitespace-no-wrap">
//                               {item.dateBooking}
//                             </p>
//                           </td>
//                         </tr>
//                       )
//                     })}
//                   </tbody>
//                 </table>
//                 <div className="px-5 py-3 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
//                   <span className="text-xs xs:text-sm text-gray-900">
//
//                   </span>
//                   <div className="inline-flex mt-2 xs:mt-0">
//                     <button className="text-sm  font-semibold py-2 px-4 rounded-l" disabled={page < 1}
//                       onClick={async () => {
//                         if (page >= 1) {
//                           page -= 1
//                         }
//                         await setPageFunction(page).then(await showList(page))
//                       }} style={{ background: 'rgb(223, 165, 18)', color: '#ffffff' }}>
//                       &lt; Trước
//                     </button>
//                     <button className="text-sm font-semibold py-2 px-4" style={{ background: 'rgb(223, 165, 18)', color: '#ffffff', marginLeft: '5px' }}>
//                       {page + 1}/{payments.totalPages}
//                     </button>
//                     <div className="text-sm  font-semibold py-2 px-4 " style={{ background: 'rgb(223, 165, 18)', color: 'black', marginLeft: '5px' }}>
//                       <input id="numberPage" type="number" style={{ width: '50px', border: 'none', borderRadius: '5px', width: '40px' }} pattern="^[0-9]{4}$" />
//                       <button
//                         onClick={async () => {
//
//                           let numberPage = document.getElementById("numberPage").value * 1;
//                           numberPage -= 1;
//                           if (numberPage <= payments.totalPages && numberPage >= 1) {
//                             page = numberPage
//                             await setPageFunction(numberPage).then(await showList(page))
//
//                           } else {
//
//                             Swal.fire({
//                               icon: 'warning',
//                               title: 'Không tìm thấy!',
//                               showConfirmButton: false,
//                               timer: 1500
//                             })
//                           }
//
//
//                         }}
//                         style={{ border: 'none', color: 'white', marginLeft: '7px' }}>Tìm</button>
//                     </div>
//                     <button className="text-sm  font-semibold py-2 px-4 rounded-r" disabled={page === payments.totalPages}
//                       onClick={async () => {
//                         page += 1;
//                         if (page < payments.totalPages) {
//                           await setPageFunction(page).then(await showList(page))
//                         } else {
//                           page -= 1
//                         }
//                       }} style={{ background: 'rgb(223, 165, 18)', color: '#ffffff', marginLeft: '5px' }}>
//                       Sau &gt;
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       }
//     </div>
//
//   )
// }
// export default HistoryPaymentComponent;