import { spawn } from 'redux-saga/effects';

import * as authSaga from '../sagas/authSaga';
import * as categoriesSaga from './categoriesSaga';
import * as usersSaga from './usersSaga';

export function* rootSagas() {
  yield spawn(...Object.values(usersSaga));
  yield spawn(...Object.values(authSaga));
  yield spawn(...Object.values(categoriesSaga));
}
