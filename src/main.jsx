import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import SecretSanta from './SecretSanta';

/*
React: Creates and manages the app.
Redux Provider: Wraps the app so components can access the Redux store.
Store: Contains the centralized state for the app.
*/

const root = ReactDOM.createRoot(document.getElementById('root'));

/*

-<Provider store={store}>:
  *This wraps the app to connect Redux to React.
  *Any component inside <Provider> can now use the Redux store to manage and share state.
-<App />:
  *This is the main component of my app.
*/
root.render(
  <Provider store={store}>
    <SecretSanta />
  </Provider>
);

