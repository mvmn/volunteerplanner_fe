import BuildIcon from '@mui/icons-material/Build';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { AppBar, Avatar, List, ListItem, Paper, Toolbar, Typography } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useRouteMatch } from 'react-router-dom';

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
      <NavLink exact={true} to='/login' onClick={handleClick} className={styles.link}>
        <ExitToAppOutlinedIcon />
        {dictionary.logOut}
      </NavLink>
      <NavLink
        exact={true}
        to='/profile'
        onClick={() => setIsOpened(false)}
        className={styles.link}
      >
        <PersonIcon />
        {dictionary.openProfile}
      </NavLink>
      <NavLink
        exact={true}
        to='/change-password'
        onClick={() => setIsOpened(false)}
        className={styles.link}
      >
        <BuildIcon />
        {dictionary.changePassword}
      </NavLink>
    </Paper>
  );
};

const Dropdown = () => {
  const [isOpened, setIsOpened] = useState(false);
  const handleDropdownVisibility = () => setIsOpened(!isOpened);
  const user = useSelector(state => state.user);

  if (!user.isAuthorized) {
    return <div></div>;
  }

  return (
    <div>
      <Avatar sx={{ bgcolor: deepPurple[500] }} onClick={handleDropdownVisibility}>
        {/** TODO: make avatar creation more general */ user.displayName.charAt(0).toUpperCase()}
        {user.displayName.charAt(1)}
      </Avatar>
      {isOpened && <Menu setIsOpened={setIsOpened} />}
    </div>
  );
};

const ActionLinks = () => {
  /**
   * Move Link to shared component
   */

  let match = useRouteMatch();

  return (
    <List className={styles.list}>
      <NavLink to={`${match.path}sign-up`} className={styles.link} exact={true}>
        <ListItem button>{dictionary.signUp}</ListItem>
      </NavLink>{' '}
      <NavLink to={`${match.path}login`} className={styles.link} exact={true}>
        <ListItem button>{dictionary.logIn}</ListItem>
      </NavLink>
    </List>
  );
};

export const Header = () => {
  const isAuthorized = useSelector(state => state.user.isAuthorized);

  const currentRole = useSelector(state => state.user.role);

  const navigation = currentRole === ROLES.operator ? OPERATOR_NAVIGATION_ITEMS : NAVIGATION_ITEMS;

  return (
    <AppBar classes={{ root: styles.root }} sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
      <Toolbar className={styles.toolbar}>
        {isAuthorized && (
          <List className={styles.list}>
            <NavLink to='/' className={styles.link} exact={true}>
              <ListItem button>
                <Typography variant='h6' noWrap component='div'>
                  {dictionary.taskMeneger}
                </Typography>
              </ListItem>
            </NavLink>
            {navigation.map(item => {
              return (
                <NavLink key={item.link} to={`/${item.link}`} exact={true} className={styles.link}>
                  <ListItem button>
                    {item.icon}&nbsp; {item.title}
                  </ListItem>
                </NavLink>
              );
            })}
          </List>
        )}
        {isAuthorized ? <Dropdown /> : <ActionLinks />}
      </Toolbar>
    </AppBar>
  );
};
