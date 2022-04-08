import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './reducers/rootReducer';
import { rootSagas } from './sagas/rootSagas';

const enhancerList = [];
const sagaMiddleware = createSagaMiddleware();
const devToolsExtension = window && window.__REDUX_DEVTOOLS_EXTENSION__;

if (typeof devToolsExtension === 'function') {
  enhancerList.push(devToolsExtension());
}

export const store = createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware), ...enhancerList)
);

sagaMiddleware.run(rootSagas);
