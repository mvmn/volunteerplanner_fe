import 'yup-phone';

import { Button, Container, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { setLoggedIn } from '../../actions/user';
import dictionry from '../../dictionary';
import styles from './SignIn.module.scss';

export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    phoneNumber: '',
    password: ''
  };

  const validationSchema = yup.object().shape({
    phoneNumber: yup.string().phone('UA', true, 'Телефон має бути валідним'),
    password: yup.string().required("Пароль є обов'язковим").min(6, 'Пароль занадто короткий')
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    async onSubmit({ phoneNumber, password }) {
      await console.log({ phoneNumber, password });
      dispatch(setLoggedIn());
      navigate('/');
    }
  });

  const { handleChange, handleSubmit, values, errors } = formik;

  return (
    <Container>
      <h2>{dictionry.logIn}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field_box}>
          <TextField
            id='phoneNumber'
            name='phoneNumber'
            value={values.phoneNumber}
            type='tel'
            classes={{ root: styles.root }}
            label={dictionry.phoneNumber}
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
        <Button variant='outlined' type='submit'>
          {dictionry.send}
        </Button>
      </form>
    </Container>
  );
};
