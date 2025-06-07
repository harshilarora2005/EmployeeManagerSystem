import { Link } from 'react-router';

const Header = () => {
    function handleActiveLink(event) {
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => link.classList.remove('active'));
        event.currentTarget.classList.add('active');
    }
    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand text-white" to="/">EmployeeManager</Link>

                    <div className="navbar-collapse d-flex justify-content-end">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/"
                                onClick={handleActiveLink}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/employees" onClick={handleActiveLink}>Employees</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/add"
                                onClick={handleActiveLink}>Add Employee</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about" onClick={handleActiveLink}>About</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
