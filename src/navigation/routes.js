import { CreateTask } from '../components/CreateTask';
import { Profile } from '../screens/Profile';
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';
import { TasksList } from '../screens/TasksList';
import { UserList } from '../screens/UserList';

export const routes = [
  { link: 'users', component: UserList, isAuthorized: true },
  { link: 'tasks', component: TasksList, isAuthorized: true },
  { link: 'create-task', component: CreateTask, isAuthorized: true },
  { link: 'profile', component: Profile, isAuthorized: true },
  { link: 'sign-up', component: SignUp },
  { link: 'login', component: SignIn }
];
