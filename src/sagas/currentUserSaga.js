import { call, put, takeLatest } from 'redux-saga/effects';

import { setUser } from '../actions/user';
import { fetchCurrentUser, updateCurrentUser } from '../api/user';
import { GET_CURRENT_USER, UPDATE_CURRENT_USER } from '../constants/user';

function* getCurrentUserSaga(getUsersRequest) {
  try {
    const data = yield call(() => fetchCurrentUser());
    yield put(setUser(data));
  } catch (e) {
    console.log(e);
  }
}

function* updateUserSaga(action) {
  try {
    const data = yield call(() => updateCurrentUser(action.payload));
    yield put(setUser(data));
  } catch (e) {
    console.log(e);
  }
}

export default function* currentUserSagas() {
  yield takeLatest(GET_CURRENT_USER, getCurrentUserSaga);
  yield takeLatest(UPDATE_CURRENT_USER, updateUserSaga);
}
