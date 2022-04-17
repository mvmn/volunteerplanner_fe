import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './reducers/rootReducer';
import { rootSagas } from './sagas/rootSagas';

const enhancerList = [];
const sagaMiddleware = createSagaMiddleware();
const devToolsExtension = window && window.__REDUX_DEVTOOLS_EXTENSION__;

export const history = createBrowserHistory();

if (typeof devToolsExtension === 'function') {
  enhancerList.push(devToolsExtension());
}

export const store = createStore(
  rootReducer(history),
  compose(applyMiddleware(routerMiddleware(history), sagaMiddleware), ...enhancerList)
);

sagaMiddleware.run(rootSagas);
