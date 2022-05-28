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

export const getTaskById = async taskId => {
  try {
    const response = await axios.get(`${ENDPOINT}/api/v1/tasks/${taskId}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const exportTasks = async tasksQuery => {
  try {
    axios
      .post(`${ENDPOINT}/api/v1/tasks/export/xls`, tasksQuery, { responseType: 'blob' })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        const contentDisposition = response.headers['content-disposition'];
        let fileName = 'tasks.xslx';
        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
          if (fileNameMatch.length === 2) fileName = fileNameMatch[1];
        }
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  } catch (e) {
    console.log(e);
  }
};

export const verifyTask = async taskId => {
  try {
    const response = await axios.post(`${ENDPOINT}/api/v1/tasks/${taskId}/verify`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const completeTask = async taskId => {
  try {
    const response = await axios.post(`${ENDPOINT}/api/v1/tasks/${taskId}/complete`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const rejectTask = async taskId => {
  try {
    const response = await axios.post(`${ENDPOINT}/api/v1/tasks/${taskId}/reject`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const createTask = async task => {
  console.log('HANDLE TASK CREATION', task);
};
