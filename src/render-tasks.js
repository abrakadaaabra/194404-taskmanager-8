import Task from "./classes/task";
import TaskEdit from './classes/task-edit';

const renderTask = (data, id, container) => {
  const task = new Task(data, id);
  const taskElement = task.render();

  const taskEdit = new TaskEdit(data, id);

  container.appendChild(taskElement);

  task.onEdit = () => {
    taskEdit.render();
    container.replaceChild(taskEdit.element, task.element);
    task.unrender();
  };

  taskEdit.onSubmit = () => {
    task.render();
    container.replaceChild(task.element, taskEdit.element);
    taskEdit.unrender();
  };
};

const renderTasks = (tasksData, container) => {
  tasksData.map((data, id) => renderTask(data, id, container));
};

export default renderTasks;
