import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { useMemo } from 'react';

import { Priority } from '../../../../components/Priority/Priority';
import dictionary from '../../../../dictionary';

const ROW_TO_DISPLAY = ['deadlineDate', 'quantity', 'priority', 'subtaskCount'];

export const TaskInfo = ({ task }) => {
  const rows = useMemo(
    () =>
      task
        ? ROW_TO_DISPLAY.map(key => {
            let value = task[key];
            let render;

            if (key === 'deadlineDate') {
              value = new Date(value).toLocaleString();
            } else if (key === 'quantity') {
              value = `${task.quantity} ${task.productMeasure}`;
            } else if (key === 'priority') {
              render = <Priority priority={value} />;
            }

            return {
              title: dictionary[key],
              render,
              key,
              value
            };
          })
        : [],
    [task]
  );

  return (
    <TableContainer component={Paper}>
      <Table style={{ borderBottom: 'none' }}>
        <TableBody>
          {rows.map(({ key, title, value, render }) => {
            return (
              <TableRow key={key}>
                <TableCell width='33%'>{title}:</TableCell>
                <TableCell>{render ?? value}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
