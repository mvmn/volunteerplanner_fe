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

export const getSubtasks = async searchRequest => {
  try {
    const response = await axios.post(`${ENDPOINT}/api/v1/subtasks/search`, searchRequest);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
