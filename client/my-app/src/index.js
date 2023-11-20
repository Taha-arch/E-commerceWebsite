import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
<<<<<<< HEAD

=======
>>>>>>> 39e7ad7467c41d87e7924d9c7b708d9a7e00d5ff
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
<<<<<<< HEAD
        <App />
=======
      <App />
>>>>>>> 39e7ad7467c41d87e7924d9c7b708d9a7e00d5ff
    </Provider>
  </React.StrictMode>
);
