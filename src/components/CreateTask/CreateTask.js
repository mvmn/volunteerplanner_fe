import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Autocomplete, Button, TextField } from '@mui/material';
import { useState } from 'react';

import { Title } from '../../components/Title';
import dictionary from '../../dictionary';
import image from '../../styles/iStock-529679954.jpg';
import styles from './CreateTask.module.scss';
import { primaryCategory, priorityOptions, subCategoryProduct } from './CreateTaskConfig';

/** for the testing */
const options = [
  { label: 'The Godfather', id: 1 },
  { label: 'Pulp Fiction', id: 2 }
];

export const CreateTask = () => {
  const [customer, setCustomer] = useState();
  const [collectionAddress, setCollectionAddress] = useState();
  const [shippingAddress, setShippingAddress] = useState();
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [productName, setProductName] = useState();
  const [quantity, setQuantity] = useState();
  const [productMeasure, setProductMeasure] = useState();
  const [priority, setPriority] = useState();
  const [date, setDate] = useState();
  const [note, setNote] = useState();

  const [products, setProducts] = useState([1]);

  const isDisabled = () => {
    return (
      !customer ||
      !collectionAddress ||
      !shippingAddress ||
      !category ||
      !subCategory ||
      !productName ||
      !quantity ||
      !productMeasure ||
      !priority ||
      !date
    );
  };

  const hendleClick = () => {
    /**
     * - save into DB;
     * - add a new item in the tasks list on success response;
     */
  };

  const handleAddClick = () => {
    setProducts([...products, products[products.length - 1] + 1]);
  };

  const handleRemoveClick = () => {
    setProducts(products.slice(0, -1));
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <img src={image} alt='ukraine_flag' className={styles.ukraineFlag}></img>
        <Title text={dictionary.createTask} />
      </div>
      <Autocomplete
        freeSolo
        disablePortal
        id='combo-box-demo'
        options={options}
        required
        classes={{ root: styles.root }}
        size='small'
        margin='normal'
        renderInput={params => (
          <TextField
            onChange={e => setCustomer(e.target.value)}
            {...params}
            value={customer}
            label={dictionary.customer}
          />
        )}
      />
      <TextField
        value={collectionAddress}
        required
        classes={{ root: styles.root }}
        label={dictionary.collectionAddress}
        size='small'
        margin='normal'
        onChange={e => setCollectionAddress(e.target.value)}
      />
      <TextField
        value={shippingAddress}
        required
        classes={{ root: styles.root }}
        label={dictionary.shippingAddress}
        size='small'
        margin='normal'
        onChange={e => setShippingAddress(e.target.value)}
      />
      {products.map((item, index) => {
        return (
          <>
            <h2 className={styles.productHeading}>
              {dictionary.product} {item}
            </h2>
            <div className={styles.group}>
              <Autocomplete
                disablePortal
                id='combo-box-demo'
                options={primaryCategory}
                classes={{ root: styles.root }}
                required
                size='small'
                margin='normal'
                renderInput={params => (
                  <TextField
                    size='small'
                    margin='normal'
                    onChange={e => setCategory(e.target.value)}
                    {...params}
                    value={category}
                    label={dictionary.category}
                  />
                )}
              />
              <Autocomplete
                disablePortal
                id='combo-box-demo'
                options={subCategoryProduct}
                classes={{ root: styles.root }}
                required
                size='small'
                margin='normal'
                renderInput={params => (
                  <TextField
                    size='small'
                    margin='normal'
                    onChange={e => setSubCategory(e.target.value)}
                    {...params}
                    value={subCategory}
                    label={dictionary.subcategory}
                  />
                )}
              />
              <TextField
                value={productName}
                required
                classes={{ root: styles.root }}
                label={dictionary.productName}
                size='small'
                margin='normal'
                onChange={e => setProductName(e.target.value)}
              />
            </div>
            <div className={styles.group}>
              <TextField
                classes={{ root: styles.root }}
                value={quantity}
                required
                label={dictionary.quantity}
                size='small'
                margin='normal'
                onChange={e => setQuantity(e.target.value)}
              />
              <Autocomplete
                disablePortal
                id='combo-box-demo'
                options={priorityOptions}
                classes={{ root: styles.root }}
                required
                size='small'
                margin='normal'
                renderInput={params => (
                  <TextField
                    size='small'
                    margin='normal'
                    onChange={e => setPriority(e.target.value)}
                    {...params}
                    value={priority}
                    label={dictionary.priority}
                  />
                )}
              />
              <TextField
                classes={{ root: styles.root }}
                value={productMeasure}
                required
                label={dictionary.product_measure}
                size='small'
                margin='normal'
                onChange={e => setProductMeasure(e.target.value)}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label={dictionary.deadline_date}
                  value={date}
                  onChange={newValue => {
                    setDate(newValue);
                  }}
                  renderInput={params => (
                    <TextField
                      classes={{ root: styles.root }}
                      size='small'
                      margin='normal'
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
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

      <TextField
        value={note}
        classes={{ root: styles.root }}
        label={dictionary.note}
        size='small'
        margin='normal'
        onChange={e => setNote(e.target.value)}
      />

      <Button disabled={isDisabled()} variant='outlined' onClick={hendleClick}>
        {dictionary.save}
      </Button>
    </div>
  );
};
