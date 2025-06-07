import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/employeemanager";

export const listEmployees = () => {
    return axios.get(REST_API_BASE_URL + "/getEmployees");
}

export const createEmployee = (employee) => {
    return axios.post(REST_API_BASE_URL + "/createEmployee", employee);
}

export const getEmployeeById = (employeeId) => {
    return axios.get(REST_API_BASE_URL + "/" + employeeId);
}

export const updateEmployee = (employeeId, employee) => {
    return axios.put(REST_API_BASE_URL + "/updateEmployee/" + employeeId, employee);
}

export const deleteEmployee = (employeeId) => {
    return axios.delete(REST_API_BASE_URL + "/deleteEmployee/" + employeeId);
}