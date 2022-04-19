import 'yup-phone';

import { Button, Container, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import { setLoggedIn } from '../../actions/user';
import dictionry from '../../dictionary';
import { yupPatterns } from '../../helpers/validation';
import styles from './SignUp.module.scss';

export const SignUp = () => {
  const dispatch = useDispatch();

  const initialValues = {
    phoneNumber: '',
    password: '',
    confirmPassWord: '',
    email: '',
    userName: '',
    displayName: ''
  };

  const validationSchema = yup.object().shape({
    phoneNumber: yupPatterns('phoneNumber'),
    password: yupPatterns('signUpPass'),
    confirmPassWord: yupPatterns('confirmPassWord'),
    email: yupPatterns('email'),
    displayName: yupPatterns('displayName')
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    async onSubmit() {
      dispatch(setLoggedIn());
    }
  });

  const { handleChange, handleSubmit, values, errors } = formik;

  return (
    <Container>
      <h2>{dictionry.signIn}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field_box}>
          <TextField
            id='displayName'
            name='displayName'
            value={values.displayName}
            classes={{ root: styles.root }}
            label={dictionry.displayName}
            type='text'
            size='small'
            margin='normal'
            onChange={handleChange}
          />
          <div className={styles.errors_box}>
            <span className={styles.errors}>{errors.displayName}</span>
          </div>
        </div>
        <div className={styles.field_box}>
          <TextField
            id='phoneNumber'
            name='phoneNumber'
            value={values.phoneNumber}
            classes={{ root: styles.root }}
            label={dictionry.phoneNumber}
            type='tel'
            size='small'
            margin='normal'
            onChange={handleChange}
          />
          <div className={styles.errors_box}>
            <span className={styles.errors}>{errors.phoneNumber}</span>
          </div>
        </div>
        <div className={styles.field_box}>
          <TextField
            id='email'
            name='email'
            value={values.email}
            classes={{ root: styles.root }}
            label={dictionry.email}
            type='email'
            size='small'
            margin='normal'
            onChange={handleChange}
          />
          <div className={styles.errors_box}>
            <span className={styles.errors}>{errors.email}</span>
          </div>
        </div>
        <div className={styles.field_box}>
          <TextField
            id='password'
            name='password'
            value={values.password}
            classes={{ root: styles.root }}
            label={dictionry.password}
            type='password'
            size='small'
            margin='normal'
            onChange={handleChange}
          />
          <div className={styles.errors_box}>
            <span className={styles.errors}>{errors.password}</span>
          </div>
        </div>
        <div className={styles.field_box}>
          <TextField
            id='confirmPassWord'
            name='confirmPassWord'
            value={values.confirmPassWord}
            classes={{ root: styles.root }}
            label={dictionry.confirmPassWord}
            type='password'
            size='small'
            margin='normal'
            onChange={handleChange}
          />
          <div className={styles.errors_box}>
            <span className={styles.errors}>{errors.confirmPassWord}</span>
          </div>
        </div>
        <Button variant='outlined' type='submit'>
          {dictionry.send}
        </Button>
      </form>
    </Container>
  );
};
