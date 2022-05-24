import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

import dictionary from '../../../../dictionary';
import { yupPatterns } from '../../../../helpers/validation';
import styles from './ProfileEditForm.module.scss';

const initialValues = {
  phoneNumber: '',
  displayName: ''
};

export const ProfileEditForm = ({ user, onSave, onCancel }) => {
  const validationSchema = yup.object().shape({
    phoneNumber: yupPatterns('phoneNumber'),
    displayName: yupPatterns('displayName'),
    organization: yupPatterns('organization')
  });

  const formik = useFormik({
    initialValues: { ...initialValues, ...user },
    validationSchema,
    async onSubmit(values) {
      onSave(values);
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
            id='displayName'
            name='displayName'
            value={values.displayName}
            type='text'
            className={styles.input}
            label={dictionary.displayName}
            size='small'
            margin='normal'
            sx={sxTextFiled}
            onChange={handleChange}
          />
          <div className={styles.errors_box}>
            <span className={styles.errors}>{errors.displayName}</span>
          </div>
        </div>
      </div>
      <div className={styles.column}>
        <p className={styles.label}>{dictionary.organization}:</p>
        <div>
          <TextField
            id='organization'
            name='organization'
            value={values.organization}
            type='text'
            className={styles.input}
            label={dictionary.organization}
            size='small'
            margin='normal'
            sx={sxTextFiled}
            onChange={handleChange}
          />
          <div className={styles.errors_box}>
            <span className={styles.errors}>{errors.organization}</span>
          </div>
        </div>
      </div>
      <Button variant='outlined' onClick={onCancel}>
        {dictionary.cancel}
      </Button>

      <Button variant='outlined' type='submit'>
        {dictionary.save}
      </Button>
    </form>
  );
};
