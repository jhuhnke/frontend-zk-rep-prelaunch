import React, { FC } from 'react'; 
import { useHistory, useLocation } from 'react-router-dom'; 
import Footer from './Footer';
import NavBar from './NavBar';
import '../stylesheets/SuccessPage.css'

interface LocationState {
    url: string; 
}

const SuccessPage: FC = () => {
    const history = useHistory(); 
    const location = useLocation<LocationState>(); 

    const handleGoHome = () => {
        history.push('/'); 
    }; 

    return (
        <div className='success-wrapper'>
            <NavBar />
            <div className="success-container">
                <div className='success-card'>
                    <h1>Credential Minted Successfully!</h1>
                    <img src='./cert.webp' alt="Profile" className='pfp' style={{ height: 200 }} />
                    {location.state && location.state.url && (
                        <div>
                            <p>View your transaction:</p>
                            <a href={location.state.url} target="_blank" rel="noopener noreferrer">{location.state.url}</a>
                        </div>
                    )}
                    <div className='success-button'>
                        <button onClick={handleGoHome}>Go to Home</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SuccessPage; 