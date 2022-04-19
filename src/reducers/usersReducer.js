import { SET_COUNT, SET_PAGE, SET_PAGE_SIZE, SET_USERS } from '../constants/users';

const initState = {
  all: [],
  totalCount: null,
  page: null,
  pageSize: null
};

export const usersReducer = function (state = initState, action) {
  switch (action.type) {
    case SET_USERS:
      return { ...state, all: action.payload };
    case SET_COUNT:
      return { ...state, totalCount: action.payload };
    case SET_PAGE:
      return { ...state, page: action.payload };
    case SET_PAGE_SIZE:
      return { ...state, pageSize: action.payload };
    default:
      return state;
  }
};
