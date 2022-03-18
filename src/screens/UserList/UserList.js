import { Button, DialogActions } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Modal } from '../../components/Modal';
import { Title } from '../../components/Title';
import { MAX_USER_PER_PAGE, columns } from '../../constants/uiConfigConstans';
import dictionary from '../../dictionary';
import styles from './UserList.module.scss';

export const UserList = () => {
  const users = useSelector(state => state.users);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  const handleRowClick = e => {
    setSelectedUser(e.row);
    setIsModalOpened(true);
  };

  const handleModalClose = () => {
    setIsModalOpened(false);
  };

  return (
    <div className={styles.container}>
      <Title text={dictionary.users} />
      <Modal handleClose={handleModalClose} isModalOpened={isModalOpened} user={selectedUser}>
        {selectedUser && (!selectedUser.active || !selectedUser.verified) && (
          <DialogActions>
            {!selectedUser.verified ? (
              <Button variant='outlined'>{dictionary.verify}</Button>
            ) : (
              <Button variant='outlined'>{dictionary.activate}</Button>
            )}
          </DialogActions>
        )}
      </Modal>

      <DataGrid
        className={styles.dataGrid}
        style={{ height: 600 }}
        pageSize={MAX_USER_PER_PAGE}
        onRowClick={e => handleRowClick(e)}
        rowsPerPageOptions={[MAX_USER_PER_PAGE]}
        rows={users}
        columns={columns}
      />
    </div>
  );
};
