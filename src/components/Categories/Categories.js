import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TreeItem, TreeView } from '@mui/lab';
import { Button } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import dictionary from '../../dictionary';
import data from '../../mocks/subcategories.json';
import { CategoriesContext } from '../../screens/Main';
import styles from './Categories.module.scss';

export const Categories = () => {
  const categories = useSelector(state => state.categories);
  const handleToggle = (_, nodeIds) => {
    setExpanded([nodeIds[0]]);
  };
  const [expanded, setExpanded] = useState([]);

  const SUBCATEGORIES_MAP = Object.entries(data).reduce((acc, [key, value]) => {
    value.items.forEach(subcategory => {
      acc[subcategory.id.toString() + key.toString()] = subcategory.name;
    });
    return acc;
  }, {});

  const CATEGORIES_MAP = categories.reduce((map, category, index) => {
    map[index.toString()] = category.name;
    return map;
  }, {});

  const handleSelection = (_, id) => {
    SUBCATEGORIES_MAP[id] && setSelectedSubCategory(SUBCATEGORIES_MAP[id]);
    CATEGORIES_MAP[id] && setSelectedCategory(CATEGORIES_MAP[id]);
  };

  const { setSelectedSubCategory, setSelectedCategory, selectedCategory } =
    useContext(CategoriesContext);

  useEffect(() => {
    setSelectedSubCategory();
  }, [selectedCategory, setSelectedSubCategory]);

  const handleCollapseClick = () => {
    setExpanded([]);
    setSelectedSubCategory();
    setSelectedCategory();
  };

  return (
    <div>
      <Button onClick={handleCollapseClick}>{dictionary.collapseAll}</Button>
      <TreeView
        className={styles.treeView}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelection}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      >
        {categories.map((category, index) => {
          return (
            <TreeItem nodeId={index.toString()} key={category.id} label={category.name}>
              {data[category.id]?.items.map((subcategory, i) => (
                <TreeItem
                  nodeId={i.toString() + index.toString()}
                  key={subcategory.name}
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
