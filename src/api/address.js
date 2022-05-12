import { ENDPOINT } from '../env-variables';
import axios from './axios';

export const getRegions = async () => {
  try {
    const response = await axios.get(`${ENDPOINT}/api/v1/address/regions`);

    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const getCitiesByRegionId = async regionId => {
  try {
    const response = await axios.get(`${ENDPOINT}/api/v1/address/regions/${regionId}/cities`);

    return response.data;
  } catch (e) {
    console.error(e);
  }
};
