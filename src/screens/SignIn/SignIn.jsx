import 'yup-phone';

import { Button, Container, Link, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { setLoggedIn } from '../../actions/user';
import dictionary from '../../dictionary';
import { yupPatterns } from '../../helpers/validation';
import styles from './SignIn.module.scss';

export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    phoneNumber: '',
    password: ''
  };

  const validationSchema = yup.object().shape({
    phoneNumber: yupPatterns('phoneNumber'),
    password: yupPatterns('signInPass')
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    async onSubmit() {
      dispatch(setLoggedIn());
      navigate('/');
    }
  });

  const { handleChange, handleSubmit, values, errors } = formik;

  return (
    <Container className={styles.container}>
      <h2>{dictionary.logIn}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field_box}>
          <TextField
            id='phoneNumber'
            name='phoneNumber'
            value={values.phoneNumber}
            type='tel'
            classes={{ root: styles.root }}
            label={`Введіть ${dictionary.userName.toLocaleLowerCase()}`}
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
            id='password'
            name='password'
            value={values.password}
            classes={{ root: styles.root }}
            label={dictionary.password}
            type='password'
            size='small'
            margin='normal'
            onChange={handleChange}
          />
          <div className={styles.errors_box}>
            <span className={styles.errors}>{errors.password}</span>
          </div>
        </div>
        <div className={styles.link}>
          <Link href='/password-reset'>{dictionary.forgotPassword}</Link>
        </div>
        <Button variant='outlined' type='submit'>
          {dictionary.send}
        </Button>
      </form>
    </Container>
  );
};
