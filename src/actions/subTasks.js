import { createAction } from 'redux-actions';

import { SET_COMPLETED, SET_IN_PROGRESS, SET_REJECTED } from '../constants/subTasks';

export const setCompleted = createAction(SET_COMPLETED);
export const setInProgress = createAction(SET_IN_PROGRESS);
export const setRejected = createAction(SET_REJECTED);
