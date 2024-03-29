import SearchIcon from '@mui/icons-material/Search';
import { Stack, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import clsx from 'clsx';
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import createPersistedState from 'use-persisted-state';

import { createStore, fetchStores } from '../../api/stores';
import { CreateEntityButton } from '../../components/CreateEntityButton';
import { StoreForm } from '../../components/StoreForm';
import { Title } from '../../components/Title';
import { STORES_SORT_FIELD_MAPPINGS } from '../../constants/stores';
import { MAX_STORES_PER_PAGE } from '../../constants/uiConfig';
import dictionary from '../../dictionary';
import useDebounce from '../../helpers/debounce';
import styles from './StoresList.module.scss';

const usePageSizeState = createPersistedState('storesListPageSize');

export const StoreConfidentiality = ({ confidential }) => {
  const color = confidential ? 'yellow' : 'green';
  return (
    <div className={clsx(styles.highlightedValue, styles[color])}>
      {confidential === true ? dictionary.private : dictionary.public}
    </div>
  );
};

export const storesColumns = [
  {
    field: 'name',
    headerName: dictionary.storeName,
    flex: 2
  },
  {
    field: 'address',
    headerName: dictionary.address,
    flex: 2,
    sortable: false
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
    valueGetter: ({ row }) => row.city?.region?.name,
    flex: 2
  },
  {
    field: 'confidential',
    headerName: dictionary.confidentiality,
    renderCell: ({ row }) => <StoreConfidentiality confidential={row.confidential} />,
    flex: 1
  },
  {
    field: 'note',
    headerName: dictionary.note,
    flex: 2,
    sortable: false
  }
];

export const StoresList = () => {
  const [pageSize, setPageSize] = usePageSizeState(MAX_STORES_PER_PAGE);
  const [pageNumber, setPageNumber] = useState(0);
  const [order, setOrder] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const searchQueryDebounced = useDebounce(searchQuery, 500);

  const query = ['stores', { pageNumber, searchQueryDebounced, order, pageSize }];
  const { data, status } = useQuery(
    query,
    async () => {
      const query = {
        pageSize: pageSize,
        page: pageNumber + 1
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

      if (order && order.length > 0) {
        const storesOrderSpec = order[0];
        query.sort = {
          field: STORES_SORT_FIELD_MAPPINGS[storesOrderSpec.field],
          order: storesOrderSpec.sort.toLowerCase()
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
          rows={data.items}
          page={data.page - 1}
          columns={storesColumns}
          rowCount={data.totalCount}
          paginationMode='server'
          onPageChange={page => setPageNumber(page)}
          sortingMode='server'
          onSortModelChange={setOrder}
          sortModel={order || []}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 25, 50]}
          onPageSizeChange={updatePageSize}
        />
      );
      break;
    }
  }

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

      {displayNode}
    </div>
  );
};
