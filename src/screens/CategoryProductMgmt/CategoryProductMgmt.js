import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useContext, useState } from 'react';
import { useQuery } from 'react-query';

import { searchProducts } from '../../api/products';
import { Categories } from '../../components/Categories';
import { Title } from '../../components/Title';
import { MAX_PRODUCTS_PER_PAGE } from '../../constants/uiConfig';
import dictionary from '../../dictionary';
import { CategoriesContext } from '../Main';
import styles from './CategoryProductMgmt.module.scss';

export const productColumns = [
  { field: 'name', headerName: dictionary.name, flex: 2 },
  { field: 'note', headerName: dictionary.note, flex: 1, sortable: false },
  {
    field: 'category.parent.name',
    headerName: dictionary.category,
    flex: 2,
    renderCell: ({ row }) => row.category.parent.name
  },
  {
    field: 'category.name',
    headerName: dictionary.subcategory,
    flex: 2,
    renderCell: ({ row }) => row.category.name
  }
];

const ProductsList = () => {
  const { selectedCategory, selectedSubCategory } = useContext(CategoriesContext);
  const [pageSize, setPageSize] = useState(MAX_PRODUCTS_PER_PAGE);
  const [pageNumber, setPageNumber] = useState(0);
  const [order, setOrder] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const { data, status } = useQuery(
    [
      'products',
      {
        pageNumber,
        selectedCategory,
        selectedSubCategory,
        searchQuery,
        order,
        pageSize
      }
    ],
    () => {
      return searchProducts(prepareQuery());
    },
    {
      cacheTime: 0,
      refetchOnWindowFocus: false
    }
  );

  const changePageSize = pageSize => {
    setPageSize(pageSize);
    setPageNumber(0);
  };

  const prepareQuery = () => {
    const request = {
      pageSize,
      page: pageNumber + 1
    };
    const filters = [];
    if (searchQuery && searchQuery.trim().length > 0) {
      filters.push({
        type: 'text',
        field: 'name',
        value: searchQuery.trim()
      });
    }
    var categoryPath = null;
    if (selectedCategory) {
      categoryPath = '/' + selectedCategory;
    }
    if (selectedSubCategory) {
      categoryPath += '/' + selectedSubCategory;
    }
    if (categoryPath) {
      filters.push({
        type: 'text',
        field: 'categoryPath',
        value: categoryPath
      });
    }
    if (filters.length > 0) {
      if (filters.length === 1) {
        request.filter = filters[0];
      } else {
        request.filter = {
          type: 'operator',
          operator: 'and',
          operands: filters
        };
      }
    }
    if (order.length > 0) {
      request.sort = { field: order[0].field, order: order[0].sort };
    }
    return request;
  };

  return (
    <>
      <div className={styles.search}>
        <TextField
          id='search'
          name='search'
          value={searchQuery}
          type='text'
          classes={{ root: styles.root }}
          label={dictionary.searchTask}
          size='small'
          margin='normal'
          onChange={e => setSearchQuery(e.target.value)}
        />
        <button className={styles.search_action} disabled={searchQuery.length < 1}>
          <SearchIcon />
        </button>
      </div>

      {status === 'loading' ? (
        <div>{dictionary.loading}...</div>
      ) : status === 'error' ? (
        <div>{dictionary.error}</div>
      ) : (
        <DataGrid
          style={{ height: 600 }}
          rows={data.items}
          page={data.page - 1}
          columns={productColumns}
          rowCount={data.totalCount}
          paginationMode='server'
          onPageChange={page => setPageNumber(page)}
          sortingMode='server'
          onSortModelChange={setOrder}
          sortModel={order ? order : []}
          rowsPerPageOptions={[5, 10, 25, 50]}
          onPageSizeChange={changePageSize}
          pageSize={pageSize}
        />
      )}
    </>
  );
};

export const CategoryProductMgmt = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title text={dictionary.tasks} />
      </div>

      <div className={styles.body}>
        <Categories editable={true} />
        <div className={styles.tabsContainer}>
          <ProductsList />
        </div>
      </div>
    </div>
  );
};
