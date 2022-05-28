import { Button } from '@mui/material';
import { FieldArray } from 'formik';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getCategories } from '../../../../actions/categories';
import { ProductsField, initialProductValue } from '../ProductField/ProductField';
import styles from './ProductsFieldArray.module.scss';

export const ProductsFieldArray = ({ values, handleChange, errors, setFieldValue }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <FieldArray
      name='products'
      render={arrayHelpers => (
        <div>
          {values.products && values.products.length > 0 ? (
            values.products.map((product, index) => (
              <ProductsField
                key={product.id}
                product={product}
                index={index}
                handleChange={handleChange}
                errors={errors}
                setFieldValue={setFieldValue}
                arrayHelpers={arrayHelpers}
              />
            ))
          ) : (
            // show this when user has removed all products from the list
            <Button
              className={styles.add_prodoct_btn}
              variant='outlined'
              onClick={() => arrayHelpers.push(initialProductValue)}
            >
              Додати продукт
            </Button>
          )}
        </div>
      )}
    />
  );
};
