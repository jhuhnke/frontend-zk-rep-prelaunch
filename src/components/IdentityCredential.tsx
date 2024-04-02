import React, { FC } from 'react';
import Footer from './Footer';
import NavBar from './NavBar';

const IdentityCredential: FC = () => {
    return (
        <div className='credential-wrapper'>
            <NavBar />
            <div>
                <h1>Credential!</h1>
            </div>
            <Footer />
        </div>
        
    ); 
}; 

export default IdentityCredential;