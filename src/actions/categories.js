import { createAction } from 'redux-actions';

import { GET_CATEGORIES, SET_CATEGORIES, SET_SUBCATEGORIES } from '../constants/categories';

export const getCategories = createAction(GET_CATEGORIES);
export const setCategories = createAction(SET_CATEGORIES);
export const setSubcategories = createAction(SET_SUBCATEGORIES);
