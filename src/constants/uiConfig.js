import { LockedStatus } from '../components/LockedStatus';
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

export const tasksColumns = [
  { field: 'subtaskCount', headerName: dictionary.subtaskCount, flex: 1 },
  { field: 'quantityLeft', headerName: dictionary.quantity, flex: 1 },
  { field: 'productMeasure', headerName: dictionary.productMeasure, flex: 1 },
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
  { field: 'deadlineDate', headerName: dictionary.deadlineDate, flex: 1 },
  { field: 'note', headerName: dictionary.note, flex: 1 },
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
