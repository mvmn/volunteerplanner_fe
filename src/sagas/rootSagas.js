import { all, fork } from 'redux-saga/effects';

import * as testSaga from '../sagas/testSaga';

export function* rootSagas() {
  yield all([...Object.values(testSaga)].map(fork));
}
