import { TEST_SAGA_SUCCESS } from '../constants/testSagaConstants';

const initState = {
  testData: {}
};

export const testSagaReducer = function (state = initState, { type, payload }) {
  switch (type) {
    case TEST_SAGA_SUCCESS:
      return { ...state, testData: payload.data };
    default:
      return { ...state };
  }
};
