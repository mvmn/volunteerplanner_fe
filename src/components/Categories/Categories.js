import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TreeItem, TreeView } from '@mui/lab';
import { Button } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import dictionary from '../../dictionary';
import { CategoriesContext } from '../../screens/Main';
import styles from './Categories.module.scss';

export const Categories = () => {
  const categories = useSelector(state => state.categories);
  const handleToggle = (_, nodeIds) => {
    setExpanded([nodeIds[0]]);
  };
  const [expanded, setExpanded] = useState([]);

  const SUBCATEGORIES_MAP = {};
  const CATEGORIES_MAP = Object.entries(categories).reduce(
    (map, [category, subcategory], index) => {
      map[index.toString()] = category;
      subcategory.forEach((item, i) => {
        SUBCATEGORIES_MAP[i.toString() + index.toString()] = item;
      });

      return map;
    },
    {}
  );

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
        {Object.entries(categories).map(([category, subcategory], index) => {
          return (
            <TreeItem nodeId={index.toString()} key={category} label={dictionary[category]}>
              {subcategory.map((item, i) => {
                return (
                  <TreeItem
                    nodeId={i.toString() + index.toString()}
                    key={item}
                    label={dictionary[item]}
                  />
                );
              })}
            </TreeItem>
          );
        })}
      </TreeView>
    </div>
  );
};
