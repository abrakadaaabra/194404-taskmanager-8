import generateTasksData from './generate-tasks-data';
import getTaskTemplate from './get-task-template';

// Отрисовывает указанное количество карточек задач amount в dom-элемент container
const renderTasks = (amount, container) => {
  const tasksTemplate = document.createElement(`template`);

  generateTasksData(amount).forEach((taskData, id) => {
    tasksTemplate.innerHTML += getTaskTemplate(taskData, id);
  });

  container.appendChild(tasksTemplate.content.cloneNode(true));
};

export default renderTasks;
