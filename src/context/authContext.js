import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AUTH_INFO = 'auth';

const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [authState, setAuthState] = useState({});

  useEffect(() => {
    const auth = localStorage.getItem(AUTH_INFO);

    setAuthState({
      auth: auth ? JSON.parse(auth) : {},
    });
  }, []);

  useEffect(() => {
    const auth = localStorage.getItem(AUTH_INFO);
    const authInfo = auth ? JSON.parse(auth) : null

    setAuthState({...authInfo});
  }, []);

  const logout = () => {
    // localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(AUTH_INFO);
    setAuthState({});
    history.push('/login');
  };

  const setAuthInfo = (auth) => {
    localStorage.setItem(AUTH_INFO, JSON.stringify(auth));

    setAuthState({
      ...auth
    });
  };

  const isAuthenticated = () => {
    return authState && authState.accessToken && authState.expiredAt ? true : false
  };

  const isExpired = () => {
    if (
      authState &&
      authState.accessToken &&
      authState.expiredAt &&
      new Date().getTime() > new Date(authState.expiredAt).getTime()
    ) {
      logout();
      return true;
    }
    return false;
  }

  return (
    <Provider
      value={{
        logout,
        authState,
        isAuthenticated,
        isExpired,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthProvider, AuthContext };
