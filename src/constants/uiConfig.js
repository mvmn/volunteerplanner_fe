import { LockedStatus } from '../components/LockedStatus';
import { Priority } from '../components/Priority';
import { Status } from '../components/Status';
import dictionary from '../dictionary';
import { unixTimeToPrettyDate } from '../helpers/dates';

export const MAX_USER_PER_PAGE = 10;
export const MAX_STORES_PER_PAGE = 10;
export const MAX_TASKS_PER_PAGE = 10;
export const MAX_PRODUCTS_PER_PAGE = 10;
export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';

export const TASK_STATUSES = {
  new: 'NEW',
  verified: 'VERIFIED',
  completed: 'COMPLETED',
  rejected: 'REJECTED'
};

export const SUBTASK_STATUSES = {
  inProgress: 'IN_PROGRESS',
  completed: 'COMPLETED',
  rejected: 'REJECTED',
  all: 'ALL'
};

export const SUBTASK_STATUS = {
  inProgress: 'IN_PROGRESS',
  completed: 'COMPLETED',
  rejected: 'REJECTED'
};

export const SUBTASK_NAME = {
  COMPLETED: 'completed',
  IN_PROGRESS: 'inProgress',
  REJECTED: 'rejected'
};

export const ROLES = {
  operator: 'operator',
  volunteer: 'volunteer',
  requestor: 'requestor',
  root: 'root'
};

export const STATUS_NAME = {
  NEW: 'new',
  VERIFIED: 'verified',
  COMPLETED: 'completed',
  IN_PROGRESS: 'inProgress',
  REJECTED: 'rejected'
};

export const SUBTASK_STATUS_NAME = {
  COMPLETED: 'subtaskStatusCompleted',
  IN_PROGRESS: 'subtaskStatusInProgress',
  REJECTED: 'subtaskStatusRejected'
};

export const tasksColumns = [
  { field: 'subtaskCount', headerName: dictionary.subtaskCount, flex: 1, sortable: false },
  { field: 'quantityLeft', headerName: dictionary.quantity, flex: 1 },
  { field: 'productMeasure', headerName: dictionary.productMeasure, flex: 1, sortable: false },
  {
    field: 'productId',
    headerName: dictionary.productName,
    renderCell: ({ row }) => {
      return <>{row.product.name}</>;
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
  {
    field: 'deadlineDate',
    headerName: dictionary.deadlineDate,
    flex: 1,
    renderCell: ({ row }) => unixTimeToPrettyDate(row.deadlineDate)
  },
  { field: 'note', headerName: dictionary.note, flex: 1, sortable: false },
  {
    field: 'status',
    headerName: dictionary.status,
    renderCell: ({ row }) => <Status status={row.status} />,
    flex: 1
  }
];

export const userFields = [
  {
    id: 'id',
    label: dictionary.id
  },
  {
    id: 'displayName',
    label: dictionary.displayName,
    render: row => (
      <>
        {row.displayName}
        <Status status={row.userVerified} />
      </>
    )
  },
  {
    id: 'phoneNumber',
    label: dictionary.phoneNumber,
    render: row => (
      <>
        {row.phoneNumber}
        <Status status={row.phoneNumberVerified} />
      </>
    )
  },
  {
    id: 'rating',
    label: dictionary.rating
  },
  {
    id: 'role',
    label: dictionary.role
  },
  {
    id: 'locked',
    label: dictionary.locked,
    render: row => <LockedStatus status={row.locked} />
  }
];
