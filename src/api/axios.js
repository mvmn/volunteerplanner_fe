import axios from 'axios';

import { ENDPOINT } from '../env-variables';

const defaultOptions = {
  baseURL: ENDPOINT,
  headers: {
    'Content-Type': 'application/json'
  }
};

// Create instance
const instance = axios.create(defaultOptions);

// Set the AUTH token for any request
instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('accessToken');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default instance;
