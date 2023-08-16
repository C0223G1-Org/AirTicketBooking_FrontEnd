import axios from "axios";

export const searchCurrentAPI = async (timeCurrent) => {
    try {
        return (await axios.get("http://localhost:8080/api/admin/report/current-revenue?timeRange=" + timeCurrent))
    } catch (e) {
        console.log(e)
        return null;
    }
};

    export const searchPreviousAPI = async (timePrevious) => {
    try {
        return (await axios.get("http://localhost:8080/api/admin/report/previous-revenue?timeRange=" + timePrevious))
    } catch (e) {
        console.log(e)
        return null;
    }
};

export const searchAboutAPI = async (startDate, endDate) => {
    try {
        return (await axios.get("http://localhost:8080/api/admin/report/about-revenue?startDate=" + startDate + "&endDate=" + endDate))
    } catch (e) {
        console.log(e)
        return null;
    }
};

export const searchAbout1API = async (startDate1, endDate1) => {
    try {
        return (await axios.get("http://localhost:8080/api/admin/report/about-revenue?startDate=" + startDate1 + "&endDate=" + endDate1))
    } catch (e) {
        console.log(e)
        return null;
    }
};
