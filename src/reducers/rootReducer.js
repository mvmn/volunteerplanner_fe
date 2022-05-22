import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import { categoriesReducer } from './categories';
import { configReducer } from './config';
import { subTasksReducer } from './subTasksReducer';
import { tasksReducer } from './tasksReducer';
import { userReducer } from './userReducer';
import { usersReducer } from './usersReducer';

export const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    tasks: tasksReducer,
    users: usersReducer,
    categories: categoriesReducer,
    config: configReducer,
    subTasks: subTasksReducer
  });
