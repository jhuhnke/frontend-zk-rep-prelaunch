import React, { FC } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const IdentitySuccess: FC = () => {
    const location = useLocation<any>();
    const history = useHistory();
    const { imageUrl, txId } = location.state || {};

    const handleGoHome = () => {
        history.push('/');
    };

    return (
        <div className='bg-gradient-radial min-h-screen flex flex-col items-center justify-center pt-20'>
            <div className="bg-gray-100 border-2 border-purple-800 shadow-lg rounded-3xl overflow-hidden p-8 max-w-4xl w-full" style={{ maxWidth: '70%' }}>
                <h2 className='mb-4 max-w-lg font-bold mx-auto text-xl text-center' style={{ color: '#ff5467'}}>
                    Identity
                </h2>
                <h1 className="text-6xl font-bold mb-4 text-center" style={{ color: '#312e81' }}>Identity Credential Minted</h1>
                {imageUrl && (
                    <div className="flex justify-center mb-4">
                        <img src={imageUrl} alt="Uploaded" className='border-2 border-purple-800 rounded-3xl' style={{ height: 200 }} />
                    </div>
                )}
                {txId && (
                    <p className="text-center text-gray-700 mb-4">
                        Transaction ID: <a href={`https://suiexplorer.com/txblock/${txId}?network=testnet`} className="text-indigo-600 hover:text-indigo-500" target="_blank" rel="noopener noreferrer">{txId}</a>
                    </p>
                )}
                <div className="flex justify-center mt-4">
                    <button 
                        onClick={handleGoHome}
                        className="text-white bg-pink-300 hover:bg-pink-500 font-semibold py-4 px-8 rounded-full shadow-lg border-2 border-purple-800 hover:border-purple-900 transition-colors duration-300"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IdentitySuccess;