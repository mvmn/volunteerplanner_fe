import BuildIcon from '@mui/icons-material/Build';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { AppBar, Avatar, List, ListItem, Paper, Toolbar, Typography } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { setLoggedOut } from '../../actions/user';
import { NAVIGATION_ITEMS, OPERATOR_NAVIGATION_ITEMS } from '../../constants/navigation';
import { ROLES } from '../../constants/uiConfig';
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
        <ExitToAppOutlinedIcon />
        {dictionary.logOut}
      </Link>
      <Link to='/profile' onClick={() => setIsOpened(false)} className={styles.link}>
        <PersonIcon />
        {dictionary.openProfile}
      </Link>
      <Link to='/change-password' onClick={() => setIsOpened(false)} className={styles.link}>
        <BuildIcon />
        {dictionary.changePassword}
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
        {/** TODO: make avatar creation more general */ user.userName.charAt(0).toUpperCase()}
        {user.userName.charAt(1)}
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
    <List className={styles.list}>
      <Link to='/sign-up' className={styles.link}>
        <ListItem button>{dictionary.signIn}</ListItem>
      </Link>{' '}
      <Link to='/login' className={styles.link}>
        <ListItem button>{dictionary.logIn}</ListItem>
      </Link>
    </List>
  );
};

export const Header = () => {
  const isAuthorized = useSelector(state => state.user.isAuthorized);

  const currentRole = useSelector(state => state.user.role);

  const navigation = currentRole === ROLES.operator ? OPERATOR_NAVIGATION_ITEMS : NAVIGATION_ITEMS;

  return (
    <AppBar position='fixed' sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
      <Toolbar className={styles.toolbar}>
        {isAuthorized && (
          <List className={styles.list}>
            <Link to='/' className={styles.link}>
              <ListItem button>
                <Typography variant='h6' noWrap component='div'>
                  {dictionary.taskMeneger}
                </Typography>
              </ListItem>
            </Link>
            {navigation.map(item => {
              return (
                <Link key={item.link} to={item.link} className={styles.link}>
                  <ListItem button>
                    {item.icon}&nbsp; {item.title}
                  </ListItem>
                </Link>
              );
            })}
          </List>
        )}
        {isAuthorized ? <Dropdown /> : <ActionLinks />}
      </Toolbar>
    </AppBar>
  );
};
