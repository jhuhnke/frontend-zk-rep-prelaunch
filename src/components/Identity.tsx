import React, { FC, useState } from 'react';
import { useIdentityCert } from '../moveCalls/certificates/identity';
import { useCheckIfOver18 } from '../hooks/useCheckIfOver18';
import { useDocumentUpload } from '../hooks/useDocumentUpload';

const MintIdentityCredential: FC = () => {
    const { identityCert } = useIdentityCert(); 

    const [password, setPassword] = useState(''); 
    const [country, setCountry] = useState(''); 

    const { isOver18, checkIfOver18 } = useCheckIfOver18();
    const { isDocumentProcessed, handleDocumentUpload } = useDocumentUpload(setCountry, checkIfOver18);

    const image_url = 'ipfs://bafkreihaxb7pe54psv6hqvhlinhzkc67yhyi4cygqrngiaceqi3xrfbgda'; 

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        await identityCert({ isOver18, country, imageUrl: image_url });
    };

    return (
        <div className='bg-gradient-radial min-h-screen flex flex-col items-center justify-center pt-20'>
            <div className="bg-gray-100 border-2 border-purple-800 shadow-lg rounded-3xl overflow-hidden p-8 max-w-4xl w-full" style={{ maxWidth: '70%' }}>
                <h2 className='mb-4 max-w-lg font-bold mx-auto text-xl text-center' style={{ color: '#ff5467'}}>
                    Identity
                </h2>
                <h1 className="text-6xl font-bold mb-4 text-center" style={{ color: '#312e81' }}>Mint Identity Credential</h1>
                <p className="text-center text-gray-700 mb-4">
                    An on-chain KYC (Know Your Customer) credential ensures that your identity is verified and securely stored on the blockchain. This credential enhances trust and compliance in decentralized applications by proving that users have undergone a thorough identity verification process, helping to prevent fraud and ensuring that only verified individuals can participate in certain activities.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label htmlFor="documentUpload" className='block text-gray-700'>Upload Passport Photo:</label>
                        <div className="flex flex-col items-center border-2 border-dashed border-gray-300 p-4 rounded-md">
                            <input
                                type="file"
                                id="file-upload"
                                className="hidden"
                                onChange={handleDocumentUpload}
                                accept="image/jpeg, image/png"
                            />
                            <label htmlFor="file-upload" className="cursor-pointer text-indigo-600 hover:text-indigo-500">
                                Upload Photos
                            </label>
                            <div className="mt-2 text-gray-500">Click to upload or drag and drop</div>
                            <div className="mt-1 text-xs text-gray-500">Max. File Size: 15MB</div>
                        </div>
                    </div>
                    <p className="text-gray-700 mb-2"><b>Cost:</b> 20 SUI</p>
                    <div className="flex justify-center">
                        <button 
                            type="submit" 
                            disabled={!isDocumentProcessed}
                            className={`mt-4 w-1/3 py-2 px-4 border border-transparent text-sm font-medium rounded-3xl shadow-sm text-white ${isDocumentProcessed ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'}`}
                        >
                            Mint Credential
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MintIdentityCredential;
