import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/uiConfig';
import { SET_LOGGED_IN, SET_LOGGED_OUT, SET_USER } from '../constants/user';

const initState = { isAuthorized: false };

export const userReducer = function (state = initState, action) {
  switch (action.type) {
    case SET_LOGGED_IN:
      return { ...state, isAuthorized: true };
    case SET_LOGGED_OUT:
      sessionStorage.removeItem(ACCESS_TOKEN);
      sessionStorage.removeItem(REFRESH_TOKEN);
      return { isAuthorized: false };
    case SET_USER:
      return { ...state, ...action.payload, isAuthorized: !!action.payload };
    default:
      return state;
  }
};
