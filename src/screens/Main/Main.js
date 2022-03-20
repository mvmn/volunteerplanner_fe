import { Box, Drawer, List, ListItem, Toolbar } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link, Navigate, Route, Routes } from 'react-router-dom';

import { NAVIGATION_ITEMS, OPERATOR_NAVIGATION_ITEMS } from '../../constants/navigation';
import { ROLES } from '../../constants/uiConfig';
import { routes } from '../../navigation/routes';
import { TasksList } from '../../screens/TasksList';
import styles from './Main.module.scss';

const drawerWidth = 250;

const LeftPanel = () => {
  const currentRole = useSelector(state => state.user.role);
  const navigation =
    currentRole === ROLES.operator
      ? [...NAVIGATION_ITEMS, ...OPERATOR_NAVIGATION_ITEMS]
      : NAVIGATION_ITEMS;
  return (
    <Drawer
      variant='permanent'
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {navigation.map(item => {
            return (
              <ListItem button key={item.link}>
                <Link to={item.link} className={styles.link}>
                  {item.icon}&nbsp; {item.title}
                </Link>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

const ProtectedRoute = ({ isAuthorized, role, children }) => {
  const currentRole = useSelector(state => state.user.role);

  if (!isAuthorized || (role && currentRole !== role)) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export function Main() {
  const isAuthorized = useSelector(state => state.user.isAuthorized);

  return (
    <Box sx={{ display: 'flex' }}>
      {isAuthorized && <LeftPanel />}
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Routes>
          <Route path='/' element={isAuthorized ? <TasksList /> : <div>please, log in</div>} />
          {routes.map(item => {
            return (
              <Route
                key={item.link}
                path={item.link}
                element={
                  item.isAuthorized || item.role ? (
                    <ProtectedRoute isAuthorized={isAuthorized} role={item.role}>
                      <item.component />
                    </ProtectedRoute>
                  ) : (
                    <item.component />
                  )
                }
              />
            );
          })}
        </Routes>
        <Toolbar />
      </Box>
    </Box>
  );
}
