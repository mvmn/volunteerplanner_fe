import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setLoggedIn } from '../../actions/user';
import dictionary from '../../dictionary';
import styles from './SignUp.module.scss';

export const SignUp = () => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState();
  const [userName, setUserName] = useState();
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isDisabled = () => {
    return !phoneNumber || !userName || !password;
  };

  const hendleClick = () => {
    // TODO: send phoneNumber $ phoneNumber

    dispatch(setLoggedIn()); // TODO: replace with navigation to confirmation screen
    navigate('/');
    console.log(phoneNumber, password, userName, fullName, email);
  };

  return (
    <div className={styles.container}>
      <TextField
        classes={{ root: styles.root }}
        value={phoneNumber}
        type='tel'
        required
        label={dictionary.phoneNumber}
        size='small'
        margin='normal'
        onChange={e => setPhoneNumber(e.target.value)}
      />
      <TextField
        classes={{ root: styles.root }}
        value={userName}
        required
        label={dictionary.userName}
        size='small'
        margin='normal'
        onChange={e => setUserName(e.target.value)}
      />
      <TextField
        value={fullName}
        classes={{ root: styles.root }}
        label={dictionary.fullName}
        size='small'
        margin='normal'
        onChange={e => setFullName(e.target.value)}
      />
      <TextField
        value={email}
        classes={{ root: styles.root }}
        label={dictionary.email}
        size='small'
        type='email'
        margin='normal'
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        required
        classes={{ root: styles.root }}
        value={password}
        label={dictionary.password}
        type='password'
        size='small'
        margin='normal'
        onChange={e => setPassword(e.target.value)}
      />
      <Button disabled={isDisabled()} variant='outlined' onClick={hendleClick}>
        {dictionary.send}
      </Button>
    </div>
  );
};
