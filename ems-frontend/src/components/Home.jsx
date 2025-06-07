import React from 'react';
import { Users, Mail, Eye, PlusCircle, Edit, Trash2, Table, ArrowRight, Settings } from 'lucide-react';

const Home = () => {
    const stats = [
        { label: 'Total Employees', value: '8', icon: Users, color: 'bg-primary' },
        { label: 'Email Contacts', value: '8', icon: Mail, color: 'bg-info' }
    ];

    const quickActions = [
        { title: 'Display Employees', desc: 'View all employees', icon: Eye, color: 'text-primary', link: '/employees' },
        { title: 'Create Employee', desc: 'Add new employee', icon: PlusCircle, color: 'text-success', link: '/add-employee' },
        { title: 'Update Employee', desc: 'Edit employee details', icon: Edit, color: 'text-warning', link: '/employees/update' },
        { title: 'Delete Employee', desc: 'Remove employee', icon: Trash2, color: 'text-danger', link: '/employees/delete' }
    ];

    return (
        <div className="container-fluid" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', minHeight: '100vh' }}>
        <div className="container py-5">
            <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-dark mb-3">
                <Users className="text-primary me-2" size={48} />
                Employee Dashboard
            </h1>
            <p className="lead text-muted">
                Simple employee management made easy
            </p>
            </div>
            <div className="row g-4 mb-5">
            {stats.map((stat, index) => (
                <div key={index} className="col-lg-6 col-md-6">
                <div className="card h-100 shadow-sm border-0">
                    <div className="card-body text-center">
                    <div className={`${stat.color} text-white rounded-circle mx-auto mb-3`} style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <stat.icon size={24} />
                    </div>
                    <h3 className="card-title display-5 fw-bold text-dark">{stat.value}</h3>
                    <p className="card-text text-muted">{stat.label}</p>
                    </div>
                </div>
                </div>
            ))}
            </div>
            <div className="row g-4 mb-5">
            {quickActions.map((action, index) => (
                <div key={index} className="col-lg-3 col-md-6">
                <a href={action.link} className="text-decoration-none">
                    <div className="card h-100 border-2 shadow-sm" style={{ 
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                    }}>
                    <div className="card-body text-center p-4">
                        <div className={`d-inline-flex p-3 rounded-circle mb-3 bg-light ${action.color}`}>
                        <action.icon size={32} />
                        </div>
                        <h5 className="card-title fw-semibold mb-2 text-dark">{action.title}</h5>
                        <p className="card-text text-muted small">{action.desc}</p>
                    </div>
                    </div>
                </a>
                </div>
            ))}
            </div>

            {/* Employee Table Preview */}
            <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white">
                <h5 className="mb-0 d-flex align-items-center">
                <Table className="me-2" size={20} />
                Recent Employees
                </h5>
            </div>
            <div className="card-body p-0">
                <div className="table-responsive">
                <table className="table table-hover mb-0">
                    <thead className="table-light">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john.doe@company.com</td>
                    </tr>
                    <tr>
                        <td>Jane</td>
                        <td>Smith</td>
                        <td>jane.smith@company.com</td>
                    </tr>
                    <tr>
                        <td>Mike</td>
                        <td>Johnson</td>
                        <td>mike.johnson@company.com</td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <div className="card-footer bg-light text-center">
                <a href="/employees" className="btn btn-primary">
                    <ArrowRight className="me-1" size={16} />
                    View All Employees
                </a>
                </div>
            </div>
            </div>
            <div className="text-center mt-5 py-4">
            <p className="text-muted small mb-0 d-flex align-items-center justify-content-center">
                <Settings className="me-1" size={16} />
                Employee Management System
            </p>
            </div>
        </div>
        </div>
    );
};

export default Home;