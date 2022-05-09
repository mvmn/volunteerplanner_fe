import { VolunteerTasks } from '../components/VolunteerTasks';
import { ROLES } from '../constants/uiConfig';
import { ChangePassword } from '../screens/ChangePassword';
import { CreateSubTask } from '../screens/CreateSubTask';
import { ForgotPassword } from '../screens/ForgotPassword';
import { Profile } from '../screens/Profile';
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';
import { StoresList } from '../screens/StoresList';
import { TasksList } from '../screens/TasksList';
import { UserList } from '../screens/UserList';

export const routes = [
  { link: 'users', component: UserList, isAuthorized: true, role: ROLES.operator },
  { link: 'tasks', component: TasksList, isAuthorized: true },
  { link: 'stores', component: StoresList, isAuthorized: true, role: ROLES.operator },
  { link: 'my-tasks', component: VolunteerTasks, isAuthorized: true },
  { link: 'create-subtask/:taskId', component: CreateSubTask, isAuthorized: true },
  { link: 'profile', component: Profile, isAuthorized: true },
  { link: 'sign-up', component: SignUp },
  { link: 'login', component: SignIn },
  { link: 'change-password', component: ChangePassword, isAuthorized: true },
  { link: 'password-reset', component: ForgotPassword }
];
