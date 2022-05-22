import { ENDPOINT } from '../env-variables';
import axios from './axios';

export const getConfig = async () =>
  axios
    .get(`${ENDPOINT}/api/v1/config`)
    .then(({ data }) => data)
    .catch(error => {
      console.error(error);
    });
