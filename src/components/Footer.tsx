import React, { FC } from 'react'; 
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'; 
import '../stylesheets/Footer.css'; 

const Footer: FC = () => {
    
    return (
        <footer className='footer'>
            <div className='footer-left'>
                <a href="https://twitter.com/zk_reputation" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                <a href="https://github.com/zkReputation" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            </div>
            <div className='footer-right'>
                <a href='/privacy-policy'>Privacy Policy</a>
            </div>
        </footer>
    ); 
}; 

export default Footer; 