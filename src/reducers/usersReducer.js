import { SET_USERS } from '../constants/users';
import data from '../mocks/users.json';

const initState = data.users;

export const usersReducer = function (state = initState, action) {
  switch (action.type) {
    case SET_USERS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
