import { ENDPOINT } from '../env-variables';
import axios from './axios';

export const searchProducts = async query => {
  try {
    const response = await axios.post(`${ENDPOINT}/api/v1/products/search`, query);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const createProduct = async query => {
  try {
    const response = await axios.post(`${ENDPOINT}/api/v1/products`, query);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const updateProduct = async product => {
  try {
    const response = await axios.put(`${ENDPOINT}/api/v1/products/${product.id}`, product);

    return response.data;
  } catch (e) {
    console.error(e);
  }
};
