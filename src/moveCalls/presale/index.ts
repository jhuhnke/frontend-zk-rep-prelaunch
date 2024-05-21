import { useState, useEffect } from 'react';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import {
    PRESALE_PACKAGE_ID_TESTNET, 
    PRESALE_PACKAGE_PASS_CAP, 
    MINT_WALLET_ADDRESS
} from '../../config/constants'; 
import { useWallet } from '@suiet/wallet-kit';
import { useHistory } from 'react-router-dom';

export const useMintPass = () => {
    const { address, signAndExecuteTransactionBlock } = useWallet();
    const history = useHistory();

    const mintPass = async () => {
        if (!address) {
            console.error('Wallet not connected');
            return;
        }

        // ===== Mint Transaction Block =====
        const mintTxn = new TransactionBlock();
        
        // ===== Payment =====
        const [coin] = mintTxn.splitCoins(mintTxn.gas, [mintTxn.pure(1000)]); 
        const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms)); 
        mintTxn.transferObjects([coin], mintTxn.pure(MINT_WALLET_ADDRESS)); 

        // ===== Mint NFT =====
        mintTxn.moveCall({
            target:`${PRESALE_PACKAGE_ID_TESTNET}::minter::mint`, 
            arguments: [
                mintTxn.pure(PRESALE_PACKAGE_PASS_CAP), 
                mintTxn.pure('zkrep.xyz'), 
                mintTxn.pure(address)
            ],
        }); 

        try {
            const result = await signAndExecuteTransactionBlock({
                transactionBlock: mintTxn, 
            }); 

            if (result) {
                const txId = result.digest; 
                const url = `https://suiscan.xyz/testnet/tx/${txId}`; 
                console.log(url); 
                
                // Redirect to success page
                history.push({
                    pathname: '/presale-success', 
                    state: { txId }
                });  
            } else {
                console.error("Transaction Failed or Result is Unexpected: ", result); 
            }
        } catch (e) {
            console.error("Error Submitting Transaction: ", e); 
        }
    };

    return { mintPass };
};