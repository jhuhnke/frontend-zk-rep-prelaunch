import { TransactionBlock } from "@mysten/sui.js/transactions";
import { PACKAGE_ID, MINT_WALLET_ADDRESS } from '../../config/constants'; 
import { useWallet } from '@suiet/wallet-kit'; 
import { useHistory } from "react-router-dom";

export const useIdentityCert = () => {
    const { address, signAndExecuteTransactionBlock } = useWallet(); 
    const history = useHistory(); 

    const identityCert = async ({ isOver18, country, imageUrl }) => {
        if (!address) {
            console.error('Wallet not connected'); 
            return; 
        }

        const idenTxn = new TransactionBlock(); 

        const [coin] = idenTxn.splitCoins(idenTxn.gas, [idenTxn.pure(1000)]); 
        const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms)); 
        idenTxn.transferObjects([coin], idenTxn.pure(MINT_WALLET_ADDRESS));

        idenTxn.moveCall({
            target: `${PACKAGE_ID}::identity_certificate::mint`, 
            arguments: [
                idenTxn.pure(isOver18), 
                idenTxn.pure(country),  
                idenTxn.pure(imageUrl),
            ],
        }); 

        try {
            const result = await signAndExecuteTransactionBlock({
                transactionBlock: idenTxn,
            });

            //await wait(5000);
    
            if (result) {
                const txId = result.digest; 
                const url = `https://suiexplorer.com/txblock/${txId}?network=testnet`;
                console.log(url);
    
                history.push({
                    pathname: '/identity-success',
                    state: { imageUrl: imageUrl, txId }
                });
            } else {
                console.error('Transaction failed or result is unexpected:', result);
            }
        } catch (e) {
            console.error('Error submitting transaction:', e);
        }
    };

    return { identityCert }; 
};
