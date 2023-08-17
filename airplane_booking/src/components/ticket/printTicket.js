import { useEffect, useRef, useState } from 'react';
import '../../css/ticket/printTicket.css';
// import '@progress/kendo-theme-default/dist/all.css';
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { findTicketById } from '../../services/TicketService';
import { useParams } from 'react-router-dom';


/**
 * create by: VuDT
 * date: 15/08/2023
 * @function: Print Ticket
 * @param: idTicket
 */


function PrintTicket() {

  useEffect(() => {
    getTicket();
  }, []);

  const [ticket, setTicket] = useState(null);

  const param = useParams();
  const getTicket = async () => {
    const data = await findTicketById(param.idTicket);
    setTicket(data);
    console.log("Ticket data:", data);
  };


  const pdfExportComponent = useRef(null);

  const conteneArea = useRef(null);

  const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  };
  const handleExportWithMethod = (event) => {
    savePDF(conteneArea.current, { paperSize: "A4" });
  };
  return (
    <div className='app-content'>
      <PDFExport ref={pdfExportComponent} paperSize="A4">
        <div ref={conteneArea}>
          <div className="ticket">
            <div className="row col-12 print">
              <h1 className="codeGym">VÉ MÁY BAY - CODEGYM AIRLINES</h1>
            </div>
            <div className="info">
              <div className="row">
                <div className="col-3 ">
                  <p className="label">Mã đặt chỗ:</p>
                  <p className="value">{ticket?.idTicket}</p>
                </div>
                <div className="col-3 date">
                  <p className="label">Ngày đặt:</p>
                  <p className="value">{ticket?.dateBooking}</p>
                </div>
                <div className="col-3 ">
                  <p className="label">Danh sách người đi:</p>
                  {ticket?.namePassenger.split(',').map((passenger, index) => (
                    <p className="value" key={index}>
                      {passenger}
                      {index < ticket.namePassenger.split(',').length - 1 && <br />}
                    </p>
                  ))}
                </div>
                <div className="col-3">

                </div>
              </div>

              <div className="row">
                <div className="col-3 ">
                  <p className="label">Nơi đi:</p>
                  <p className="value">{ticket?.seat?.route?.departure?.nameDeparture}</p>
                </div>
                <div className="col-3 ">
                  <p className="label">Nơi đến:</p>
                  <p className="value">{ticket?.seat?.route?.destination?.nameDestination}</p>
                </div>
                <div className="col-3">
                  <p className="label">Ghế:</p>
                  <p className="value">{ticket?.seat?.positionSeat}</p>
                </div>
                <div className="col-3">
                  <p className="label">Khoang hạng:</p>
                  <p className="value">{ticket?.seat?.typeSeat?.nameTypeSeat}</p>
                </div>
              </div>

              <div className="row">
                <div className="col-3">
                  <p className="label">Khởi hành:</p>
                  <p className="value">{ticket?.seat?.route?.timeDeparture}</p>
                </div>
                <div className="col-3">
                  <p className="label">Đến:</p>
                  <p className="value">{ticket?.seat?.route?.timeArrival}</p>
                </div>
                <div className="col-3">
                  <p className="label">Tổng tiền:</p>
                  <p className="value">{ticket?.priceTicket}</p>
                </div>
                <div className="col-3 seat">

                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <p className="label">Điều kiện giá vé:</p>
                  <p className="value">Giá vé đã bao gồm thuế và phí</p>
                  <p className="value">Hành lý xách tay: 7kg</p>
                  <p className="value">Hành lý ký gửi: không quá 20kg và phải trả phí</p>
                  <p className="value">Không được hoàn vé, chỉ được đổi vé trước giờ khởi hành</p>
                </div>
              </div>
            </div>
            <p className="thank-you">Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi!</p>
          </div>
          <div className='button-area'>
            <button primary={true} onClick={handleExportWithComponent}>In Vé  </button>
            {/* <button onClick={handleExportWithMethod}>In vé </button> */}
          </div>
        </div>
      </PDFExport>
    </div>
  );
}

export default PrintTicket;
