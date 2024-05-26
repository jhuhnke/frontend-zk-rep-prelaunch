import { TransactionBlock } from "@mysten/sui.js/transactions";
import { PACKAGE_ID, MINT_WALLET_ADDRESS } from '../../config/constants'; 
import { useWallet } from '@suiet/wallet-kit'; 
import { useHistory } from "react-router-dom";

export const useSocialCert = () => {
    const { address, signAndExecuteTransactionBlock } = useWallet(); 
    const history = useHistory(); 

    const socialCert = async ({platform, username, userId, image}) => {
        if (!address) {
            console.error('Wallet not connected'); 
            return; 
        }

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
                const txId = result.digest;
                const imageUrl = image; 
                const url = `https://suiexplorer.com/txblock/${txId}?network=testnet`;
                console.log(url);
    
                history.push({
                    pathname: '/social-success',
                    state: { imageUrl, txId }
                });
            } else {
                console.error('Transaction failed or result is unexpected:', result);
            }
        } catch (e) {
            console.error('Error submitting transaction:', e);
        }

    }; 

    return { socialCert }; 
}