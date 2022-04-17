import { spawn } from 'redux-saga/effects';

import * as authSaga from '../sagas/authSaga';
import * as usersSaga from './usersSaga';

export function* rootSagas() {
  yield spawn(...Object.values(usersSaga));
  yield spawn(...Object.values(authSaga));
}
