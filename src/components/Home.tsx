import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const Home: FC = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-radial from-start to-end flex flex-col items-center justify-center text-center p-4 relative" style={{ backgroundSize: 'cover' }}>
      <img src="homebg.svg" alt="Descriptive Alt Text" className="absolute inset-0 mx-auto my-auto w-auto h-auto max-w-2xl max-h-2xl object-contain" />
      <div className="content z-10">
        <h2 className='mb-4 max-w-lg font-bold mx-auto text-xl' style={{ color: '#ff5467'}}>ZK Reputation</h2>
        <h1 className="text-6xl font-bold mb-4" style={{ color: '#312e81' }}>Secure Your On-Chain Reputation</h1>
        <p className="mb-8 text-black-56 max-w-lg mx-auto">
          Unlocking fair airdrops, secure credit, and compliant DeFi is as simple as minting an NFT.
        </p>
        <Link to="/app" className="ml-4 text-white bg-pink-300 hover:bg-pink-500 font-semibold py-4 px-6 rounded-full shadow-lg border-2 border-purple-800 hover:border-purple-900 transition-colors duration-300">
          Launch App
        </Link>
        <a href="https://zkreputation.gitbook.io/zk-reputation-documentation/" className="ml-4 text-white bg-pink-300 hover:bg-pink-500 font-semibold py-4 px-6 rounded-full shadow-lg border-2 border-purple-800 hover:border-purple-900 transition-colors duration-300" target="_blank" rel="noopener noreferrer">
          Documentation
        </a>
      </div>
    </div>
  );
};

export default Home;
