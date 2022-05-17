import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {
  Autocomplete,
  FormHelperText,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  styled
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import dictionary from '../../../../dictionary/index';
import { priorityOptions, productMeasureOptions } from '../../config';
import styles from '../ProductsFieldArray/ProductsFieldArray.module.scss';

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
  values,
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

  return (
    <Stack direction='row' flexWrap='wrap'>
      <Typography variant='h4'>Продукт</Typography>

      <Box width='100%'>
        <TextField
          id={`products.${index}.productName`}
          name={`products.${index}.productName`}
          classes={{ root: styles.root }}
          className={styles.default_inputs}
          label={dictionary.productName}
          required
          type='text'
          size='small'
          margin='normal'
          value={values.products[index].productName}
          onChange={handleChange}
          fullWidth
        />
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
              value={values.products[index]?.category?.id}
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
            setSelectedCategory(value);
          }}
          renderInput={params => (
            <TextField
              {...params}
              type='text'
              size='small'
              margin='normal'
              value={values.products[index]?.subCategory?.id}
              label={dictionary.subcategory}
              onChange={handleChange}
              error={Boolean(errors.products?.[index]?.subCategory)}
              helperText={errors.products?.[index]?.subCategory}
              fullWidth
            />
          )}
        />
      </InputWrapper>

      <div className={styles.group}>
        <div className={styles.field_box}>
          <FormHelperText>{dictionary.priority}</FormHelperText>
          <Select
            id={`products.${index}.priority`}
            name={`products.${index}.priority`}
            value={values.products[index].priority}
            size='small'
            margin='normal'
            className={styles.root}
            onChange={handleChange}
          >
            {priorityOptions.map(item => (
              <MenuItem key={item.id} value={item.label}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div className={styles.field_box}>
          <FormHelperText>{dictionary.productMeasure}</FormHelperText>
          <Select
            id={`products.${index}.productMeasure`}
            name={`products.${index}.productMeasure`}
            value={values.products[index].productMeasure}
            size='small'
            margin='normal'
            className={styles.root}
            onChange={handleChange}
          >
            {productMeasureOptions.map(item => (
              <MenuItem key={item.id} value={item.label}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>

      <div className={styles.group}>
        <div className={styles.field_box}>
          <TextField
            id={`products.${index}.quantity`}
            name={`products.${index}.quantity`}
            value={values.products[index].quantity}
            classes={{ root: styles.root }}
            className={styles.default_inputs}
            label={dictionary.quantity}
            required
            type='number'
            size='small'
            margin='normal'
            onChange={handleChange}
          />
        </div>
        <div className={styles.field_box}>
          <TextField
            id={`products.${index}.date`}
            name={`products.${index}.date`}
            value={values.products[index].date}
            classes={{ root: styles.root }}
            className={styles.default_inputs}
            required
            type='date'
            size='small'
            margin='normal'
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.actions}>
        <IconButton
          className={styles.remove}
          onClick={() => arrayHelpers.remove(index)} // remove a product from the list
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
        <IconButton
          className={styles.add}
          onClick={() => arrayHelpers.insert(index, initialProductValue)} // insert an empty string at a position
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </div>
    </Stack>
  );
};
