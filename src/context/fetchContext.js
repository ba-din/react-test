import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './authContext';
import { useHistory, withRouter } from 'react-router-dom';

const FetchContext = createContext();
const { Provider } = FetchContext;

const FetchProvider = ({ children }) => {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_SERVER,
  });

  api.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${authContext.authState.accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const code = error && error.response ? error.response.status : 0;
      if (code === 401 || code === 403) {
        console.log('error code', code);
        history.push('/login');
      }
      return Promise.reject(error);
    }
  );

  const authFetch = api;

  return (
    <Provider
      value={{
        authFetch,
      }}
    >
      {children}
    </Provider>
  );
};

const routWithFetchProvider = withRouter(FetchProvider);

export { FetchContext, routWithFetchProvider };
