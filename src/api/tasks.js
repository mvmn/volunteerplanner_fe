import { ENDPOINT } from '../env-variables';
import axios from './axios';

export const fetchTasks = async ({ queryKey }) => {
  try {
    const response = await axios.post(`${ENDPOINT}/api/v1/tasks/search`, queryKey[1]);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
