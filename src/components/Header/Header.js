import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { AppBar, Avatar, Paper, Toolbar, Typography } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { setLoggedOut } from '../../actions/user';
import dictionary from '../../dictionary';
import styles from './Header.module.scss';

const Menu = ({ setIsOpened }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    setIsOpened(false);
    dispatch(setLoggedOut());
  };

  const wrapperRef = useRef(null);
  useOutsideClickListener(wrapperRef);

  function useOutsideClickListener(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsOpened(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <Paper ref={wrapperRef} className={styles.menu}>
      <Link to='/login' onClick={handleClick} className={styles.link}>
        {dictionary.logOut}
        <ExitToAppOutlinedIcon />
      </Link>
      <Link to='/profile' onClick={() => setIsOpened(false)} className={styles.link}>
        {dictionary.openProfile}
        <PersonIcon />
      </Link>
    </Paper>
  );
};

const Dropdown = () => {
  const [isOpened, setIsOpened] = useState(false);
  const handleDropdownVisibility = () => setIsOpened(!isOpened);
  const user = useSelector(state => state.user);

  return (
    <div>
      <Avatar sx={{ bgcolor: deepPurple[500] }} onClick={handleDropdownVisibility}>
        {/** TODO: make avatar creation more general */ user.nickname.charAt(0).toUpperCase()}
        {user.nickname.charAt(1)}
      </Avatar>
      {isOpened && <Menu setIsOpened={setIsOpened} />}
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
