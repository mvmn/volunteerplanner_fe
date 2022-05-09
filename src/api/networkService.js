import { setLoggedOut } from '../actions/user';
import axios from '../api/axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/uiConfig';
import { ENDPOINT } from '../env-variables';

const refreshAccessToken = async refreshToken => {
  try {
    const response = await axios.get(`${ENDPOINT}/api/v1/authenticate`, {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      },
      _isRetryAttempt: true
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

export default {
  _setupInterceptors: store => {
    axios.interceptors.request.use(function (config) {
      const token = sessionStorage.getItem(ACCESS_TOKEN);
      const isLoginRequest = config.url.endsWith('/api/v1/authenticate');
      if (token && !isLoginRequest) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    axios.interceptors.response.use(
      function (response) {
        return response;
      },
      async function (error) {
        const originalRequest = error.config;
        if (
          error &&
          error.response &&
          (error.response.status === 401 || error.response.status === 403) &&
          !originalRequest._isRetryAttempt
        ) {
          const refreshToken = sessionStorage.getItem(REFRESH_TOKEN);
          if (refreshToken) {
            originalRequest._isRetryAttempt = true;
            const refreshAccessTokenResponse = await refreshAccessToken(refreshToken);
            if (refreshAccessTokenResponse && refreshAccessTokenResponse.status === 200) {
              sessionStorage.setItem(ACCESS_TOKEN, refreshAccessTokenResponse.data.accessToken);
              sessionStorage.setItem(REFRESH_TOKEN, refreshAccessTokenResponse.data.refreshToken);
              axios.defaults.headers.common['Authorization'] =
                'Bearer ' + refreshAccessTokenResponse.data.accessToken;
              return axios(originalRequest);
            } else {
              store.dispatch(setLoggedOut());
            }
          } else {
            store.dispatch(setLoggedOut());
          }
        }
        return Promise.reject(error);
      }
    );
  },
  get setupInterceptors() {
    return this._setupInterceptors;
  },
  set setupInterceptors(value) {
    this._setupInterceptors = value;
  }
};
