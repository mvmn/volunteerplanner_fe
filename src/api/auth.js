import axios from 'axios';

import { ENDPOINT } from '../env-variables';

export const authenticate = async ({ password, phoneNumber }) => {
  try {
    const response = await axios.post(
      `${ENDPOINT}authenticate`,
      JSON.stringify({
        principal: phoneNumber,
        password
      }),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const responseBody = response.data;
    return responseBody;
  } catch (e) {
    console.log(e);
  }
};
