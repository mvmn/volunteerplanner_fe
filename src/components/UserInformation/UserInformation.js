import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

import { userFields } from '../../constants/uiConfig';
import styles from './UserInformation.module.scss';

export const UserInformation = ({ user }) => {
  return (
    <TableContainer className={styles.table_container} component={Paper}>
      <Table style={{ borderBottom: 'none' }}>
        <TableBody>
          {userFields.map(field => {
            return (
              <TableRow key={user.id}>
                <TableCell className={styles.title}>{field.label}:</TableCell>
                <TableCell className={styles.table_cell}>
                  {field.render ? field.render(user) : user[field.id]}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
