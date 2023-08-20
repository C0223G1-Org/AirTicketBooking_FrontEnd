import React from 'react';
import { utils, writeFile, WorkBook } from 'xlsx';

const ExportExcelButton = ({ dataTimeCurrent, dataTimePrevious, dataTimeAbout, dataTimeAbout1, fileName }) => {
    const exportToExcel = () => {
        // Tạo một workbook mới (file Excel)
        const workbook: WorkBook = utils.book_new();

        if (dataTimeCurrent && dataTimePrevious) {
            // Lựa chọn các trường bạn muốn từ dataTimeCurrent và dataTimePrevious, và đánh dấu chúng
            const selectedData1 = dataTimeCurrent.map(item => ({
                "Khoảng thời gian": item.title,
                "Thời gian": item.dateBooking,
                "Doanh Thu": item.priceTicket,
                // Thêm các trường khác mà bạn muốn xuất
            }));
            const selectedData2 = dataTimePrevious.map(item => ({
                "Khoảng thời gian": item.title,
                "Thời gian": item.dateBooking,
                "Doanh Thu": item.priceTicket,
                // Thêm các trường khác mà bạn muốn xuất
            }));

            // Dòng dữ liệu chúng ta muốn xuất thành Excel cho trường hợp 1
            const worksheet1 = utils.json_to_sheet([...selectedData1, ...selectedData2]);
            // Thêm dữ liệu (worksheet) vào workbook với tên sheet là 'Sheet1_Custom'
            utils.book_append_sheet(workbook, worksheet1, 'Sheet1_Custom');
        }

        if (dataTimeAbout && dataTimeAbout1) {
            // Lựa chọn các trường bạn muốn từ dataTimeAbout và dataTimeAbout1
            const selectedData3 = dataTimeAbout.map(item => ({
                "Thời gian": item.dateBooking,
                "Doanh Thu": item.priceTicket,
                // Thêm các trường khác mà bạn muốn xuất
            }));
            const selectedData4 = dataTimeAbout1.map(item => ({
                "Thời gian": item.dateBooking,
                "Doanh Thu": item.priceTicket,
                // Thêm các trường khác mà bạn muốn xuất
            }));

            // Dòng dữ liệu chúng ta muốn xuất thành Excel cho trường hợp 2
            const worksheet2 = utils.json_to_sheet([...selectedData3, ...selectedData4]);
            // Thêm dữ liệu (worksheet) vào workbook với tên sheet là 'Sheet2_Custom'
            utils.book_append_sheet(workbook, worksheet2, 'Sheet2_Custom');
        }

        // Ghi workbook vào file Excel với tên file là "${fileName}.xlsx"
        writeFile(workbook, `${fileName}.xlsx`);
    };

    return (
        <button
            className="btn"
            style={{
                background: "#daa32a",
                width: "100px",
                height: "35px",
                fontSize: "15px",
                marginLeft: "6vw",
                marginTop: "1vh"
            }}
            onClick={exportToExcel}
        >
            In báo cáo
        </button>
    );
};

export default ExportExcelButton;