import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import { BrowserRouter } from 'react-router';

import './styles/main.scss';
import App from './App.tsx';
import BurgerMenuProvider from './contexts/BurgerMenuContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BurgerMenuProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BurgerMenuProvider>
    </HelmetProvider>
  </StrictMode>,
);
