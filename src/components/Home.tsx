import React, { FC, useState } from 'react';
import { WalletProvider } from '@suiet/wallet-kit'; 
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import Footer from './Footer';
import NavBarHome from './NavBarHome';
import '../stylesheets/Home.css'; 

const Home: FC = () => {

    return (
      <div className="home-wrapper">
        <NavBarHome />
        <div className="container">
          <div className="content">
            <h1>The SUI Identity Layer</h1>
            <p>Unlocking fair airdrops, secure credit, and compliant DeFi is as simple as minting an NFT.</p>
            <Link to='/app' className="button">Launch App</Link>
            <a href='https://zkreputation.gitbook.io/zk-reputation-documentation/' className='button' target="_blank" rel="noopener noreferrer">Develop with zkRep</a>
          </div>
        </div>
        <Footer />
      </div>
    );
}; 

export default Home