import axios from 'axios';

import { ENDPOINT } from '../env-variables';

export const authenticate = async ({ password, phoneNumber, setLoginError }) => {
  try {
    const response = await axios
      .post(
        `${ENDPOINT}/api/v1/authenticate`,
        JSON.stringify({
          principal: phoneNumber,
          password
        }),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(function (response) {
        if (response.status === 200) {
          const result = response.data;
          result.success = true;
          return result;
        } else {
          return {
            success: false,
            error:
              response.status === 403 || response.status === 401
                ? 'badCredentials'
                : 'unexpectedHttpStatusCode'
          };
        }
      })
      .catch(function (error) {
        console.log('Login error', error);
        var errorKind = 'unknownError';
        if (error.response) {
          // Request made and server responded
          return {
            success: false,
            error:
              error.response.status === 403 || error.response.status === 401
                ? 'badCredentials'
                : 'unexpectedHttpStatusCode'
          };
        } else if (error.request) {
          // The request was made but no response was received
          errorKind = 'noResponse';
        } else {
          // Something happened in setting up the request that triggered an Error
          errorKind = 'requestFailed';
        }
        return { success: false, error: errorKind };
      });
    setLoginError(response.success ? null : response.error);
    return response;
  } catch (e) {
    console.log(e);
  }
};
