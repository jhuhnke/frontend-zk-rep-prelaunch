import { TransactionBlock } from "@mysten/sui.js/transactions";
import { PACKAGE_ID, MINT_WALLET_ADDRESS } from '../../config/constants'; 
import { useWallet } from '@suiet/wallet-kit'; 
import { useHistory } from "react-router-dom";

export const useCreditScore = () => {
    const { address, signAndExecuteTransactionBlock } = useWallet(); 
    const history = useHistory(); 

    const creditScore = async({ image_url }) => {
        if (!address) {
            console.error('Wallet not connected'); 
            return; 
        }

        const credTxn = new TransactionBlock(); 

        const [coin] = credTxn.splitCoins(credTxn.gas, [credTxn.pure(1000)]); 
        const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms)); 
        credTxn.transferObjects([coin], credTxn.pure(MINT_WALLET_ADDRESS));

        credTxn.moveCall({
            target: `${PACKAGE_ID}::credit_score_certificate::mint`, 
            arguments: [
                credTxn.pure(image_url)
            ],
        }); 

        try {
            const result = await signAndExecuteTransactionBlock({
                transactionBlock: credTxn,
            });

            await wait(5000);
    
            if (result) {
                const txId = result.digest; 
                const url = `https://suiexplorer.com/txblock/${txId}?network=testnet`;
                console.log(url);
    
                history.push({
                    pathname: '/dao-success',
                    state: { url }
                });
            } else {
                console.error('Transaction failed or result is unexpected:', result);
            }
        } catch (e) {
            console.error('Error submitting transaction:', e);
        }
    }; 

    return { creditScore }; 
}; 