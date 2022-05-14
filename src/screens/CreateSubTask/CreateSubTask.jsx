import { Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { createSubtask } from '../../api/subtasks';
import { getTaskById } from '../../api/tasks';
import dictionary from '../../dictionary';
import { SubTaskForm } from './components/SubTaskForm';
import { TaskInfo } from './components/TaskInfo/TaskInfo';

export const CreateSubTask = () => {
  const params = useParams();
  const { taskId } = params;
  const [task, setTask] = useState();
  const history = useHistory();

  useEffect(() => {
    if (taskId) {
      getTaskById(taskId).then(data => {
        setTask(data);
      });
    }
  }, [taskId]);

  const handleFormSave = values =>
    createSubtask({ ...values, taskId }).then(() => history.goBack());

  return (
    <Container maxWidth='md'>
      <Typography variant='h4' component='h1' textAlign='left' my={2}>
        {dictionary.taskInfo}
      </Typography>

      <TaskInfo task={task} />

      <Typography variant='h4' component='h1' textAlign='left' my={2}>
        {dictionary.subtaskFormHeader}
      </Typography>

      <SubTaskForm onSave={handleFormSave} />
    </Container>
  );
};
