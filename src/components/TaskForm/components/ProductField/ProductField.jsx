import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Autocomplete, IconButton, Stack, TextField, Typography, styled } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { searchProducts } from '../../../../api/products';
import dictionary from '../../../../dictionary/index';
import { priorityOptions, productMeasureOptions } from '../../config';

const InputWrapper = styled(Box)(({ theme }) => ({
  width: '50%',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

export const initialProductValue = {
  id: Date.now(),
  productName: '',
  category: '',
  quantity: '',
  subCategory: '',
  priority: '',
  productMeasure: '',
  date: '',
  isActive: true
};

export const ProductsField = ({
  product,
  index,
  handleChange,
  errors,
  setFieldValue,
  arrayHelpers
}) => {
  const categories = useSelector(state => state.categories.rootCategories);
  const subcategories = useSelector(state => state.categories.subcategories);
  const [subcategoriesByCategory, setSubcategoriesByCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  useEffect(() => {
    if (selectedCategory?.id) {
      setSubcategoriesByCategory(subcategories[selectedCategory?.id] ?? []);
    }
  }, [selectedCategory, subcategories]);

  const [selectedSubCategory, setSelectedSubCategory] = useState();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const query = {
      page: 1,
      pageSize: 100
    };
    if (selectedSubCategory?.id || selectedCategory?.id) {
      query.filter = {
        type: 'number',
        field: 'category.id',
        value: selectedSubCategory?.id || selectedCategory?.id
      };
    }
    searchProducts(query).then(({ items }) => {
      setProducts(items);
    });
  }, [selectedCategory, selectedSubCategory]);

  return (
    <Stack direction='row' flexWrap='wrap'>
      <Box width='100%'>
        <Typography variant='h5'>Продукт</Typography>
      </Box>

      <InputWrapper sx={{ pr: { xs: 0, md: 1 } }}>
        <Autocomplete
          id={`products.${index}.category`}
          name={`products.${index}.category`}
          freeSolo
          disablePortal
          getOptionLabel={option => option.name}
          options={categories}
          size='small'
          margin='normal'
          fullWidth
          onChange={(_, value) => {
            setFieldValue(`products.${index}.category`, value);
            setSelectedCategory(value);
          }}
          renderInput={params => (
            <TextField
              {...params}
              type='text'
              size='small'
              margin='normal'
              value={product?.category?.id}
              label={dictionary.category}
              onChange={handleChange}
              error={Boolean(errors.category)}
              helperText={errors.category}
              fullWidth
            />
          )}
        />
      </InputWrapper>

      <InputWrapper sx={{ pl: { xs: 0, md: 1 } }}>
        <Autocomplete
          id={`products.${index}.subCategory`}
          name={`products.${index}.subCategory`}
          freeSolo
          disablePortal
          getOptionLabel={option => option.name}
          options={subcategoriesByCategory}
          size='small'
          margin='normal'
          fullWidth
          onChange={(_, value) => {
            setFieldValue(`products.${index}.subCategory`, value);
            setSelectedSubCategory(value);
          }}
          renderInput={params => (
            <TextField
              {...params}
              type='text'
              size='small'
              margin='normal'
              value={product?.subCategory?.id}
              label={dictionary.subcategory}
              onChange={handleChange}
              error={Boolean(errors.products?.[index]?.subCategory)}
              helperText={errors.products?.[index]?.subCategory}
              fullWidth
            />
          )}
        />
      </InputWrapper>

      <Box width='100%'>
        <Autocomplete
          id={`products.${index}.productName`}
          name={`products.${index}.productName`}
          freeSolo
          disablePortal
          getOptionLabel={option => option.name}
          options={products}
          size='small'
          margin='normal'
          fullWidth
          onChange={(_, value) => {
            setFieldValue(`products.${index}.productName`, value);
          }}
          renderInput={params => (
            <TextField
              {...params}
              type='text'
              size='small'
              margin='normal'
              value={product?.productName?.id}
              label={dictionary.productName}
              onChange={handleChange}
              error={Boolean(errors.products?.[index]?.productName)}
              helperText={errors.products?.[index]?.productName}
              fullWidth
            />
          )}
        />
      </Box>

      <InputWrapper sx={{ pr: { xs: 0, md: 1 } }}>
        <Autocomplete
          id={`products.${index}.priority`}
          name={`products.${index}.priority`}
          freeSolo
          disablePortal
          getOptionLabel={option => option.label}
          options={priorityOptions}
          size='small'
          margin='normal'
          fullWidth
          onChange={handleChange}
          renderInput={params => (
            <TextField
              {...params}
              type='text'
              size='small'
              margin='normal'
              value={product.priority}
              label={dictionary.priority}
              onChange={handleChange}
              error={Boolean(errors.products?.[index]?.priority)}
              helperText={errors.products?.[index]?.priority}
              fullWidth
            />
          )}
        />
      </InputWrapper>
      <InputWrapper sx={{ pl: { xs: 0, md: 1 } }}>
        <Autocomplete
          id={`products.${index}.productMeasure`}
          name={`products.${index}.productMeasure`}
          freeSolo
          disablePortal
          getOptionLabel={option => option.label}
          options={productMeasureOptions}
          size='small'
          margin='normal'
          fullWidth
          onChange={handleChange}
          renderInput={params => (
            <TextField
              {...params}
              type='text'
              size='small'
              margin='normal'
              value={product.productMeasure}
              label={dictionary.productMeasure}
              onChange={handleChange}
              error={Boolean(errors.products?.[index]?.productMeasure)}
              helperText={errors.products?.[index]?.productMeasure}
              fullWidth
            />
          )}
        />
      </InputWrapper>

      <InputWrapper sx={{ pr: { xs: 0, md: 1 } }}>
        <TextField
          id={`products.${index}.quantity`}
          name={`products.${index}.quantity`}
          value={product.quantity}
          label={dictionary.quantity}
          required
          type='number'
          size='small'
          margin='normal'
          onChange={handleChange}
          fullWidth
        />
      </InputWrapper>
      <InputWrapper sx={{ pl: { xs: 0, md: 1 } }}>
        <TextField
          id={`products.${index}.date`}
          name={`products.${index}.date`}
          value={product.date}
          required
          type='date'
          size='small'
          margin='normal'
          onChange={handleChange}
          fullWidth
        />
      </InputWrapper>

      <Box width='100%' sx={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton
          sx={{ color: theme => theme.icons.yellow }}
          onClick={() => arrayHelpers.remove(index)} // remove a product from the list
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
        <IconButton
          sx={{ color: theme => theme.icons.denim }}
          onClick={() => arrayHelpers.insert(index, initialProductValue)} // insert an empty string at a position
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </Box>
    </Stack>
  );
};
