import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Autocomplete, Button, TextField } from '@mui/material';
import { useState } from 'react';

import { Title } from '../../components/Title';
import dictionary from '../../dictionary';
import styles from './CreateTask.module.scss';

/** for the testing */
const options = [
  { label: 'The Godfather', id: 1 },
  { label: 'Pulp Fiction', id: 2 }
];

const priorityOptions = [
  { label: dictionary.high, id: 0 },
  { label: dictionary.medium, id: 1 },
  { label: dictionary.low, id: 3 }
];

export const CreateTask = () => {
  const [customer, setCustomer] = useState();
  const [collectionAddress, setCollectionAddress] = useState();
  const [shippingAddress, setShippingAddress] = useState();
  const [category, setCategory] = useState();
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

  return (
    <div className={styles.container}>
      <Title text={dictionary.createTask} />
      <Autocomplete
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
            Product {item}
            <div className={styles.group}>
              <TextField
                value={category}
                required
                classes={{ root: styles.root }}
                label={dictionary.category}
                size='small'
                margin='normal'
                onChange={e => setCategory(e.target.value)}
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
            </div>
            <div className={styles.group}>
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
            {index === products.length - 1 && (
              <div onClick={handleAddClick}>
                <AddCircleOutlineIcon />
              </div>
            )}
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
