import React, { useRef } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { WalletProvider } from '@suiet/wallet-kit'; 
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './components/Home'; 
import Features from './components/Features';
import Uses from './components/Uses';
import Contact from './components/Contact';
import Application from './components/Application';
import Presale from './components/Presale'; 
import PresaleSuccess from './components/PresaleSuccess';
import '@suiet/wallet-kit/style.css';
import './stylesheets/App.css';
import './stylesheets/Wallet.css';

const NavBarWrapper = ({ homeRef, featuresRef, usesRef, contactRef }) => {
    const location = useLocation();
    const isAppNavBar = ['/app', '/presale-pass', '/presale-success'].includes(location.pathname);

    return (
        isAppNavBar ? 
            <NavBar mode="app" homeRef={null} featuresRef={null} usesRef={null} contactRef={null} /> : 
            <NavBar mode="main" homeRef={homeRef} featuresRef={featuresRef} usesRef={usesRef} contactRef={contactRef} />
    );
};

const App = () => {
    const homeRef = useRef(null); 
    const featuresRef = useRef(null); 
    const usesRef = useRef(null);     
    const contactRef = useRef(null);  

    return (
        <WalletProvider>
            <Router>
                <NavBarWrapper homeRef={homeRef} featuresRef={featuresRef} usesRef={usesRef} contactRef={contactRef} />
                <Switch>
                    <Route path="/" exact>
                        <div className="main-content">
                            <Home ref={homeRef} />
                            <Features ref={featuresRef} />
                            <Uses ref={usesRef} />
                            <Contact ref={contactRef} />
                        </div>
                    </Route>
                    <Route path="/app" component={Application} />
                    <Route path="/presale-pass" component={Presale} />
                    <Route path="/presale-success" component={PresaleSuccess} />
                </Switch>
                <Footer />
            </Router>
        </WalletProvider>
    ); 
}; 

export default App;