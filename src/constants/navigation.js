import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import WarehouseIcon from '@mui/icons-material/Warehouse';

import dictionary from '../dictionary';

export const VOLUNTEER_NAVIGATION_ITEMS = [
  { link: 'tasks', title: dictionary.tasks, icon: <AssignmentOutlinedIcon /> },
  { link: 'my-tasks', title: dictionary.myTasks, icon: <DoneAllIcon /> }
];

export const OPERATOR_NAVIGATION_ITEMS = [
  { link: 'tasks', title: dictionary.tasks, icon: <AssignmentOutlinedIcon /> },
  { link: 'my-tasks', title: dictionary.myTasks, icon: <DoneAllIcon /> },
  { link: 'users', title: dictionary.users, icon: <GroupOutlinedIcon /> },
  { link: 'stores', title: dictionary.stores, icon: <WarehouseIcon /> },
  {
    link: 'categories-products',
    title: dictionary.categoriesAndProducts,
    icon: <AccountTreeIcon />
  }
];

export const REQUESTOR_NAVIGATION_ITEMS = [
  { link: 'tasks', title: dictionary.tasks, icon: <AssignmentOutlinedIcon /> },
  { link: 'my-tasks', title: dictionary.myTasks, icon: <DoneAllIcon /> },
  { link: 'stores', title: dictionary.stores, icon: <WarehouseIcon /> },
  {
    link: 'categories-products',
    title: dictionary.categoriesAndProducts,
    icon: <AccountTreeIcon />
  }
];

export const ROOT_NAVIGATION_ITEMS = [
  { link: 'users', title: dictionary.users, icon: <GroupOutlinedIcon /> }
];
