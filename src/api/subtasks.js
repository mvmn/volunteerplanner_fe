import { ENDPOINT } from '../env-variables';
import axios from './axios';

export const getSubtasksByTaskId = async taskId => {
  try {
    const response = await axios.get(`${ENDPOINT}/api/v1/subtasks/search`, { params: { taskId } });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
