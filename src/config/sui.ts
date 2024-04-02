import { getFullnodeUrl, SuiClient } from '@mysten/sui.js/client'; 

// ===== Define Devnet RPC =====
const rpcUrl = getFullnodeUrl('testnet'); 

// ===== Connect =====
export const providerSuiTestnet = () => {
    const client = new SuiClient({ url: rpcUrl }); 
    return client;
}