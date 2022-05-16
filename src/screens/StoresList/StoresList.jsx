import SearchIcon from '@mui/icons-material/Search';
import { Stack, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import { createStore, fetchStores } from '../../api/stores';
import { CreateEntityButton } from '../../components/CreateEntityButton';
import { StoreForm } from '../../components/StoreForm';
import { Title } from '../../components/Title';
import { MAX_STORES_PER_PAGE } from '../../constants/uiConfig';
import dictionary from '../../dictionary';
import styles from './StoresList.module.scss';

export const storesColumns = [
  {
    field: 'name',
    headerName: dictionary.storeName,
    flex: 2
  },
  {
    field: 'address',
    headerName: dictionary.shippingAddress,
    sortable: false,
    flex: 2
  },
  {
    field: 'city.name',
    headerName: dictionary.city,
    valueGetter: ({ row }) => row.city?.name,
    flex: 2
  },
  {
    field: 'city.region.name',
    headerName: dictionary.region,
    sortable: false,
    valueGetter: ({ row }) => row.city?.region?.name,
    flex: 2
  },
  {
    field: 'confidential',
    headerName: dictionary.confidentiality,
    valueGetter: ({ row }) => (row.confidential === true ? dictionary.private : dictionary.public),
    flex: 1
  },
  {
    field: 'note',
    sortable: false,
    headerName: dictionary.note,
    flex: 2
  }
];

export const StoresList = () => {
  const [pageSize, setPageSize] = useState(MAX_STORES_PER_PAGE);
  const [pageNumber, setPageNumber] = useState(0);
  const [sort, setSort] = useState();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSortModelChange = param => {
    setSort(param.length > 0 ? { field: param[0].field, order: param[0].sort } : null);
  };

  const query = ['stores', { pageNumber, searchQuery, sort, pageSize }];
  const { data, status } = useQuery(
    query,
    async () => {
      const query = {
        pageSize: pageSize,
        page: pageNumber + 1,
        sort
      };

      if (searchQuery) {
        query.filter = {
          type: 'operator',
          operator: 'or',
          operands: [
            {
              type: 'text',
              field: 'name',
              value: searchQuery
            },
            {
              type: 'text',
              field: 'address',
              value: searchQuery
            },
            {
              type: 'text',
              field: 'note',
              value: searchQuery
            }
          ]
        };
      }

      return await fetchStores(query);
    },
    {
      cacheTime: 0,
      refetchOnWindowFocus: false
    }
  );
  const queryClient = useQueryClient();
  const handleStoreCreation = form =>
    createStore(form)
      .then(() => queryClient.invalidateQueries(query))
      .catch(error => {
        console.error(error);
      });

  const updatePageSize = pageSize => {
    setPageSize(pageSize);
    setPageNumber(0);
  };

  const items = data?.items ?? [];
  const page = data?.page ?? 1;
  const totalCount = data?.totalCount ?? 0;

  return (
    <div className={styles.container}>
      <div className={styles.field_box}>
        <Title text={dictionary.stores} />
        <Stack direction='column' alignItems='flex-end'>
          <CreateEntityButton
            title={dictionary.createStore}
            renderModalForm={onCloseHandler => <StoreForm onClose={onCloseHandler} />}
            onEntitySaved={handleStoreCreation}
          />
          <div className={styles.search}>
            <TextField
              id='search'
              name='search'
              value={searchQuery}
              type='text'
              classes={{ root: styles.root }}
              label={`${dictionary.searchStores}`}
              size='small'
              margin='normal'
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button className={styles.search_action} disabled={searchQuery.length < 1}>
              <SearchIcon />
            </button>
          </div>
        </Stack>
      </div>

      {status === 'error' ? (
        <div>Error</div>
      ) : (
        <DataGrid
          className={styles.dataGrid}
          style={{ height: 600 }}
          rows={items}
          page={page - 1}
          columns={storesColumns}
          rowCount={totalCount}
          paginationMode='server'
          onPageChange={page => setPageNumber(page)}
          sortingMode='server'
          onSortModelChange={handleSortModelChange}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 25, 50]}
          onPageSizeChange={updatePageSize}
        />
      )}
    </div>
  );
};
