import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField
} from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import dictionary from '../../dictionary';
import styles from './CreateSubtask.module.scss';

const products = {
  1: 'Бронежелет',
  2: 'Крупи',
  3: 'Зубна паста',
  4: 'Гель для душу',
  5: 'Питна вода',
  6: 'Каремати'
};

export function CreateSubtask() {
  const params = useParams();
  const tasks = useSelector(state => state.tasks.verified);
  const [quantity, setQuantity] = useState(0);

  const task = tasks.find(item => item.id === params.taskId);

  return (
    <div className={styles.container}>
      <TableContainer>
        <Table classes={{ root: styles.root }} sx={{ minWidth: 650 }}>
          <TableBody>
            <TableRow>
              <TableCell className={styles.rowTitle}>{dictionary.deadline_date}:</TableCell>
              <TableCell>{task.deadlineDate}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.rowTitle}>{dictionary.productName}:</TableCell>
              <TableCell>{products[task.productId]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.rowTitle}>{dictionary.quantity}:</TableCell>
              <TableCell>{task.quantity}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.rowTitle}>{dictionary.product_measure}:</TableCell>
              <TableCell>{task.productMeasure}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.action}>
        <TextField
          classes={{ root: styles.root }}
          value={quantity}
          type='number'
          required
          label={dictionary.quantity}
          size='small'
          margin='normal'
          onChange={e => setQuantity(e.target.value)}
        />
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label={dictionary.needTransportation} />
        </FormGroup>
      </div>
      <Button className={styles.button} variant='outlined'>
        {dictionary.save}
      </Button>
    </div>
  );
}
