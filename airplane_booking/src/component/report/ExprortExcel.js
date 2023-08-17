import * as XLSX from "xlsx/xlsx.mjs";

class ExprortExcel {
    static getBase64(file) {
        return new Promise((resolve, reject) => {
            const render = new FileReader();
            render.readAsDataURL(file);
            render.onload = () => resolve(render.result);
            render.onerror = error => reject(error);
        })
    }

    static exportExcel(data, nameSheet, nameFile) {
        return new Promise((resolve, reject) => {
            var wb = XLSX.utils.book_new()
            var ws = XLSX.utils.json_to_sheet(data)
            XLSX.utils.book_append_sheet(wb, ws, nameSheet)
            XLSX.writeFile(wb, `${nameFile}.xlsx`)
            resolve('ok')
        })
    }
}

export default ExprortExcel;