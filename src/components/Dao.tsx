import React, { FC, useState } from 'react'; 
import { useHistory } from 'react-router-dom'; 
import { useWallet } from '@suiet/wallet-kit'; 
import { useCreateDao } from '../moveCalls/certificates/createDao'; 
import { useAddMember } from '../moveCalls/certificates/addMember'; 
import { fetchDaoOwnerCertificates, findDaoOwnerCertByName } from '../hooks/daoHelpers';

const Dao: FC = () => {
    const { address } = useWallet(); 
    const history = useHistory(); 
    const { createDao } = useCreateDao(); 
    const { addMember } = useAddMember(); 
    const [activeTab, setActiveTab] = useState<'create' | 'add'>('create'); 

    const [daoName, setDaoName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [description, setDescription] = useState('');
    const [webpageUrl, setWebpageUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const [memberDaoName, setMemberDaoName] = useState('');
    const [memberWallet, setMemberWallet] = useState('');
    const [memberRole, setMemberRole] = useState('');

    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    const handleCreateSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let errors: { [key: string]: string } = {};

        if (!daoName) {
            errors.daoName = 'DAO name is required';
        }
        if (!imageUrl) {
            errors.imageUrl = 'Image URL is required';
        }

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            console.log('Form submitted:', { daoName, symbol, description, webpageUrl, imageUrl });
            await createDao({ dao_name: daoName, description, webpage_url: webpageUrl, image_url: imageUrl });
        }
    };

    const handleAddMemberSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let errors: { [key: string]: string } = {};

        if (!memberDaoName) {
            errors.memberDaoName = 'DAO name is required';
        }
        if (!memberWallet) {
            errors.memberWallet = 'Member wallet address is required';
        }
        if (!memberRole) {
            errors.memberRole = 'Member role is required';
        }

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            console.log('Form submitted:', { memberDaoName, memberWallet, memberRole });

            if (!address) {
                console.error('Wallet not connected');
                return;
            }

            // Fetch DAO Owner Certificates from the wallet
            const daoOwnerCerts = await fetchDaoOwnerCertificates(address);
            const daoOwnerCert = findDaoOwnerCertByName(daoOwnerCerts, memberDaoName);

            console.log(daoOwnerCert.fields.id.id)

            if (!daoOwnerCert) {
                console.error('DAO Owner Certificate not found');
                return;
            }

            // Call addMember with the found DAO Owner Certificate
            await addMember({ owner_cert: daoOwnerCert.fields.id.id, user: memberWallet, role: memberRole });
        }
    };

    const renderTabContent = () => {
        if (activeTab === 'create') {
            return (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Create Organization</h2>
                    <p className="text-center text-gray-700 mb-4">
                        Creating a fully on-chain organization enables transparent, decentralized governance and management. By leveraging blockchain technology, you can ensure that all decisions, transactions, and changes within the organization are recorded immutably, enhancing trust and accountability among members. This process allows for efficient, tamper-proof administration of the organization, paving the way for innovative, decentralized collaboration.
                    </p>
                    <form onSubmit={handleCreateSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">DAO Name</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
                                value={daoName}
                                onChange={(e) => setDaoName(e.target.value)}
                            />
                            {formErrors.daoName && <p className="text-red-500 text-sm mt-1">{formErrors.daoName}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Symbol</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
                                value={symbol}
                                onChange={(e) => setSymbol(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Description</label>
                            <textarea
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Webpage URL</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
                                value={webpageUrl}
                                onChange={(e) => setWebpageUrl(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Image URL</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                            />
                            {formErrors.imageUrl && <p className="text-red-500 text-sm mt-1">{formErrors.imageUrl}</p>}
                        </div>
                        <p className="text-gray-700 mb-2"><b>Cost:</b> 20 SUI</p>
                        <button
                            type="submit"
                            className="mx-auto block text-white bg-pink-300 hover:bg-pink-500 font-semibold py-4 px-8 rounded-full shadow-lg border-2 border-purple-800 hover:border-purple-900 transition-colors duration-300"
                        >
                            Create Organization
                        </button>
                    </form>
                </div>
            );
        } else if (activeTab === 'add') {
            return (
                <div>
                    <h2 className="text-2xl font-bold mb-4">Add Member</h2>
                    <p className="text-center text-gray-700 mb-4">
                        Adding a member to your on-chain organization involves assigning specific roles and responsibilities directly on the blockchain. This ensures that each member's privileges and duties are transparently managed and verifiable. By integrating new members in this manner, you enhance the organization's functionality and scalability while maintaining a clear and secure structure.
                    </p>
                    <form onSubmit={handleAddMemberSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">DAO Name</label>
                            <input
                                type="text"
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
                                value={memberDaoName}
                                onChange={(e) => setMemberDaoName(e.target.value)}
                            />
                            {formErrors.memberDaoName && <p className="text-red-500 text-sm mt-1">{formErrors.memberDaoName}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Member Wallet Address</label>
                            <input
                                type="text"
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
                                value={memberWallet}
                                onChange={(e) => setMemberWallet(e.target.value)}
                            />
                            {formErrors.memberWallet && <p className="text-red-500 text-sm mt-1">{formErrors.memberWallet}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Member Role</label>
                            <input
                                type="text"
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-800 focus:border-purple-800"
                                value={memberRole}
                                onChange={(e) => setMemberRole(e.target.value)}
                            />
                            {formErrors.memberRole && <p className="text-red-500 text-sm mt-1">{formErrors.memberRole}</p>}
                        </div>
                        <p className="text-gray-700 mb-2"><b>Cost:</b> Free</p>
                        <button
                            type="submit"
                            className="mx-auto block text-white bg-pink-300 hover:bg-pink-500 font-semibold py-4 px-8 rounded-full shadow-lg border-2 border-purple-800 hover:border-purple-900 transition-colors duration-300"
                        >
                            Add Member
                        </button>
                    </form>
                </div>
            );
        }
    };

    return(
        <div className='bg-gradient-radial min-h-screen flex flex-col items-center justify-center pt-20 pb-20'>
            <div className='bg-gray-100 border-2 border-purple-800 shadow-lg rounded-3xl p-8 w-full max-w-4xl' style={{ marginTop: '20px', marginBottom: '20px', maxWidth: '65%' }}>
                <h2 className='mb-4 max-w-lg font-bold mx-auto text-xl text-center' style={{ color: '#ff5467'}}>
                    DAO
                </h2>
                <h1 className="text-4xl font-bold mb-4 text-center" style={{ color: '#312e81' }}>DAO Management</h1>
                <div className="flex mb-4">
                    <button
                        onClick={() => setActiveTab('create')}
                        className={`flex-1 text-center py-2 ${activeTab === 'create' ? 'bg-purple-800 text-white' : 'bg-gray-200 text-gray-800'} rounded-l-3xl`}
                    >
                        Create Organization
                    </button>
                    <button
                        onClick={() => setActiveTab('add')}
                        className={`flex-1 text-center py-2 ${activeTab === 'add' ? 'bg-purple-800 text-white' : 'bg-gray-200 text-gray-800'} rounded-r-3xl`}
                    >
                        Add Member
                    </button>
                </div>
                <div>
                    {renderTabContent()}
                </div>
            </div>
        </div>
    ); 
}; 

export default Dao;
