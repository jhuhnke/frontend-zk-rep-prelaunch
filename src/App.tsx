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
import Identity from './components/Identity'; 
import Social from './components/Social';
import Credit from './components/Credit'; 
import Dao from './components/Dao'; 
import IdentitySuccess from './components/IdentitySuccess'; 
import SocialSuccess from './components/SocialSuccess';
import CreateDAOSuccess from './components/CreateDaoSuccess';
import AddMemberSuccess from './components/AddMemberSuccess';
import '@suiet/wallet-kit/style.css';
import './stylesheets/App.css';
import './stylesheets/Wallet.css';

const NavBarWrapper = ({ homeRef, featuresRef, usesRef, contactRef }) => {
    const location = useLocation();
    const isAppNavBar = [
        '/app', 
        '/presale-pass', 
        '/presale-success', 
        '/identity', 
        '/social', 
        '/mint-social',
        '/credit-score', 
        '/dao', 
        '/identity-success', 
        '/social-success', 
        '/dao-success', 
        '/member-success'
    ].includes(location.pathname);

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
                    <Route path="/identity" component={Identity} />
                    <Route path='/social' component={Social} />
                    <Route path='mint-social' component={Social} />
                    <Route path='/credit-score' component={Credit} />
                    <Route path='/dao' component={Dao} />
                    <Route path='/identity-success' component={IdentitySuccess} />
                    <Route path='/social-success' component={SocialSuccess} />
                    <Route path='/dao-success' component={CreateDAOSuccess} />
                    <Route path='/member-success' component={AddMemberSuccess} />
                </Switch>
                <Footer />
            </Router>
        </WalletProvider>
    ); 
}; 

export default App;