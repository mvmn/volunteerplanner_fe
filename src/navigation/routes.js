import { CreateCategory } from '../components/CreateCategory';
import { CreateTask } from '../components/CreateTask';
import { UserList } from '../components/UserList';
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';

export const routes = [
  { link: 'users', component: UserList },
  { link: 'create-task', component: CreateTask },
  { link: 'create-category', component: CreateCategory },
  { link: 'sign-up', component: SignUp },
  { link: 'sign-in', component: SignIn }
];
