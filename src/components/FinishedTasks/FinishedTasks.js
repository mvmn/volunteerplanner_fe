import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { useSelector } from 'react-redux';

import { Status } from '../../components/Status';
import dictionary from '../../dictionary';
import styles from './FinishedTasks.module.scss';

const CELLS = ['quantity', 'deadline_date', 'status_id'];

export const FinishedTasks = () => {
  const tasks = useSelector(state => state.tasks.completed);

  return (
    <TableContainer component={Paper}>
      <Table classes={{ root: styles.root }} sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell className={styles.title}>{dictionary.quantity}</TableCell>
            <TableCell className={styles.title}>{dictionary.deadline_date}</TableCell>
            <TableCell className={styles.title}>{dictionary.status}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task, i) => {
            console.log(task);
            return (
              <TableRow key={task.id + i}>
                {CELLS.map(cell => (
                  <TableCell key={task[cell]}>
                    {cell === 'status_id' ? <Status status={task[cell]} /> : task[cell]}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
