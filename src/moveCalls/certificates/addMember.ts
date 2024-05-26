import { TransactionBlock } from "@mysten/sui.js/transactions";
import { PACKAGE_ID, MINT_WALLET_ADDRESS } from '../../config/constants'; 
import { useWallet } from '@suiet/wallet-kit'; 
import { useHistory } from "react-router-dom";

export const useAddMember = () => {
    const { address, signAndExecuteTransactionBlock } = useWallet(); 
    const history = useHistory(); 

    const addMember = async({ owner_cert, user, role }) => {
        if (!address) {
            console.error('Wallet not connected'); 
            return; 
        }

        const memTxn = new TransactionBlock(); 

        const [coin] = memTxn.splitCoins(memTxn.gas, [memTxn.pure(1000)]); 
        const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms)); 
        memTxn.transferObjects([coin], memTxn.pure(MINT_WALLET_ADDRESS));

        memTxn.moveCall({
            target: `${PACKAGE_ID}::dao_certificate::grant_role`, 
            arguments: [
                memTxn.pure(owner_cert), 
                memTxn.pure(user),  
                memTxn.pure(role)
            ],
        }); 

        try {
            const result = await signAndExecuteTransactionBlock({
                transactionBlock: memTxn,
            });

            await wait(5000);
    
            if (result) {
                const txId = result.digest; 
                const url = `https://suiexplorer.com/txblock/${txId}?network=testnet`;
                console.log(url);
    
                history.push({
                    pathname: '/member-success',
                    state: { txId, url }
                });
            } else {
                console.error('Transaction failed or result is unexpected:', result);
            }
        } catch (e) {
            console.error('Error submitting transaction:', e);
        }
    }; 

    return { addMember }; 
}; 