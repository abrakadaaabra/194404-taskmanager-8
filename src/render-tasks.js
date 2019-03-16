import Task from "./classes/task";
import TaskEdit from './classes/task-edit';

const renderTask = (data, id, container) => {
  const task = new Task(data, id);
  const taskElement = task.render();

  const taskEdit = new TaskEdit(data, id);

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

  return taskElement;
};

const renderTasks = (tasksData, container) => {
  const fragment = document.createDocumentFragment();

  tasksData.map((data, id) => {
    const element = renderTask(data, id, container);
    fragment.appendChild(element);
  });

  container.appendChild(fragment);
};

export default renderTasks;
