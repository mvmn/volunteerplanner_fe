import { combineReducers, createStore } from 'redux';

import { authReducer } from './reducers/authReducer';
import { tasksReducer } from './reducers/tasksReducer';

export const store = createStore(
  combineReducers({
    user: authReducer,
    tasks: tasksReducer
  })
);
