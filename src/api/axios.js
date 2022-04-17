import axios from 'axios';

import { ACCESS_TOKEN } from '../constants/uiConfig';
import { ENDPOINT } from '../env-variables';

/** Default confogs:
 * - content-type
 * - URL
 * - token
 */

const defaultOptions = {
  baseURL: ENDPOINT,
  headers: {
    'Content-Type': 'application/json'
  }
};

const instance = axios.create(defaultOptions);

instance.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem(ACCESS_TOKEN);
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default instance;
