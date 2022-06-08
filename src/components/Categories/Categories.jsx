import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TreeView } from '@mui/lab';
import { Box, Button, TextField, TextareaAutosize } from '@mui/material';
import { Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { getCategories } from '../../actions/categories';
import { createCategory, updateCategory } from '../../api/categories';
import { SUBCATEGORY_ID_PREFIX } from '../../constants/categories';
import dictionary from '../../dictionary';
import { yupPatterns } from '../../helpers/validation';
import { useModalVisibleHook } from '../../hooks/useModalVisibleHooks';
import { CategoriesContext } from '../../screens/Main';
import { CategoryEditModal } from '../CategoryEditModal/CategoryEditModal';
import { CreateEntityButton } from '../CreateEntityButton';
import styles from './Categories.module.scss';
import { CategoryTreeItem } from './CategoryTreeItem/CategoryTreeItem';

const width = 308;

const initialValues = {
  name: '',
  note: ''
};

const validationSchema = yup.object().shape({
  name: yupPatterns('notEmptyString')
});

export const CreateCategoryForm = ({ onClose, onSave, parentCategory }) => {
  const onSubmitHandler = async (values, { setSubmitting }) => {
    const request = { ...values };
    if (parentCategory) {
      request.parent = { id: parentCategory.id };
    }
    await createCategory(request);
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
      {({ values, errors, handleChange, handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            {parentCategory ? (
              <div>
                {dictionary.category} {parentCategory.name}
              </div>
            ) : (
              <></>
            )}

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

export const Categories = ({ editable }) => {
  const categories = useSelector(state => state.categories.rootCategories);
  const subcategories = useSelector(state => state.categories.subcategories);
  const [refreshKey, setRefreshKey] = useState(0);
  const { isModalVisible, onCloseHandler, onOpenHandler } = useModalVisibleHook();
  const [editingCategory, setEditingCategory] = useState();

  const handleCategoriesChange = () => {
    dispatch(getCategories());
    setRefreshKey(refreshKey + 1);
  };

  const saveCategory = async data => {
    await updateCategory(data);
    handleCategoriesChange(data.id);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch, refreshKey]);

  const { setSelectedSubCategory, setSelectedCategory, selectedCategory, selectedSubCategory } =
    useContext(CategoriesContext);

  const handleToggle = (_, nodeIds) => {
    setExpanded([nodeIds[0]]);
  };
  const [expanded, setExpanded] = useState([]);

  const handleSelection = (_, id) => {
    if (id.startsWith(SUBCATEGORY_ID_PREFIX)) {
      const subcategoryId = id.substring(SUBCATEGORY_ID_PREFIX.length);
      setSelectedSubCategory(selectedSubCategory === subcategoryId ? null : subcategoryId);
    } else {
      setSelectedCategory(selectedCategory === id ? null : id);
    }
  };

  useEffect(() => {
    setSelectedSubCategory();
  }, [selectedCategory, setSelectedSubCategory]);

  if (!categories || !subcategories) {
    return <div>{dictionary.loading}...</div>;
  }

  return (
    <div>
      {editable && (
        <Box sx={{ px: 2, minWidth: `${width}px` }}>
          <CreateEntityButton
            title={selectedCategory ? dictionary.createSubcategory : dictionary.createCategory}
            renderModalForm={onCloseHandler => (
              <CreateCategoryForm
                onClose={onCloseHandler}
                onSave={() => {
                  handleCategoriesChange();
                  setExpanded([selectedCategory]);
                }}
                parentCategory={
                  selectedCategory
                    ? categories
                        .filter(category => category.id.toString() === selectedCategory)
                        .reduce((a, b) => a)
                    : null
                }
              />
            )}
            fullWidth
          />

          <CategoryEditModal
            isOpen={isModalVisible}
            onClose={onCloseHandler}
            onSave={saveCategory}
            category={editingCategory}
          />
        </Box>
      )}

      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        selected={''}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelection}
        sx={{
          height: 'auto',
          px: 2,
          mt: 2,
          flexGrow: 1,
          maxWidth: `${width}px`,
          overflowY: 'auto'
        }}
      >
        {categories.map(category => {
          return (
            <CategoryTreeItem
              key={category.id}
              nodeId={category.id.toString()}
              label={category.name}
              editable={editable}
              tooltip={category.note}
              onEdit={() => {
                setEditingCategory(category);
                onOpenHandler();
              }}
            >
              {subcategories[category.id]?.map(subcategory => (
                <CategoryTreeItem
                  key={subcategory.id}
                  nodeId={SUBCATEGORY_ID_PREFIX + subcategory.id.toString()}
                  label={subcategory.name}
                  tooltip={subcategory.note}
                  editable={editable}
                  onEdit={() => {
                    setEditingCategory(subcategory);
                    onOpenHandler();
                  }}
                />
              ))}
            </CategoryTreeItem>
          );
        })}
      </TreeView>
    </div>
  );
};
