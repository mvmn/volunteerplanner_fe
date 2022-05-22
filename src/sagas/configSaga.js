import { call, put, takeLatest } from 'redux-saga/effects';

import { setConfig } from '../actions/config';
import { getConfig } from '../api/config';
import { GET_CONFIG } from '../constants/config';

function* getConfigSaga() {
  try {
    const data = yield call(() => getConfig());
    yield put(setConfig(data));
  } catch (e) {
    console.log(e);
  }
}

export default function* configSaga() {
  yield takeLatest(GET_CONFIG, getConfigSaga);
}
