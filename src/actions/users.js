import { createAction } from 'redux-actions';

import { GET_USERS, SET_COUNT, SET_PAGE, SET_PAGE_SIZE, SET_USERS } from '../constants/users';

export const getUsers = createAction(GET_USERS);
export const setUsers = createAction(SET_USERS);
export const setCount = createAction(SET_COUNT);
export const setPage = createAction(SET_PAGE);
export const setPageSize = createAction(SET_PAGE_SIZE);
