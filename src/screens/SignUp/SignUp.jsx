import 'yup-phone';

import { Button, Container, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { setLoggedIn } from '../../actions/user';
import dictionry from '../../dictionary';
import styles from './SignUp.module.scss';

export const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    phoneNumber: '',
    password: '',
    confirmPassWord: '',
    email: '',
    userName: '',
    fullName: ''
  };

  const validationSchema = yup.object().shape({
    phoneNumber: yup.string().phone('UA', true, 'Телефон має бути валідним'),
    password: yup
      .string()
      .required("Пароль є обов'язковим")
      .min(6, 'Пароль занадто короткий')
      .matches(/[a-zA-Z]/, 'Пароль повинен містити латинські букви'),
    confirmPassWord: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Паролі не збігаються')
      .required('Обовязково пітверідть пароль'),
    email: yup
      .string()
      .email('Емейл повинен бути валідним')
      .required('Емейл є обовязковим')
      .min(4, 'Занадто короткий!')
      .max(30, 'Занадто довгий'),
    userName: yup.string().required("Ім'я обов'язкове").min(2, "Ім'я занадто коротке"),
    fullName: yup.string('').required("Поле обо'язкове")
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    async onSubmit({ phoneNumber, password, email, userName, fullName }) {
      await console.log({ phoneNumber, password, email, userName, fullName });
      dispatch(setLoggedIn());
      navigate('/');
    }
  });

  const { handleChange, handleSubmit, values, errors } = formik;

  return (
    <Container>
      <h2>{dictionry.signIn}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field_box}>
          <TextField
            id='userName'
            name='userName'
            value={values.userName}
            type='text'
            classes={{ root: styles.root }}
            label={dictionry.userName}
            size='small'
            margin='normal'
            onChange={handleChange}
          />
          <div className={styles.errors_box}>
            <span className={styles.errors}>{errors.userName}</span>
          </div>
        </div>
        <div className={styles.field_box}>
          <TextField
            id='fullName'
            name='fullName'
            value={values.fullName}
            classes={{ root: styles.root }}
            label={dictionry.fullName}
            type='text'
            size='small'
            margin='normal'
            onChange={handleChange}
          />
          <div className={styles.errors_box}>
            <span className={styles.errors}>{errors.fullName}</span>
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
