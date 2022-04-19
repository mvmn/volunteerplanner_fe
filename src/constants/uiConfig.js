import { Priority } from '../components/Priority';
import { Status } from '../components/Status';
import dictionary from '../dictionary';

export const MAX_USER_PER_PAGE = 10;
export const MAX_TASKS_PER_PAGE = 5;
export const ACCESS_TOKEN = 'accessToken';

export const TASK_STATUSES = {
  new: 'NEW',
  verified: 'VERIFIED',
  completed: 'COMPLETED',
  rejected: 'REJECTED'
};

export const SUBTASK_STATUSES = {
  completed: 'COMPLETED',
  inProgress: 'IN_PROGRESS',
  rejected: 'REJECTED'
};

export const SUBTASK_NAME = {
  COMPLETED: 'completed',
  IN_PROGRESS: 'inProgress',
  REJECTED: 'rejected'
};

export const ROLES = {
  operator: 'operator',
  volunteer: 'volunteer'
};

export const STATUS_NAME = {
  NEW: 'new',
  VERIFIED: 'verified',
  COMPLETED: 'completed',
  IN_PROGRESS: 'inProgress',
  REJECTED: 'rejected'
};

export const products = {
  1: 'Бронежелет',
  2: 'Крупи',
  3: 'Зубна паста',
  4: 'Гель для душу',
  5: 'Питна вода',
  6: 'Каремати'
};

export const tasksColumns = [
  { field: 'subtaskCount', headerName: dictionary.subtaskCount, flex: 1 },
  { field: 'quantityLeft', headerName: dictionary.quantity, flex: 1 },
  { field: 'productMeasure', headerName: dictionary.productMeasure, flex: 1 },
  {
    field: 'productId',
    headerName: dictionary.productName,
    renderCell: ({ row }) => {
      return <>{products[row.productId]}</>;
    },
    flex: 1
  },
  {
    field: 'priority',
    headerName: dictionary.priority,
    renderCell: ({ row }) => {
      return <Priority priority={row.priority} />;
    },
    flex: 1
  },
  { field: 'deadlineDate', headerName: dictionary.deadlineDate, flex: 1 },
  { field: 'note', headerName: dictionary.note, flex: 1 },
  {
    field: 'status',
    headerName: dictionary.status,
    renderCell: ({ row }) => <Status status={row.status} />,
    flex: 1
  }
];

export const ROW_TO_DISPLAY = ['phoneNumber', 'userName', 'fullName', 'email'];
