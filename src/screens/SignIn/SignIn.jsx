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
    login: '',
    password: ''
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = yup.object().shape({
    login: yup.string().when('isLogin', {
      is: '1',
      then: yup.string().required(`Лоігн обов'язковий`).min(4, 'Лоігн занадто короткий'),
      otherwise: yup.string().matches(phoneRegExp, 'Телефон має бути валідним')
    }),
    password: yup.string().required("Пароль є обов'язковим").min(6, 'Пароль занадто короткий')
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    async onSubmit({ login, password }) {
      await console.log({ login, password });
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
            id='login'
            name='login'
            value={values.login}
            type='tel'
            classes={{ root: styles.root }}
            label={`Введіть ${dictionry.userName.toLocaleLowerCase()} або ${dictionry.phoneNumber.toLocaleLowerCase()}`}
            size='small'
            margin='normal'
            onChange={event => {
              handleChange('login')(event);
              if (Number(values.login)) {
                handleChange('isLogin')('0');
              } else {
                handleChange('isLogin')('1');
              }
            }}
          />
          <div className={styles.errors_box}>
            <span className={styles.errors}>{errors.login}</span>
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
