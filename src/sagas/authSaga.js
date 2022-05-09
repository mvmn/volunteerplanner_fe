import { push } from 'connected-react-router';
import { call, put, takeLatest } from 'redux-saga/effects';

import { setLoggedIn } from '../actions/user';
import { authenticate } from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/uiConfig';
import { SIGN_IN } from '../constants/user';

function* authSaga(test) {
  try {
    const data = yield call(() => authenticate(test.payload));
    if (data && data.success) {
      yield sessionStorage.setItem(ACCESS_TOKEN, data.accessToken);
      yield sessionStorage.setItem(REFRESH_TOKEN, data.refreshToken);
      yield put(setLoggedIn(true));
      yield put(push('/'));
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* logIn() {
  yield takeLatest(SIGN_IN, authSaga);
}
