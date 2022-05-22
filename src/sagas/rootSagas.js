import { spawn } from 'redux-saga/effects';

import * as authSaga from './authSaga';
import * as categoriesSaga from './categoriesSaga';
import * as configSaga from './configSaga';
import * as currentUserSaga from './currentUserSaga';
import * as usersSaga from './usersSaga';

export function* rootSagas() {
  yield spawn(...Object.values(usersSaga));
  yield spawn(...Object.values(authSaga));
  yield spawn(...Object.values(categoriesSaga));
  yield spawn(...Object.values(currentUserSaga));
  yield spawn(...Object.values(configSaga));
}
