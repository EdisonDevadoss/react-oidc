import React, { useState } from 'react';
import { useAuth } from 'react-oidc-context';
import './App.css';

import { authToken } from './http';

function App() {
  const auth = useAuth();
  const [userInfo, setUserInfo] = useState(null);

  switch (auth.activeNavigator) {
    case 'signinSilent':
      return <div>Signing you in...</div>;
    case 'signoutRedirect':
      return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }
  console.log('---------user', auth.user);

  const verifyToken = async () => {
    console.log('-verify token is called');
    const token = auth.user.access_token;
    const user = await authToken(token);
    console.log('user', user.data);
    if (user.data) {
      setUserInfo(user.data.email);
    }
  };

  return (
    <div>
      <div className="App-header"></div>
      <div className="view">
        {auth.isAuthenticated ? (
          <div className="view-buttons">
            Hello {auth.user?.profile.name}{' '}
            {userInfo ? userInfo : null}
            <button
              className="button"
              style={{ backgroundColor: 'green' }}
              onClick={verifyToken}
            >
              GET API
            </button>
            <button
              className="button"
              style={{ backgroundColor: 'royalblue' }}
              onClick={() => void auth.removeUser()}
            >
              Log out
            </button>
          </div>
        ) : (
          <button
            className="button"
            style={{ backgroundColor: 'blue' }}
            onClick={() => void auth.signinRedirect()}
          >
            Log in
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
