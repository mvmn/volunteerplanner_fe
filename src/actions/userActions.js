import { SET_LOGGED_IN, SET_LOGGED_OUT, SET_USER } from '../constants/userConstants';

export const setLoggedIn = () => ({ type: SET_LOGGED_IN });
export const setLoggedOut = () => ({ type: SET_LOGGED_OUT });
export const setUser = payload => ({ type: SET_USER, payload });
