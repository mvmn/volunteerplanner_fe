import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
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
  TableRow
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import _ from 'lodash';
import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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

function Row(props) {
  const { row, handleRowClick } = props;
  const [open, setOpen] = useState(false);
  const subTasks = useSelector(state => state.subTasks);
  const mapSubTasks = _.groupBy(
    Object.values(subTasks).reduce((acc, value) => [...acc, ...value], []),
    subTask => subTask.taskId
  );

  return (
    <>
      <TableRow
        className={open && styles.opened}
        sx={{ '& > *': { borderBottom: 'unset' } }}
        onDoubleClick={handleRowClick}
      >
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.subtaskCount}
        </TableCell>
        <TableCell>{row.quantity}</TableCell>
        <TableCell>{row.productMeasure}</TableCell>
        <TableCell>{products[row.productId]}</TableCell>
        <TableCell>
          <Priority priority={row.priority} />
        </TableCell>
        <TableCell>{row.deadlineDate}</TableCell>
        <TableCell>
          <Status status={row.status} />
        </TableCell>
        <TableCell>{row.note}</TableCell>
      </TableRow>
      <TableRow className={open && styles.opened}>
        <TableCell className={styles.test} colSpan={12}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table className={styles.subTable}>
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell width='21%' colSpan={4}>
                      {dictionary.quantity}
                    </TableCell>
                    <TableCell width='27%'>{dictionary.transportRequired}</TableCell>
                    <TableCell width='31%'>{dictionary.status}</TableCell>
                    <TableCell>{dictionary.note}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mapSubTasks[row.id]?.map(subTask => (
                    <TableRow key={subTask.date}>
                      <TableCell />
                      <TableCell colSpan={4} component='th' scope='row'>
                        {subTask.quantity}
                      </TableCell>
                      <TableCell>
                        {subTask.transportRequired ? dictionary.yes : dictionary.no}
                      </TableCell>
                      <TableCell styles={{ display: 'flex', flex: 2 }}>
                        <ChangeStatus status={subTask.status} />
                      </TableCell>
                      <TableCell>{subTask.note}</TableCell>
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

  const { selectedCategory, selectedSubCategory } = useContext(CategoriesContext);

  console.log(selectedCategory, selectedSubCategory);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.tabsContainer}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} handleChange={handleChange}></Tabs>
      </Box>
      {Object.entries(tasks).map(([key, tasksByStatus], i) => {
        return (
          <TabPanel key={key} value={value} index={i}>
            <TableContainer component={Paper}>
              <Table aria-label='collapsible table'>
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>{dictionary.subtaskCount}</TableCell>
                    <TableCell>{dictionary.quantity}</TableCell>
                    <TableCell>{dictionary.productMeasure}</TableCell>
                    <TableCell>{dictionary.productName}</TableCell>
                    <TableCell>{dictionary.priority}</TableCell>
                    <TableCell>{dictionary.deadlineDate}</TableCell>
                    <TableCell>{dictionary.status}</TableCell>
                    <TableCell>{dictionary.note}</TableCell>
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

  const handleRowClick = () => {
    navigate(`/open-subtask`);
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
