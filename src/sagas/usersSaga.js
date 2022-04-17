import { call, put, takeLatest } from 'redux-saga/effects';

import { setCount, setPage, setPageSize, setUsers } from '../actions/users';
import { getAll } from '../api';
import { GET_USERS } from '../constants/users';

function* usersSaga() {
  try {
    const data = yield call(getAll);
    yield put(setUsers(data.items));
    yield put(setPage(data.page));
    yield put(setPageSize(data.pageSize));
    yield put(setCount(data.totalCount));
  } catch (e) {
    console.log(e);
  }
}

export default function* getAllTasks() {
  yield takeLatest(GET_USERS, usersSaga);
}
