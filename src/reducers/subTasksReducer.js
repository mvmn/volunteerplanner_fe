import { SET_COMPLETED, SET_IN_PROGRESS, SET_REJECTED } from '../constants/subTasks';
import { SUBTASK_STATUSES } from '../constants/uiConfig';
import data from '../mocks/subtasks.json';

const initState = {
  completed: data.items.filter(item => item.status === SUBTASK_STATUSES.completed),
  inProgress: data.items.filter(item => item.status === SUBTASK_STATUSES.inProgress),
  rejected: data.items.filter(item => item.status === SUBTASK_STATUSES.rejected)
};

export const subTasksReducer = function (state = initState, action) {
  switch (action.type) {
    case SET_COMPLETED:
      return { ...state, completed: action.payload };
    case SET_IN_PROGRESS:
      return { ...state, inProgress: action.payload };
    case SET_REJECTED:
      return { ...state, rejected: action.payload };
    default:
      return state;
  }
};
