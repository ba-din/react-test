import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    Authorization: 'Bearer ee04f896-fc73-4115-afe3-924f3e0e87a0'
  },
});
