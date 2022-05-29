import { createTheme } from '@mui/material/styles';
import { ukUA } from '@mui/x-data-grid';

const theme = createTheme(
  {
    palette: {
      text: {
        primary: '#82888C'
      }
    },
    icons: {
      denim: '#1976d2',
      yellow: '#f9cb40'
    }
  },
  ukUA
);

export default theme;
