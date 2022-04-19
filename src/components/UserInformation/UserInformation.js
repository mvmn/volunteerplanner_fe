import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

import { ROW_TO_DISPLAY } from '../../constants/uiConfig';
import dictionary from '../../dictionary';
import styles from './UserInformation.module.scss';

export const UserInformation = ({ user }) => {
  return (
    <TableContainer className={styles.table_container} component={Paper}>
      <Table style={{ borderBottom: 'none' }}>
        <TableBody>
          {ROW_TO_DISPLAY.map((rowName, i) => {
            return (
              <TableRow key={user[rowName] + i}>
                <TableCell className={styles.title}>{dictionary[rowName]}:</TableCell>
                <TableCell className={styles.table_cell}>{user[rowName]}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
