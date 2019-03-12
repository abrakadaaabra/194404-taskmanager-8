import getFilterTemplate from './get-filter-template';
import {
  getRandomIntegerInRange
} from './utils';
import generateTasksData from './generate-tasks-data';
import renderTasks from './render-tasks';

const AMOUNT_OF_TASKS = 10;

// Отрисовывает фильтры с названиями из captions в dom-элемент container
const renderFilters = (captions, container) => {
  const filtersTemplate = document.createElement(`template`);

  captions.forEach((caption) => {
    filtersTemplate.innerHTML += getFilterTemplate(caption, getRandomIntegerInRange(100));
  });

  container.appendChild(filtersTemplate.content.cloneNode(true));
  const filters = container.querySelectorAll(`.filter__input`);
  const tasksContainer = document.querySelector(`.board__tasks`);

  filters.forEach((filter) => {
    filter.addEventListener(`click`, function () {
      tasksContainer.innerHTML = ``;
      renderTasks(generateTasksData(AMOUNT_OF_TASKS), tasksContainer);
    });
  });
};

export default renderFilters;
