import { Button, Container, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import { setNewPassword } from '../../actions/user';
import dictionry from '../../dictionary';
import { yupPatterns } from '../../helpers/validation';
import styles from './ChangePassword.module.scss';

export const ChangePassword = () => {
  const dispatch = useDispatch();

  const initialValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  const validationSchema = yup.object().shape({
    currentPassword: yupPatterns('signInPass'),
    newPassword: yupPatterns('signInPass'),
    confirmPassword: yupPatterns('confirmPassWord')
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    async onSubmit() {
      dispatch(setNewPassword());
    }
  });

  const { handleChange, handleSubmit, values, errors } = formik;
  return (
    <Container>
      <h2>{dictionry.changePassword}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field_box}>
          <TextField
            id='currentPassword'
            name='currentPassword'
            value={values.currentPassword}
            classes={{ root: styles.root }}
            label={dictionry.currentPassword}
            type='password'
            size='small'
            margin='normal'
            onChange={handleChange}
          />
          <div className={styles.errors_box}>
            <span className={styles.errors}>{errors.oldPassword}</span>
          </div>
        </div>
        <div className={styles.field_box}>
          <TextField
            id='newPassword'
            name='newPassword'
            value={values.newPassword}
            classes={{ root: styles.root }}
            label={dictionry.newPassword}
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
          {dictionry.save}
        </Button>
      </form>
    </Container>
  );
};
