import { call, put, takeLatest } from 'redux-saga/effects';

import { setUser } from '../actions/user';
import { fetchCurrentUser } from '../api/user';
import { GET_CURRENT_USER } from '../constants/user';

function* usersSaga(getUsersRequest) {
  try {
    const data = yield call(() => fetchCurrentUser());
    yield put(setUser(data));
  } catch (e) {
    console.log(e);
  }
}

export default function* getCurrentUser() {
  yield takeLatest(GET_CURRENT_USER, usersSaga);
}
