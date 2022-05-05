import { SET_CATEGORIES, SET_SUBCATEGORIES } from '../constants/categories';

const initState = {
  rootCategories: [],
  subcategories: {}
};

export const categoriesReducer = function (state = initState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, rootCategories: action.payload };
    case SET_SUBCATEGORIES:
      return { ...state, subcategories: action.payload };
    default:
      return state;
  }
};
