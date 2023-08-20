import axios from "axios";

export const searchCurrentAPI = async (timeCurrent) => {
    const token = localStorage.getItem('token');
    try {
        return (await axios.get("http://localhost:8080/api/admin/report/current-revenue?timeRange=" + timeCurrent, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }))
    } catch (e) {
        console.log(e)
        return null;
    }
};

export const searchPreviousAPI = async (timePrevious) => {
    const token = localStorage.getItem('token');
    try {
        return (await axios.get("http://localhost:8080/api/admin/report/previous-revenue?timeRange=" + timePrevious, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }))
    } catch (e) {
        console.log(e)
        return null;
    }
};

export const searchAboutAPI = async (startDate, endDate) => {
    const token = localStorage.getItem('token');
    try {
        return (await axios.get("http://localhost:8080/api/admin/report/about-revenue?startDate=" + startDate + "&endDate=" + endDate,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }))
    } catch (e) {
        console.log(e)
        return null;
    }
};

export const searchAbout1API = async (startDate1, endDate1) => {
    const token = localStorage.getItem('token');
    try {
        return (await axios.get("http://localhost:8080/api/admin/report/about-revenue?startDate=" + startDate1 + "&endDate=" + endDate1,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }))
    } catch (e) {
        console.log(e)
        return null;
    }
};
