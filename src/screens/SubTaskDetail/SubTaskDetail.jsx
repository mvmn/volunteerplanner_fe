import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Title } from '../../components/Title';
import dictionary from '../../dictionary';
import { SubTaskForm } from './components/SubTaskForm';
import styles from './SubTaskDetail.module.scss';

const ROW_TO_DISPLAY = ['deadlineDate', 'customer', 'productMeasure', 'priority', 'subtaskCount'];

export const SubTaskDetail = () => {
  const params = useParams();
  const tasks = useSelector(state => state.tasks.verified);

  const { taskId } = params;
  const task = tasks.find(({ id }) => id === taskId);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title text={dictionary.data} />
      </div>
      <TableContainer className={styles.table_container} component={Paper}>
        <Table style={{ borderBottom: 'none' }}>
          <TableBody>
            {ROW_TO_DISPLAY.map((rowName, i) => {
              return (
                <TableRow key={rowName + i}>
                  <TableCell className={styles.title}>{dictionary[rowName]}:</TableCell>
                  <TableCell className={styles.table_cell}>{task[rowName]}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <SubTaskForm task={task} />
      </TableContainer>
    </div>
  );
};
