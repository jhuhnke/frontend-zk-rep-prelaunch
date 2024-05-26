import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';

const client = new SuiClient({
    url: getFullnodeUrl('testnet'),
});

// Function to fetch DAO Owner Certificates
export const fetchDaoOwnerCertificates = async (walletAddress: string) => {
    const ownedObjects = await client.getOwnedObjects({
        owner: walletAddress,
    });

    const daoOwnerCerts: any[] = [];

    for (const obj of ownedObjects.data) {
        const objectId = obj.data?.objectId;
        if (!objectId) {
            continue;
        }

        const objectData = await client.getObject({
            id: objectId,
            options: {
                showType: true,
                showOwner: true,
                showPreviousTransaction: true,
                showDisplay: true,
                showContent: true,
                showBcs: false,
                showStorageRebate: true,
            }
        });

        if (objectData?.data?.type === '0x9c71f6c97a4d292ecf6ccda55a35473c6bd03fcc048abfa40b6ffd793b50cd23::dao_certificate::DaoOwnerCert') {
            console.log(objectData.data?.content)
            daoOwnerCerts.push(objectData.data?.content);
        }
    }

    return daoOwnerCerts;
};

// Function to find a matching DAO Owner Certificate by name
export const findDaoOwnerCertByName = (daoOwnerCerts: any[], daoName: string) => {
    return daoOwnerCerts.find(cert => cert.fields?.name === daoName);
};