import { TransactionBlock } from '@mysten/sui.js/transactions'; 

export const PACKAGE_ID = '0xf91c41dc26a26884a578c1a13c53fa4b3c45251d7b2f3c85611b1d558d2ac904'; 

export const mintCertificate = (props: {
    txb: TransactionBlock; 
    age: boolean;  
    country: string;  
    password: string; 
}) => {
    const { txb } = props; 
    const certificate = txb.moveCall({
        target: `${PACKAGE_ID}::certificate::claim_certificate`, 
        arguments: [
            txb.pure(props.age), 
            txb.pure(props.country), 
        ],
    }); 
    return certificate; 
}; 
