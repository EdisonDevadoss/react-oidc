import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { AuthProvider } from 'react-oidc-context';

const oidcConfig = {
  authority: 'https://keycloak.codingtown.com:8443/realms/matrix',
  client_id: 'react-frontend',
  redirect_uri: 'http://localhost:3000/signin-callback.html',
  response_type: 'code',
  scope: 'openid profile message_read'
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider {...oidcConfig}>
    <App />
  </AuthProvider>
);
