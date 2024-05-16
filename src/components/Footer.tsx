import React, { FC } from 'react'; 
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'; 

const Footer: FC = () => {
    return (
        <footer className="w-full bg-gray-100 border-t-2 border-purple-800 py-4 flex justify-between items-center">
            <div className="flex justify-start ml-10">
                <a href="https://twitter.com/zk_reputation" target="_blank" rel="noopener noreferrer" className="text-purple-800 hover:text-black mr-4">
                    <FaTwitter />
                </a>
                <a href="https://github.com/zkReputation" target="_blank" rel="noopener noreferrer" className="text-purple-800 hover:text-black mr-4">
                    <FaGithub />
                </a>
                <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-purple-800 hover:text-black">
                    <FaLinkedin />
                </a>
            </div>
            <div className="flex justify-end mr-10">
                <a href='/privacy-policy' className="text-purple-800 hover:text-black">
                    Privacy Policy
                </a>
            </div>
        </footer>
    ); 
}; 

export default Footer;