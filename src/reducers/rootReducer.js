import { combineReducers } from 'redux';

import { categoriesReducer } from './categories';
import { tasksReducer } from './tasksReducer';
import { testSagaReducer } from './testSagaReduser';
import { userReducer } from './userReducer';
import { usersReducer } from './usersReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  tasks: tasksReducer,
  users: usersReducer,
  categories: categoriesReducer,
  testSaga: testSagaReducer
});
