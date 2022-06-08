import { Button, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import * as yup from 'yup';

import dictionary from '../../dictionary';
import { yupPatterns } from '../../helpers/validation';
import { Modal } from '../Modal';

const validationSchema = yup.object().shape({
  name: yupPatterns('name'),
  note: yup.string().optional().nullable()
});

const initialValues = {
  name: '',
  note: ''
};

export const CategoryEditModal = ({ isOpen, onClose, onSave, category }) => {
  const { handleChange, handleSubmit, values, errors, resetForm } = useFormik({
    initialValues: { ...initialValues, ...category },
    validationSchema,
    enableReinitialize: true,
    async onSubmit(data) {
      if (onSave) {
        await onSave(data);
      }
      onClose();
    }
  });

  useEffect(() => {
    if (resetForm && category) {
      resetForm({ ...initialValues, ...category });
    }
  }, [resetForm, category]);

  return (
    <Modal open={isOpen} onClose={onClose} title={dictionary.edit}>
      <form onSubmit={handleSubmit}>
        <TextField
          name='name'
          type='text'
          size='small'
          margin='normal'
          variant='outlined'
          label={dictionary.name}
          error={Boolean(errors.name)}
          helperText={errors.name}
          onChange={handleChange}
          value={values.name}
          fullWidth
        />

        <TextField
          name='note'
          type='text'
          size='small'
          margin='normal'
          variant='outlined'
          label={dictionary.note}
          error={Boolean(errors.note)}
          helperText={errors.note}
          onChange={handleChange}
          value={values.note}
          multiline={true}
          rows={4}
          fullWidth
        />

        <Stack direction='row-reverse' sx={{ mt: 2 }}>
          <Button variant='outlined' type='submit'>
            {dictionary.save}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
