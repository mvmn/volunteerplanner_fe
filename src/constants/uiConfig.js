import { Priority } from '../components/Priority';
import { Status } from '../components/Status';
import dictionary from '../dictionary';
export const MAX_USER_PER_PAGE = 10;
export const MAX_TASKS_PER_PAGE = 5;

export const TASK_STATUSES = {
  new: 0,
  verified: 1,
  completed: 2,
  rejected: 3
};

export const ROLES = {
  operator: 'operator',
  volunteer: 'volunteer'
};

export const STATUS_NAME = {
  0: 'new',
  1: 'verified',
  2: 'completed',
  3: 'rejected'
};

export const usersColumns = [
  { field: 'phoneNumber', headerName: dictionary.phoneNumber, flex: 2 },
  { field: 'nickname', headerName: dictionary.nickname, flex: 1 },
  { field: 'fullname', headerName: dictionary.fullname, flex: 2 },
  { field: 'email', headerName: dictionary.email, flex: 2 },
  { field: 'region', headerName: dictionary.region, flex: 2 },
  { field: 'city', headerName: dictionary.city, flex: 1 },
  {
    field: 'active',
    headerName: dictionary.active,
    renderCell: ({ row }) => <Status status={row.active} />,
    flex: 2
  },
  {
    field: 'verified',
    headerName: dictionary.verified,
    renderCell: ({ row }) => <Status status={row.verified} />,
    flex: 2
  }
];

export const tasksColumns = [
  { field: 'customer', headerName: dictionary.customer, flex: 1 },
  { field: 'quantity_left', headerName: dictionary.quantity, flex: 1 },
  { field: 'product_measure', headerName: dictionary.product_measure, flex: 1 },
  {
    field: 'priority',
    headerName: dictionary.priority,
    renderCell: ({ row }) => {
      return <Priority priority={row.priority} />;
    },
    flex: 1
  },
  { field: 'deadline_date', headerName: dictionary.deadline_date, flex: 1 },
  { field: 'note', headerName: dictionary.note, flex: 1 },
  {
    field: 'status_id',
    headerName: dictionary.status,
    renderCell: ({ row }) => <Status status={row.status_id} />,
    flex: 1
  }
];

export const ROW_TO_DISPLAY = ['phoneNumber', 'nickname', 'fullname', 'email', 'region', 'city'];
