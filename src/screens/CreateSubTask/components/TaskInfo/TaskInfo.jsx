import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { useMemo } from 'react';

import { Priority } from '../../../../components/Priority/Priority';
import dictionary from '../../../../dictionary';
import { unixTimeToPrettyDate } from '../../../../helpers/dates';
import { storeDisplay } from '../../../../helpers/store';

const ROW_TO_DISPLAY = [
  'product',
  'quantity',
  'deadlineDate',
  'priority',
  'subtaskCount',
  'volunteerStore',
  'customerStore'
];

export const TaskInfo = ({ task }) => {
  const rows = useMemo(
    () =>
      task
        ? ROW_TO_DISPLAY.map(key => {
            let value = task[key];
            let render;
            if (key === 'product') {
              value = task.product.name;
            } else if (key === 'deadlineDate') {
              value = unixTimeToPrettyDate(value);
            } else if (key === 'quantity') {
              value = `${task.quantity} ${task.productMeasure}`;
            } else if (key === 'priority') {
              render = <Priority priority={value} />;
            } else if (key === 'volunteerStore') {
              value = storeDisplay(task.volunteerStore);
            } else if (key === 'customerStore') {
              value = task.customerStore
                ? storeDisplay(task.customerStore)
                : dictionary.confidential;
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
