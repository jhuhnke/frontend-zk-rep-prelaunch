import React, { FC, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useHistory } from 'react-router-dom';
import '../stylesheets/MintSocialCredentialSignedIn.css';
import { TransactionBlock } from '@mysten/sui.js/transactions';  
import { useWallet } from '@suiet/wallet-kit';
import Footer from './Footer';
import NavBar from './NavBar';
import { PACKAGE_ID } from '../config/constants'; 

interface User {
  app_metadata: {
    provider: string;
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

const MintSocialCredentialSignedIn: FC = () => {
    const { address, signAndExecuteTransactionBlock } = useWallet(); 
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
                setUser(user);
            }
        }
        getUserData();
    }, []); 

    async function signOutUser() {
        const { error } = await supabase.auth.signOut(); 
        if (!error) {
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
        return 'ipfs://bafkreihaxb7pe54psv6hqvhlinhzkc67yhyi4cygqrngiaceqi3xrfbgda'; 
    };

    const handleMint = async () => {
        if (!address) {
            alert("Please Connect Your Wallet First");
            return;
        }
        
        // ===== Grabs User Info =====
        const platform = user?.app_metadata.provider.toUpperCase() || 'Unknown Platform';
        const username = displayUsername(); 
        const userId = userIdentityId(); 
        const image = getAvatarUrl(); 

        // ===== Handle submission / PTB =====
        const txb = new TransactionBlock(); 

        // ===== 1000 MIST Transfer for Testing =====
        const [coin] = txb.splitCoins(txb.gas, [txb.pure(1000)]); 

        const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        // ===== Need to change wallet here in future =====
        txb.transferObjects([coin], txb.pure("0x8e0a2135568a5ff202aa0b78a7f3113fc8b68b65d4b5143261f723cc445d9809")); 
        txb.moveCall({
            target: `${PACKAGE_ID}::social_certificate::mint`, 
            arguments: [
                txb.pure(platform), 
                txb.pure(username),  
                txb.pure(userId), 
                txb.pure(image),
            ],
        }); 

        try {
            const result = await signAndExecuteTransactionBlock({
                transactionBlock: txb,
            });

            await wait(5000);
    
            if (result) {
                const txId = result.digest; // Using the digest as the transaction ID
                const url = `https://suiexplorer.com/txblock/${txId}?network=testnet`;
                console.log(url);
    
                // Redirecting only after the transaction is successfully submitted
                history.push({
                    pathname: '/success',
                    state: { url }
                });
            } else {
                // Handle cases where the transaction result might not be as expected
                console.error('Transaction failed or result is unexpected:', result);
            }
        } catch (e) {
            console.error('Error submitting transaction:', e);
        }
        
        //alert(`Minting credential\nPlatform: ${platform}\nUsername: ${username}\nUser ID: ${userId}`);
    }; 

    return (
        <div className='signed-in-wrapper'>
            <NavBar />
            <div className="mint-container">
                <div className='signed-in-card'>
                    <h1>Logged In Success</h1>
                    <div>
                        <p>Logged in with: {user?.app_metadata.provider.toUpperCase()}</p>
                        <p>Username: {user?.user_metadata.full_name || user?.user_metadata.preferred_username || 'Unknown'}</p>
                        <p>User ID: {user?.identities?.[0]?.id || 'Unknown ID'}</p>
                        {user?.user_metadata.avatar_url && (
                            <img src={user.user_metadata.avatar_url} alt="Profile" className='pfp' style={{ height: 100 }} />
                        )}
                    </div>
                    <div className="button-container">
                        <button onClick={handleMint} className="signed-in-button">Mint Credential</button>
                        <button onClick={signOutUser} className="signed-in-button">Sign Out</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MintSocialCredentialSignedIn;