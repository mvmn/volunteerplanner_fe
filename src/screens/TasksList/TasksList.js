import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import clsx from 'clsx';
import { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getSubtasksByTaskId } from '../../api/subtasks';
import { fetchTasks } from '../../api/tasks';
import { Categories } from '../../components/Categories';
import { ChangeStatus } from '../../components/ChangeStatus';
import { CreateTaskButton } from '../../components/CreateTaskButton/CreateTaskButton';
import { Priority } from '../../components/Priority';
import { Status } from '../../components/Status';
import { TabPanel } from '../../components/TabPanel';
import { Tabs } from '../../components/Tabs';
import { Title } from '../../components/Title';
import { TASKS_SORT_FIELD_MAPPINGS } from '../../constants/tasks';
import { MAX_TASKS_PER_PAGE, ROLES, TASK_STATUSES, tasksColumns } from '../../constants/uiConfig';
import dictionary from '../../dictionary';
import { CategoriesContext } from '../Main';
import styles from './TasksList.module.scss';

export const TabsContext = createContext();

const VERIFIED_TAB_INDEX = 1;

const SubtasksPane = ({ taskId, statusIndex }) => {
  const [subtasks, setSubtasks] = useState([]);

  useEffect(() => {
    getSubtasksByTaskId(taskId).then(data => {
      setSubtasks(data?.items ?? []);
    });
  }, [taskId]);

  return (
    <Box sx={{ margin: 1 }}>
      <Table className={styles.subTable}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell className={styles.fontBold}>{dictionary.status}</TableCell>
            <TableCell className={styles.fontBold} colSpan={4}>
              {dictionary.quantity}
            </TableCell>
            <TableCell className={styles.fontBold}>{dictionary.transportRequired}</TableCell>
            <TableCell className={clsx(styles.fontBold, styles.noteCell)}>
              {dictionary.note}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subtasks.map(subTask => (
            <TableRow key={subTask.id}>
              <TableCell />
              <TableCell>
                {statusIndex === VERIFIED_TAB_INDEX ? (
                  <ChangeStatus status={subTask.status} />
                ) : (
                  <Status status={subTask.status} />
                )}
              </TableCell>
              <TableCell colSpan={4} scope='row'>
                {subTask.quantity}
              </TableCell>
              <TableCell>{subTask.transportRequired ? dictionary.yes : dictionary.no}</TableCell>
              <TableCell className={styles.noteCell}>{subTask.note}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

const Row = props => {
  const { row, handleRowClick } = props;
  const { value } = useContext(TabsContext);
  const [open, setOpen] = useState(false);

  const deadlineDate = new Date(row.deadlineDate * 1000);
  const deadlineDateFmt = deadlineDate.toLocaleString(window.navigator.language, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <>
      <TableRow
        className={open ? styles.opened : ''}
        sx={{ '& > *': { borderBottom: 'unset' } }}
        onDoubleClick={() => handleRowClick(row.id)}
      >
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Priority priority={row.priority} />
        </TableCell>
        <TableCell scope='row'>{row.subtaskCount}</TableCell>
        <TableCell>{row.productMeasure}</TableCell>
        <TableCell>{row.quantity}</TableCell>
        <TableCell>{row.product.name}</TableCell>
        <TableCell>{deadlineDateFmt}</TableCell>
        <TableCell className={styles.noteCell}>{row.note}</TableCell>
      </TableRow>
      <TableRow className={open ? styles.opened : ''}>
        <TableCell className={styles.subRow} colSpan={12}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <SubtasksPane taskId={row.id} statusIndex={value} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const OperatorTasksListView = () => {
  const history = useHistory();

  const [taskStatusTabValue, setTaskStatusTabValue] = useState(1);
  const [searchedTaskQuery, setSearchedTaskQuery] = useState('');

  const navigateSubTaskHandler = row => history.push(`/create-subtask/${row.id}`);

  const { selectedCategory, selectedSubCategory } = useContext(CategoriesContext);

  const taskStatuses = [
    TASK_STATUSES.new,
    TASK_STATUSES.verified,
    TASK_STATUSES.completed,
    TASK_STATUSES.rejected
  ];

  const handleChange = (_, newValue) => {
    setTaskStatusTabValue(newValue);
    setTasksStatusFilter(taskStatuses[newValue]);
    setTasksPageNumber(0);
  };

  const [tasksStatusFilter, setTasksStatusFilter] = useState(TASK_STATUSES.verified);
  const [tasksPageNumber, setTasksPageNumber] = useState(0);

  const [order, setOrder] = useState('');
  const [orderBy, setOrderBy] = useState('');

  const handleRequestSort = (event, property) => {
    if (orderBy === property && order === 'desc') {
      setOrderBy('');
    } else {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    }
  };

  const createSortHandler = property => event => {
    handleRequestSort(event, property);
  };

  const { data, status } = useQuery(
    [
      'tasks',
      {
        tasksStatusFilter,
        tasksPageNumber,
        selectedCategory,
        selectedSubCategory,
        searchedTaskQuery,
        order,
        orderBy
      }
    ],
    () => {
      var categoryPath = null;
      if (selectedCategory) {
        categoryPath = '/' + selectedCategory;
      }
      if (selectedSubCategory) {
        categoryPath += '/' + selectedSubCategory;
      }
      var sortOrder = null;
      var sortDirection = null;
      if (orderBy && orderBy.trim().length > 0) {
        sortDirection = order === 'desc' ? 'DESC' : 'ASC';
        sortOrder = orderBy;
      }
      return fetchTasks({
        pageSize: MAX_TASKS_PER_PAGE,
        pageNumber: tasksPageNumber,
        statuses: [tasksStatusFilter],
        categoryPath,
        searchText: searchedTaskQuery,
        sortDirection,
        sortOrder
      });
    },
    {
      cacheTime: 0,
      refetchOnWindowFocus: false
    }
  );

  const headCells = [
    { id: 'PRIORITY', label: dictionary.priority, sortable: true },
    { id: 'subtaskCount', label: dictionary.subtaskCount },
    { id: 'productMeasure', label: dictionary.productMeasure },
    { id: 'QUANTITY_LEFT', label: dictionary.quantity, sortable: true },
    { id: 'PRODUCT_NAME', label: dictionary.productName, sortable: true },
    { id: 'DUEDATE', label: dictionary.deadlineDate, sortable: true }
  ];

  return (
    <TabsContext.Provider value={{ taskStatusTabValue }}>
      <div className={styles.tabsContainer}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <div className={styles.tabsSearchBox}>
            <Tabs value={taskStatusTabValue} handleChange={handleChange}></Tabs>
            <div className={styles.search}>
              <TextField
                id='search'
                name='search'
                value={searchedTaskQuery}
                type='text'
                classes={{ root: styles.root }}
                label={dictionary.searchTask}
                size='small'
                margin='normal'
                onChange={e => setSearchedTaskQuery(e.target.value)}
              />
              <button className={styles.search_action} disabled={searchedTaskQuery.length < 1}>
                <SearchIcon />
              </button>
            </div>
          </div>
        </Box>
        {taskStatuses.map((key, i) => (
          <TabPanel key={key} value={taskStatusTabValue} index={i}></TabPanel>
        ))}
        {status === 'loading' ? (
          <div>Loading...</div>
        ) : status === 'error' ? (
          <div>Error</div>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell />
                    {headCells.map(headCell => {
                      if (headCell.sortable) {
                        return (
                          <TableCell key={headCell.id} className={styles.fontBold}>
                            <TableSortLabel
                              key={headCell.id}
                              active={orderBy === headCell.id}
                              direction={orderBy === headCell.id ? order : 'asc'}
                              onClick={createSortHandler(headCell.id)}
                            >
                              {headCell.label}
                            </TableSortLabel>
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell key={headCell.id} className={styles.fontBold}>
                            {headCell.label}
                          </TableCell>
                        );
                      }
                    })}
                    <TableCell className={clsx(styles.fontBold, styles.noteCell)}>
                      {dictionary.note}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.items?.map(row => (
                    <Row
                      key={row.id}
                      row={row}
                      handleRowClick={() => navigateSubTaskHandler(row)}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component='div'
              count={data.totalCount}
              page={data.page}
              onPageChange={(event, page) => setTasksPageNumber(page)}
              rowsPerPage={MAX_TASKS_PER_PAGE}
              rowsPerPageOptions={[]}
            />
          </>
        )}
      </div>
    </TabsContext.Provider>
  );
};

const VolunteerTasksListView = () => {
  const history = useHistory();

  const navigateSubTaskHandler = e => history.push(`/create-subtask/${e.row.id}`);

  const { selectedCategory, selectedSubCategory } = useContext(CategoriesContext);
  console.log(selectedCategory, selectedSubCategory);

  const [tasksPageNumber, setTasksPageNumber] = useState(0);
  const [tasksOrder, setTasksOrder] = useState(0);
  const [searchedTaskQuery, setSearchedTaskQuery] = useState('');

  const { data, status } = useQuery(
    ['volunteertasks', { tasksPageNumber, tasksOrder, searchedTaskQuery }],
    async () => {
      const query = {
        pageSize: MAX_TASKS_PER_PAGE,
        pageNumber: tasksPageNumber,
        statuses: [TASK_STATUSES.verified],
        searchText: searchedTaskQuery
      };
      if (tasksOrder && tasksOrder.length > 0) {
        const tasksOrderSpec = tasksOrder[0];
        query.sortOrder = TASKS_SORT_FIELD_MAPPINGS[tasksOrderSpec.field];
        if (tasksOrderSpec.sort) {
          query.sortDirection = tasksOrderSpec.sort.toUpperCase();
        }
      }
      return await fetchTasks(query);
    },
    {
      cacheTime: 0,
      refetchOnWindowFocus: false
    }
  );

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabsSearchBox}>
        <Title text={dictionary.tasks} />
        <div className={styles.search}>
          <TextField
            id='search'
            name='search'
            value={searchedTaskQuery}
            type='text'
            classes={{ root: styles.root }}
            label={dictionary.searchTask}
            size='small'
            margin='normal'
            onChange={e => setSearchedTaskQuery(e.target.value)}
          />
          <button className={styles.search_action} disabled={searchedTaskQuery.length < 1}>
            <SearchIcon />
          </button>
        </div>
      </div>
      {status === 'loading' ? (
        <div>Loading...</div>
      ) : status === 'error' ? (
        <div>Error</div>
      ) : (
        <DataGrid
          style={{ height: 600 }}
          pageSize={MAX_TASKS_PER_PAGE}
          onRowClick={e => navigateSubTaskHandler(e)}
          rowsPerPageOptions={[MAX_TASKS_PER_PAGE]}
          rows={data.items}
          page={data.page}
          columns={tasksColumns}
          rowCount={data.totalCount}
          paginationMode='server'
          onPageChange={page => setTasksPageNumber(page)}
          sortingMode='server'
          onSortModelChange={setTasksOrder}
          sortModel={tasksOrder ? tasksOrder : []}
        />
      )}
    </div>
  );
};

export const TasksList = () => {
  const user = useSelector(state => state.user);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title text={dictionary.tasks} />
        {user.role === ROLES.operator && <CreateTaskButton />}
      </div>

      <div className={styles.body}>
        <Categories />
        {user.role === ROLES.operator ? <OperatorTasksListView /> : <VolunteerTasksListView />}
      </div>
    </div>
  );
};
