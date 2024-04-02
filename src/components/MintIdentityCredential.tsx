import React, { FC, useState } from 'react';
import { TransactionBlock } from '@mysten/sui.js/transactions';  
import { useWallet, useSuiProvider } from '@suiet/wallet-kit';
import { toast } from 'react-toastify';
import { PACKAGE_ID } from '../config/constants'; 
import { useHistory } from 'react-router-dom'; 
import Tesseract from 'tesseract.js'; 
import { COUNTRIES } from '../config/countries'; 
import Footer from './Footer';
import NavBar from './NavBar';
import '../stylesheets/MintIdentityCredential.css'; 


const MintIdentityCredential: FC = () => {
    const { address, signAndExecuteTransactionBlock } = useWallet(); 

    const[password, setPassword] = useState(''); 
    const [country, setCountry] = useState(''); 
    const [isOver18, setIsOver18] = useState(false); 
    const [isDocumentProcessed, setIsDocumentProcessed] = useState(false); 

    const image_url = 'ipfs://bafkreihaxb7pe54psv6hqvhlinhzkc67yhyi4cygqrngiaceqi3xrfbgda'; 

    const history = useHistory(); 

    function checkIfOver18(birthDate) {
        const today = new Date();
        const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        return birthDate <= eighteenYearsAgo;
    }

    const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const allowedTypes = ['image/jpeg', 'image/png'];

            if (!allowedTypes.includes(file.type)) {
                alert("Please upload an image of type .jpg or .png");
                return;
            }

            const img = new Image();
            img.onload = async () => {
                // Original image dimensions
                const origWidth = img.width;
                const origHeight = img.height;

                // Scale factor (500%)
                const scaleFactor = 5;

                // Scaled dimensions
                const scaledWidth = origWidth * scaleFactor;
                const scaledHeight = origHeight * scaleFactor;

                // Create a canvas and scale the image
                const canvas = document.createElement('canvas');
                canvas.width = scaledWidth;
                canvas.height = scaledHeight;

                const ctx = canvas.getContext('2d');

                // Ensure context and canvas are valid
                if (!ctx) {
                    console.error('Unable to get canvas context');
                    return;
                }

                // Draw the scaled image
                ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

                // Perform OCR on the scaled image
                Tesseract.recognize(
                    canvas,
                    'eng',
                    { logger: m => console.log(m) }
                ).then(({ data: { text } }) => {
                    console.log(text);
    
                    // Extracting the country code and birthdate from the last line
                    const lines = text.split('\n').filter(line => line.trim() !== '');
                    const lastLine = lines[lines.length - 1];
    
                    const countryCodeAndBirthdatePattern = /([A-Z]{3})(\d{6})/;
                    const match = lastLine.match(countryCodeAndBirthdatePattern);
    
                    if (match) {
                        const [, countryCode, birthdate] = match;
    
                        // Parsing birthdate and checking if over 18
                        const year = parseInt(birthdate.slice(0, 2), 10);
                        const month = parseInt(birthdate.slice(2, 4), 10) - 1; // JavaScript months are 0-indexed
                        const day = parseInt(birthdate.slice(4, 6), 10);
    
                        // Determine the century
                        const currentYear = new Date().getFullYear();
                        const century = year <= currentYear % 100 ? 2000 : 1900;
                        const fullYear = century + year;
    
                        const birthdateObj = new Date(fullYear, month, day);
                        const isOver18 = checkIfOver18(birthdateObj);
                        setIsOver18(isOver18);
    
                        // Updating country state
                        if (COUNTRIES[countryCode]) {
                            const countryName = COUNTRIES[countryCode];
                            setCountry(countryName);
                            console.log(`Country found: ${countryName} (${countryCode})`);
                            console.log(`Birthdate: ${birthdateObj.toISOString().split('T')[0]}, Over 18: ${isOver18}`);
                        } else {
                            console.log("Country code not found in predefined list.");
                        }
                    } else {
                        console.log("No valid country code and birthdate found in the text.");
                    }
                    // ===== Enables the mint button =====
                    setIsDocumentProcessed(true); 
                }).catch(error => {
                    console.error('OCR processing failed', error);
                });
            };

            img.src = URL.createObjectURL(file);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        // ===== Too annoying - throw only after mint is clicked =====
        //if(userAddress == undefined) {
        //    toast('Wallet is not connected', {autoClose: 2000, type: 'error', position:'bottom-right'});
        //    return;
        //}
        if(!address) {
            alert("Please Connect Your Wallet First"); 
            return; 
        }

        alert(`Form submitted:\nPassword: ${password}\nCountry: ${country}\nOver 18: ${isOver18}`);

        // ===== Handle submission / PTB here =====
        const txb = new TransactionBlock(); 

        // ===== 1000 MIST Transfer for Testing =====
        const [coin] = txb.splitCoins(txb.gas, [txb.pure(1000)]); 

        const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        // ===== Change the wallet address here to be protocol controlled wallet before mainnet launch =====
        txb.transferObjects([coin], txb.pure("0x8e0a2135568a5ff202aa0b78a7f3113fc8b68b65d4b5143261f723cc445d9809")); 
        txb.moveCall({
            target: `${PACKAGE_ID}::identity_certificate::claim_certificate`, 
            arguments: [
                txb.pure(isOver18), 
                txb.pure(country),  
                txb.pure(password), 
                txb.pure(image_url),
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
    };

    return (
        <div className='mint-id-wrapper'>
            <NavBar />
            <div className="container">
                <div className='form-card'>
                    <h1>Mint Identity Credential</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="documentUpload">Upload Passport Photo:</label>
                            <div className="file-upload-container">
                                <input
                                    type="file"
                                    id="file-upload"
                                    className="file-upload-input"
                                    onChange={handleDocumentUpload} // Your upload handler here
                                    accept="image/jpeg, image/png" // Adjust accepted file types as needed
                                />
                                <label htmlFor="file-upload" className="file-upload-label">Upload Photos</label>
                                <i className="file-upload-icon">📷</i> {/* Replace with your preferred icon */}
                                <div className="file-upload-text">Click to upload or drag and drop</div>
                                <div className="file-upload-size">Max. File Size: 15MB</div>
                            </div>
                        </div>
                        <button type="submit" disabled={!isDocumentProcessed}>Mint Credential</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MintIdentityCredential 