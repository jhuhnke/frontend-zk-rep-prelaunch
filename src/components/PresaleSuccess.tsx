import React, { FC } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { MINT_WALLET_ADDRESS } from '../config/constants';

interface PresaleSuccessProps {
  txId: string;
}

const PresaleSuccess: FC = () => {
  const history = useHistory(); 
  const location = useLocation<PresaleSuccessProps>(); 

  return (
    <div className='bg-gradient-radial min-h-screen flex flex-col items-center justify-center pt-20'>
      <div className="bg-gray-100 border-2 border-purple-800 shadow-lg rounded-lg overflow-hidden p-8 w-4/5 lg:w-3/5 text-center">
        <h2 className='text-xl font-bold mb-4' style={{ color: '#ff5467' }}>Success</h2>
        
        {/* Add GIF here */}
        <img src='thanks.gif' alt="Thank You" className="mb-4 w-32 h-auto mx-auto" />
        
        <h1 className="text-5xl font-bold mb-4 text-center" style={{ color: '#312e81' }}>Thank You For Your Support!</h1>
        <p className="mb-4 text-gray-700">Your Pass has been minted successfully.</p>
        
        <div className="flex justify-center mb-8">
          {location.state && location.state.txId && (
            <a href={`https://suiscan.xyz/testnet/tx/${location.state.txId}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mx-8">
              View Transaction
            </a>
          )}
          <a href={`https://suiscan.xyz/testnet/address/${MINT_WALLET_ADDRESS}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mx-8">
            View Treasury Wallet
          </a>
        </div>
        
        <div className="flex justify-center space-x-4">
          <a href="/" className="text-white bg-pink-300 hover:bg-pink-500 font-semibold py-4 px-8 rounded-full shadow-lg border-2 border-purple-800 hover:border-purple-900 transition-colors duration-300">
            Go back to home
          </a>
          <a href="/presale-pass" className="text-white bg-pink-300 hover:bg-pink-500 font-semibold py-4 px-8 rounded-full shadow-lg border-2 border-purple-800 hover:border-purple-900 transition-colors duration-300">
            Mint Another
          </a>
        </div>
      </div>
    </div>
  );    
};

export default PresaleSuccess;