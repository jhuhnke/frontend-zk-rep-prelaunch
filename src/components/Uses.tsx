import React, { FC } from 'react'; 
import CardSlider from './CardSlider';
import Footer from './Footer';
import NavBarHome from './NavBarHome';
import '../stylesheets/Uses.css'; 

const Uses: FC = () => {
    return (
        <div className='uses-wrapper'>
            <NavBarHome />
            <div className="uses-container">
                <h2 className="uses-header">zkRep KYC Use Cases</h2>
                <p>Use Cases</p>
                <CardSlider />
            </div>
            <Footer />
        </div>
    );
};

export default Uses