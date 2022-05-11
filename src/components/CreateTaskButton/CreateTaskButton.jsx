import dictionary from '../../dictionary';
import { CreateEntityButton } from '../CreateEntityButton';
import { TaskForm } from '../TaskForm';

export const CreateTaskButton = () => (
  <CreateEntityButton
    title={dictionary.createTask}
    renderModalForm={onCloseHandler => <TaskForm onClose={onCloseHandler} />}
  />
);
