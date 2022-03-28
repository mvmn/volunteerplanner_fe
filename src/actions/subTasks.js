import { SET_COMPLETED, SET_IN_PROGRESS, SET_REJECTED } from '../constants/subTasks';

export const setCompleted = payload => ({ type: SET_COMPLETED, payload });
export const setInProgress = payload => ({ type: SET_IN_PROGRESS, payload });
export const setUser = payload => ({ type: SET_REJECTED, payload });
