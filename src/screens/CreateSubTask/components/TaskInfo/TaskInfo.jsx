import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { useMemo } from 'react';

import { Priority } from '../../../../components/Priority/Priority';
import { Status } from '../../../../components/Status';
import dictionary from '../../../../dictionary';
import { unixTimeToPrettyDate } from '../../../../helpers/dates';
import { storeDisplay } from '../../../../helpers/store';

const ROW_TO_DISPLAY = [
  'id',
  'status',
  'product',
  'quantity',
  'deadlineDate',
  'priority',
  'subtaskCount',
  'volunteerStore',
  'customerStore',
  'createdBy',
  'verifiedBy',
  'closedBy'
];

export const TaskInfo = ({ task }) => {
  const rows = useMemo(
    () =>
      task
        ? ROW_TO_DISPLAY.map(key => {
            let title = dictionary[key];
            let value = task[key];
            let render = true;
            let component;
            if (key === 'product') {
              value = task.product.name;
            } else if (key === 'deadlineDate') {
              value = unixTimeToPrettyDate(value);
            } else if (key === 'quantity') {
              value = `${task.quantity} ${task.productMeasure}`;
            } else if (key === 'priority') {
              component = <Priority priority={value} />;
            } else if (key === 'volunteerStore') {
              value = storeDisplay(task.volunteerStore);
            } else if (key === 'customerStore') {
              value = task.customerStore
                ? storeDisplay(task.customerStore)
                : dictionary.confidential;
            } else if (key === 'createdBy') {
              value = task.createdBy
                ? task.createdBy.displayName + ', ' + unixTimeToPrettyDate(task.createdAt)
                : '';
            } else if (key === 'verifiedBy') {
              value = task.verifiedBy
                ? task.verifiedBy.displayName + ', ' + unixTimeToPrettyDate(task.verifiedAt)
                : '';
              render = task.status !== 'NEW';
            } else if (key === 'closedBy') {
              value = task.closedBy
                ? task.closedBy.displayName + ', ' + unixTimeToPrettyDate(task.closedAt)
                : '';
              title = task.status === 'REJECTED' ? dictionary.rejectedBy : dictionary.approvedBy;
              render = task.status === 'COMPLETED' || task.status === 'REJECTED';
            } else if (key === 'status') {
              component = <Status status={task.status} />;
            }

            return {
              title,
              render,
              component,
              key,
              value
            };
          })
        : [],
    [task]
  );

  return task ? (
    <TableContainer component={Paper}>
      <Table style={{ borderBottom: 'none' }}>
        <TableBody>
          {rows.map(({ key, title, value, render, component }) => {
            return render ? (
              <TableRow key={key}>
                <TableCell width='33%'>{title}:</TableCell>
                <TableCell>{component ?? value}</TableCell>
              </TableRow>
            ) : null;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <></>
  );
};
