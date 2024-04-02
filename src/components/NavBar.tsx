import React, { FC, useEffect } from 'react'; 
import { Link } from 'react-router-dom'; 
import '../stylesheets/NavBar.css'; 
import { ConnectButton } from '@suiet/wallet-kit'; 

const NavBar: FC = () => { 

    return (
        <nav className="navbar">
            <div className="logo">
                <img src="/reppy-logo.png" alt="Logo" height="46" /> 
            </div>
            <ul className="nav-links">
                <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                <li className="nav-item"><Link to="/about" className="nav-link">About</Link></li>
                <li className="nav-item"><Link to="/use-cases" className='nav-link'>Use Cases</Link></li>
                <li className="nav-item"><Link to="/contact" className="nav-link">Contact</Link></li>
                <li className="nav-item"><a href='https://zkreputation.gitbook.io/zk-reputation-documentation/' className='nav-link' target="_blank" rel="noopener noreferrer">Documentation</a></li>
            </ul>
            <ConnectButton className="sui-button" onConnectError={(e) => console.log(e)}>Connect Wallet</ConnectButton>
        </nav>
    ); 
}; 

export default NavBar;