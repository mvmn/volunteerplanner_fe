import { Container } from '@mui/material';

import styles from './ForgotPassword.module.scss';

export const ForgotPassword = () => {
  return (
    <Container>
      <div className={styles.forgotPassword}>'Забули пароль'</div>
    </Container>
  );
};
