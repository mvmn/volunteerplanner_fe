import { Button, Checkbox, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

import dictionary from '../../../../dictionary';
import { yupPatterns } from '../../../../helpers/validation';
import styles from './SubTaskForm.module.scss';

export const SubTaskForm = ({ task }) => {
  const initialValues = {
    note: task.note,
    quantity: task.quantity,
    transportRequired: task.transportRequired ?? false
  };

  const validationSchema = yup.object().shape({
    note: yupPatterns('note'),
    quantity: yupPatterns('quantity')
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    async onSubmit(values) {
      console.log(values);
    }
  });

  const { handleChange, handleSubmit, values, errors } = formik;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.column_box}>
        <p className={styles.label}>{dictionary.note}:</p>
        <div className={styles.column}>
          <TextField
            id='note'
            name='note'
            value={values.note}
            type='text'
            classes={{ root: styles.root }}
            label={dictionary.note}
            size='small'
            margin='normal'
            onChange={handleChange}
          />
          <div className={styles.errors_box}>
            <span className={styles.errors}>{errors.note}</span>
          </div>
        </div>
      </div>
      <div className={styles.column_box}>
        <p className={styles.label}>{dictionary.quantity}:</p>
        <div className={styles.column}>
          <TextField
            id='quantity'
            name='quantity'
            value={values.quantity}
            type='number'
            classes={{ root: styles.root }}
            label={dictionary.quantity}
            size='small'
            margin='normal'
            onChange={handleChange}
          />
          <div className={styles.errors_box}>
            <span className={styles.errors}>{errors.quantity}</span>
          </div>
        </div>
      </div>
      <div className={styles.column_box}>
        <div className={styles.column}>
          <div className={styles.checkbox_column}>
            <p className={styles.label}>{dictionary.transportRequired}</p>
            <div>
              <Checkbox
                id='transportRequired'
                name='transportRequired'
                label={dictionary.transportRequired}
                value={values.transportRequired}
                onChange={handleChange}
              />
            </div>
          </div>
          <Button variant='outlined' type='submit'>
            {dictionary.save}
          </Button>
        </div>
      </div>
    </form>
  );
};
