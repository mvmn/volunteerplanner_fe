import { createAction } from 'redux-actions';

import { TEST_SAGA_START, TEST_SAGA_SUCCESS } from '../constants/testSagaConstants';

export const testSagaStart = createAction(TEST_SAGA_START);
export const testSagaSuccess = createAction(TEST_SAGA_SUCCESS);
