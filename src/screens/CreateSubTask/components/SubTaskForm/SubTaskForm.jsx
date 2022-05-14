import { LoadingButton } from '@mui/lab';
import { Checkbox, FormControlLabel, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';

import dictionary from '../../../../dictionary';
import { yupPatterns } from '../../../../helpers/validation';

const validationSchema = yup.object().shape({
  note: yupPatterns('note'),
  quantity: yupPatterns('quantity'),
  dueDate: yupPatterns('dueDate')
});

const initialValues = {
  note: '',
  quantity: 0,
  transportRequired: true,
  dueDate: ''
};

export const SubTaskForm = ({ task, onSave }) => {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: { ...initialValues, ...task },
    validationSchema,
    async onSubmit(values) {
      setIsLoading(true);
      await onSave({
        ...values,
        // TODO: clarify unix time format: milliseconds (currently used) vs seconds
        dueDate: values.dueDate ? new Date(values.dueDate).getTime() : null
      });
      setIsLoading(false);
    }
  });

  const { handleChange, handleSubmit, values, errors } = formik;

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={2} my={2}>
        <TextField
          id='quantity'
          name='quantity'
          type='number'
          value={values.quantity}
          label={dictionary.quantity}
          size='small'
          onChange={handleChange}
          helperText={errors.quantity}
          error={Boolean(errors.quantity)}
          fullWidth
        />

        <TextField
          id='note'
          name='note'
          type='text'
          value={values.note}
          label={dictionary.note}
          size='small'
          onChange={handleChange}
          helperText={errors.note}
          error={Boolean(errors.note)}
          fullWidth
        />

        <FormControlLabel
          control={
            <Checkbox
              id='transportRequired'
              name='transportRequired'
              checked={values.transportRequired}
              onChange={handleChange}
            />
          }
          label={dictionary.transportRequired}
        />

        {!values.transportRequired && (
          <TextField
            id='dueDate'
            name='dueDate'
            type='date'
            value={values.dueDate}
            label={dictionary.dueDate}
            size='small'
            onChange={handleChange}
            helperText={errors.dueDate}
            error={Boolean(errors.dueDate)}
            fullWidth
          />
        )}
      </Stack>

      <Stack alignItems='flex-end'>
        <LoadingButton variant='outlined' type='submit' loading={isLoading}>
          {dictionary.save}
        </LoadingButton>
      </Stack>
    </form>
  );
};
