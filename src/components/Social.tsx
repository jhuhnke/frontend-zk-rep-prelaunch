import React, { FC, useState, useEffect } from 'react';
import { supabase } from '../hooks/supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { useHistory } from 'react-router-dom';
import { useWallet } from '@suiet/wallet-kit';
import { useSocialCert } from '../moveCalls/certificates/social';
import '../stylesheets/Social.css';

interface User {
    app_metadata: {
        provider?: string; 
    };
    user_metadata: {
        full_name?: string;
        preferred_username?: string;
        avatar_url?: string;
    };
    identities?: Array<{
        id: string;
    }>;
}

const Social: FC = () => {
    const { socialCert } = useSocialCert(); 
    const { address } = useWallet(); 
    const history = useHistory(); 
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function getUserData() {
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error) {
                console.error('Error fetching user:', error.message);
                return;
            }

            if (user) {
                console.log(user);
                setUser(user as User);
            }
        }
        getUserData();
    }, []); 

    async function signOutUser() {
        const { error } = await supabase.auth.signOut(); 
        if (!error) {
            setUser(null);
            history.push('/'); 
        }
    }

    const displayUsername = () => {
        const provider = user?.app_metadata.provider;
        if (provider === 'discord') {
            return user?.user_metadata.full_name || 'Unknown';
        } else if (provider === 'github') {
            return user?.user_metadata.preferred_username || 'Unknown';
        }
        return 'Unknown';
    };

    const userIdentityId = () => {
        return user?.identities?.[0]?.id || 'Unknown ID';
    };

    const getAvatarUrl = () => {
        return user?.user_metadata.avatar_url || 'ipfs://bafkreihaxb7pe54psv6hqvhlinhzkc67yhyi4cygqrngiaceqi3xrfbgda'; 
    };

    const handleMint = async () => {
        if (!address) {
            alert("Please Connect Your Wallet First");
            return;
        }
        
        // ===== Grabs User Info =====
        const platform = user?.app_metadata.provider?.toUpperCase() || 'Unknown Platform';
        const username = displayUsername(); 
        const userId = userIdentityId(); 
        const image = getAvatarUrl(); 

        await socialCert({ platform, username, userId, image });
    }; 

    return (
        <div className='bg-gradient-radial min-h-screen flex flex-col items-center justify-center pt-20'>    
            <div className="flex-grow flex flex-col items-center justify-center p-4">
                {!user ? (
                    <div className='bg-gray-100 border-2 border-purple-800 shadow-lg rounded-3xl p-8'>
                        <h2 className='mb-4 max-w-lg font-bold mx-auto text-xl text-center' style={{ color: '#ff5467'}}>
                            Social
                        </h2>
                        <h1 className="text-4xl font-bold mb-4 text-center" style={{ color: '#312e81' }}>Link Your Social Media Accounts</h1>
                        <p className="mb-4 text-center text-gray-700">Connect your social media account to create a unique identity credential that verifies ownership over your online presence.</p>
                        <div className="flex flex-col items-center w-full">
                            <Auth
                                supabaseClient={supabase}
                                theme="light"
                                providers={["discord", "github", "twitter"]}
                                redirectTo={`${window.location.origin}/social`}
                                onlyThirdPartyProviders={true}
                            />
                        </div>
                    </div>
                ) : (
                    <div className='bg-gray-100 border-4 border-purple-800 shadow-lg rounded-3xl p-8'>
                        <h2 className='mb-4 max-w-lg font-bold mx-auto text-xl text-center' style={{ color: '#ff5467'}}>
                            Social
                        </h2>
                        <h1 className="text-4xl font-bold mb-4 text-center" style={{ color: '#312e81' }}>Logged In Success</h1>
                        <div>
                            <p><b>Logged in with:</b> {user.app_metadata.provider?.toUpperCase()}</p>
                            <p><b>Username:</b> {user.user_metadata.full_name || user.user_metadata.preferred_username || 'Unknown'}</p>
                            <p><b>User ID:</b> {user.identities?.[0]?.id || 'Unknown ID'}</p>
                            {user.user_metadata.avatar_url && (
                                <img
                                    src={user.user_metadata.avatar_url}
                                    alt="Profile"
                                    className='pfp mx-auto mt-4 border-2 border-purple-800 rounded-3xl'
                                    style={{ height: 100 }}
                                />
                            )}
                        </div>
                        <p className="text-gray-700 mb-2"><b>Cost:</b> 20 SUI</p>
                        <div className="flex justify-center mt-4">
                            <button onClick={handleMint} className="mx-auto mr-2 block text-white bg-pink-300 hover:bg-pink-500 font-semibold py-4 px-8 mx-2 rounded-full shadow-lg border-2 border-purple-800 hover:border-purple-900 transition-colors duration-300">Mint Credential</button>
                            <button onClick={signOutUser} className="mx-auto ml-2 block text-white bg-pink-300 hover:bg-pink-500 font-semibold py-4 px-8 mx-2 rounded-full shadow-lg border-2 border-purple-800 hover:border-purple-900 transition-colors duration-300">Sign Out</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Social;