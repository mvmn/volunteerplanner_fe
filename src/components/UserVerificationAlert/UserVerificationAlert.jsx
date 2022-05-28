import { Alert, AlertTitle, Container } from '@mui/material';

export const UserVerificationAlert = () => {
  return (
    <Container maxWidth='sm' sx={{ textAlign: 'left' }}>
      <Alert severity='warning'>
        <AlertTitle>Ваш обліковий запис очікує на підтвердження</AlertTitle>
        Як тільки адміністрація підтвердить ваш обліковий запис, ви зможете користуватися сервісом.
      </Alert>
    </Container>
  );
};
