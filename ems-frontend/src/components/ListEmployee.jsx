import React,{useState,useEffect} from 'react'
import { listEmployees } from '../services/EmployeeService';

const ListEmployee = () => {
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        listEmployees()
            .then((response) => {
                setEmployees(response.data);
            }).catch((error) => {
                console.error("Error fetching employee data:", error);
            });
    }, []);

    return (
        <div className='container mt-5'>
            <h2 className="mb-4">Employee List</h2>
            <table className="table table-striped table-hover table-bordered">
                <thead className="table-dark">
                    <tr>
                        <td>ID</td>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Email</td>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListEmployee
