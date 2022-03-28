import { Box, Tab, Tabs } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';

import { MAX_TASKS_PER_PAGE, SUBTASK_STATUSES, products } from '../../constants/uiConfig';
import dictionary from '../../dictionary';
import { CategoriesContext } from '../../screens/Main';
import { TabPanel } from '../../screens/TasksList';
import { Categories } from '../Categories';
import { Priority } from '../Priority';
import { Status } from '../Status';
import { Title } from '../Title';
import styles from './VolunteerTasks.module.scss';

export const tasksColumns = [
  { field: 'quantityLeft', headerName: dictionary.quantity, flex: 1 },
  { field: 'productMeasure', headerName: dictionary.productMeasure, flex: 1 },
  {
    field: 'productId',
    headerName: dictionary.productName,
    renderCell: ({ row }) => {
      return <>{products[row.productId]}</>;
    },
    flex: 1
  },
  {
    field: 'priority',
    headerName: dictionary.priority,
    renderCell: ({ row }) => {
      return <Priority priority={row.priority} />;
    },
    flex: 1
  },
  { field: 'deadlineDate', headerName: dictionary.deadlineDate, flex: 1 },
  { field: 'note', headerName: dictionary.note, flex: 1 },
  {
    field: 'status',
    headerName: dictionary.status,
    renderCell: ({ row }) => <Status status={row.status} />,
    flex: 1
  }
];

export const VolunteerTasks = () => {
  const tasks = useSelector(state => state.tasks);
  const subTasks = useSelector(state => state.subTasks);

  const TASKS_MAP = Object.entries(tasks).reduce((acc, [key, values]) => {
    values.forEach(item => {
      acc[item.id] = item;
    });
    return acc;
  }, {});

  const rows = Object.entries(subTasks).reduce((acc, [key, value]) => {
    console.log(key, value);
    acc[key] = value.map(item => {
      return {
        ...TASKS_MAP[item.taskId],
        quantity: item.quantity,
        status: item.status,
        note: item.note
      };
    });

    return acc;
  }, {});

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
          {Object.entries(rows).map(([key, subTasksByStatus], i) => {
            return (
              <TabPanel key={key} value={value} index={i}>
                <DataGrid
                  style={{ height: 600 }}
                  pageSize={MAX_TASKS_PER_PAGE}
                  onRowClick={e => handleRowClick(e)}
                  rowsPerPageOptions={[MAX_TASKS_PER_PAGE]}
                  rows={subTasksByStatus}
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
