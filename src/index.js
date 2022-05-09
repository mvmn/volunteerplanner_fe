import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector } from 'react-redux';
import { Router } from 'react-router';
import { Link } from 'react-router-dom';
import { Redirect, Route, Switch } from 'react-router-dom';

import NetworkService from './api/networkService';
import App from './App';
import { ROLES } from './constants/uiConfig';
import dictionary from './dictionary';
import { routes } from './navigation/routes';
import { TasksList } from './screens/TasksList';
import { UserList } from './screens/UserList';
import { history, store } from './store';

const ProtectedRoute = ({ role, children }) => {
  const isAuthorized = useSelector(state => state.user.isAuthorized);

  const currentRole = useSelector(state => state.user.role);

  if (!isAuthorized || (role && currentRole !== role)) {
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
