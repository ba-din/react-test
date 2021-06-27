import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
});
