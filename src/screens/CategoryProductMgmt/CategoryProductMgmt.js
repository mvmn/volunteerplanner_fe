import SearchIcon from '@mui/icons-material/Search';
import { Button, TextField, TextareaAutosize } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Formik } from 'formik';
import { useContext, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import createPersistedState from 'use-persisted-state';
import * as yup from 'yup';

import { createProduct, searchProducts } from '../../api/products';
import { Categories } from '../../components/Categories';
import { CreateEntityButton } from '../../components/CreateEntityButton';
import { ProductEditModal } from '../../components/ProductEditModal';
import { Title } from '../../components/Title';
import { MAX_PRODUCTS_PER_PAGE } from '../../constants/uiConfig';
import dictionary from '../../dictionary';
import useDebounce from '../../helpers/debounce';
import { yupPatterns } from '../../helpers/validation';
import { useModalVisibleHook } from '../../hooks/useModalVisibleHooks';
import { CategoriesContext } from '../Main';
import styles from './CategoryProductMgmt.module.scss';

const usePageSizeState = createPersistedState('prodMgmtProductListPageSize');

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

const ProductsList = ({ searchQuery, refreshKey }) => {
  const { selectedCategory, selectedSubCategory } = useContext(CategoriesContext);
  const [pageSize, setPageSize] = usePageSizeState(MAX_PRODUCTS_PER_PAGE);
  const [pageNumber, setPageNumber] = useState(0);
  const [order, setOrder] = useState(0);
  const { isModalVisible, onCloseHandler, onOpenHandler } = useModalVisibleHook();
  const [selectedProduct, setSelectedProduct] = useState();

  const searchQueryDebounced = useDebounce(searchQuery, 500);

  const query = [
    'products',
    {
      pageNumber,
      selectedCategory,
      selectedSubCategory,
      searchQueryDebounced,
      order,
      pageSize,
      refreshKey
    }
  ];

  const { data, status } = useQuery(
    query,
    () => {
      return searchProducts(prepareQuery());
    },
    {
      cacheTime: 0,
      refetchOnWindowFocus: false
    }
  );
  const queryClient = useQueryClient();

  const handleProductClick = event => {
    setSelectedProduct(event.row);
    onOpenHandler();
  };

  const handleModalClose = () => {
    onCloseHandler();
    setSelectedProduct();
  };

  const handleProductUpdate = () => {
    queryClient.invalidateQueries(query);
    onCloseHandler();
  };

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

    const categoryPath = [selectedCategory, selectedSubCategory].filter(Boolean).join('/');
    if (categoryPath) {
      filters.push({
        type: 'text',
        field: 'categoryPath',
        value: `/${categoryPath}`
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
          onRowClick={event => handleProductClick(event)}
          sortingMode='server'
          onSortModelChange={setOrder}
          sortModel={order ? order : []}
          rowsPerPageOptions={[5, 10, 25, 50]}
          onPageSizeChange={changePageSize}
          pageSize={pageSize}
        />
      )}

      <ProductEditModal
        isOpen={isModalVisible}
        onClose={handleModalClose}
        onSave={handleProductUpdate}
        product={selectedProduct}
      />
    </>
  );
};

const initialValues = {
  name: '',
  note: ''
};

const validationSchema = yup.object().shape({
  name: yupPatterns('notEmptyString')
});

export const CreateProductForm = ({ onClose, onSave, category, subcategory }) => {
  const onSubmitHandler = async (values, { setSubmitting }) => {
    const request = { ...values };
    request.category = { id: subcategory.id };
    await createProduct(request);
    setSubmitting(false);
    onSave();
    onClose({ form: values });
  };

  return (
    <Formik
      initialValues={{ ...initialValues }}
      validationSchema={validationSchema}
      onSubmit={onSubmitHandler}
    >
      {({ values, errors, setFieldValue, handleChange, handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div>
              {dictionary.category}: {category?.name} / {subcategory?.name}
            </div>

            <TextField
              name='name'
              value={values.name}
              label={dictionary.name}
              type='text'
              size='small'
              margin='normal'
              onChange={handleChange}
              fullWidth
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
            <TextareaAutosize
              id='note'
              name='note'
              placeholder={dictionary.note}
              value={values.note}
              type='text'
              size='small'
              margin='normal'
              onChange={handleChange}
              className={styles.noteTextarea}
            />

            <Button variant='outlined' type='submit' className={styles.button} fullWidth>
              {dictionary.save}
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};

export const CreateProductButton = ({ onNewProductCreated }) => {
  const categories = useSelector(state => state.categories.rootCategories);
  const subcategories = useSelector(state => state.categories.subcategories);
  const { selectedCategory, selectedSubCategory } = useContext(CategoriesContext);

  if (!categories || !subcategories) {
    return <div>{dictionary.loading}</div>;
  }

  return (
    <CreateEntityButton
      disabled={!selectedSubCategory}
      title={dictionary.createProduct}
      renderModalForm={onCloseHandler => (
        <CreateProductForm
          category={
            selectedCategory && categories.find(({ id }) => id.toString() === selectedCategory)
          }
          subcategory={
            selectedSubCategory &&
            subcategories[selectedCategory]?.find(({ id }) => id.toString() === selectedSubCategory)
          }
          onClose={onCloseHandler}
          onSave={onNewProductCreated}
        />
      )}
    />
  );
};

export const CategoryProductMgmt = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const onNewProductCreated = () => {
    setRefreshKey(refreshKey + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title text={dictionary.categoriesAndProducts} />
        <CreateProductButton onNewProductCreated={onNewProductCreated} />
        <div className={styles.tabsContainer}>
          <div className={styles.tabsSearchBox}>
            <div className={styles.search}>
              <TextField
                id='search'
                name='search'
                value={searchQuery}
                type='text'
                label={dictionary.searchProducts}
                size='small'
                margin='normal'
                onChange={e => setSearchQuery(e.target.value)}
                InputProps={{
                  endAdornment: <SearchIcon />
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <Categories editable={true} />
        <div className={styles.tabsContainer}>
          <ProductsList searchQuery={searchQuery} refreshKey={refreshKey} />
        </div>
      </div>
    </div>
  );
};
