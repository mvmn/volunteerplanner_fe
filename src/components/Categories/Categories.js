import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TreeItem, TreeView } from '@mui/lab';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCategories } from '../../actions/categories';
import { SUBCATEGORY_ID_PREFIX } from '../../constants/categories';
import { CategoriesContext } from '../../screens/Main';
import styles from './Categories.module.scss';

export const Categories = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const categories = useSelector(state => state.categories.rootCategories);
  const subcategories = useSelector(state => state.categories.subcategories);

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

  return (
    <div>
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
              ))}
            </TreeItem>
          );
        })}
      </TreeView>
    </div>
  );
};
