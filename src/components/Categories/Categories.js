import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TreeItem, TreeView } from '@mui/lab';
import { Button, TextField, TextareaAutosize, Tooltip } from '@mui/material';
import { Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { getCategories } from '../../actions/categories';
import { createCategory } from '../../api/categories';
import { SUBCATEGORY_ID_PREFIX } from '../../constants/categories';
import dictionary from '../../dictionary';
import { yupPatterns } from '../../helpers/validation';
import { CategoriesContext } from '../../screens/Main';
import { CreateEntityButton } from '../CreateEntityButton';
import styles from './Categories.module.scss';

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
      {({ values, errors, setFieldValue, handleChange, handleSubmit }) => {
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
      const subcatId = id.substring(SUBCATEGORY_ID_PREFIX.length);
      setSelectedSubCategory(selectedSubCategory === subcatId ? null : subcatId);
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
      {editable ? (
        <div>
          <CreateEntityButton
            title={selectedCategory ? dictionary.createSubcategory : dictionary.createCategory}
            renderModalForm={onCloseHandler => (
              <CreateCategoryForm
                onClose={onCloseHandler}
                onSave={() => {
                  dispatch(getCategories());
                  setRefreshKey(refreshKey + 1);
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
          />
        </div>
      ) : (
        <></>
      )}
      <TreeView
        className={styles.treeView}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        selected={''}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelection}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      >
        {categories.map(category => {
          return (
            <Tooltip
              key={category.id}
              title={category.note ? category.note.trim() : ''}
              placement='right-start'
            >
              <TreeItem
                classes={{
                  content:
                    styles.content +
                    ' ' +
                    (selectedCategory === category.id.toString() ? styles.selectedContent : '')
                }}
                className={styles.treeItem}
                nodeId={category.id.toString()}
                key={category.id}
                label={category.name}
              >
                {subcategories[category.id]?.map(subcategory => (
                  <Tooltip
                    key={category.id.toString() + '_' + subcategory.id}
                    title={subcategory.note ? subcategory.note.trim() : ''}
                    placement='bottom-end'
                  >
                    <TreeItem
                      classes={{
                        content:
                          styles.content +
                          ' ' +
                          (selectedSubCategory === subcategory.id.toString()
                            ? styles.selectedContent
                            : '')
                      }}
                      className={styles.treeItem}
                      nodeId={SUBCATEGORY_ID_PREFIX + subcategory.id.toString()}
                      key={subcategory.id}
                      label={subcategory.name}
                    />
                  </Tooltip>
                ))}
              </TreeItem>
            </Tooltip>
          );
        })}
      </TreeView>
    </div>
  );
};
