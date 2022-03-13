import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { AppBar, Avatar, Paper, Toolbar, Typography } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { setLoggedOut } from '../../actions/authActions';
import dictionary from '../../dictionary';
import styles from './Header.module.scss';

const Menu = () => {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(setLoggedOut());

  return (
    <Paper className={styles.menu}>
      <Link to='/login' onClick={handleClick} className={styles.link}>
        {dictionary.logOut}
        <ExitToAppOutlinedIcon />
      </Link>
      <Link to='/profile' className={styles.link}>
        {dictionary.openProfile}
        <PersonIcon />
      </Link>
    </Paper>
  );
};

const Dropdown = () => {
  /**
   * Add dropdown on Avatar hover; it should include:
   * - Log out button
   * - Open profile button
   */
  const [isOpened, setIsOpened] = useState(false);
  const handleDropdownVisibility = () => setIsOpened(!isOpened);

  return (
    <div>
      <Avatar sx={{ bgcolor: deepPurple[500] }} onClick={handleDropdownVisibility}>
        OP
      </Avatar>
      {isOpened && <Menu />}
    </div>
  );
};

const ActionLinks = () => {
  /**
   * Move Link to shared component
   */

  return (
    <div className={styles.actions}>
      <Link to='/sign-up' className={styles.link}>
        {dictionary.signIn}
      </Link>{' '}
      <Link to='/login' className={styles.link}>
        {dictionary.logIn}
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
            {dictionary.taskMeneger}
          </Link>
        </Typography>
        {isAuthorized ? <Dropdown /> : <ActionLinks />}
      </Toolbar>
    </AppBar>
  );
};
