import { combineReducers, createStore } from 'redux';

import { tasksReducer } from './reducers/tasksReducer';
import { userReducer } from './reducers/userReducer';

export const store = createStore(
  combineReducers({
    user: userReducer,
    tasks: tasksReducer
  })
);
