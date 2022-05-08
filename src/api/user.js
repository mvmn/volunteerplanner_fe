import { ENDPOINT } from '../env-variables';
import axios from './axios';

export const fetchCurrentUser = async () => {
  try {
    const response = await axios.get(`${ENDPOINT}/api/v1/users/current`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};