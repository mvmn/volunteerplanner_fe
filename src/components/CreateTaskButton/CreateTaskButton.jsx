import dictionary from '../../dictionary';
import { CreateEntityButton } from '../CreateEntityButton';
import { TaskForm } from '../TaskForm';

export const CreateTaskButton = ({ handleTaskCreation }) => (
  <CreateEntityButton
    title={dictionary.createTask}
    renderModalForm={onCloseHandler => <TaskForm onClose={onCloseHandler} />}
    onEntitySaved={handleTaskCreation}
  />
);
