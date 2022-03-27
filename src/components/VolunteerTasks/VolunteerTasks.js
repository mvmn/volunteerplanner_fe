import { Box, Tab, Tabs } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';

import { MAX_TASKS_PER_PAGE, SUBTASK_STATUSES, tasksColumns } from '../../constants/uiConfig';
import dictionary from '../../dictionary';
import { CategoriesContext } from '../../screens/Main';
import { TabPanel } from '../../screens/TasksList';
import { Categories } from '../Categories';
import { Title } from '../Title';
import styles from './VolunteerTasks.module.scss';

export const VolunteerTasks = () => {
  /**
   * The tasks are displaied for the testing.
   * They have to be replaced with subtasks
   */
  const tasks = useSelector(state => state.tasks);

  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const { selectedCategory, selectedSubCategory } = useContext(CategoriesContext);

  console.log(selectedCategory, selectedSubCategory);

  const handleRowClick = () => {};

  return (
    <div className={styles.container}>
      <Title text={dictionary.myTasks} />
      <div className={styles.body}>
        <Categories />

        <div className={styles.tabsContainer}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange}>
              {Object.keys(SUBTASK_STATUSES).map(item => (
                <Tab key={item} label={dictionary[item]} />
              ))}
            </Tabs>
          </Box>
          {Object.entries(tasks).map(([key, tasksByStatus], i) => {
            return (
              <TabPanel key={key} value={value} index={i}>
                <DataGrid
                  style={{ height: 600 }}
                  pageSize={MAX_TASKS_PER_PAGE}
                  onRowClick={e => handleRowClick(e)}
                  rowsPerPageOptions={[MAX_TASKS_PER_PAGE]}
                  rows={tasksByStatus}
                  columns={tasksColumns}
                />
              </TabPanel>
            );
          })}
        </div>
      </div>
    </div>
  );
};
