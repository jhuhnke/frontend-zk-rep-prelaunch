import React, { FC, useState } from 'react'; 
import Footer from './Footer';
import NavBarHome from './NavBarHome';
import '../stylesheets/About.css'; 

const About: FC = () => {
    return (
        <div className='about-wrapper'>
            <NavBarHome />
            <div className='about-container'>
                <div className='column'>
                    <div className='image-wrapper'>
                        <img src="./fuddie.png" alt="Founder" />
                    </div>
                    <h2 className='founder'>The Founder</h2>
                    <p>Jessica (@web3_analyst) has been full-time in web3 for 5 years, including a stint at Flipside as a data engineer and Global Stake as the lead software developer.
                        <br /><br /> When she isn't building dApps, Jessica can be found cycling or losing money on NFTs. 
                    </p>
                </div>
                <div className='column middle-column'>
                    <h2>The Short</h2>
                    <p>ZK Reputation aims to develop the best system for obtaining and verifying credentials with a focus on user privacy. 
                        Holders and verifiers employ identity credentials with ease and in a permissionless manner.</p>
                    <div className='image-wrapper'>
                        <img src="reppy-logo.png" alt="Logo" />
                    </div>
                </div>
                <div className='column'>
                    <h2>The Long</h2>
                    <p>The inception of this project is rooted deeply in recognizing the transformative potential of decentralized finance (DeFi) and the broader web3 ecosystem. As these technologies continue to evolve, they promise to redefine our understanding of financial sovereignty, privacy, and inclusivity. <br /><br />
                    However, alongside these groundbreaking advancements, there emerges a pivotal challenge: ensuring secure, transparent, and accessible identity verification processes that respect user privacy while complying with regulatory standards. Our motivation springs from a commitment to address this challenge head-on, paving the way for a future where digital identity and credentials empower individuals rather than confine them.<br /><br />
                    The motivation behind our project is multifaceted, driven by the desire to harness the potential of web3 technologies to create a more inclusive, secure, and privacy-centric world. It's about breaking down barriers, building trust, and empowering individuals. We are not just developing a system; we are advocating for a paradigm shift in how digital identity is perceived and managed.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default About;