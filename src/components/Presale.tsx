import React, { useState, useEffect } from 'react';
import { useWallet } from '@suiet/wallet-kit';
import { useMintPass } from '../moveCalls/presale/index';
import { useLocation } from 'react-router-dom';
import PresaleSuccess from './PresaleSuccess';

const Presale: React.FC = () => {
  const { address } = useWallet();
  const [isConnected, setIsConnected] = useState(false);
  const { mintPass } = useMintPass();

  useEffect(() => {
    setIsConnected(!!address);
  }, [address]);

  return (
    <div className='bg-gradient-radial min-h-screen flex flex-col items-center justify-center pt-20'>
      <div className="flex flex-wrap justify-center items-center">

        {/* Left side with content */}
        <div className="w-full md:w-1/2 p-8 flex justify-left items-center">
          <div className="content text-center">
            <h2 className='mb-4 max-w-lg font-bold mx-auto text-xl' style={{ color: '#ff5467'}}>Early Bird Pass</h2>
            <h1 className="text-6xl font-bold mb-4" style={{ color: '#312e81' }}>Access Features First and Access Token Presale</h1>
            <p className="mb-2 text-black-56 max-w-lg mx-auto">
              <b>Cost:</b> 20 SUI 
            </p>
            <p className="mb-2 text-black-56 max-w-lg mx-auto">
              <b>Total Supply:</b> 5000 
            </p>
            <p className="mb-2 text-black-56 max-w-lg mx-auto">
              <b>Royalties:</b> 0% 
            </p>
            <button
              className={`mt-1 ${isConnected ? 'ml-4 text-white bg-pink-300 hover:bg-pink-500 font-semibold py-4 px-6 rounded-full shadow-lg border-2 border-purple-800 hover:border-purple-900 transition-colors duration-300' : 'bg-gray-300 text-gray-500 cursor-not-allowed py-4 px-6 rounded-full shadow-lg border-2 border-gray-400'}`}
              disabled={!isConnected}
              onClick={mintPass}
            >
              Mint Pass
            </button>
          </div>
        </div>

        {/* Right side with image */}
        <div className="w-full md:w-1/2 p-8 flex justify-center items-center pl-40">
          <div className="rounded-3xl border-4 border-purple-800 p-2 flex justify-center items-center">
            <img
              src="pass.png"
              alt="Presale Pass"
              className="rounded-3xl"
              style={{ height: '500px', objectFit: 'cover' }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presale;