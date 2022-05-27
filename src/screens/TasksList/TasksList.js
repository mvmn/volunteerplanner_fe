import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
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

import { getSubtasksByTaskId, subtaskComplete, subtaskReject } from '../../api/subtasks';
import { completeTask, exportTasks, fetchTasks, rejectTask, verifyTask } from '../../api/tasks';
import { Categories } from '../../components/Categories';
import { CreateTaskButton } from '../../components/CreateTaskButton/CreateTaskButton';
import { Priority } from '../../components/Priority';
import { Status } from '../../components/Status';
import { Tabs } from '../../components/Tabs';
import { Title } from '../../components/Title';
import { TASKS_SORT_FIELD_MAPPINGS } from '../../constants/tasks';
import { MAX_TASKS_PER_PAGE, ROLES, TASK_STATUSES, tasksColumns } from '../../constants/uiConfig';
import dictionary from '../../dictionary';
import { unixTimeToPrettyDate } from '../../helpers/dates';
import { CategoriesContext } from '../Main';
import styles from './TasksList.module.scss';

export const TabsContext = createContext();

const VERIFIED_TAB_INDEX = 1;

const SubtasksPane = ({ taskId, statusIndex }) => {
  const [subtasks, setSubtasks] = useState([]);

  const [statusUpdateInProgress, setStatusUpdateInProgress] = useState(false);

  useEffect(() => {
    getSubtasksByTaskId(taskId).then(data => {
      setSubtasks(data?.items ?? []);
    });
  }, [taskId, statusUpdateInProgress]);

  const completeSubTask = async subtaskId => {
    setStatusUpdateInProgress(true);
    await subtaskComplete(subtaskId);
    setStatusUpdateInProgress(false);
  };

  const rejectSubTask = async subtaskId => {
    setStatusUpdateInProgress(true);
    await subtaskReject(subtaskId);
    setStatusUpdateInProgress(false);
  };

  return (
    <Box sx={{ margin: 1 }}>
      <Table className={styles.subTable}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell className={styles.fontBold}>{dictionary.status}</TableCell>
            <TableCell className={styles.fontBold} colSpan={2}>
              {dictionary.quantity}
            </TableCell>
            <TableCell className={styles.fontBold}>{dictionary.transportRequired}</TableCell>
            <TableCell className={styles.fontBold}>{dictionary.dueDate}</TableCell>
            <TableCell className={clsx(styles.fontBold, styles.noteCell)}>
              {dictionary.note}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subtasks.map(subTask => (
            <TableRow key={subTask.id}>
              <TableCell />
              <TableCell>
                <Status status={subTask.status} />
              </TableCell>
              <TableCell colSpan={2} scope='row'>
                {subTask.quantity}
              </TableCell>
              <TableCell>{subTask.transportRequired ? dictionary.yes : dictionary.no}</TableCell>
              <TableCell>{subTask.dueDate ? unixTimeToPrettyDate(subTask.dueDate) : ''}</TableCell>
              <TableCell className={styles.noteCell}>{subTask.note}</TableCell>
              <TableCell>
                {statusIndex === VERIFIED_TAB_INDEX && subTask.status === 'IN_PROGRESS' ? (
                  statusUpdateInProgress ? (
                    <HourglassEmptyIcon />
                  ) : (
                    <>
                      <CheckCircleIcon
                        color='success'
                        onClick={() => completeSubTask(subTask.id)}
                      />
                      <CancelIcon color='error' onClick={() => rejectSubTask(subTask.id)} />
                    </>
                  )
                ) : (
                  <></>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

const Row = props => {
  const { row, handleRowClick, tasksTabIndex, refetch } = props;
  const [open, setOpen] = useState(false);
  const [reloading, setReloading] = useState(false);

  const deadlineDateFmt = unixTimeToPrettyDate(row.deadlineDate);

  const onVerifyTask = async taskId => {
    setReloading(true);
    await verifyTask(taskId);
    refetch();
    setReloading(false);
  };

  const onCompleteTask = async taskId => {
    setReloading(true);
    await completeTask(taskId);
    refetch();
    setReloading(false);
  };

  const onRejectTask = async taskId => {
    setReloading(true);
    await rejectTask(taskId);
    refetch();
    setReloading(false);
  };

  return (
    <>
      <TableRow
        className={open ? styles.opened : ''}
        sx={{ '& > *': { borderBottom: 'unset' } }}
        onDoubleClick={() => handleRowClick(row.id)}
      >
        <TableCell>
          {row.subtaskCount > 0 ? (
            <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          ) : (
            <></>
          )}
        </TableCell>
        <TableCell>
          <Priority priority={row.priority} />
        </TableCell>
        <TableCell scope='row'>{row.subtaskCount}</TableCell>
        <TableCell>{row.product.name}</TableCell>
        <TableCell>{`${row.quantity} ${row.productMeasure}`}</TableCell>
        <TableCell>{`${row.quantityLeft} ${row.productMeasure}`}</TableCell>
        <TableCell>{deadlineDateFmt}</TableCell>
        <TableCell>{row.volunteerStore.name}</TableCell>
        <TableCell>{row.customerStore.name}</TableCell>
        <TableCell className={styles.noteCell}>{row.note}</TableCell>
        <TableCell>
          {row.status !== 'REJECTED' && row.status !== 'COMPLETED' ? (
            reloading ? (
              <HourglassEmptyIcon />
            ) : (
              <>
                <CheckCircleIcon
                  color='success'
                  onClick={() =>
                    row.status === 'NEW' ? onVerifyTask(row.id) : onCompleteTask(row.id)
                  }
                />
                <CancelIcon color='error' onClick={() => onRejectTask(row.id)} />
              </>
            )
          ) : (
            <></>
          )}
        </TableCell>
      </TableRow>
      <TableRow className={open ? styles.opened : ''}>
        <TableCell className={styles.subRow} colSpan={12}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <SubtasksPane taskId={row.id} statusIndex={tasksTabIndex} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const OperatorTasksListView = () => {
  const history = useHistory();

  const [pageSize, setPageSize] = useState(MAX_TASKS_PER_PAGE);
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

  const prepareQuery = () => {
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
    const query = {
      pageSize,
      pageNumber: tasksPageNumber,
      statuses: [tasksStatusFilter],
      categoryPath,
      searchText: searchedTaskQuery,
      sortDirection,
      sortOrder
    };
    return query;
  };

  const { data, status, refetch } = useQuery(
    [
      'tasks',
      {
        tasksStatusFilter,
        tasksPageNumber,
        selectedCategory,
        selectedSubCategory,
        searchedTaskQuery,
        order,
        orderBy,
        pageSize
      }
    ],
    () => {
      return fetchTasks(prepareQuery());
    },
    {
      cacheTime: 0,
      refetchOnWindowFocus: false
    }
  );

  const headCells = [
    { id: 'PRIORITY', label: dictionary.priority, sortable: true },
    { id: 'subtaskCount', label: dictionary.subtaskCount },
    { id: 'PRODUCT_NAME', label: dictionary.productName, sortable: true },
    { id: 'QUANTITY', label: dictionary.quantityOriginal, sortable: true },
    { id: 'QUANTITY_LEFT', label: dictionary.quantityLeft, sortable: true },
    { id: 'DUEDATE', label: dictionary.deadlineDate, sortable: true },
    { id: 'VOLUNTEER_STORE', label: dictionary.volunteerStore, sortable: false },
    { id: 'CUSTOMER_STORE', label: dictionary.customerStore, sortable: false }
  ];

  const exportTasksPage = () => {
    exportTasks(prepareQuery());
  };

  const changePageSize = pageSize => {
    setPageSize(pageSize);
    setTasksPageNumber(0);
  };

  return (
    <TabsContext.Provider value={{ taskStatusTabValue }}>
      <div className={styles.tabsContainer}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <div className={styles.tabsSearchBox}>
            <Tabs value={taskStatusTabValue} handleChange={handleChange}></Tabs>
            <div className={styles.search}>
              <div className={styles.export_button}>
                <button onClick={exportTasksPage}>
                  <FileDownloadIcon />
                </button>
              </div>
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
        {status === 'loading' ? (
          <div>{dictionary.loading}...</div>
        ) : status === 'error' ? (
          <div>{dictionary.error}</div>
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
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.items?.map(row => (
                    <Row
                      key={row.id}
                      row={row}
                      handleRowClick={() => navigateSubTaskHandler(row)}
                      tasksTabIndex={taskStatusTabValue}
                      refetch={refetch}
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
              rowsPerPageOptions={[5, 10, 25, 50]}
              onRowsPerPageChange={e => changePageSize(e.target.value)}
              rowsPerPage={pageSize}
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

  const [pageSize, setPageSize] = useState(MAX_TASKS_PER_PAGE);
  const [tasksPageNumber, setTasksPageNumber] = useState(0);
  const [tasksOrder, setTasksOrder] = useState(0);
  const [searchedTaskQuery, setSearchedTaskQuery] = useState('');

  const prepareQuery = () => {
    let categoryPath = null;
    if (selectedCategory) {
      categoryPath = '/' + selectedCategory;
    }
    if (selectedSubCategory) {
      categoryPath += '/' + selectedSubCategory;
    }
    const query = {
      pageSize,
      pageNumber: tasksPageNumber,
      statuses: [TASK_STATUSES.verified],
      searchText: searchedTaskQuery,
      categoryPath
    };
    if (tasksOrder && tasksOrder.length > 0) {
      const tasksOrderSpec = tasksOrder[0];
      query.sortOrder = TASKS_SORT_FIELD_MAPPINGS[tasksOrderSpec.field];
      if (tasksOrderSpec.sort) {
        query.sortDirection = tasksOrderSpec.sort.toUpperCase();
      }
    }
    return query;
  };

  const { data, status } = useQuery(
    [
      'volunteertasks',
      {
        tasksPageNumber,
        tasksOrder,
        searchedTaskQuery,
        pageSize,
        selectedCategory,
        selectedSubCategory
      }
    ],
    async () => {
      return await fetchTasks(prepareQuery());
    },
    {
      cacheTime: 0,
      refetchOnWindowFocus: false
    }
  );

  const exportTasksPage = () => {
    exportTasks(prepareQuery());
  };

  const changePageSize = pageSize => {
    setPageSize(pageSize);
    setTasksPageNumber(0);
  };

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabsSearchBox}>
        <Title text={dictionary.tasks} />
        <div className={styles.search}>
          <div className={styles.export_button}>
            <button onClick={exportTasksPage}>
              <FileDownloadIcon />
            </button>
          </div>
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
        <div>{dictionary.loading}...</div>
      ) : status === 'error' ? (
        <div>{dictionary.error}</div>
      ) : (
        <DataGrid
          style={{ height: 600 }}
          onRowClick={e => navigateSubTaskHandler(e)}
          rows={data.items}
          page={data.page}
          columns={tasksColumns}
          rowCount={data.totalCount}
          paginationMode='server'
          onPageChange={page => setTasksPageNumber(page)}
          sortingMode='server'
          onSortModelChange={setTasksOrder}
          sortModel={tasksOrder ? tasksOrder : []}
          rowsPerPageOptions={[5, 10, 25, 50]}
          onPageSizeChange={changePageSize}
          pageSize={pageSize}
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
