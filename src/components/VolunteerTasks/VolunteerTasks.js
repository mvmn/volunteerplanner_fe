import { Box, Tab, Tabs } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useContext, useState } from 'react';
import { useQuery } from 'react-query';

import { getSubtasks } from '../../api/subtasks';
import { getTasksByIds } from '../../api/tasks';
import { SUBTASKS_SORT_FIELD_MAPPINGS } from '../../constants/subTasks';
import { MAX_TASKS_PER_PAGE, SUBTASK_STATUSES } from '../../constants/uiConfig';
import dictionary from '../../dictionary';
import { CategoriesContext } from '../../screens/Main';
import { Categories } from '../Categories';
import { Priority } from '../Priority';
import { Status } from '../Status';
import { Title } from '../Title';
import styles from './VolunteerTasks.module.scss';

export const tasksColumns = [
  {
    field: 'quantity',
    headerName: dictionary.quantity,
    flex: 1,
    renderCell: ({ row }) => {
      return <>{row.quantity}</>;
    }
  },
  {
    field: 'productMeasure',
    headerName: dictionary.productMeasure,
    flex: 1,
    renderCell: ({ row }) => {
      return <>{row.task.productMeasure}</>;
    },
    sortable: false
  },
  {
    field: 'productId',
    headerName: dictionary.productName,
    renderCell: ({ row }) => {
      return <>{row.task.product.name}</>;
    },
    flex: 1
  },
  {
    field: 'priority',
    headerName: dictionary.priority,
    renderCell: ({ row }) => {
      return <Priority priority={row.task.priority} />;
    },
    flex: 1
  },
  {
    field: 'deadlineDate',
    headerName: dictionary.deadlineDate,
    flex: 1,
    renderCell: ({ row }) => (
      <>
        {row.task.deadlineDate
          ? new Date(row.task.deadlineDate * 1000).toLocaleString(window.navigator.language, {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour12: false,
              hour: '2-digit',
              minute: '2-digit'
            })
          : dictionary.notSet}
      </>
    )
  },
  {
    field: 'dueDate',
    headerName: dictionary.dueDate,
    flex: 1,
    renderCell: ({ row }) => (
      <>
        {row.dueDate
          ? new Date(row.dueDate * 1000).toLocaleString(window.navigator.language, {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour12: false,
              hour: '2-digit',
              minute: '2-digit'
            })
          : dictionary.notSet}
      </>
    )
  },
  {
    field: 'note',
    headerName: dictionary.note,
    flex: 1,
    renderCell: ({ row }) => <>{row.note}</>,
    sortable: false
  },
  {
    field: 'status',
    headerName: dictionary.status,
    renderCell: ({ row }) => <Status status={row.status} />,
    flex: 1
  }
];

export const VolunteerTasks = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [sortOrder, setSortOrder] = useState(0);
  const [subtaskStatus, setSubtaskStatus] = useState(0);
  const handleChange = (_, subtaskStatus) => {
    setSubtaskStatus(subtaskStatus);
  };
  const { selectedCategory, selectedSubCategory } = useContext(CategoriesContext);
  const { data, status } = useQuery(
    [
      'my_subtasks',
      { subtaskStatus, selectedCategory, selectedSubCategory, pageNumber, sortOrder }
    ],
    async () => {
      const request = {
        pageSize: MAX_TASKS_PER_PAGE,
        page: pageNumber + 1
      };

      var categoryPath = null;
      if (selectedCategory) {
        categoryPath = '/' + selectedCategory;
      }
      if (selectedSubCategory) {
        categoryPath += '/' + selectedSubCategory;
      }
      const filters = [];
      if (subtaskStatus < 3) {
        filters.push({
          type: 'text',
          field: 'status',
          value: SUBTASK_STATUSES[Object.keys(SUBTASK_STATUSES)[subtaskStatus]]
        });
      }

      if (categoryPath) {
        filters.push({
          type: 'text',
          field: 'categoryPath',
          value: categoryPath
        });
      }

      if (filters.length > 0) {
        if (filters.lentgh === 1) {
          request.filter = filters[0];
        } else {
          request.filter = {
            type: 'operator',
            operator: 'and',
            operands: filters
          };
        }
      }

      if (sortOrder && sortOrder.length > 0) {
        const sortOrderSpec = sortOrder[0];
        const sortQuery = {};
        request.sort = sortQuery;
        sortQuery.field = SUBTASKS_SORT_FIELD_MAPPINGS[sortOrderSpec.field];
        if (sortOrderSpec.sort) {
          sortQuery.order = sortOrderSpec.sort.toLowerCase();
        }
      }

      const subtasks = await getSubtasks(request);
      const taskIds = subtasks.items.map(subtask => subtask.taskId);
      const tasks = taskIds.length > 0 ? await getTasksByIds(taskIds) : { items: [] };
      const tasksById = tasks.items.reduce((result, task) => {
        result[task.id] = result[task.id] || task;
        return result;
      }, {});

      subtasks.items = subtasks.items.map(subtask => {
        return { ...subtask, task: tasksById[subtask.taskId] };
      });
      return subtasks;
    },
    {
      cacheTime: 0,
      refetchOnWindowFocus: false
    }
  );

  const handleRowClick = () => {};

  return (
    <div className={styles.container}>
      <Title text={dictionary.myTasks} />
      <div className={styles.body}>
        <Categories />

        <div className={styles.tabsContainer}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs classes={{ selected: styles.root }} value={subtaskStatus} onChange={handleChange}>
              {Object.keys(SUBTASK_STATUSES).map(item => (
                <Tab
                  classes={{ root: styles.root, selected: styles.root }}
                  key={item}
                  label={dictionary[item]}
                />
              ))}
            </Tabs>
          </Box>
          {status === 'loading' ? (
            <div>Loading...</div>
          ) : status === 'error' ? (
            <div>Error</div>
          ) : (
            <DataGrid
              style={{ height: 600 }}
              pageSize={MAX_TASKS_PER_PAGE}
              onRowClick={e => handleRowClick(e)}
              rowsPerPageOptions={[MAX_TASKS_PER_PAGE]}
              rows={data.items}
              rowCount={data.totalCount}
              page={data.page - 1}
              columns={tasksColumns}
              paginationMode='server'
              onPageChange={page => setPageNumber(page)}
              sortingMode='server'
              onSortModelChange={setSortOrder}
              sortModel={sortOrder ? sortOrder : []}
            />
          )}
        </div>
      </div>
    </div>
  );
};
