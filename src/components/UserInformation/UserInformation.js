import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

import { ROW_TO_DISPLAY } from '../../constants/uiConfigConstans';
import dictionary from '../../dictionary';
import styles from './UserInformation.module.scss';

export const UserInformation = ({ user }) => {
  return (
    <TableContainer className={styles.tableContainer} component={Paper}>
      <Table classes={{ root: styles.root }} sx={{ minWidth: 650 }}>
        <TableBody>
          {ROW_TO_DISPLAY.map((rowName, i) => {
            return (
              <TableRow key={user[rowName] + i}>
                <TableCell className={styles.rowTitle}>{dictionary[rowName]}:</TableCell>
                <TableCell>{user[rowName]}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
