import React from 'react'; 
import ReactDOM from 'react-dom'; 
import { WalletProvider } from '@suiet/wallet-kit';
import App from './App';
import '@suiet/wallet-kit/style.css';

ReactDOM.render(
    <WalletProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </WalletProvider>,
    document.getElementById('root')
); 
