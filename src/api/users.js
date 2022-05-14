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

export const getUser = async userId => {
  try {
    const response = await axios.get(`${ENDPOINT}/api/v1/users/${userId}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const verifyUser = async userId => {
  try {
    const response = await axios.put(`${ENDPOINT}/api/v1/users/${userId}/verify/user`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const verifyPhone = async userId => {
  try {
    const response = await axios.put(`${ENDPOINT}/api/v1/users/${userId}/verify/phone`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const lockUser = async userId => {
  try {
    const response = await axios.put(`${ENDPOINT}/api/v1/users/${userId}/lock`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const unlockUser = async userId => {
  try {
    const response = await axios.put(`${ENDPOINT}/api/v1/users/${userId}/unlock`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
