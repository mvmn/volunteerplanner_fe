import { createAction } from 'redux-actions';

import {
  GET_CURRENT_USER,
  SET_LOGGED_IN,
  SET_LOGGED_OUT,
  SET_NEW_PASSWORD,
  SET_USER,
  SIGN_IN,
  UPDATE_CURRENT_USER
} from '../constants/user';

export const setLoggedIn = createAction(SET_LOGGED_IN);
export const signIn = createAction(SIGN_IN);
export const setLoggedOut = createAction(SET_LOGGED_OUT);
export const setUser = createAction(SET_USER);
export const updateCurrentUser = createAction(UPDATE_CURRENT_USER);
export const getCurrentUser = createAction(GET_CURRENT_USER);
export const setNewPassword = createAction(SET_NEW_PASSWORD);
