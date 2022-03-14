import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setLoggedIn } from '../../actions/userActions';
import dictionry from '../../dictionary';
import styles from './SignUp.module.scss';

export const SignUp = () => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState();
  const [nickname, setNickname] = useState();
  const [fullname, setFullname] = useState();
  const [email, setEmail] = useState();
  const [city, setCity] = useState();
  const [region, setRegion] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isDisabled = () => {
    return !phoneNumber || !nickname || !password;
  };

  const hendleClick = () => {
    // TODO: send phoneNumber $ phoneNumber

    dispatch(setLoggedIn()); // TODO: replace with navigation to confirmation screen
    navigate('/');
    console.log(phoneNumber, password, nickname, fullname, email, city, region);
  };

  return (
    <div className={styles.container}>
      <TextField
        value={phoneNumber}
        type='tel'
        required
        classes={{ root: styles.root }}
        label={dictionry.phoneNumber}
        size='small'
        margin='normal'
        onChange={e => setPhoneNumber(e.target.value)}
      />
      <TextField
        value={nickname}
        required
        classes={{ root: styles.root }}
        label={dictionry.nickname}
        size='small'
        margin='normal'
        onChange={e => setNickname(e.target.value)}
      />
      <TextField
        value={fullname}
        classes={{ root: styles.root }}
        label={dictionry.fullname}
        size='small'
        margin='normal'
        onChange={e => setFullname(e.target.value)}
      />
      <TextField
        value={email}
        classes={{ root: styles.root }}
        label={dictionry.email}
        size='small'
        type='email'
        margin='normal'
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        required
        value={password}
        classes={{ root: styles.root }}
        label={dictionry.password}
        type='password'
        size='small'
        margin='normal'
        onChange={e => setPassword(e.target.value)}
      />
      <div className={styles.adressLabel}>
        <Typography variant='body1'>Adress:</Typography>
      </div>
      <TextField
        required
        value={region}
        classes={{ root: styles.root }}
        label={dictionry.region}
        type='password'
        size='small'
        margin='normal'
        onChange={e => setRegion(e.target.value)}
      />
      <TextField
        required
        value={city}
        classes={{ root: styles.root }}
        label={dictionry.city}
        type='password'
        size='small'
        margin='normal'
        onChange={e => setCity(e.target.value)}
      />
      <Button disabled={isDisabled()} variant='outlined' onClick={hendleClick}>
        {dictionry.send}
      </Button>
    </div>
  );
};
