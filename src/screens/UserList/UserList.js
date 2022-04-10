import { Button, DialogActions, DialogContent } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { LockedStatus } from '../../components/LockedStatus';
import { Modal } from '../../components/Modal';
import { Status } from '../../components/Status';
import { Title } from '../../components/Title';
import { UserInformation } from '../../components/UserInformation';
import { MAX_USER_PER_PAGE } from '../../constants/uiConfig';
import dictionary from '../../dictionary';
import { useModalVisibleHook } from '../../hooks/useModalVisibleHook';
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
    renderCell: ({ row }) => <Status status={row.phoneNumberVerified} />,
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
    renderCell: ({ row }) => <LockedStatus status={row.locked} />,
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
  const { isModalVisible, onCloseHandler, onOpenHandler } = useModalVisibleHook();

  const users = useSelector(state => state.users);
  const [selectedUser, setSelectedUser] = useState();

  const handleRowDoubleClick = e => {
    setSelectedUser(e.row);
    onOpenHandler();
  };

  const modalTitle = `${dictionary.user} : ${selectedUser?.fullName}`;

  return (
    <div className={styles.container}>
      <Title text={dictionary.users} />
      <Modal open={isModalVisible} onClose={onCloseHandler} title={modalTitle}>
        <DialogContent dividers>
          <UserInformation user={selectedUser} />
        </DialogContent>
        {selectedUser && (
          <DialogActions>
            {!selectedUser.userVerified ? (
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
        onRowDoubleClick={e => handleRowDoubleClick(e)}
        rowsPerPageOptions={[MAX_USER_PER_PAGE]}
        rows={users}
        columns={usersColumns}
      />
    </div>
  );
};
