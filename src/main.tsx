import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router';

import AuthProvider from './contexts/AuthContext.tsx';
import BurgerMenuProvider from './contexts/BurgerMenuContext.tsx';

import './styles/main.scss';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <BurgerMenuProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </BurgerMenuProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
);
