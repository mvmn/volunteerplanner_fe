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
  TextField
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import clsx from 'clsx';
import _ from 'lodash';
import { createContext, useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { fetchTasks } from '../../api/tasks';
import { Categories } from '../../components/Categories';
import { ChangeStatus } from '../../components/ChangeStatus';
import { CreateTaskButton } from '../../components/CreateTaskButton/CreateTaskButton';
import { Priority } from '../../components/Priority';
import { Status } from '../../components/Status';
import { TabPanel } from '../../components/TabPanel';
import { Tabs } from '../../components/Tabs';
import { Title } from '../../components/Title';
import { MAX_TASKS_PER_PAGE, ROLES, TASK_STATUSES, tasksColumns } from '../../constants/uiConfig';
import dictionary from '../../dictionary';
import { CategoriesContext } from '../Main';
import styles from './TasksList.module.scss';

export const TabsContext = createContext();

const VERIFIED_TAB_INDEX = 1;

const Row = props => {
  const { row, handleRowClick } = props;
  const { value } = useContext(TabsContext);
  const [open, setOpen] = useState(false);
  const subTasks = useSelector(state => state.subTasks);
  const mapSubTasks = _.groupBy(
    Object.values(subTasks).reduce((acc, value) => [...acc, ...value], []),
    subTask => subTask.taskId
  );

  const deadlineDate = new Date(row.deadlineDate * 1000);
  console.log(window.navigator.language);
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
            <Box sx={{ margin: 1 }}>
              <Table className={styles.subTable}>
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell className={styles.fontBold}>{dictionary.status}</TableCell>
                    <TableCell className={styles.fontBold} colSpan={4}>
                      {dictionary.quantity}
                    </TableCell>
                    <TableCell className={styles.fontBold}>
                      {dictionary.transportRequired}
                    </TableCell>
                    <TableCell className={clsx(styles.fontBold, styles.noteCell)}>
                      {dictionary.note}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mapSubTasks[row.id]?.map(subTask => (
                    <TableRow key={subTask.id}>
                      <TableCell />
                      <TableCell>
                        {value === VERIFIED_TAB_INDEX ? (
                          <ChangeStatus status={subTask.status} />
                        ) : (
                          <Status status={subTask.status} />
                        )}
                      </TableCell>
                      <TableCell colSpan={4} scope='row'>
                        {subTask.quantity}
                      </TableCell>
                      <TableCell>
                        {subTask.transportRequired ? dictionary.yes : dictionary.no}
                      </TableCell>
                      <TableCell className={styles.noteCell}>{subTask.note}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
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

  // const { selectedCategory, selectedSubCategory } = useContext(CategoriesContext);

  const taskStatuses = [
    TASK_STATUSES.new,
    TASK_STATUSES.verified,
    TASK_STATUSES.completed,
    TASK_STATUSES.rejected
  ];
  const statusFilterChangeHandler = statusFilter => {
    setTaskQuery({ ...tasksQuery, statuses: [statusFilter], pageNumber: 0 });
  };

  const handleChange = (_, newValue) => {
    setTaskStatusTabValue(newValue);
    statusFilterChangeHandler(taskStatuses[newValue]);
  };

  const [tasksQuery, setTaskQuery] = useState({
    statuses: ['VERIFIED'],
    pageSize: MAX_TASKS_PER_PAGE
  });
  const { data, status } = useQuery(['tasks', tasksQuery], fetchTasks, {
    cacheTime: 0
  });
  const setPageNumber = page => {
    setTaskQuery({ ...tasksQuery, pageNumber: page });
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error</div>;
  }
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
        {taskStatuses.map((key, i) => {
          return <TabPanel key={key} value={taskStatusTabValue} index={i}></TabPanel>;
        })}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell className={styles.fontBold}>{dictionary.priority}</TableCell>
                <TableCell className={styles.fontBold}>{dictionary.subtaskCount}</TableCell>
                <TableCell className={styles.fontBold}>{dictionary.productMeasure}</TableCell>
                <TableCell className={styles.fontBold}>{dictionary.quantity}</TableCell>
                <TableCell className={styles.fontBold}>{dictionary.productName}</TableCell>
                <TableCell className={styles.fontBold}>{dictionary.deadlineDate}</TableCell>
                <TableCell className={clsx(styles.fontBold, styles.noteCell)}>
                  {dictionary.note}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.items?.map(row => (
                <Row key={row.id} row={row} handleRowClick={() => navigateSubTaskHandler(row)} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component='div'
          count={data.totalCount}
          page={data.page}
          onPageChange={(event, page) => setPageNumber(page)}
          rowsPerPage={MAX_TASKS_PER_PAGE}
          rowsPerPageOptions={[]}
        />
      </div>
    </TabsContext.Provider>
  );
};

const VolunteerTasksListView = props => {
  const history = useHistory();

  const navigateSubTaskHandler = e => history.push(`/create-subtask/${e.row.id}`);

  const { selectedCategory, selectedSubCategory } = useContext(CategoriesContext);
  console.log(selectedCategory, selectedSubCategory);

  const [tasksQuery, setTasksQuery] = useState({
    statuses: ['VERIFIED'],
    pageSize: MAX_TASKS_PER_PAGE
  });
  const { data, status } = useQuery(['tasks', tasksQuery], fetchTasks, {
    cacheTime: 0
  });

  const setPageNumber = page => {
    setTasksQuery({ ...tasksQuery, pageNumber: page });
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error</div>;
  }

  return (
    <div className={styles.tabsContainer}>
      <DataGrid
        style={{ height: 600 }}
        pageSize={MAX_TASKS_PER_PAGE}
        onRowClick={e => navigateSubTaskHandler(e)}
        rowsPerPageOptions={[MAX_TASKS_PER_PAGE]}
        rows={data.items}
        columns={tasksColumns}
        rowCount={data.totalCount}
        paginationMode='server'
        onPageChange={page => setPageNumber(page)}
        sortingMode='server'
        // onSortModelChange={handleSortModelChange}
      />
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
