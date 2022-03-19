import { SET_COMPLETED, SET_NEW, SET_REJECTED, SET_VERIFIED } from '../constants/tasks';

export const setCompleted = payload => ({ type: SET_COMPLETED, payload });
export const setNew = payload => ({ type: SET_NEW, payload });
export const setUser = payload => ({ type: SET_REJECTED, payload });
export const setVerified = payload => ({ type: SET_VERIFIED, payload });
