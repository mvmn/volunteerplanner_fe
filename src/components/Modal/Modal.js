import { Box, Modal as MuiModal } from '@mui/material';

import { ROW_TO_DISPLAY } from '../../constants/uiConfigConstans';
import dictionary from '../../dictionary';
import { Title } from '../Title';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

export const Modal = props => {
  const { handleClose, isModalOpened, user } = props;

  if (!user) return null;

  const title = `${dictionary.user} ${user.fullname}`;
  return (
    <MuiModal
      keepMounted
      open={isModalOpened}
      onClose={handleClose}
      aria-labelledby='keep-mounted-modal-title'
      aria-describedby='keep-mounted-modal-description'
    >
      <Box sx={style}>
        <Title text={title} />
        {ROW_TO_DISPLAY.map((name, i) => (
          <div key={user[name] + i}>{user[name]}</div>
        ))}
      </Box>
    </MuiModal>
  );
};
