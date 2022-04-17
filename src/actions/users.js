import { GET_USERS, SET_COUNT, SET_PAGE, SET_PAGE_SIZE, SET_USERS } from '../constants/users';

export const getUsers = () => ({ type: GET_USERS });
export const setUsers = payload => ({ type: SET_USERS, payload });
export const setCount = payload => ({ type: SET_COUNT, payload });
export const setPage = payload => ({ type: SET_PAGE, payload });
export const setPageSize = payload => ({ type: SET_PAGE_SIZE, payload });
