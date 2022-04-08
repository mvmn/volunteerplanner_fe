import { Box, FormControl, MenuItem, Select } from '@mui/material';
import clsx from 'clsx';
import { useState } from 'react';

import { SUBTASK_NAME, SUBTASK_STATUSES } from '../../constants/uiConfig';
import dictionary from '../../dictionary';
import styles from './ChangeStatus.module.scss';

// TODO: check if it could be merged with the Status component
const Status = ({ status }) => {
  return <div className={clsx(styles.status, styles[status])}>{dictionary[status]}</div>;
};

export const ChangeStatus = ({ status }) => {
  const [selectedValue, setSelectedValue] = useState(SUBTASK_NAME[status]);

  const handleChange = e => {
    // TODO: save status into DB
    setSelectedValue(e.target.value);
  };

  return (
    <Box>
      <FormControl>
        <Select value={selectedValue} onChange={e => handleChange(e)}>
          {Object.keys(SUBTASK_STATUSES).map((item, i) => (
            <MenuItem key={i + item} value={item}>
              <Status status={item} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
