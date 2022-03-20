import clsx from 'clsx';
import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

import dictionary from '../../dictionary';
import { CategoriesContext } from '../../screens/TasksList';
import styles from './Categories.module.scss';

export const Categories = () => {
  const defaultCategory = 'allCategories';
  const categories = useSelector(state => state.categories);

  const { setSelectedSubCategory, setSelectedCategory, selectedCategory, selectedSubCategory } =
    useContext(CategoriesContext);

  useEffect(() => {
    if (!selectedCategory) setSelectedCategory(defaultCategory);
  }, [selectedCategory, setSelectedCategory]);

  const handleAllCategoriesClick = () => {
    setSelectedSubCategory();
    setSelectedCategory(defaultCategory);
  };

  return (
    <div className={styles.container}>
      <div className={styles.categories}>
        <div
          className={clsx(
            styles.category,
            defaultCategory === selectedCategory && styles.selectedCategory
          )}
          key={defaultCategory}
          onClick={handleAllCategoriesClick}
        >
          {dictionary[defaultCategory]}
        </div>
        {Object.keys(categories).map(item => {
          return (
            <div
              className={clsx(
                styles.category,
                item === selectedCategory && styles.selectedCategory
              )}
              key={item}
              onClick={() => setSelectedCategory(item)}
            >
              {dictionary[item]}
            </div>
          );
        })}
      </div>

      {categories[selectedCategory] && categories[selectedCategory].length ? (
        <div className={styles.subCategories}>
          {categories[selectedCategory].map(item => {
            return (
              <div
                className={clsx(
                  styles.subCategory,
                  item === selectedSubCategory && styles.selectedSubCategory
                )}
                key={item}
                onClick={() => setSelectedSubCategory(item)}
              >
                {dictionary[item]}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
