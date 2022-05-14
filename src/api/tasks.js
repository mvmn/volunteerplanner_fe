import { ENDPOINT } from '../env-variables';
import axios from './axios';

export const fetchTasks = async tasksQuery => {
  try {
    const response = await axios.post(`${ENDPOINT}/api/v1/tasks/search`, tasksQuery);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getTaskById = async taskId => {
  try {
    const response = await axios.get(`${ENDPOINT}/api/v1/tasks/${taskId}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
