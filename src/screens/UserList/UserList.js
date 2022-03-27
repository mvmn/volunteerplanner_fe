import { Button, DialogActions } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { LockedStatus } from '../../components/LockedStatus';
import { Modal } from '../../components/Modal';
import { Status } from '../../components/Status';
import { Title } from '../../components/Title';
import { MAX_USER_PER_PAGE } from '../../constants/uiConfig';
import dictionary from '../../dictionary';
import styles from './UserList.module.scss';

const UserName = ({ params }) => {
  const users = useSelector(state => state.users);
  const user = users.find(user => user.id === params.id);
  return <>{user.fullName}</>;
};

export const usersColumns = [
  { field: 'phoneNumber', headerName: dictionary.phoneNumber, flex: 2 },
  { field: 'userName', headerName: dictionary.userName, flex: 1 },
  { field: 'fullName', headerName: dictionary.fullName, flex: 2 },
  {
    field: 'phoneNumberVerified',
    headerName: dictionary.phoneNumberVerified,
    renderCell: ({ row }) => <LockedStatus status={row.phoneNumberVerified} />,
    flex: 2
  },
  { field: 'role', headerName: dictionary.role, flex: 2 },
  {
    field: 'userVerifiedByUserId',
    headerName: dictionary.userVerifiedByUserId,
    renderCell: params => <UserName params={params} />,
    flex: 2
  },
  {
    field: 'locked',
    headerName: dictionary.locked,
    renderCell: ({ row }) => <Status status={row.locked} />,
    flex: 2
  },
  {
    field: 'userVerified',
    headerName: dictionary.verified,
    renderCell: ({ row }) => <Status status={row.userVerified} />,
    flex: 2
  }
];

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
        {selectedUser && (
          <DialogActions>
            {!selectedUser.verified ? (
              <Button variant='outlined'>{dictionary.verify}</Button>
            ) : (
              <Button variant='outlined'>
                {selectedUser.locked ? dictionary.unlock : dictionary.lock}
              </Button>
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
        columns={usersColumns}
      />
    </div>
  );
};
