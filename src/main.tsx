import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store.ts';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
          <Toaster
            richColors
            position="top-right"
            duration={5000}
            offset={{
              top: 110,
              right: 10,
            }}
          />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
