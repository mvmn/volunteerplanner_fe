import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setLoggedIn } from '../../actions/userActions';
import dictionry from '../../dictionary';
import styles from './SignIn.module.scss';

export const SignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    // TODO: send phoneNumber $ phoneNumber

    dispatch(setLoggedIn());
    navigate('/');
    console.log(phoneNumber, password);
  };

  return (
    <div className={styles.container}>
      <TextField
        value={phoneNumber}
        required
        type='tel'
        classes={{ root: styles.root }}
        label={dictionry.phoneNumber}
        size='small'
        margin='normal'
        onChange={e => setPhoneNumber(e.target.value)}
      />
      <TextField
        value={password}
        required
        classes={{ root: styles.root }}
        label={dictionry.password}
        type='password'
        size='small'
        margin='normal'
        onChange={e => setPassword(e.target.value)}
      />
      <Button disabled={!phoneNumber || !password} variant='outlined' onClick={handleClick}>
        {dictionry.send}
      </Button>
    </div>
  );
};
