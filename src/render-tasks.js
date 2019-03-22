import Task from "./classes/task";
import TaskEdit from './classes/task-edit';

const renderTask = (data, id, container) => {
  const task = new Task(data, id);
  const taskElement = task.render();

  task.onEdit = () => {

    if (!task.editForm) {
      task.editForm = new TaskEdit(data, id);

      task.editForm.onSubmit = (newData) => {
        Object.assign(data, newData);

        task.update(data);
        task.render();
        container.replaceChild(task.element, task.editForm.element);
        task.editForm.unrender();
      };
    }

    task.editForm.render();
    container.replaceChild(task.editForm.element, task.element);
    task.unrender();
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
