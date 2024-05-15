import React, { useRef } from 'react';
import { WalletProvider } from '@suiet/wallet-kit'; 
import '@suiet/wallet-kit/style.css';
import { BrowserRouter as Router } from 'react-router-dom'; 
import Home from './components/Home'; 
import Features from './components/Features';
import NavBar from './components/NavBar';
import './stylesheets/App.css';
import './stylesheets/Wallet.css';

const App = () => {

    const featuresRef = useRef(null);

    return (
        <WalletProvider>
            <Router>
                <NavBar scrollRef={featuresRef} />
                <div className="main-content">
                    <Home />
                    <Features ref={featuresRef} />
                </div>
            </Router>
        </WalletProvider>
    ); 
}; 

export default App;