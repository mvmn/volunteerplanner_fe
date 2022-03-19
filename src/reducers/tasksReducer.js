import { SET_COMPLETED, SET_NEW, SET_REJECTED, SET_VERIFIED } from '../constants/tasks';
import { TASK_STATUSES } from '../constants/uiConfig';
import data from '../mocks/tasks.json';

const initState = {
  new: data.tasks.filter(item => item.status_id === TASK_STATUSES.new),
  verified: data.tasks.filter(item => item.status_id === TASK_STATUSES.verified),
  completed: data.tasks.filter(item => item.status_id === TASK_STATUSES.completed),
  rejected: data.tasks.filter(item => item.status_id === TASK_STATUSES.rejected)
};

export const tasksReducer = function (state = initState, action) {
  switch (action.type) {
    case SET_NEW:
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
