import 'yup-phone';

import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import { signIn } from '../../actions/user';
import { signUp } from '../../api/auth';
import dictionary from '../../dictionary';
import { yupPatterns } from '../../helpers/validation';
import styles from './SignUp.module.scss';

const roles = [
  {
    value: 'root',
    name: 'Адміністратор'
  },
  {
    value: 'operator',
    name: 'Оператор'
  },
  {
    value: 'requestor',
    name: 'Запитувач'
  },
  {
    value: 'volunteer',
    name: 'Волонтер'
  }
];

const initialValues = {
  phoneNumber: '',
  password: '',
  confirmPassWord: '',
  userName: '',
  displayName: '',
  role: roles[roles.length - 1].name
};

const validationSchema = yup.object().shape({
  phoneNumber: yupPatterns('phoneNumber'),
  password: yupPatterns('signUpPass'),
  confirmPassWord: yupPatterns('confirmPassWord'),
  displayName: yupPatterns('displayName')
});

export const SignUp = () => {
  const dispatch = useDispatch();

  const setLoginError = error => {
    if (error) {
      console.error('Could not authenticate after sign up:', error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    async onSubmit(data) {
      const { phoneNumber } = await signUp(data);
      dispatch(signIn({ phoneNumber, password: data.password, setLoginError }));
    }
  });

  const { handleChange, handleSubmit, values, errors } = formik;

  return (
    <Container>
      <h2>{dictionary.signUp}</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <TextField
          id='displayName'
          name='displayName'
          value={values.displayName}
          classes={{ root: styles.root }}
          label={dictionary.displayName}
          type='text'
          size='small'
          margin='normal'
          onChange={handleChange}
          error={Boolean(errors.displayName)}
          helperText={errors.displayName}
          autoComplete='username'
          fullWidth
        />
        <TextField
          id='phoneNumber'
          name='phoneNumber'
          value={values.phoneNumber}
          classes={{ root: styles.root }}
          label={dictionary.phoneNumber}
          type='tel'
          size='small'
          margin='normal'
          onChange={handleChange}
          error={Boolean(errors.phoneNumber)}
          helperText={errors.phoneNumber}
          autoComplete='phone'
          fullWidth
        />
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
          error={Boolean(errors.password)}
          helperText={errors.password}
          autoComplete='new-password'
          fullWidth
        />
        <TextField
          id='confirmPassWord'
          name='confirmPassWord'
          value={values.confirmPassWord}
          classes={{ root: styles.root }}
          label={dictionary.confirmPassWord}
          type='password'
          size='small'
          margin='normal'
          onChange={handleChange}
          error={Boolean(errors.confirmPassWord)}
          helperText={errors.confirmPassWord}
          autoComplete='new-password'
          fullWidth
        />
        <FormControl size='small' margin='normal' fullWidth>
          <InputLabel id='role-label'>{dictionary.role}</InputLabel>
          <Select
            labelId='role-label'
            id='role'
            size='small'
            name='role'
            sx={{ textAlign: 'left' }}
            value={values.role}
            label={dictionary.role}
            onChange={handleChange}
          >
            {roles.map(({ value, name }) => (
              <MenuItem key={value} value={value}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button sx={{ mt: 2 }} variant='outlined' type='submit'>
          {dictionary.send}
        </Button>
      </form>
    </Container>
  );
};
