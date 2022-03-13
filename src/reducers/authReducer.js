import { SET_LOGGED_IN, SET_LOGGED_OUT } from '../constants/authConstants';

export const authReducer = function (state = { isAuthorized: false }, action) {
  switch (action.type) {
    case SET_LOGGED_IN:
      return { isAuthorized: true };
    case SET_LOGGED_OUT:
      return { isAuthorized: false };
    default:
      return state;
  }
};
