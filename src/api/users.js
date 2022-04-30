import { ENDPOINT } from '../env-variables';
import axios from './axios';

export const getAll = async ({ getUsersRequest }) => {
  const body = getUsersRequest;

  try {
    const response = await axios.post(`${ENDPOINT}/api/v1/users/search`, body);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
