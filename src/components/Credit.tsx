import React, { FC, useState } from 'react'; 
import { useHistory } from 'react-router-dom'; 
import { useWallet } from '@suiet/wallet-kit'; 

const Credit: FC = () => {
    const { address } = useWallet(); 
    const history = useHistory(); 

    const handleMint = () => {
        // Handle the minting process here
        console.log('Minting on-chain credit score');
    };

    return(
        <div className='bg-gradient-radial min-h-screen flex flex-col items-center justify-center pt-20 pb-20'>
            <div className='bg-gray-100 border-2 border-purple-800 shadow-lg rounded-3xl p-8 w-full max-w-3xl' style={{ marginTop: '20px', marginBottom: '20px' }}>
                <h2 className='mb-4 max-w-lg font-bold mx-auto text-xl text-center' style={{ color: '#ff5467'}}>
                    Credit
                </h2>
                <h1 className="text-4xl font-bold mb-4 text-center" style={{ color: '#312e81' }}>
                    On-Chain Lending Score
                </h1>
                <p className="text-gray-700 mb-4">
                    The on-chain credit score leverages blockchain technology to evaluate your creditworthiness based on your historical activity within various decentralized finance (DeFi) protocols. This score is calculated by analyzing transaction history, loan repayments, staking behavior, and other relevant metrics that are securely recorded on the blockchain. By using an on-chain credit score, users can have a transparent and tamper-proof record of their financial reputation, which can be used to access better lending terms and other financial services in the DeFi ecosystem.
                </p>
                <p className="text-gray-700 mb-4">
                    Protocols considered in the credit score:
                    <ul className="list-disc list-inside ml-4">
                        <li>Scallop</li>
                        <li>Navi</li>
                        <li>Suilend</li>
                    </ul>
                </p>
                <p className='text-gray-700 mb-4'>
                    It may take several minutes to query the on-chain data needed to generate your credit score. Please be patient and do not hit the back button or refresh the page.
                </p>
                <p className="text-gray-700 mb-2"><b>Cost:</b> 20 SUI</p>
                <button 
                    onClick={handleMint} 
                    className="mx-auto block text-white bg-pink-300 hover:bg-pink-500 font-semibold py-4 px-8 rounded-full shadow-lg border-2 border-purple-800 hover:border-purple-900 transition-colors duration-300"
                >
                    Mint Credit Score
                </button>
            </div>
        </div>
    )
}; 

export default Credit;
