import { useState, useEffect} from 'react'
import { User, Mail, Save, ArrowLeft, Edit, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate, useLocation,useParams } from 'react-router';
import { updateEmployee } from '../services/EmployeeService';
import { getEmployeeById } from '../services/EmployeeService';
const UpdateEmployee = () => {
    const { id } = useParams(); 
    const location = useLocation();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: ''
    });
    const [employeeData, setEmployeeData] = useState(null);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        
        if (location.state && location.state.employee) {
            const empData = location.state.employee;
            setEmployeeData(empData);
            setEmployee({
                firstName: empData.firstName,
                lastName: empData.lastName,
                email: empData.email
            });
        } else {
            const fetchEmployeeData = async () => {
            try{
                const response = await getEmployeeById(id);
                const empData = response.data;
                setEmployeeData(empData);
                setEmployee({
                    firstName: empData.firstName,
                    lastName: empData.lastName,
                    email: empData.email
                });
            }catch (error) {
                console.error('Error fetching employee data:', error);
                setErrors({ submit: 'Failed to fetch employee data. Please try again.' });
            }
        } 
        fetchEmployeeData();
        }
    }, [id, location.state]);

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!employee.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }
        
        if (!employee.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }
        
        if (!employee.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employee.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        console.log("Validation errors:", newErrors);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        console.log("Submitting form with employee data:", employee);
        console.log("is validating form", validateForm());
        if (!validateForm()) {
            return;
        }
        console.log("Form is valid, proceeding with update");
        setIsLoading(true);
        
        try {
            const employeeToUpdate = {
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email
            };
            console.log("Updating employee:", employeeData.id, employeeToUpdate);
            await updateEmployee(id, employeeToUpdate);
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                navigate('/employees');
            }, 2000);
            
        } catch (error) {
            console.error('Error updating employee:', error);
            setErrors({ submit: 'Failed to update employee. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const goBack = () => {
        navigate('/employees');
    };
    if (!employeeData) {
        return (
            <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', minHeight: '100vh' }}>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-xl-6">
                        {/* Header */}
                        <div className="text-center mb-5">
                            <div className="d-flex align-items-center justify-content-center mb-3">
                                <div className="bg-warning text-white p-3 rounded-circle me-3">
                                    <Edit size={32} />
                                </div>
                                <h1 className="display-5 fw-bold text-dark mb-0">Update Employee</h1>
                            </div>
                            <p className="lead text-muted">
                                Updating details for <strong>{employeeData.firstName} {employeeData.lastName}</strong> ✏️
                            </p>
                        </div>

                        {/* Success Alert */}
                        {showSuccess && (
                            <div className="alert alert-success border-0 shadow-sm mb-4" role="alert">
                                <div className="d-flex align-items-center">
                                    <CheckCircle size={20} className="me-2" />
                                    <strong>Success!</strong> Employee has been updated successfully! Redirecting...
                                </div>
                            </div>
                        )}

                        {/* Error Alert */}
                        {errors.submit && (
                            <div className="alert alert-danger border-0 shadow-sm mb-4" role="alert">
                                <div className="d-flex align-items-center">
                                    <AlertCircle size={20} className="me-2" />
                                    <strong>Error!</strong> {errors.submit}
                                </div>
                            </div>
                        )}

                        {/* Current Employee Info Card */}
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-auto">
                                        <div className="bg-info text-white rounded-circle d-flex align-items-center justify-content-center" 
                                            style={{ width: '50px', height: '50px' }}>
                                            <User size={20} />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <h6 className="mb-1 fw-bold">Currently Editing</h6>
                                        <div className="text-muted small">
                                            <span className="badge bg-light text-dark me-2">ID: {employee.id}</span>
                                            {employeeData.firstName} {employeeData.lastName} - {employeeData.email}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Card */}
                        <div className="card border-0 shadow-lg">
                            <div className="card-header bg-warning text-white">
                                <h5 className="mb-0 d-flex align-items-center">
                                    <Edit className="me-2" size={20} />
                                    Update Employee Information
                                </h5>
                            </div>
                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit}>
                                    {/* First Name */}
                                    <div className="mb-3">
                                        <label htmlFor="firstName" className="form-label fw-medium">
                                            <User size={16} className="me-2" />
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control form-control-lg ${errors.firstName ? 'is-invalid' : ''}`}
                                            id="firstName"
                                            name="firstName"
                                            value={employee.firstName}
                                            onChange={handleInputChange}
                                            placeholder="Enter first name"
                                        />
                                        {errors.firstName && (
                                            <div className="invalid-feedback">
                                                {errors.firstName}
                                            </div>
                                        )}
                                    </div>

                                    {/* Last Name */}
                                    <div className="mb-3">
                                        <label htmlFor="lastName" className="form-label fw-medium">
                                            <User size={16} className="me-2" />
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control form-control-lg ${errors.lastName ? 'is-invalid' : ''}`}
                                            id="lastName"
                                            name="lastName"
                                            value={employee.lastName}
                                            onChange={handleInputChange}
                                            placeholder="Enter last name"
                                        />
                                        {errors.lastName && (
                                            <div className="invalid-feedback">
                                                {errors.lastName}
                                            </div>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div className="mb-4">
                                        <label htmlFor="email" className="form-label fw-medium">
                                            <Mail size={16} className="me-2" />
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                                            id="email"
                                            name="email"
                                            value={employee.email}
                                            onChange={handleInputChange}
                                            placeholder="Enter email address"
                                        />
                                        {errors.email && (
                                            <div className="invalid-feedback">
                                                {errors.email}
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="d-flex gap-3 justify-content-end">
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary btn-lg"
                                            onClick={goBack}
                                            disabled={isLoading}
                                        >
                                            <ArrowLeft size={20} className="me-2" />
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-warning btn-lg text-white"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Updating...
                                                </>
                                            ) : (
                                                <>
                                                    <Save size={20} className="me-2" 
                                                    onClick={handleSubmit}/>
                                                    Update Employee
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="card border-0 shadow-sm mt-4">
                            <div className="card-body text-center py-3">
                                <small className="text-muted">
                                    <Edit size={16} className="me-1" />
                                    Changes will be saved immediately after clicking Update Employee
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateEmployee;