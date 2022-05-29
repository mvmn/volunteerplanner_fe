import { Autocomplete, Button, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as yup from 'yup';

import { updateProduct } from '../../api/products';
import dictionary from '../../dictionary';
import { yupPatterns } from '../../helpers/validation';
import { Modal } from '../Modal';

const initialValues = {
  name: '',
  note: '',
  category: null,
  subcategory: null
};

const validationSchema = yup.object().shape({
  name: yupPatterns('name'),
  category: yupPatterns('productCategory'),
  subcategory: yupPatterns('productSubcategory'),
  note: yup.string().optional().nullable()
});

const getProductCategories = product => {
  if (!product) {
    return { category: null, subcategory: null };
  }

  const category = product.category?.parent ?? product.category;
  const subcategory = product.category?.parent
    ? {
        id: product.category.id,
        name: product.category.name,
        note: product.category.note
      }
    : null;
  return { category, subcategory };
};

export const ProductEditModal = ({ isOpen, onClose, onSave, product }) => {
  const { handleChange, handleSubmit, values, setFieldValue, errors, resetForm } = useFormik({
    initialValues: { ...initialValues, ...product, ...getProductCategories(product) },
    validationSchema,
    enableReinitialize: true,
    async onSubmit(data) {
      const { category, subcategory, ...rest } = data;

      await updateProduct({
        ...rest,
        category: {
          ...subcategory,
          parent: category
        }
      });

      onSave();
    }
  });

  const categories = useSelector(state => state.categories.rootCategories);
  const allSubcategories = useSelector(state => state.categories.subcategories);
  const [selectedCategory, setSelectedCategory] = useState();
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    if (product && resetForm) {
      const { category, subcategory } = getProductCategories(product);
      setSelectedCategory(category);
      resetForm({ ...initialValues, ...product, category, subcategory });
    }
  }, [product, resetForm]);

  useEffect(() => {
    setSubcategories(allSubcategories[selectedCategory?.id] ?? []);
  }, [selectedCategory, allSubcategories]);

  return (
    <Modal open={isOpen} onClose={onClose} title={dictionary.edit}>
      <form onSubmit={handleSubmit}>
        <TextField
          name='name'
          type='text'
          size='small'
          margin='normal'
          variant='outlined'
          label={dictionary.name}
          error={Boolean(errors.name)}
          helperText={errors.name}
          onChange={handleChange}
          value={values.name}
          fullWidth
        />

        <TextField
          name='note'
          type='text'
          size='small'
          margin='normal'
          variant='outlined'
          label={dictionary.note}
          error={Boolean(errors.note)}
          helperText={errors.note}
          onChange={handleChange}
          value={values.note}
          multiline={true}
          rows={4}
          fullWidth
        />

        <Autocomplete
          name='category'
          freeSolo
          disablePortal
          getOptionLabel={option => option.name}
          options={categories ?? []}
          size='small'
          margin='normal'
          fullWidth
          value={selectedCategory}
          onChange={(_, value) => {
            setFieldValue('category', value);
            setFieldValue('subcategory', null);
            setSelectedCategory(value);
          }}
          renderInput={params => (
            <TextField
              {...params}
              type='text'
              size='small'
              margin='normal'
              onChange={handleChange}
              value={values.category?.id}
              label={dictionary.category}
              error={Boolean(errors.category)}
              helperText={errors.category}
              fullWidth
            />
          )}
        />

        <Autocomplete
          name='subcategory'
          freeSolo
          disablePortal
          getOptionLabel={option => option.name}
          options={subcategories}
          size='small'
          margin='normal'
          fullWidth
          disabled={!selectedCategory}
          value={values.subcategory}
          onChange={(_, value) => {
            setFieldValue('subcategory', value);
          }}
          renderInput={params => (
            <TextField
              {...params}
              type='text'
              size='small'
              margin='normal'
              onChange={handleChange}
              value={values.subcategory?.id}
              label={dictionary.subcategory}
              error={Boolean(errors.subcategory)}
              helperText={errors.subcategory}
              fullWidth
            />
          )}
        />

        <Stack direction='row-reverse' sx={{ mt: 2 }}>
          <Button variant='outlined' type='submit'>
            {dictionary.save}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
