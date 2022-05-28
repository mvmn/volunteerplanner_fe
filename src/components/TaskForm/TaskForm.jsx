import { Autocomplete, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';

import { fetchStores } from '../../api/stores';
import dictionary from '../../dictionary';
import { yupPatterns } from '../../helpers/validation';
import { ProductsFieldArray } from './components/ProductsFieldArray/ProductsFieldArray';
import styles from './TaskForm.module.scss';

export const TaskForm = ({ onClose }) => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const query = {
      pageSize: 100,
      page: 1
    };
    fetchStores(query).then(({ items }) => setStores(items));
  }, []);

  const initialValues = {
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
    // customer: yupPatterns('customer'),
    collectionAddress: yupPatterns('collectionAddress'),
    shippingAddress: yupPatterns('shippingAddress'),
    note: yupPatterns('note')
  });

  const onSubmitHandler = async (values, { setSubmitting }) => {
    setSubmitting(false);
    onClose({ form: values });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        validationSchema={validationSchema}
      >
        {({ values, errors, setFieldValue, handleChange, handleSubmit }) => {
          console.log('ERRORS', errors);
          return (
            <form onSubmit={handleSubmit} className={styles.form}>
              <Autocomplete
                id='collectionAddress'
                name='collectionAddress'
                freeSolo
                disablePortal
                getOptionLabel={option => option.name}
                options={stores.filter(item => item.confidential === false)}
                size='small'
                margin='normal'
                fullWidth
                onChange={(_, value) => {
                  setFieldValue('collectionAddress', value);
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    type='text'
                    size='small'
                    margin='normal'
                    value={values.collectionAddress}
                    label={dictionary.collectionAddress}
                    onChange={handleChange}
                    error={Boolean(errors.collectionAddress?.id)}
                    helperText={errors.collectionAddress?.id}
                    fullWidth
                  />
                )}
              />
              <Autocomplete
                id='shippingAddress'
                name='shippingAddress'
                freeSolo
                disablePortal
                getOptionLabel={option => option.name}
                options={stores}
                size='small'
                margin='normal'
                fullWidth
                onChange={(_, value) => {
                  setFieldValue('shippingAddress', value);
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    type='text'
                    size='small'
                    margin='normal'
                    value={values.shippingAddress}
                    label={dictionary.shippingAddress}
                    onChange={handleChange}
                    error={Boolean(errors.shippingAddress?.id)}
                    helperText={errors.shippingAddress?.id}
                    fullWidth
                  />
                )}
              />
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
