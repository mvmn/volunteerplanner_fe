import { Alert, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { requestPhoneVerificationSMS, verifyCurrentPhoneByCode } from '../../api/user';
import dictionary from '../../dictionary';

const initialValues = { code: '' };

export const PhoneConfirmation = () => {
  const user = useSelector(state => state.user);
  const [isCodeRequested, setIsCodeRequested] = useState(false);
  const [codeError, setCodeError] = useState();
  const history = useHistory();

  const onCodeRequestClick = () => {
    requestPhoneVerificationSMS();
    setIsCodeRequested(true);
  };

  const handleCodeSubmit = async ({ code }) => {
    try {
      setCodeError();
      const { error, phoneNumberVerified } = await verifyCurrentPhoneByCode({ code });

      if (phoneNumberVerified) {
        history.go(0);
      } else if (error === 'invalidCode') {
        setCodeError(dictionary.invalidVerificationCode);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues,
    async onSubmit(values) {
      handleCodeSubmit(values);
    }
  });

  const { handleChange, handleSubmit, values, errors } = formik;

  return (
    <Container maxWidth='sm' sx={{ textAlign: 'left' }}>
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant='h4' component='h1'>
          {dictionary.verifyPhoneNumber}
        </Typography>

        <Box>
          <Box sx={{ py: 2 }}>
            <Typography fontWeight='bold' sx={{ display: 'inline' }}>
              {`${dictionary.phoneNumber}: `}
            </Typography>
            {user?.phoneNumber}
          </Box>

          {!isCodeRequested && (
            <Stack direction='row-reverse'>
              <Button variant='outlined' onClick={onCodeRequestClick}>
                {dictionary.sendCode}
              </Button>
            </Stack>
          )}

          {isCodeRequested && (
            <>
              <Alert severity='info' sx={{ mt: 2 }}>
                {dictionary.confirmationCodeInfo}
              </Alert>
              <form onSubmit={handleSubmit}>
                <TextField
                  name='code'
                  type='number'
                  value={values.code}
                  onChange={handleChange}
                  error={Boolean(errors.code || codeError)}
                  helperText={errors.code || codeError}
                  label={dictionary.verificationCode}
                  size='small'
                  margin='normal'
                  autoComplete='off'
                  fullWidth
                />

                <Stack direction='row-reverse'>
                  <Button type='submit' variant='outlined'>
                    {dictionary.verify}
                  </Button>
                </Stack>
              </form>
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
};
