import './index.css';

import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector } from 'react-redux';
import { Router } from 'react-router';
import { Link } from 'react-router-dom';
import { Redirect, Route, Switch } from 'react-router-dom';

import NetworkService from './api/networkService';
import App from './App';
import { PhoneConfirmation } from './components/PhoneConfirmation/PhoneConfirmation';
import { UserVerificationAlert } from './components/UserVerificationAlert/UserVerificationAlert';
import { ROLES } from './constants/uiConfig';
import dictionary from './dictionary';
import { routes } from './navigation/routes';
import { TasksList } from './screens/TasksList';
import { UserList } from './screens/UserList';
import { history, store } from './store';

const environment = process.env.NODE_ENV;

// NOTE: we don't need to track an enormous amount of errors happening during development
if (environment !== 'development') {
  Sentry.init({
    // NOTE: could be extracted into some env variable
    dsn: 'https://4179648c56ea478791f1e3a2634577c3@o1266842.ingest.sentry.io/6452294',
    integrations: [new BrowserTracing()],
    environment,
    tracesSampleRate: 1.0
  });
}

const ProtectedRoute = ({ role, children }) => {
  const isAuthorized = useSelector(state => state.user.isAuthorized);
  const currentRole = useSelector(state => state.user.role);
  const phoneNumberVerified = useSelector(state => state.user.phoneNumberVerified);

  if (!isAuthorized || !phoneNumberVerified || (role && currentRole !== role)) {
    return <Redirect to='/' replace />;
  }

  return children;
};

NetworkService.setupInterceptors(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App>
          <Switch>
            <Route
              exact
              path='/'
              component={props => {
                const isAuthorized = useSelector(state => state.user.isAuthorized);
                const user = useSelector(state => state.user);

                if (!isAuthorized) {
                  return (
                    <>
                      <div>
                        <Link to='/login'>{dictionary.logIn}</Link>
                      </div>
                      <div>
                        <Link to='/sign-up'>{dictionary.signUp}</Link>
                      </div>
                    </>
                  );
                }

                if (!user.phoneNumberVerified) {
                  return <PhoneConfirmation />;
                } else if (!user.userVerified) {
                  return <UserVerificationAlert />;
                }

                if (ROLES.root === user.role) {
                  return <UserList {...props} />;
                } else {
                  return <TasksList {...props} />;
                }
              }}
            />
            {routes.map(item => {
              return (
                <Route
                  exact
                  key={item.link}
                  path={`/${item.link}`}
                  component={props =>
                    item.isAuthorized || item.role ? (
                      <ProtectedRoute {...props} role={item.role}>
                        <item.component />
                      </ProtectedRoute>
                    ) : (
                      <item.component {...props} />
                    )
                  }
                />
              );
            })}
          </Switch>
        </App>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
