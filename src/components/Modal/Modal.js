import CloseIcon from '@mui/icons-material/Close';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import dictionary from '../../dictionary';
import { UserInformation } from '../UserInformation';

export const Modal = props => {
  const { handleClose, isModalOpened, user, children } = props;

  if (!user) return null;

  const title = `${dictionary.user}: ${user.displayName}`;
  return (
    <Dialog onClose={handleClose} open={isModalOpened}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {title}
        {handleClose ? (
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent dividers>
        <UserInformation user={user} />
      </DialogContent>
      {children}
    </Dialog>
  );
};
