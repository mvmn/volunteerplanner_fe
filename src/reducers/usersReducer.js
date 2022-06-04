import { UPDATE_USER } from '../constants/users';

const initState = {
  all: [],
  totalCount: 0,
  page: 1,
  pageSize: 0
};

export const usersReducer = function (state = initState, action) {
  switch (action.type) {
    case UPDATE_USER: {
      const { id, ...rest } = action.payload;
      if (!state.all.some(user => user.id === id)) {
        return state;
      }

      return {
        ...state,
        all: state.all.map(user => (user.id === id ? { ...user, ...rest } : user))
      };
    }
    default:
      return state;
  }
};
