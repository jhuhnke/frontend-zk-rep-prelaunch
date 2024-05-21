import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const Application: FC = () => {
  return (
    <div className='bg-gradient-radial min-h-screen flex flex-col items-center justify-center pt-20'> 
      <div className="w-full max-w-4xl px-4 py-6">
        <div className="grid grid-cols-1 gap-4">
          {/* Active cards */}
          {/* Mint Presale NFT */}
          <Card 
            imageUrl='./cert.webp'
            heading="Presale Pass"
            paragraph="Secure Your Place in The Token Presale and A Future Discount On Protocol Use."
            buttonText="Start"
            clickable={true}
            linkTo="/presale-pass"
          />

          {/*Identity Certificate */}
          <Card
            imageUrl="./cert.webp"
            heading="Verify Your Real World Identity"
            paragraph="Scan your passport machine readable zone to generate an identity soulbound token."
            buttonText="Coming Soon"
            clickable={false}
            linkTo="/mint-id"
          />

          {/*Social Certificate */}
          <Card
            imageUrl="./cert.webp"
            heading="Claim your social credentials"
            paragraph="Get a unique ID that proves ownership over your social media accounts."
            buttonText="Coming Soon"
            clickable={false}
            linkTo="/mint-social"
          />

          {/* On-Chain Credit Score */}
          <Card
            imageUrl="./cert.webp"
            heading="Get your on-chain credit score"
            paragraph="Verify your reputation based on your on-chain history."
            buttonText="Coming Soon"
            clickable={false}
            linkTo="/"
          />

          {/* DAO / On-Chain Organization */}
          <Card
            imageUrl="./cert.webp"
            heading="Your Organization, Fully On-Chain"
            paragraph="Create your group and assign members roles"
            buttonText="Coming Soon"
            clickable={false}
            linkTo='/dao'
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
          <button className="block text-center text-white bg-gray-400 font-semibold py-2 px-4 rounded-full shadow-lg border-2 border-gray-400 cursor-not-allowed" disabled>
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Application;
