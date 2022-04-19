import { createAction } from 'redux-actions';

import { GET_ALL, SET_COMPLETED, SET_NEW, SET_REJECTED, SET_VERIFIED } from '../constants/tasks';

export const getTasks = createAction(GET_ALL);
export const setCompleted = createAction(SET_COMPLETED);
export const setNew = createAction(SET_NEW);
export const setRejected = createAction(SET_REJECTED);
export const setVerified = createAction(SET_VERIFIED);
