import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Modal } from '@mui/material';
import { useCallback } from 'react';

import { useModalVisibleHook } from '../../hooks/useModalVisibleHooks';
import image from '../../styles/iStock-529679954.jpg';
import style from './CreateEntityButton.module.scss';

export const CreateEntityButton = ({
  title,
  renderModalForm,
  onEntitySaved,
  disabled,
  ...rest
}) => {
  const { isModalVisible, onCloseHandler, onOpenHandler } = useModalVisibleHook();

  const handleModalClose = useCallback(
    params => {
      onCloseHandler();

      if (params?.form && onEntitySaved) {
        onEntitySaved(params.form);
      }
    },
    [onCloseHandler, onEntitySaved]
  );

  return (
    <div>
      <Button
        variant='outlined'
        size='large'
        startIcon={<AddIcon />}
        onClick={onOpenHandler}
        disabled={disabled}
        {...rest}
      >
        {title}
      </Button>
      <Modal open={isModalVisible} onClose={onCloseHandler}>
        <Box className={style.modal_box}>
          <div className={style.modal_header}>
            <div className={style.modal_header_column}>
              <img src={image} alt='ua-img' width={30} />
              <h3 className={style.title}>{title}</h3>
            </div>

            <Button size='small' onClick={onCloseHandler}>
              <CloseIcon />
            </Button>
          </div>
          {renderModalForm && renderModalForm(handleModalClose)}
        </Box>
      </Modal>
    </div>
  );
};
