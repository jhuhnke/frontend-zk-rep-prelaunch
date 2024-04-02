import React, { FC } from 'react'; 
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer'; 
import '../stylesheets/Application.css';

const Application: FC = () => {
    return (
        <div className='application-wrapper'>
          <NavBar />
          <div className="application">
            <div className="active">
              {/* Active cards */}
              <Card
                  imageUrl="./cert.webp"
                  heading="Verify Your Real World Identity"
                  paragraph="Scan your passport machine readable zone to generate an identity soulbound token."
                  buttonText="Start"
                  clickable={true}
                  linkTo="/mint-id"
              />
              <Card
                  imageUrl="./cert.webp"
                  heading="Claim your social credentials"
                  paragraph="Get a unique ID that proves ownership over your social media accounts."
                  buttonText="Start"
                  clickable={true}
                  linkTo="/mint-social"
              />
            </div>
            <div className="upcoming">
              {/* Upcoming cards */}
              {[1].map((num) => (
                <Card
                  key={num}
                  imageUrl="./cert.webp"
                  heading={`Get your on-chain credit score`}
                  paragraph="Verify your reputation based on your on-chain history."
                  buttonText="Coming Soon"
                  clickable={false}
                  linkTo="/"
                />
              ))}
            </div>
          </div>
          <Footer />
        </div>
      );
    };
    
    const Card = ({ imageUrl, heading, paragraph, buttonText, clickable, linkTo }) => {
        return (
          <div className="card">
            <img src={imageUrl} alt="Card" />
            <div className="card-content">
              <h3>{heading}</h3>
              <p>{paragraph}</p>
            </div>
            {clickable ? (
              <Link to={linkTo} className="button-link">
                {buttonText}
              </Link>
            ) : (
              <button disabled={!clickable}>{buttonText}</button>
            )}
          </div>
        );
    };
    
    export default Application;