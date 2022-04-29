import { push } from 'connected-react-router';
import { call, put, takeLatest } from 'redux-saga/effects';

import { setLoggedIn } from '../actions/user';
import { setLoginError } from '../actions/user';
import { authenticate } from '../api';
import { ACCESS_TOKEN } from '../constants/uiConfig';
import { SIGN_IN } from '../constants/user';

function* authSaga(test) {
  try {
    const data = yield call(() => authenticate(test.payload));
    if (data && data.success) {
      yield put(setLoginError(null));
      yield sessionStorage.setItem(ACCESS_TOKEN, data.accessToken);
      yield put(setLoggedIn(true));
      yield put(push('/'));
    } else {
      yield put(setLoginError(data ? data.error : 'unknown'));
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* logIn() {
  yield takeLatest(SIGN_IN, authSaga);
}
