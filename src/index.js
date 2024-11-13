import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-clkrligodugy76hh.us.auth0.com"
    clientId="BNw2sNTBxKfGKizV5YrlX8OLuXAOVq8i"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "http://localhost:5000/api/",
      scope: "openid profile email read:lists read:details write:details" //openid profile email added by doha for experimenting
    }}
    // cacheLocation='localstorage'
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>

  </Auth0Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
