import { ENDPOINT } from '../env-variables';
import axios from './axios';

export const getAll = async () => {
  const body = {};

  try {
    const response = await axios.post(`${ENDPOINT}users/search`, body);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
