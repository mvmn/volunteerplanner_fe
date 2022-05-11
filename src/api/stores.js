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

export const createStore = async store => {
  try {
    const response = await axios.post(`${ENDPOINT}/api/v1/stores`, store);

    return response.data;
  } catch (e) {
    console.log(e);
  }
};
