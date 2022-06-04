import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useQuery } from 'react-query';
import createPersistedState from 'use-persisted-state';

import { getUsers } from '../../api/users';
import { LockedStatus } from '../../components/LockedStatus';
import { Status } from '../../components/Status';
import { Title } from '../../components/Title';
import { UserModal } from '../../components/UserModal/UserModal';
import { MAX_USER_PER_PAGE } from '../../constants/uiConfig';
import dictionary from '../../dictionary';
import useDebounce from '../../helpers/debounce';
import { useModalVisibleHook } from '../../hooks/useModalVisibleHook';
import styles from './UserList.module.scss';

const usePageSizeState = createPersistedState('usersListPageSize');

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
    field: 'userVerifiedBy',
    headerName: dictionary.userVerifiedByUserId,
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

  const handleRowDoubleClick = e => {
    setSelectedUser(e.row?.id);
    onOpenHandler();
  };

  const [selectedUser, setSelectedUser] = useState();

  const [pageSize, setPageSize] = usePageSizeState(MAX_USER_PER_PAGE);
  const [pageNumber, setPageNumber] = useState(0);
  const [sortModel, setSortModel] = useState();
  const [searchQuery, setSearchQuery] = useState('');

  const searchQueryDebounced = useDebounce(searchQuery, 500);

  const buildUsersQuery = () => {
    const query = { pageSize, page: pageNumber + 1 };

    if (searchQuery && searchQuery.trim().length > 0) {
      query.filter = {
        type: 'operator',
        operator: 'or',
        operands: [
          {
            type: 'text',
            field: 'displayname',
            value: searchQuery.trim()
          },
          {
            type: 'text',
            field: 'phone',
            value: searchQuery.trim()
          }
        ]
      };
    }

    if (sortModel && sortModel.length > 0) {
      query.sort = { field: sortModel[0].field, order: sortModel[0].sort };
    }

    return query;
  };

  const query = ['users', { pageNumber, searchQueryDebounced, sortModel, pageSize }];
  const { data, status } = useQuery(
    query,
    async () => {
      return await getUsers(buildUsersQuery());
    },
    {
      cacheTime: 0,
      refetchOnWindowFocus: false
    }
  );

  let displayNode;
  switch (status) {
    case 'loading': {
      displayNode = <div>{dictionary.loading}...</div>;
      break;
    }
    case 'error': {
      displayNode = <div>{dictionary.error}</div>;
      break;
    }
    default: {
      displayNode = (
        <DataGrid
          className={styles.dataGrid}
          style={{ height: 600 }}
          onRowDoubleClick={e => handleRowDoubleClick(e)}
          rows={data.items}
          page={data.page - 1}
          rowCount={data.totalCount}
          columns={usersColumns}
          paginationMode='server'
          onPageChange={setPageNumber}
          sortingMode='server'
          onSortModelChange={setSortModel}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 25, 50]}
          onPageSizeChange={setPageSize}
        />
      );
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.field_box}>
        <Title text={dictionary.users} />
        <div className={styles.search}>
          <TextField
            id='search'
            name='search'
            value={searchQuery}
            type='text'
            classes={{ root: styles.root }}
            label={dictionary.searchUsers}
            size='small'
            margin='normal'
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button className={styles.search_action} disabled={searchQuery.length < 1}>
            <SearchIcon />
          </button>
        </div>
      </div>
      <UserModal isModalVisible={isModalVisible} onClose={onCloseHandler} userId={selectedUser} />

      {displayNode}
    </div>
  );
};
