import axios from "axios";

export const createEmployee = async (employee) => {
    try {
        await axios.post(`http://localhost:8080/api/employee`, employee)
    } catch (e) {
        console.log(e)
    }
}

export const updateEmployee = async (employee) => {
    try {
        await axios.patch(`http://localhost:8080/api/employee/${employee.idEmployee}`, employee)
    } catch (e) {

    }
}

export const findById = async (id) => {
    try {
        return (await axios.get(`http://localhost:8080/api/employee/${id}`)).data
    } catch (e) {
        console.log(e)
    }
}

export async function getListEmployee(page, pageSize) {
    const response = await axios.get(`http://localhost:8080/api/employee/${page}/${pageSize}`);
    return response.data;
}

export async function searchEmployee(gender, name, page, size) {
    try {
        const response = await axios.get('http://localhost:8080/api/employee/search', {
            params: {
                gender: gender,
                name: name,
                page: page,
                size: size,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function deleteEmployee(id) {
    const response = await axios.delete(`http://localhost:8080/api/employee/delete/${id}`)
    return response.data;
}

// export async function getEmployeeById(id) {
//     const response = await axios.get(`http://localhost:8080/api/employee/${id}`)
//     return response.data;
// }

export async function getEmployeeByEmail(email) {
    const res = await axios.get("http://localhost:8080/api/employee/login/" + email);
    return res.data;
}