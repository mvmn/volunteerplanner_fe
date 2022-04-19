import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Modal } from '@mui/material';

import dictionary from '../../dictionary';
import { useModalVisibleHook } from '../../hooks/useModalVisibleHooks';
import image from '../../styles/iStock-529679954.jpg';
import { TaskForm } from '../TaskForm';
import style from './CreateTaskButton.module.scss';

export const CreateTaskButton = () => {
  const { isModalVisible, onCloseHandler, onOpenHandler } = useModalVisibleHook();

  return (
    <div>
      <Button variant='outlined' size='large' startIcon={<AddIcon />} onClick={onOpenHandler}>
        {dictionary.createTask}
      </Button>
      <Modal open={isModalVisible} onClose={onCloseHandler}>
        <Box className={style.modal_box}>
          <div className={style.modal_header}>
            <div className={style.modal_header_column}>
              <img src={image} alt='ua-img' width={30} />
              <h3 className={style.title}>{dictionary.createTask}</h3>
            </div>
            <Button size='small' onClick={onCloseHandler}>
              <CloseIcon />
            </Button>
          </div>
          <TaskForm onClose={onCloseHandler} />
        </Box>
      </Modal>
    </div>
  );
};
