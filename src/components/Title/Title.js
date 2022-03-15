import { Typography } from '@mui/material';

import styles from './Title.module.scss';

export const Title = ({ text }) => (
  <Typography variant='h4' className={styles.title}>
    {text}
  </Typography>
);
