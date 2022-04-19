import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector } from 'react-redux';
import { Router } from 'react-router';
import { Redirect, Route, Switch } from 'react-router-dom';

import App from './App';
import { routes } from './navigation/routes';
import { TasksList } from './screens/TasksList';
import { history, store } from './store';

const ProtectedRoute = ({ role, children }) => {
  const isAuthorized = useSelector(state => state.user.isAuthorized);

  const currentRole = useSelector(state => state.user.role);

  if (!isAuthorized || (role && currentRole !== role)) {
    return <Redirect to='/' replace />;
  }

  return children;
};

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
                return isAuthorized ? <TasksList {...props} /> : <div>please, log in</div>;
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
