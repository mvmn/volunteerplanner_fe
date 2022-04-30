import { SET_USERS } from '../constants/users';

const initState = {
  all: [],
  totalCount: 0,
  page: 1,
  pageSize: 0
};

export const usersReducer = function (state = initState, action) {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        all: action.payload.items,
        totalCount: action.payload.totalCount,
        page: action.payload.page,
        pageSize: action.payload.pageSize
      };
    default:
      return state;
  }
};
