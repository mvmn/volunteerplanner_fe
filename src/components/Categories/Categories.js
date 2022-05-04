import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TreeItem, TreeView } from '@mui/lab';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCategories } from '../../actions/categories';
import { CategoriesContext } from '../../screens/Main';
import styles from './Categories.module.scss';

export const Categories = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const categories = useSelector(state => state.categories.rootCategories);
  const subcategories = useSelector(state => state.categories.subcategories);
  const handleToggle = (_, nodeIds) => {
    setExpanded([nodeIds[0]]);
  };
  const [expanded, setExpanded] = useState([]);

  const CATEGORIES_MAP = useMemo(
    () =>
      categories.reduce((map, category) => {
        map[category.id] = category.name;

        return map;
      }, {}),
    [categories]
  );

  const handleSelection = (_, id) => {
    subcategories[id] && setSelectedSubCategory(subcategories[id]);
    CATEGORIES_MAP[id] && setSelectedCategory(CATEGORIES_MAP[id]);
  };

  const { setSelectedSubCategory, setSelectedCategory, selectedCategory } =
    useContext(CategoriesContext);

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
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelection}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      >
        {categories.map(category => {
          return (
            <TreeItem
              classes={{ content: styles.content }}
              className={styles.treeItem}
              nodeId={category.id.toString()}
              key={category.id}
              label={category.name}
            >
              {subcategories[category.id]?.map(subcategory => (
                <TreeItem
                  classes={{ content: styles.content }}
                  className={styles.treeItem}
                  nodeId={subcategory.id.toString()}
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
