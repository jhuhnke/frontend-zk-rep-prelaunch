import React, { FC } from 'react'; 
import { Link } from 'react-router-dom'; 
import '../stylesheets/NavBarHome.css'; 

const NavBarHome: FC = () => {
    return (
        <nav className="navbarhome">
            <div className='logohome'>
                <img src="/reppy-logo.png" alt="Logo" height="46" />
            </div>
            <ul className="navhome-links">
                <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                <li className="nav-item"><Link to="/about" className="nav-link">About</Link></li>
                <li className="nav-item"><Link to="/use-cases" className='nav-link'>Use Cases</Link></li>
                <li className="nav-item"><Link to="/contact" className="nav-link">Contact</Link></li>
                <li className="nav-item"><a href='https://zkreputation.gitbook.io/zk-reputation-documentation/' className='nav-link' target="_blank" rel="noopener noreferrer">Documentation</a></li>
            </ul>
        </nav>
    )
};

export default NavBarHome