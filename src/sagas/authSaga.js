import { push } from 'connected-react-router';
import { call, put, takeLatest } from 'redux-saga/effects';

import { setLoggedIn } from '../actions/user';
import { authenticate } from '../api';
import { SIGN_IN } from '../constants/user';

function* authSaga(test) {
  try {
    const data = yield call(() => authenticate(test.payload));
    yield localStorage.setItem('accessToken', data.accessToken);
    yield put(setLoggedIn(true));
    yield put(push('/'));
  } catch (e) {
    console.log(e);
  }
}

export default function* logIn() {
  yield takeLatest(SIGN_IN, authSaga);
}
