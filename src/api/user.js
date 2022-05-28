import { ENDPOINT } from '../env-variables';
import axios from './axios';

export const fetchCurrentUser = async () => {
  try {
    const response = await axios.get(`${ENDPOINT}/api/v1/users/current`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const updateCurrentUser = async user => {
  try {
    const response = await axios.put(`${ENDPOINT}/api/v1/users/current`, user);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const requestPhoneVerificationSMS = async () => {
  try {
    const response = await axios.get(`${ENDPOINT}/api/v1/users/current/sms`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const verifyCurrentPhoneByCode = async ({ code }) => {
  try {
    const response = await axios.post(`${ENDPOINT}/api/v1/users/current/sms`, { code });

    return response.data;
  } catch (error) {
    if (error.response?.status === 400) {
      return { error: 'invalidCode' };
    }
    console.log(error);
  }
};
