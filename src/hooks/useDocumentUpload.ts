import { useState } from 'react';
import Tesseract from 'tesseract.js'; 
import { COUNTRIES } from '../config/countries'; 

export const useDocumentUpload = (setCountry, checkIfOver18) => {
    const [isDocumentProcessed, setIsDocumentProcessed] = useState(false);

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
                const origWidth = img.width;
                const origHeight = img.height;

                const scaleFactor = 5;

                const scaledWidth = origWidth * scaleFactor;
                const scaledHeight = origHeight * scaleFactor;

                const canvas = document.createElement('canvas');
                canvas.width = scaledWidth;
                canvas.height = scaledHeight;

                const ctx = canvas.getContext('2d');

                if (!ctx) {
                    console.error('Unable to get canvas context');
                    return;
                }

                ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

                Tesseract.recognize(
                    canvas,
                    'eng',
                    { logger: m => console.log(m) }
                ).then(({ data: { text } }) => {
                    console.log(text);
    
                    const lines = text.split('\n').filter(line => line.trim() !== '');
                    const lastLine = lines[lines.length - 1];
    
                    const countryCodeAndBirthdatePattern = /([A-Z]{3})(\d{6})/;
                    const match = lastLine.match(countryCodeAndBirthdatePattern);
    
                    if (match) {
                        const [, countryCode, birthdate] = match;
    
                        const year = parseInt(birthdate.slice(0, 2), 10);
                        const month = parseInt(birthdate.slice(2, 4), 10) - 1;
                        const day = parseInt(birthdate.slice(4, 6), 10);
    
                        const currentYear = new Date().getFullYear();
                        const century = year <= currentYear % 100 ? 2000 : 1900;
                        const fullYear = century + year;
    
                        const birthdateObj = new Date(fullYear, month, day);
                        checkIfOver18(birthdateObj);

                        if (COUNTRIES[countryCode]) {
                            const countryName = COUNTRIES[countryCode];
                            setCountry(countryName);
                            console.log(`Country found: ${countryName} (${countryCode})`);
                        } else {
                            console.log("Country code not found in predefined list.");
                        }
                    } else {
                        console.log("No valid country code and birthdate found in the text.");
                    }
                    setIsDocumentProcessed(true); 
                }).catch(error => {
                    console.error('OCR processing failed', error);
                });
            };

            img.src = URL.createObjectURL(file);
        }
    };

    return { isDocumentProcessed, handleDocumentUpload };
};