import axios from "axios";

export const createEmployee = async (employee) => {
    const token = localStorage.getItem('token');
    try {
        await axios.post(`http://localhost:8080/api/employee`, employee,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
    } catch (e) {
        console.log(e)
    }
}

export const updateEmployee = async (employee) => {
    const token = localStorage.getItem('token');
    try {
        await axios.patch(`http://localhost:8080/api/employee/${employee.idEmployee}`, employee,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
    } catch (e) {
        return null;
    }
}

export const findById = async (id) => {
    const token = localStorage.getItem('token');
    try {
        return (await axios.get(`http://localhost:8080/api/employee/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })).data
    } catch (e) {
        console.log(e)
    }
}

export async function getListEmployee(page, pageSize) {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://localhost:8080/api/employee/${page}/${pageSize}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    return response.data;
}

export async function searchEmployee(gender, name, page, size) {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get('http://localhost:8080/api/employee/search', {
            params: {
                gender: gender,
                name: name,
                page: page,
                size: size,
            },
        },
            {
                header: {
                    Authorization: `Bearer ${token}`,
                }
            });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function deleteEmployee(id) {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`http://localhost:8080/api/employee/delete/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    return response.data;
}

// export async function getEmployeeById(id) {
//     const response = await axios.get(`http://localhost:8080/api/employee/${id}`)
//     return response.data;
// }

export async function getEmployeeByEmail(email) {
    const token = localStorage.getItem('token');
    const res = await axios.get("http://localhost:8080/api/employee/login/" + email,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    return res.data;
}