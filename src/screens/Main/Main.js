import { Box, Drawer, List, ListItem, Toolbar } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link, Navigate, Route, Routes } from 'react-router-dom';

import { NAVIGATION_ITEMS } from '../../constants/navigation';
import { routes } from '../../navigation/routes';
import { TasksList } from '../../screens/TasksList';
import styles from './Main.module.scss';

const drawerWidth = 250;

const LeftPanel = () => {
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
          {NAVIGATION_ITEMS.map(item => {
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

const ProtectedRoute = ({ isAuthorized, children }) => {
  if (!isAuthorized) {
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
                  item.isAuthorized ? (
                    <ProtectedRoute isAuthorized={isAuthorized}>
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
      </Box>
    </Box>
  );
}
