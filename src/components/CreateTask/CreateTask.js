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
      <TextField
        value={quantity}
        required
        classes={{ root: styles.root }}
        label={dictionary.quantity}
        size='small'
        margin='normal'
        onChange={e => setQuantity(e.target.value)}
      />
      <TextField
        value={productMeasure}
        required
        classes={{ root: styles.root }}
        label={dictionary.product_measure}
        size='small'
        margin='normal'
        onChange={e => setProductMeasure(e.target.value)}
      />
      <Autocomplete
        classes={{ root: styles.root }}
        disablePortal
        id='combo-box-demo'
        options={priorityOptions}
        required
        size='small'
        margin='normal'
        renderInput={params => (
          <TextField
            onChange={e => setPriority(e.target.value)}
            {...params}
            value={priority}
            label={dictionary.priority}
          />
        )}
      />

      <TextField
        value={productMeasure}
        required
        classes={{ root: styles.root }}
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
            <TextField classes={{ root: styles.root }} size='small' margin='normal' {...params} />
          )}
        />
      </LocalizationProvider>

      <TextField
        value={note}
        required
        classes={{ root: styles.root }}
        label={dictionary.note}
        size='small'
        margin='normal'
        onChange={e => setNote(e.target.value)}
      />

      <Button disabled={isDisabled()} variant='outlined' onClick={hendleClick}>
        {dictionary.send}
      </Button>
    </div>
  );
};
