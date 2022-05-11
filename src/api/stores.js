import { ENDPOINT } from '../env-variables';
import axios from './axios';

export const fetchStores = async query => {
  try {
    const response = await axios.post(`${ENDPOINT}/api/v1/stores/search`, query);

    return response.data;
  } catch (e) {
    console.log(e);
  }
};
