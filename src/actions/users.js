import { createAction } from 'redux-actions';

import { UPDATE_USER } from '../constants/users';

export const updateUser = createAction(UPDATE_USER);
