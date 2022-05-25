import { Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { getSubtaskById, subtaskReject, updateSubtask } from '../../api/subtasks';
import { getTaskById } from '../../api/tasks';
import dictionary from '../../dictionary';
import { SubTaskForm } from '../CreateSubTask/components/SubTaskForm';
import { TaskInfo } from '../CreateSubTask/components/TaskInfo/TaskInfo';

const EDITABLE_STATUSES = ['IN_PROGRESS'];

export const EditSubTask = () => {
  const params = useParams();
  const history = useHistory();
  const [task, setTask] = useState();
  const [subtask, setSubtask] = useState();
  const [maxQuantity, setMaxQuantity] = useState();
  const { taskId: subTaskId } = params;

  useEffect(() => {
    if (subTaskId) {
      getSubtaskById(subTaskId).then(data => {
        setSubtask(data);
        getTaskById(data.taskId).then(task => setTask(task));
      });
    }
  }, [subTaskId]);

  const handleFormSave = values =>
    updateSubtask(subTaskId, values).then(() => {
      history.push('/my-tasks');
    });

  const handleFormReject = () =>
    subtaskReject(subTaskId).then(() => {
      history.push('/my-tasks');
    });

  const isTaskEditable = EDITABLE_STATUSES.includes(subtask?.status);

  useEffect(() => {
    if (task && subtask) {
      setMaxQuantity(task.quantityLeft + subtask.quantity);
    }
  }, [task, subtask]);

  return (
    <Container maxWidth='md'>
      <Typography variant='h4' component='h1' textAlign='left' my={2}>
        {dictionary.taskInfo}
      </Typography>

      <TaskInfo task={task} />

      <Typography variant='h4' component='h1' textAlign='left' my={2}>
        {dictionary.subtaskFormHeader}
      </Typography>

      <SubTaskForm
        onSave={handleFormSave}
        onReject={handleFormReject}
        task={subtask}
        isLocked={!isTaskEditable}
        maxQuantity={maxQuantity}
      />
    </Container>
  );
};
