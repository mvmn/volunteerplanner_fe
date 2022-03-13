import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

import dictionary from '../dictionary';

export const NAVIGATION_ITEMS = [
  { link: 'users', title: dictionary.users, icon: <GroupOutlinedIcon /> },
  { link: 'tasks', title: dictionary.tasks, icon: <AssignmentOutlinedIcon /> },
  { link: 'create-task', title: dictionary.createTask, icon: <AddCircleOutlinedIcon /> },
  { link: 'create-category', title: dictionary.createCategory, icon: <AddCircleOutlinedIcon /> }
];
