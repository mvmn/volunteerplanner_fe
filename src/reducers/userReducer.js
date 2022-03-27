import { SET_LOGGED_IN, SET_LOGGED_OUT, SET_USER } from '../constants/user';
import data from '../mocks/user.json';

//const initState = data.user;
const initState = { ...data.user, role: 'volunteer' };

export const userReducer = function (state = initState, action) {
  switch (action.type) {
    case SET_LOGGED_IN:
      return { ...state, isAuthorized: true };
    case SET_LOGGED_OUT:
      return { ...state, isAuthorized: false };
    case SET_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
