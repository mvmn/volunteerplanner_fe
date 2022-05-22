import { createAction } from 'redux-actions';

import { GET_CONFIG, SET_CONFIG } from '../constants/config';

export const getConfig = createAction(GET_CONFIG);
export const setConfig = createAction(SET_CONFIG);
