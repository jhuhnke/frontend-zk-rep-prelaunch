import { useState } from 'react';

export const useCheckIfOver18 = () => {
    const [isOver18, setIsOver18] = useState(false);

    const checkIfOver18 = (birthDate: Date) => {
        const today = new Date();
        const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        setIsOver18(birthDate <= eighteenYearsAgo);
    };

    return { isOver18, checkIfOver18 };
};
