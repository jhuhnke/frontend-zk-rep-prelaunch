import { FC } from 'react'; 
import Footer from './Footer';
import NavBar from './NavBar';

const SocialCredential: FC = () => {
    return (
        <div className='cred-wrapper'>
            <NavBar />
            <div>
                <h1>Credential!</h1>
            </div>
            <Footer />
        </div>
    ); 
}; 

export default SocialCredential; 