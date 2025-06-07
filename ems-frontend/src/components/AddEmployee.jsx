import { useState } from 'react'
import { User, Mail, Save, ArrowLeft, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router';
import { createEmployee } from '../services/EmployeeService';

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    
    const navigate = useNavigate();

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
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsLoading(true);
        
        try {
            await createEmployee(employee);
            setShowSuccess(true);
            setEmployee({
                firstName: '',
                lastName: '',
                email: ''
            });
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
            
        } catch (error) {
            console.error('Error creating employee:', error);
            setErrors({ submit: 'Failed to create employee. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const goBack = () => {
        navigate('/employees');
    };

    return (
        <div className="container-fluid" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', minHeight: '100vh' }}>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-xl-6">
                        <div className="text-center mb-5">
                            <div className="d-flex align-items-center justify-content-center mb-3">
                                <div className="bg-success text-white p-3 rounded-circle me-3">
                                    <UserPlus size={32} />
                                </div>
                                <h1 className="display-5 fw-bold text-dark mb-0">Add New Employee</h1>
                            </div>
                            <p className="lead text-muted">Welcome a new team member to the family! 🎉</p>
                        </div>
                        {showSuccess && (
                            <div className="alert alert-success border-0 shadow-sm mb-4" role="alert">
                                <div className="d-flex align-items-center">
                                    <CheckCircle size={20} className="me-2" />
                                    <strong>Success!</strong> Employee has been added successfully!
                                </div>
                            </div>
                        )}
                        {errors.submit && (
                            <div className="alert alert-danger border-0 shadow-sm mb-4" role="alert">
                                <div className="d-flex align-items-center">
                                    <AlertCircle size={20} className="me-2" />
                                    <strong>Error!</strong> {errors.submit}
                                </div>
                            </div>
                        )}
                        <div className="card border-0 shadow-lg">
                            <div className="card-header bg-success text-white">
                                <h5 className="mb-0 d-flex align-items-center">
                                    <UserPlus className="me-2" size={20} />
                                    Employee Information
                                </h5>
                            </div>
                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit}>
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
                                    <div className="d-flex gap-3 justify-content-end">
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary btn-lg"
                                            onClick={goBack}
                                            disabled={isLoading}
                                        >
                                            <ArrowLeft size={20} className="me-2" />
                                            Back to List
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-success btn-lg"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Adding...
                                                </>
                                            ) : (
                                                <>
                                                    <Save size={20} className="me-2" />
                                                    Add Employee
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
                                    <User size={16} className="me-1" />
                                    All fields are required to create a new employee record
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEmployee;