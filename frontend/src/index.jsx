import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PrivyProvider } from '@privy-io/react-auth';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID} // Store your App ID in .env.local
      config={{
        loginMethods: ['email', 'wallet'],
        appearance: {
          theme: 'dark',
          accentColor: '#676FFF',
          logo: 'https://your-logo-url.com/logo.png',
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PrivyProvider>
  </React.StrictMode>,
);