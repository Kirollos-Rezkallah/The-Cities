import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import ErrorMessage from './components/error-message/errorMessage';
import { Provider } from 'react-redux';
import { store } from './TheStore';
import { fetchOffersAction, checkAuthAction } from './TheStore/apiAction';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App />
    </Provider>
  </React.StrictMode>
);
