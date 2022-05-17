import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { FormHelperText, IconButton, MenuItem, Select, TextField } from '@mui/material';
import { Field } from 'formik';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import dictionary from '../../../../dictionary/index';
import {
  primaryCategory,
  priorityOptions,
  productMeasureOptions,
  subCategoryProduct
} from '../../config';
import styles from '../ProductsFieldArray/ProductsFieldArray.module.scss';

export const initialProductValue = {
  id: Date.now(),
  productName: '',
  category: primaryCategory[0].label,
  quantity: '',
  subCategory: subCategoryProduct[0].label,
  priority: priorityOptions[0].label,
  productMeasure: productMeasureOptions[0].label,
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
  const [subcategoriesByCategory, setSubcategoriesByCategory] = useState(
    subcategories[categories[0].id]
  );
  const [selectedCategory, setSelectedCategory] = useState([]);
  useEffect(() => {
    if (selectedCategory?.id) {
      setSubcategoriesByCategory(
        subcategories[categories.filter(i => i.id === selectedCategory.id)[0].id]
      );
    }
  }, [selectedCategory]);

  return (
    <div key={index}>
      <h4 className={styles.title}>Продукт</h4>
      <div className={styles.field_box}>
        <Field
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
          component={TextField}
        />
      </div>
      <div className={styles.group}>
        <div className={styles.field_box}>
          {/* <div> */}
          <FormHelperText>{dictionary.category}</FormHelperText>
          <Select
            id={`products.${index}.category`}
            name={`products.${index}.category`}
            value={values.products[index].category}
            size='small'
            margin='normal'
            className={styles.root}
            // onChange={handleChange}
            onChange={(_, value) => {
              console.log('!!!!!!!!!!!!!!', _);
              console.log('!!!!!!!!!!!!!!', value);
              setFieldValue(`products.${index}.category`, value);
              setSelectedCategory(value.props.value);
            }}
          >
            {categories.map(item => (
              <MenuItem key={item.id} value={item.name}>
                {item.name}
              </MenuItem>
              //   <MenuItem key={item.id} value={item.id} primaryText={item.name} />
            ))}
          </Select>
          {/* <Autocomplete
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
              //   setFieldValue('city', null);
              setSelectedCategory(value);
            }}
            renderInput={params => (
              <TextField
                {...params}
                type='text'
                size='small'
                margin='normal'
                value={values.category}
                label={dictionary.category}
                onChange={handleChange}
                error={Boolean(errors.category)}
                helperText={errors.category}
                fullWidth
              />
            )}
          /> */}
        </div>
        <div className={styles.field_box}>
          <FormHelperText>{dictionary.subcategory}</FormHelperText>
          <Select
            id={`products.${index}.subCategory`}
            name={`products.${index}.subCategory`}
            value={values.products[index].subCategory}
            size='small'
            margin='normal'
            className={styles.root}
            onChange={handleChange}
          >
            {subcategoriesByCategory.map(item => (
              <MenuItem key={item.id} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
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
    </div>
  );
};
