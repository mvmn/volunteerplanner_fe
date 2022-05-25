import { LoadingButton } from '@mui/lab';
import { Checkbox, FormControlLabel, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import * as yup from 'yup';

import dictionary from '../../../../dictionary';
import { unixTimeToLocalDateTime } from '../../../../helpers/dates';
import { yupPatterns } from '../../../../helpers/validation';

const initialValues = {
  note: '',
  quantity: 0,
  transportRequired: true,
  dueDate: ''
};

const taskToForm = task =>
  task
    ? {
        ...task,
        dueDate: Number.isFinite(task?.dueDate) ? unixTimeToLocalDateTime(task.dueDate) : ''
      }
    : undefined;

export const SubTaskForm = ({ task, onSave, onReject, isLocked, maxQuantity = Infinity }) => {
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        note: yupPatterns('note'),
        quantity: yupPatterns('quantity').max(
          maxQuantity,
          `${dictionary.noMoreThan} ${maxQuantity}`
        ),
        dueDate: yupPatterns('dueDate')
      }),
    [maxQuantity]
  );

  const formik = useFormik({
    initialValues: { ...initialValues, ...taskToForm(task) },
    validationSchema,
    enableReinitialize: true,
    async onSubmit(values) {
      setIsLoading(true);
      await onSave({
        ...values,
        dueDate: values.dueDate ? Math.round(new Date(values.dueDate).getTime() / 1000) : null
      });
      setIsLoading(false);
    }
  });

  const handleRejectClick = async () => {
    setIsLoading(true);
    await onReject();
    setIsLoading(false);
  };

  const { handleChange, handleSubmit, resetForm, values, errors } = formik;

  useEffect(() => {
    if (resetForm && task) {
      resetForm({
        ...initialValues,
        ...taskToForm(task)
      });
    }
  }, [resetForm, task]);

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
          disabled={isLocked}
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
          disabled={isLocked}
          fullWidth
        />

        <FormControlLabel
          control={
            <Checkbox
              id='transportRequired'
              name='transportRequired'
              checked={values.transportRequired}
              onChange={handleChange}
              disabled={isLocked}
            />
          }
          label={dictionary.transportRequired}
        />

        {!values.transportRequired && (
          <TextField
            id='dueDate'
            name='dueDate'
            type='datetime-local'
            value={values.dueDate}
            label={dictionary.dueDate}
            size='small'
            onChange={handleChange}
            helperText={errors.dueDate}
            error={Boolean(errors.dueDate)}
            disabled={isLocked || values.transportRequired}
            fullWidth
          />
        )}
      </Stack>

      {!isLocked && (
        <Stack direction='row-reverse'>
          <LoadingButton variant='outlined' type='submit' loading={isLoading}>
            {dictionary.save}
          </LoadingButton>

          {onReject && (
            <LoadingButton
              variant='outlined'
              color='error'
              sx={{ mr: 2 }}
              loading={isLoading}
              onClick={handleRejectClick}
            >
              {dictionary.reject}
            </LoadingButton>
          )}
        </Stack>
      )}
    </form>
  );
};
