import { call, put, takeLatest } from 'redux-saga/effects';

import { setUsers } from '../actions/users';
import { getAll } from '../api';
import { GET_USERS } from '../constants/users';

function* usersSaga(getUsersRequest) {
  try {
    const data = yield call(() => getAll(getUsersRequest.payload));
    yield put(setUsers(data));
  } catch (e) {
    console.log(e);
  }
}

export default function* getAllUsers() {
  yield takeLatest(GET_USERS, usersSaga);
}
