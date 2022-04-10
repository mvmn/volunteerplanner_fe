import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import { setUser } from '../../../../actions/user';
import dictionary from '../../../../dictionary';
import { yupPatterns } from '../../../../helpers/validation';
import styles from './ProfileEditForm.module.scss';

export const ProfileEditForm = ({ initialValues, setIsEditing }) => {
  const dispatch = useDispatch();

  const validationSchema = yup.object().shape({
    phoneNumber: yupPatterns('phoneNumber'),
    email: yupPatterns('email'),
    userName: yupPatterns('userName'),
    fullName: yupPatterns('fullName')
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    async onSubmit(values) {
      dispatch(setUser(values));
      setIsEditing(false);
    }
  });

  const { handleChange, handleSubmit, values, errors } = formik;
  const sxTextFiled = { input: { color: '#000', fontSize: '17px' } };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.column}>
        <p className={styles.label}>{dictionary.phoneNumber}:</p>
        <div>
          <TextField
            id='phoneNumber'
            name='phoneNumber'
            value={values.phoneNumber}
            label={dictionary.phoneNumber}
            className={styles.input}
            type='tel'
            size='small'
            margin='normal'
            sx={sxTextFiled}
            onChange={handleChange}
          />
          <div className={styles.errors_box}>
            <span className={styles.errors}>{errors.phoneNumber}</span>
          </div>
        </div>
      </div>
      <div className={styles.column}>
        <p className={styles.label}>{dictionary.userName}:</p>
        <div>
          <TextField
            id='userName'
            name='userName'
            value={values.userName}
            type='text'
            className={styles.input}
            label={dictionary.userName}
            size='small'
            margin='normal'
            sx={sxTextFiled}
            onChange={handleChange}
          />
          <div className={styles.errors_box}>
            <span className={styles.errors}>{errors.userName}</span>
          </div>
        </div>
      </div>
      <div className={styles.column}>
        <p className={styles.label}>{dictionary.fullName}:</p>
        <div>
          <TextField
            id='fullName'
            name='fullName'
            value={values.fullName}
            label={dictionary.fullName}
            type='text'
            className={styles.input}
            size='small'
            margin='normal'
            sx={sxTextFiled}
            onChange={handleChange}
          />
          <div className={styles.errors_box}>
            <span className={styles.errors}>{errors.fullName}</span>
          </div>
        </div>
      </div>
      <div className={styles.column}>
        <p className={styles.label}>{dictionary.email}:</p>
        <div>
          <TextField
            id='email'
            name='email'
            value={values.email}
            label={dictionary.email}
            type='email'
            className={styles.input}
            margin='normal'
            sx={sxTextFiled}
            onChange={handleChange}
          />
          <div className={styles.errors_box}>
            <span className={styles.errors}>{errors.email}</span>
          </div>
        </div>
      </div>
      <Button variant='outlined' type='submit'>
        {dictionary.save}
      </Button>
    </form>
  );
};
