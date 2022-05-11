import { Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';

import dictionary from '../../dictionary';
import { yupPatterns } from '../../helpers/validation';

const validationSchema = yup.object().shape({
  address: yupPatterns('collectionAddress')
});

const initialValues = {
  address: ''
};

export const StoreForm = ({ onClose }) => {
  const onSubmitHandler = async (values, { setSubmitting }) => {
    setSubmitting(false);
    onClose({ form: values });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        {({ values, errors, setFieldValue, handleChange, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <TextField
                name='address'
                value={values.address}
                label={dictionary.collectionAddress}
                type='text'
                size='small'
                margin='normal'
                onChange={handleChange}
                fullWidth
              />

              <div>TBD</div>

              <Button variant='outlined' type='submit'>
                {dictionary.save}
              </Button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
