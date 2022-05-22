import _merge from 'lodash/merge';

import { SET_CONFIG } from '../constants/config';

const initState = {
  captcha: {
    enabled: false,
    sitekey: ''
  }
};

export const configReducer = function (state = initState, action) {
  switch (action.type) {
    case SET_CONFIG:
      return _merge({}, state, action.payload);
    default:
      return state;
  }
};
