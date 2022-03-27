import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Categories } from '../../components/Categories';
import { Title } from '../../components/Title';
import { MAX_TASKS_PER_PAGE, ROLES, TASK_STATUSES, tasksColumns } from '../../constants/uiConfig';
import dictionary from '../../dictionary';
import { CategoriesContext } from '../Main';
import styles from './TasksList.module.scss';

export function TabPanel(props) {
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

const OperatorTasksListView = ({ handleRowClick }) => {
  const tasks = useSelector(state => state.tasks);

  const [value, setValue] = useState(1);

  const { selectedCategory, selectedSubCategory } = useContext(CategoriesContext);

  console.log(selectedCategory, selectedSubCategory);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.tabsContainer}>
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
    </div>
  );
};

const VolunteerTasksListView = ({ handleRowClick }) => {
  const tasks = useSelector(state => state.tasks.verified);

  const { selectedCategory, selectedSubCategory } = useContext(CategoriesContext);

  console.log(selectedCategory, selectedSubCategory);

  return (
    <div className={styles.tabsContainer}>
      <DataGrid
        style={{ height: 600 }}
        pageSize={MAX_TASKS_PER_PAGE}
        onRowClick={e => handleRowClick(e)}
        rowsPerPageOptions={[MAX_TASKS_PER_PAGE]}
        rows={tasks}
        columns={tasksColumns}
      />
    </div>
  );
};

export const TasksList = () => {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/create-task');
  };

  const handleRowClick = row => {
    const { id } = row;
    navigate(`/create-subtask/${id}`);
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

      <div className={styles.body}>
        <Categories />

        {user.role === ROLES.operator ? (
          <OperatorTasksListView handleRowClick={handleRowClick} />
        ) : (
          <VolunteerTasksListView handleRowClick={handleRowClick} />
        )}
      </div>
    </div>
  );
};
