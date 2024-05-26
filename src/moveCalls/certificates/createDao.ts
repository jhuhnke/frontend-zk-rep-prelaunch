import { TransactionBlock } from "@mysten/sui.js/transactions";
import { PACKAGE_ID, MINT_WALLET_ADDRESS } from '../../config/constants'; 
import { useWallet } from '@suiet/wallet-kit'; 
import { useHistory } from "react-router-dom";

export const useCreateDao = () => {
    const { address, signAndExecuteTransactionBlock } = useWallet(); 
    const history = useHistory(); 

    const createDao = async({ dao_name, description, webpage_url, image_url }) => {
        if (!address) {
            console.error('Wallet not connected'); 
            return; 
        }

        const daoTxn = new TransactionBlock(); 

        const [coin] = daoTxn.splitCoins(daoTxn.gas, [daoTxn.pure(1000)]); 
        const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms)); 
        daoTxn.transferObjects([coin], daoTxn.pure(MINT_WALLET_ADDRESS));

        daoTxn.moveCall({
            target: `${PACKAGE_ID}::dao_certificate::create_dao`, 
            arguments: [
                daoTxn.pure(dao_name), 
                daoTxn.pure(description),  
                daoTxn.pure(webpage_url), 
                daoTxn.pure(image_url),
            ],
        }); 

        try {
            const result = await signAndExecuteTransactionBlock({
                transactionBlock: daoTxn,
            });

            await wait(5000);
    
            if (result) {
                const txId = result.digest; 
                const url = `https://suiexplorer.com/txblock/${txId}?network=testnet`;
                console.log(url);
    
                history.push({
                    pathname: '/dao-success',
                    state: { url, txId, imageUrl: image_url }
                });
            } else {
                console.error('Transaction failed or result is unexpected:', result);
            }
        } catch (e) {
            console.error('Error submitting transaction:', e);
        }
    }; 

    return { createDao }; 
}; 