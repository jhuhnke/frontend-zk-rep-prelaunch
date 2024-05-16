import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { ConnectButton } from '@suiet/wallet-kit';

const NavBar = ({ featuresRef, usesRef, contactRef }) => {
    const [isOpen, setIsOpen] = useState(false);

    const scrollToRef = (ref) => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="bg-white bg-opacity-75 px-4 py-1 fixed w-11/12 z-50 top-4 mx-4 md:mx-6 lg:mx-8 xl:mx-10 2xl:mx-12" style={{ top: '1rem', left: '1rem', right: '1rem', borderRadius: '50px' }}>
            <div className="max-w-7xl mx-auto flex justify-between items-center h-16">
                <div className="shrink-0">
                    <img src="/reppy-logo.png" alt="Logo" className="h-8 md:h-10" />
                </div>
                <div className="flex-1 hidden lg:flex items-center justify-center">
                    <Link to="/" className="nav-link text-purple-800 hover:text-gray-600 px-3 py-2 rounded-md text-m font-medium">Home</Link>
                    <button onClick={() => scrollToRef(featuresRef)} className="nav-link text-purple-800 hover:text-gray-600 px-3 py-2 rounded-md text-m font-medium">Features</button>
                    <button onClick={() => scrollToRef(usesRef)} className="nav-link text-purple-800 hover:text-gray-600 px-3 py-2 rounded-md text-m font-medium">Use Cases</button>
                    <button onClick={() => scrollToRef(contactRef)} className="nav-link text-purple-800 hover:text-gray-600 px-3 py-2 rounded-md text-m font-medium">Contact</button>
                    <a href='https://zkreputation.gitbook.io/zk-reputation-documentation/' className="nav-link text-purple-800 hover:text-gray-600 px-3 py-2 rounded-md text-m font-medium" target="_blank" rel="noopener noreferrer">Documentation</a>
                </div>
                <ConnectButton className="hidden lg:flex" onConnectError={(e) => console.log(e)}>
                    Connect Wallet
                </ConnectButton>
                <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 p-2 lg:hidden">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-16 6h16" />
                        )}
                    </svg>
                </button>
            </div>
            {isOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white shadow-lg rounded-lg lg:hidden">
                    <Link to="/" className="block text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-base font-medium">Home</Link>
                    <button onClick={() => scrollToRef(featuresRef)} className="nav-link text-purple-800 hover:text-gray-600 px-3 py-2 rounded-md text-m font-medium">Features</button>
                    <button onClick={() => scrollToRef(usesRef)} className="nav-link text-purple-800 hover:text-gray-600 px-3 py-2 rounded-md text-m font-medium">Use Cases</button>
                    <button onClick={() => scrollToRef(contactRef)} className="nav-link text-purple-800 hover:text-gray-600 px-3 py-2 rounded-md text-m font-medium">Contact</button>
                    <a href='https://zkreputation.gitbook.io/zk-reputation-documentation/' className="block text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-base font-medium" target="_blank" rel="noopener noreferrer">Documentation</a>
                    <ConnectButton className="w-full px-3 py-2 mt-2" onConnectError={(e) => console.log(e)}>
                        Connect Wallet
                    </ConnectButton>
                </div>
            )}
        </nav>
    );
};

export default NavBar;