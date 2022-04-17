import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
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
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Categories } from '../../components/Categories';
import { ChangeStatus } from '../../components/ChangeStatus';
import { Priority } from '../../components/Priority';
import { Status } from '../../components/Status';
import { TabPanel } from '../../components/TabPanel';
import { Tabs } from '../../components/Tabs';
import { Title } from '../../components/Title';
import { MAX_TASKS_PER_PAGE, ROLES, products, tasksColumns } from '../../constants/uiConfig';
import dictionary from '../../dictionary';
import { CategoriesContext } from '../Main';
import styles from './TasksList.module.scss';

export const TabsContext = createContext();

const VERIFIED_TAB_INDEX = 1;
function Row(props) {
  const { row, handleRowClick } = props;
  const { value } = useContext(TabsContext);
  const [open, setOpen] = useState(false);
  const subTasks = useSelector(state => state.subTasks);
  const mapSubTasks = _.groupBy(
    Object.values(subTasks).reduce((acc, value) => [...acc, ...value], []),
    subTask => subTask.taskId
  );

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
        <TableCell>{products[row.productId]}</TableCell>
        <TableCell>{row.deadlineDate}</TableCell>
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
}

const OperatorTasksListView = ({ handleRowClick }) => {
  const tasks = useSelector(state => state.tasks);

  const [value, setValue] = useState(1);
  const [searchedTaskQuery, setSearchedTaskQuery] = useState('');

  const { selectedCategory, selectedSubCategory } = useContext(CategoriesContext);

  console.log(selectedCategory, selectedSubCategory);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <TabsContext.Provider value={{ value }}>
      <div className={styles.tabsContainer}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <div className={styles.tabsSearchBox}>
            <Tabs value={value} handleChange={handleChange}></Tabs>
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
        {Object.entries(tasks).map(([key, tasksByStatus], i) => {
          return (
            <TabPanel key={key} value={value} index={i}>
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
                    {tasksByStatus?.map(row => (
                      <Row key={row.id} row={row} handleRowClick={handleRowClick} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
          );
        })}

        <TablePagination
          component='div'
          count={100}
          page={0}
          onPageChange={() => {}}
          rowsPerPage={10}
          rowsPerPageOptions={[]}
        />
      </div>
    </TabsContext.Provider>
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

  let history = useHistory();

  const handleClick = () => {
    history.push('/create-task');
  };

  const handleRowClick = id => {
    history.push(`/create-subtask/${id}`);
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
