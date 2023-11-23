import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
let persistor = persistStore(store)

function Root() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
        <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}

root.render(<Root />);


