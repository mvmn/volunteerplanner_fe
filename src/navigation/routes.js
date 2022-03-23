import { CreateTask } from '../components/CreateTask';
import { VolunteerTasks } from '../components/VolunteerTasks';
import { ROLES } from '../constants/uiConfig';
import { CreateSubtask } from '../screens/CreateSubtask';
import { Profile } from '../screens/Profile';
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';
import { TasksList } from '../screens/TasksList';
import { UserList } from '../screens/UserList';

export const routes = [
  { link: 'users', component: UserList, isAuthorized: true, role: ROLES.operator },
  { link: 'tasks', component: TasksList, isAuthorized: true },
  { link: 'my-tasks', component: VolunteerTasks, isAuthorized: true },
  { link: 'create-subtask/:taskId', component: CreateSubtask, isAuthorized: true },
  { link: 'create-task', component: CreateTask, isAuthorized: true, role: ROLES.operator },
  { link: 'profile', component: Profile, isAuthorized: true },
  { link: 'sign-up', component: SignUp },
  { link: 'login', component: SignIn }
];
