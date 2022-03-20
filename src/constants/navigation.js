import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

import dictionary from '../dictionary';

export const NAVIGATION_ITEMS = [
  { link: 'tasks', title: dictionary.tasks, icon: <AssignmentOutlinedIcon /> },
  { link: 'finished-tasks', title: dictionary.myFinishedTasks, icon: <DoneAllIcon /> }
];

export const OPERATOR_NAVIGATION_ITEMS = [
  { link: 'users', title: dictionary.users, icon: <GroupOutlinedIcon /> }
];
