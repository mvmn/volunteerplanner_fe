import { Box, Tab, Tabs } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { MAX_TASKS_PER_PAGE, SUBTASK_STATUSES, tasksColumns } from '../../constants/uiConfig';
import dictionary from '../../dictionary';
import { TabPanel } from '../../screens/TasksList';

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

  const handleRowClick = () => {};

  return (
    <>
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
              columns={tasksColumns.filter(item => item.field !== 'customer')}
            />
          </TabPanel>
        );
      })}
    </>
  );
};
