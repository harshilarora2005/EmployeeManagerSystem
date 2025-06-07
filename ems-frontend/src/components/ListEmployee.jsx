import { useState, useEffect } from 'react'
import { Users, Mail, User, Hash, Plus, Search } from 'lucide-react';
import { listEmployees } from '../services/EmployeeService';
import { useNavigate } from 'react-router';
const ListEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    
    useEffect(() => {
        listEmployees()
            .then((response) => {
                setEmployees(response.data);
            }).catch((error) => {
                console.error("Error fetching employee data:", error);
            });
    }, []);

    const navigate = useNavigate();

    function addNewEmployee() {
        navigate('/add-employee/');
    }
    function editEmployee(employee,id) {
        navigate(`/update-employee/${id}`, { state: { employee } });
    }
    const filteredEmployees = employees.filter(employee => 
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container-fluid" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', minHeight: '100vh' }}>
            <div className="container py-5">
                <div className="text-center mb-5">
                    <div className="d-flex align-items-center justify-content-center mb-3">
                        <div className="bg-primary text-white p-3 rounded-circle me-3">
                            <Users size={32} />
                        </div>
                        <h1 className="display-5 fw-bold text-dark mb-0">Our Amazing Team</h1>
                    </div>
                    <p className="lead text-muted">Meet the wonderful people who make it all happen ✨</p>
                </div>
                <div className="row mb-4">
                    <div className="col-md-6">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body d-flex align-items-center">
                                <div className="bg-success text-white p-3 rounded-circle me-3">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <h4 className="fw-bold text-dark mb-1">{employees.length}</h4>
                                    <p className="text-muted mb-0">Total Team Members</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body">
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-0">
                                        <Search size={20} className="text-muted" />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control border-0 bg-light"
                                        placeholder="Search employees..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-end mb-4">
                    <button className="btn btn-success btn-lg shadow-sm"
                    onClick={addNewEmployee}>
                        <Plus size={20} className="me-2" />
                        Add New Employee
                    </button>
                </div>
                <div className="row g-4">
                    {filteredEmployees.length > 0 ? (
                        filteredEmployees.map((employee) => (
                            <div key={employee.id} className="col-lg-4 col-md-6">
                                <div className="card border-0 shadow-sm h-100" style={{ transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}>
                                    <div className="card-body text-center p-4">
                                        <div className="bg-primary bg-gradient text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" 
                                                style={{ width: '80px', height: '80px' }}>
                                            <User size={32} />
                                        </div>
                                        <h5 className="card-title fw-bold text-dark mb-2">
                                            {employee.firstName} {employee.lastName}
                                        </h5>
                                        
                                        <div className="d-flex align-items-center justify-content-center mb-2">
                                            <Mail size={16} className="text-muted me-2" />
                                            <span className="text-muted small">{employee.email}</span>
                                        </div>
                                        
                                        <div className="d-flex align-items-center justify-content-center mb-3">
                                            <Hash size={16} className="text-muted me-2" />
                                            <span className="badge bg-light text-dark">ID: {employee.id}</span>
                                        </div>
                                        <div className="d-flex gap-2 justify-content-center">
                                            <button className="btn btn-outline-primary btn-sm">
                                                <User size={16} className="me-1" />
                                                View
                                            </button>
                                            <button className="btn btn-outline-warning btn-sm"
                                            onClick={() => editEmployee(employee,employee.id)}>
                                                Edit
                                            </button>
                                            <button className="btn btn-outline-danger btn-sm">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body text-center py-5">
                                    <Users size={48} className="text-muted mb-3" />
                                    <h5 className="text-muted">No employees found</h5>
                                    <p className="text-muted">
                                        {searchTerm ? 'Try adjusting your search terms' : 'Start by adding your first employee!'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="text-center mt-5">
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h5 className="mb-0 d-flex align-items-center justify-content-center">
                                <Users className="me-2" size={20} />
                                Employee Directory
                            </h5>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th className="text-center">
                                                <Hash size={16} className="me-1" />
                                                ID
                                            </th>
                                            <th>
                                                <User size={16} className="me-1" />
                                                First Name
                                            </th>
                                            <th>
                                                <User size={16} className="me-1" />
                                                Last Name
                                            </th>
                                            <th>
                                                <Mail size={16} className="me-1" />
                                                Email
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredEmployees.map((employee) => (
                                            <tr key={employee.id}>
                                                <td className="text-center">
                                                    <span className="badge bg-primary">{employee.id}</span>
                                                </td>
                                                <td className="fw-medium">{employee.firstName}</td>
                                                <td className="fw-medium">{employee.lastName}</td>
                                                <td className="text-muted">{employee.email}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListEmployee;