import { Status } from '../components/Status';
import dictionary from '../dictionary';
export const MAX_USER_PER_PAGE = 10;

export const columns = [
  { field: 'phoneNumber', headerName: dictionary.phoneNumber, flex: 2 },
  { field: 'nickname', headerName: dictionary.nickname, flex: 1 },
  { field: 'fullname', headerName: dictionary.fullname, flex: 2 },
  { field: 'email', headerName: dictionary.email, flex: 2 },
  { field: 'region', headerName: dictionary.region, flex: 2 },
  { field: 'city', headerName: dictionary.city, flex: 1 },
  {
    field: 'active',
    headerName: dictionary.active,
    renderCell: ({ row }) => {
      const { active } = row;
      return <Status status={active} text={active ? dictionary.active : dictionary.inactive} />;
    },
    flex: 2
  },
  {
    field: 'verified',
    headerName: dictionary.verified,
    renderCell: ({ row }) => {
      const { verified } = row;
      return (
        <Status status={verified} text={verified ? dictionary.verified : dictionary.notVerified} />
      );
    },
    flex: 2
  }
];

export const ROW_TO_DISPLAY = ['phoneNumber', 'nickname', 'fullname', 'email', 'region', 'city'];
