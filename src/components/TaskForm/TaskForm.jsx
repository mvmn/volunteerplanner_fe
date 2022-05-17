import { Autocomplete, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import { setNewTask } from '../../actions/tasks';
import dictionary from '../../dictionary';
import { yupPatterns } from '../../helpers/validation';
import { ProductsFieldArray } from './components/ProductsFieldArray/ProductsFieldArray';
import { customerOptions } from './config';
import styles from './TaskForm.module.scss';

export const TaskForm = ({ onClose }) => {
  const dispatch = useDispatch();

  const initialValues = {
    customer: '',
    collectionAddress: '',
    shippingAddress: '',
    note: '',
    products: [
      {
        id: 0,
        productName: '',
        category: '',
        subCategory: '',
        priority: '',
        productMeasure: '',
        date: '',
        isActive: true
      }
    ]
  };

  const validationSchema = yup.object().shape({
    customer: yupPatterns('customer'),
    collectionAddress: yupPatterns('collectionAddress'),
    shippingAddress: yupPatterns('shippingAddress'),
    note: yupPatterns('note')
  });

  const onSubmitHandler = async (values, { setSubmitting }) => {
    await dispatch(setNewTask(values));
    setSubmitting(false);
    onClose();
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        validationSchema={validationSchema}
      >
        {({ values, errors, setFieldValue, handleChange, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.field_box}>
                <Autocomplete
                  id='customer'
                  name='customer'
                  freeSolo
                  disablePortal
                  getOptionLabel={option => option.label}
                  options={customerOptions}
                  classes={{ root: styles.root }}
                  size='small'
                  margin='normal'
                  onChange={(e, value) => setFieldValue('customer', value.label)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      value={values.customer}
                      type='text'
                      classes={{ root: styles.root }}
                      label={dictionary.customer}
                      size='small'
                      margin='normal'
                      onChange={handleChange}
                    />
                  )}
                />
                <div className={styles.errors_box}>
                  <span className={styles.errors}>{errors.customer}</span>
                </div>
              </div>
              <div className={styles.field_box}>
                <TextField
                  id='collectionAddress'
                  name='collectionAddress'
                  value={values.collectionAddress}
                  classes={{ root: styles.root }}
                  label={dictionary.collectionAddress}
                  type='text'
                  size='small'
                  margin='normal'
                  onChange={handleChange}
                />
                <div className={styles.errors_box}>
                  <span className={styles.errors}>{errors.collectionAddress}</span>
                </div>
              </div>
              <div className={styles.field_box}>
                <TextField
                  id='shippingAddress'
                  name='shippingAddress'
                  value={values.shippingAddress}
                  classes={{ root: styles.root }}
                  label={dictionary.shippingAddress}
                  type='text'
                  size='small'
                  margin='normal'
                  onChange={handleChange}
                />
                <div className={styles.errors_box}>
                  <span className={styles.errors}>{errors.shippingAddress}</span>
                </div>
              </div>
              <div className={styles.field_box}>
                <TextField
                  id='note'
                  name='note'
                  value={values.note}
                  classes={{ root: styles.root }}
                  label={dictionary.note}
                  type='text'
                  size='small'
                  margin='normal'
                  onChange={handleChange}
                />
                <div className={styles.errors_box}>
                  <span className={styles.errors}>{errors.note}</span>
                </div>
              </div>
              <ProductsFieldArray
                values={values}
                handleChange={handleChange}
                errors={errors}
                setFieldValue={setFieldValue}
              />
              <Button variant='outlined' type='submit' className={styles.submit_button}>
                {dictionary.save}
              </Button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
