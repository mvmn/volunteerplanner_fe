import { Autocomplete, Box, Button, FormControlLabel, Switch, TextField } from '@mui/material';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';

import { getCitiesByRegionId, getRegions } from '../../api/address';
import dictionary from '../../dictionary';
import { yupPatterns } from '../../helpers/validation';
import styles from './StoreForm.module.scss';

const validationSchema = yup.object().shape({
  name: yupPatterns('notEmptyString'),
  address: yupPatterns('notEmptyString'),
  region: yupPatterns('geoName'),
  city: yupPatterns('geoName')
});

const initialValues = {
  address: '',
  region: null,
  city: null,
  confidential: true
};

export const StoreForm = ({ onClose, input }) => {
  const onSubmitHandler = async (values, { setSubmitting }) => {
    setSubmitting(false);
    onClose({ form: values });
  };

  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState();
  useEffect(() => {
    getRegions().then(({ items }) => setRegions(items));
  }, []);
  useEffect(() => {
    if (selectedRegion?.id) {
      getCitiesByRegionId(selectedRegion.id).then(({ items }) => setCities(items));
    }
  }, [selectedRegion]);

  return (
    <Formik
      initialValues={{ ...initialValues, ...input }}
      validationSchema={validationSchema}
      onSubmit={onSubmitHandler}
    >
      {({ values, errors, setFieldValue, handleChange, handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <TextField
              name='name'
              value={values.name}
              label={dictionary.storeName}
              type='text'
              size='small'
              margin='normal'
              onChange={handleChange}
              fullWidth
              error={Boolean(errors.name)}
              helperText={errors.name}
            />

            <TextField
              name='address'
              value={values.address}
              label={dictionary.address}
              type='text'
              size='small'
              margin='normal'
              onChange={handleChange}
              fullWidth
              error={Boolean(errors.address)}
              helperText={errors.address}
            />

            <Autocomplete
              name='region'
              freeSolo
              disablePortal
              getOptionLabel={option => option.name}
              options={regions}
              size='small'
              margin='normal'
              onChange={(_, value) => {
                setFieldValue('region', value);
                setFieldValue('city', null);
                setSelectedRegion(value);
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  type='text'
                  size='small'
                  margin='normal'
                  value={values.region}
                  label={dictionary.region}
                  onChange={handleChange}
                  error={Boolean(errors.region)}
                  helperText={errors.region}
                  fullWidth
                />
              )}
            />

            <Autocomplete
              name='city'
              freeSolo
              disablePortal
              getOptionLabel={option => option.name}
              options={cities}
              size='small'
              margin='normal'
              onChange={(_, value) => {
                setFieldValue('city', value);
              }}
              disabled={!selectedRegion}
              renderInput={params => (
                <TextField
                  {...params}
                  type='text'
                  size='small'
                  margin='normal'
                  value={values.city}
                  label={dictionary.city}
                  onChange={handleChange}
                  error={Boolean(errors.city)}
                  helperText={errors.city}
                  fullWidth
                />
              )}
            />

            <Box>
              <FormControlLabel
                control={
                  <Switch
                    name='confidential'
                    onChange={handleChange}
                    checked={values.confidential === true}
                  />
                }
                label={dictionary.private}
              />
            </Box>

            <Button variant='outlined' type='submit' className={styles.button} fullWidth>
              {dictionary.save}
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};
