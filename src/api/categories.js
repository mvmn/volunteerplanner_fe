import { ENDPOINT } from '../env-variables';
import axios from './axios';

export const getRootCategories = async () => {
  try {
    const response = await axios.get(`${ENDPOINT}/api/v1/categories/roots`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
