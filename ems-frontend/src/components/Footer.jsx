import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white text-center text-lg-start border-top border-body mt-auto py-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 text-md-start mb-2 mb-md-0">
                        <span>&copy; {new Date().getFullYear()} EmployeeManager. All rights reserved.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
