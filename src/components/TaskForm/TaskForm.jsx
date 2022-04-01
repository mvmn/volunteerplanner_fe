import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Autocomplete, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';

import dictionary from '../../dictionary';
import { yupPatterns } from '../../helpers/validation';
import { customerOptions, primaryCategory, priorityOptions, subCategoryProduct } from './config';
import styles from './TaskForm.module.scss';

export const TaskForm = () => {
  const [products, setProducts] = useState([1]);

  const handleAddClick = () => setProducts([...products, products[products.length - 1] + 1]);

  const handleRemoveClick = () => setProducts(products.slice(0, -1));

  const initialValues = {
    customer: '',
    collectionAddress: '',
    shippingAddress: '',
    category: '',
    subCategory: '',
    productName: '',
    quantity: '',
    priority: '',
    date: Date.now(),
    note: ''
  };

  const validationSchema = yup.object().shape({
    customer: yupPatterns('customer'),
    collectionAddress: yupPatterns('collectionAddress'),
    shippingAddress: yupPatterns('shippingAddress'),
    category: yupPatterns('category'),
    subCategory: yupPatterns('subCategory'),
    productName: yupPatterns('productName'),
    quantity: yupPatterns('quantity'),
    priority: yupPatterns('priority'),
    note: yupPatterns('note'),
    date: yupPatterns('date')
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    async onSubmit(values) {
      await alert(JSON.stringify(values, 2, null));
    }
  });

  const { setFieldValue, handleChange, handleSubmit, values, errors } = formik;

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
      {products.map((item, index) => {
        return (
          <>
            <h3 className={styles.productHeading}>
              {dictionary.product} {item}
            </h3>
            <div className={styles.group}>
              <div className={styles.field_box}>
                <Autocomplete
                  id='category'
                  name='category'
                  freeSolo
                  disablePortal
                  getOptionLabel={option => option.label}
                  options={primaryCategory}
                  classes={{ root: styles.root }}
                  size='small'
                  margin='normal'
                  onChange={(e, value) => setFieldValue('category', value.label)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      value={values.category}
                      type='text'
                      classes={{ root: styles.root }}
                      label={dictionary.category}
                      size='small'
                      margin='normal'
                      onChange={handleChange}
                    />
                  )}
                />
                <div className={styles.errors_box}>
                  <span className={styles.errors}>{errors.category}</span>
                </div>
              </div>
              <div className={styles.field_box}>
                <Autocomplete
                  id='subCategory'
                  name='subCategory'
                  freeSolo
                  disablePortal
                  getOptionLabel={option => option.label}
                  options={subCategoryProduct}
                  classes={{ root: styles.root }}
                  size='small'
                  margin='normal'
                  onChange={(e, value) => setFieldValue('subCategory', value.label)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      value={values.subCategory}
                      type='text'
                      classes={{ root: styles.root }}
                      label={dictionary.subcategory}
                      size='small'
                      margin='normal'
                      onChange={handleChange}
                    />
                  )}
                />
                <div className={styles.errors_box}>
                  <span className={styles.errors}>{errors.subCategory}</span>
                </div>
              </div>
            </div>
            <div className={styles.group}>
              <div className={styles.field_box}>
                <TextField
                  id='productName'
                  name='productName'
                  value={values.productName}
                  classes={{ root: styles.root }}
                  label={dictionary.productName}
                  type='text'
                  size='small'
                  margin='normal'
                  onChange={handleChange}
                />
                <div className={styles.errors_box}>
                  <span className={styles.errors}>{errors.productName}</span>
                </div>
              </div>
              <div className={styles.field_box}>
                <TextField
                  id='quantity'
                  name='quantity'
                  value={values.quantity}
                  classes={{ root: styles.root }}
                  label={dictionary.quantity}
                  type='number'
                  size='small'
                  margin='normal'
                  onChange={handleChange}
                />
                <div className={styles.errors_box}>
                  <span className={styles.errors}>{errors.quantity}</span>
                </div>
              </div>
            </div>
            <div className={styles.group}>
              <div className={styles.field_box}>
                <Autocomplete
                  id='priority'
                  name='priority'
                  freeSolo
                  disablePortal
                  getOptionLabel={option => option.label}
                  options={priorityOptions}
                  classes={{ root: styles.root }}
                  size='small'
                  margin='normal'
                  onChange={(e, value) => setFieldValue('priority', value.label)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      value={values.priority}
                      type='text'
                      classes={{ root: styles.root }}
                      label={dictionary.priority}
                      size='small'
                      margin='normal'
                      onChange={handleChange}
                    />
                  )}
                />
                <div className={styles.errors_box}>
                  <span className={styles.errors}>{errors.priority}</span>
                </div>
              </div>
              <div className={styles.field_box}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    id='date'
                    name='date'
                    label={dictionary.deadline_date}
                    value={values.date}
                    onChange={value => setFieldValue('date', value)}
                    renderInput={params => (
                      <TextField
                        onChange={handleChange}
                        classes={{ root: styles.root }}
                        size='small'
                        margin='normal'
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
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
            <div className={styles.actions}>
              {index === products.length - 1 && (
                <div className={styles.add} onClick={handleAddClick}>
                  <AddCircleOutlineIcon />
                </div>
              )}
              {index >= 1 && index === products.length - 1 && (
                <div className={styles.remove} onClick={handleRemoveClick}>
                  <RemoveCircleOutlineIcon />
                </div>
              )}
            </div>
          </>
        );
      })}
      <Button variant='outlined' type='submit'>
        {dictionary.save}
      </Button>
    </form>
  );
};
