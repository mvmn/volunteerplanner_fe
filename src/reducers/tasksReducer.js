import { SET_COMPLETED, SET_NEW_TASK, SET_REJECTED, SET_VERIFIED } from '../constants/tasks';

const initState = {
  new: [],
  verified: [],
  completed: [],
  rejected: []
};

export const tasksReducer = function (state = initState, action) {
  switch (action.type) {
    case SET_NEW_TASK:
      return { ...state, new: action.payload };
    case SET_VERIFIED:
      return { ...state, verified: action.payload };
    case SET_COMPLETED:
      return { ...state, completed: action.payload };
    case SET_REJECTED:
      return { ...state, rejected: action.payload };
    default:
      return state;
  }
};
