import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

import { testSagaStart, testSagaSuccess } from '../actions/testSagaAction';

function* testSaga() {
  try {
    const data = yield call(axios.get, 'https://www.anapioficeandfire.com/api/books');
    yield put(testSagaSuccess(data));
  } catch (e) {
    console.error(e);
  }
}

export function* getTestData() {
  yield takeEvery(testSagaStart, testSaga);
}
