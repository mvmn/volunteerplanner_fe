import { createAction } from 'redux-actions';

import {
  SET_LOGGED_IN,
  SET_LOGGED_OUT,
  SET_NEW_PASSWORD,
  SET_USER,
  SIGN_IN
} from '../constants/user';

export const setLoggedIn = createAction(SET_LOGGED_IN);
export const signIn = createAction(SIGN_IN);
export const setLoggedOut = createAction(SET_LOGGED_OUT);
export const setUser = createAction(SET_USER);
export const setNewPassword = createAction(SET_NEW_PASSWORD);
