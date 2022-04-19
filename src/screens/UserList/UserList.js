import SearchIcon from '@mui/icons-material/Search';
import { Button, DialogActions, DialogContent, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUsers } from '../../actions/users';
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
  const users = useSelector(state => state.users.all);
  const user = users.find(user => user.id === params.id);
  return <>{user.displayName}</>;
};

export const usersColumns = [
  { field: 'phoneNumber', headerName: dictionary.phoneNumber, flex: 2 },
  { field: 'displayName', headerName: dictionary.displayName, flex: 1 },
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
  const users = useSelector(state => state.users.all);
  const { isModalVisible, onCloseHandler, onOpenHandler } = useModalVisibleHook();

  const [selectedUser, setSelectedUser] = useState();
  const [searchedUserQuery, setSearchedUserQuery] = useState('');

  const handleRowDoubleClick = e => {
    setSelectedUser(e.row);
    onOpenHandler();
  };

  const modalTitle = `${dictionary.user} : ${selectedUser?.fullName}`;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.field_box}>
        <Title text={dictionary.users} />
        <div className={styles.search}>
          <TextField
            id='search'
            name='search'
            value={searchedUserQuery}
            type='text'
            classes={{ root: styles.root }}
            label={`${dictionary.searchUsers}`}
            size='small'
            margin='normal'
            onChange={e => setSearchedUserQuery(e.target.value)}
          />
          <button className={styles.search_action} disabled={searchedUserQuery.length < 1}>
            <SearchIcon />
          </button>
        </div>
      </div>
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
