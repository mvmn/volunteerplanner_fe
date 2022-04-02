import { SET_LOGGED_IN, SET_LOGGED_OUT, SET_NEW_PASSWORD, SET_USER } from '../constants/user';

export const setLoggedIn = () => ({ type: SET_LOGGED_IN });
export const setLoggedOut = () => ({ type: SET_LOGGED_OUT });
export const setUser = payload => ({ type: SET_USER, payload });
export const setNewPassword = () => ({ type: SET_NEW_PASSWORD });
