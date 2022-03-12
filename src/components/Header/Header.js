import { AppBar, Avatar, Toolbar, Typography } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { setLoggedIn, setLoggedOut } from '../../actions/authActions';
import styles from './Header.module.scss';

const Dropdown = () => {
  /**
   * Add dropdown on Avatar hover; it should include:
   * - Log out button
   * - Open profile button
   */
  const dispatch = useDispatch();
  const handleClick = () => dispatch(setLoggedOut());
  return (
    <div>
      <Link to='/sign-in' onClick={handleClick} className={styles.link}>
        Вийти
      </Link>
      <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
    </div>
  );
};

const ActionLinks = () => {
  /**
   * Move Link to shared component
   */

  const dispatch = useDispatch();

  const handleClick = () => dispatch(setLoggedIn());

  return (
    <div>
      <Link to='/sign-up' className={styles.link}>
        Зареєструватися
      </Link>
      <Link to='/sign-in' onClick={handleClick} className={styles.link}>
        Залогуватися
      </Link>
    </div>
  );
};

export const Header = () => {
  const isAuthorized = useSelector(state => state.user.isAuthorized);

  return (
    <AppBar position='fixed' sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
      <Toolbar className={styles.toolbar}>
        <Typography variant='h6' noWrap component='div'>
          <Link to='/' className={styles.link}>
            Менеджер задач
          </Link>
        </Typography>
        {isAuthorized ? <Dropdown /> : <ActionLinks />}
      </Toolbar>
    </AppBar>
  );
};
