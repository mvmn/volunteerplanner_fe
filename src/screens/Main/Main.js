import { Box, Drawer, List, ListItem, Toolbar } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';

import { TasksList } from '../../components/TasksList';
import { routes } from '../../navigation/routes';
import styles from './Main.module.scss';

const drawerWidth = 250;

const NAVIGATION_ITEMS = [
  { link: 'users', title: 'Користувачі' },
  { link: 'create-task', title: 'Створити завдання' },
  { link: 'create-category', title: 'Створити категорію' }
];

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
                  {item.title}
                </Link>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export function Main() {
  const isAuthorized = useSelector(state => state.user.isAuthorized);

  return (
    <Box sx={{ display: 'flex' }}>
      {isAuthorized && <LeftPanel />}
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Routes>
          <Route path='/' element={<TasksList />} />
          {routes.map(item => {
            return (
              <Route
                key={item.link}
                path={item.link}
                element={<item.component />}
                appProps={{ isAuthorized }}
              />
            );
          })}
        </Routes>
      </Box>
    </Box>
  );
}
