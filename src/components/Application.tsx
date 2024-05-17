import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const Application: FC = () => {
  return (
    <div className='bg-gradient-radial min-h-screen flex flex-col items-center justify-center pt-20'> {/* Added pt-20 to add padding at the top */}
      <div className="w-full max-w-4xl px-4 py-6">
        <div className="grid grid-cols-1 gap-4">
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
          {/* Upcoming cards */}
          <Card
            imageUrl="./cert.webp"
            heading="Get your on-chain credit score"
            paragraph="Verify your reputation based on your on-chain history."
            buttonText="Coming Soon"
            clickable={false}
            linkTo="/"
          />
        </div>
      </div>
    </div>
  );
};

const Card = ({ imageUrl, heading, paragraph, buttonText, clickable, linkTo }) => {
  return (
    <div className="bg-gray-100 border-2 border-purple-800 shadow-lg rounded-lg overflow-hidden">
      <img src={imageUrl} alt="Card" className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-4xl font-bold mb-4" style={{ color: '#312e81' }}>{heading}</h3>
        <p className="text-gray-700 mb-4">{paragraph}</p>
        {clickable ? (
          <Link to={linkTo} className="inline-block text-white bg-pink-300 hover:bg-pink-500 font-semibold py-2 px-4 rounded-full shadow-lg border-2 border-purple-800 hover:border-purple-900 transition-colors duration-300">
            {buttonText}
          </Link>
        ) : (
          <button className="block text-center text-white bg-pink-300 hover:bg-pink-500 font-semibold py-4 px-6 rounded-full shadow-lg border-2 border-purple-800 hover:border-purple-900 transition-colors duration-300 cursor-not-allowed" disabled>
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Application;