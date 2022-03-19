import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

import dictionary from '../dictionary';

export const NAVIGATION_ITEMS = [
  { link: 'users', title: dictionary.users, icon: <GroupOutlinedIcon /> },
  { link: 'tasks', title: dictionary.tasks, icon: <AssignmentOutlinedIcon /> }
];
