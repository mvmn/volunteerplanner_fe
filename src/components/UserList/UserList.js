import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { MAX_USER_PER_PAGE, columns } from '../../constants/uiConfigConstans';
import dictionary from '../../dictionary';
import { Modal } from '../Modal';
import { Title } from '../Title';
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
      <Modal handleClose={handleModalClose} isModalOpened={isModalOpened} user={selectedUser} />

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
