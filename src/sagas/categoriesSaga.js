import { all, call, put, takeLatest } from 'redux-saga/effects';

import { setCategories, setSubcategories } from '../actions/categories';
import { getRootCategories, getSubcategories } from '../api';
import { GET_CATEGORIES } from '../constants/categories';

function* categoriesSaga() {
  try {
    const { rootCategories, subcategories } = yield all({
      rootCategories: call(getRootCategories),
      subcategories: call(getSubcategories)
    });
    yield put(setCategories(rootCategories));
    yield put(setSubcategories(subcategories));
  } catch (e) {
    console.log(e);
  }
}

export default function* getAllCategories() {
  yield takeLatest(GET_CATEGORIES, categoriesSaga);
}
