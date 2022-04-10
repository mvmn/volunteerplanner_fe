import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Modal as MuiModal } from '@mui/material';

import image from '../../styles/iStock-529679954.jpg';
import styles from './Modal.module.scss';

export const Modal = ({ open, onClose, children, title }) => {
  return (
    <MuiModal open={open} onClose={onClose}>
      <Box className={styles.modal_box}>
        <div className={styles.modal_header}>
          <div className={styles.modal_header_column}>
            <img src={image} alt='ua-img' width={30} />
            <h3 className={styles.title}>{title}</h3>
          </div>
          <Button size='small' onClick={onClose}>
            <CloseIcon />
          </Button>
        </div>
        {children}
      </Box>
    </MuiModal>
  );
};
