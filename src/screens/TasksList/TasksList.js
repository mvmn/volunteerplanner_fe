import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { createContext, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Categories } from '../../components/Categories';
import { Title } from '../../components/Title';
import { MAX_TASKS_PER_PAGE, ROLES, TASK_STATUSES, tasksColumns } from '../../constants/uiConfig';
import dictionary from '../../dictionary';
import styles from './TasksList.module.scss';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const OperatorTasksListView = () => {
  const tasks = useSelector(state => state.tasks);
  const handleRowClick = () => {};

  const [value, setValue] = useState(1);

  const { selectedCategory, selectedSubCategory } = useContext(CategoriesContext);

  console.log(selectedCategory, selectedSubCategory);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          {Object.keys(TASK_STATUSES).map(item => (
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
    </>
  );
};

const VolunteerTasksListView = () => {
  const tasks = useSelector(state => state.tasks.verified);

  const { selectedCategory, selectedSubCategory } = useContext(CategoriesContext);

  console.log(selectedCategory, selectedSubCategory);

  const handleRowClick = () => {};

  return (
    <DataGrid
      style={{ height: 600 }}
      pageSize={MAX_TASKS_PER_PAGE}
      onRowClick={e => handleRowClick(e)}
      rowsPerPageOptions={[MAX_TASKS_PER_PAGE]}
      rows={tasks}
      columns={tasksColumns.filter(item => item.field !== 'customer')}
    />
  );
};

export const CategoriesContext = createContext();

export const TasksList = () => {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSubCategory, setSelectedSubCategory] = useState();

  const handleClick = () => {
    navigate('/create-task');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title text={dictionary.tasks} />
        {user.role === ROLES.operator && (
          <div className={styles.icon} onClick={handleClick}>
            <AddCircleOutlineIcon />
          </div>
        )}
      </div>

      <CategoriesContext.Provider
        value={{
          selectedCategory,
          setSelectedCategory,
          selectedSubCategory,
          setSelectedSubCategory
        }}
      >
        <Categories />

        {user.role === ROLES.operator ? <OperatorTasksListView /> : <VolunteerTasksListView />}
      </CategoriesContext.Provider>
    </div>
  );
};
