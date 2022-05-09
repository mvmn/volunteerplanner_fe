import axios from 'axios';

import { ENDPOINT } from '../env-variables';

/** Default configs:
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

export default instance;
