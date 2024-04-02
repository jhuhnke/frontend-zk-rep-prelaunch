import React, { FC, useState, useEffect } from 'react'; 
import { supabase } from '../supabaseClient'; 
import { Auth } from '@supabase/auth-ui-react'; 
import{ useHistory } from 'react-router-dom';
import Footer from './Footer';
import NavBar from './NavBar';
import '../stylesheets/MintSocialCredential.css';

const MintSocialCredential: FC = () => {
    const history = useHistory(); 

    return (
        <div className='mint-social-wrapper'>
            <NavBar />
            <div className="mint-container">
                <div className='mint-card-social'>
                    <h1>Link Your Social Media Accounts</h1>
                    <div className="social-buttons-container">
                        <Auth
                            supabaseClient={supabase}
                            theme="light"
                            providers={["discord", "github", "twitter"]}
                            redirectTo={`${window.location.origin}/mint-social-signed-in`}
                            onlyThirdPartyProviders={true}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MintSocialCredential; 