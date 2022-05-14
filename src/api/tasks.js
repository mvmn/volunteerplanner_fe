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

export const getTasksByIds = async taskIds => {
  try {
    const response = await axios.get(`${ENDPOINT}/api/v1/tasks/search`, {
      params: { ids: taskIds.join(',') }
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
