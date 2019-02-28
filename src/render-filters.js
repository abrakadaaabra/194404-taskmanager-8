import getFilterTemplate from './get-filter-template';
import renderTasks from './render-tasks';
import {
  getRandomInteger
} from './utils';

// Отрисовывает фильтры с названиями из captions в dom-элемент container
const renderFilters = (captions, container) => {
  const filtersTemplate = document.createElement(`template`);

  captions.forEach((caption) => {
    filtersTemplate.innerHTML += getFilterTemplate(caption, getRandomInteger(0, 100));
  });

  container.appendChild(filtersTemplate.content.cloneNode(true));
  const filters = container.querySelectorAll(`.filter__input`);
  const tasksContainer = document.querySelector(`.board__tasks`);

  filters.forEach((filter) => {
    filter.addEventListener(`click`, function () {
      tasksContainer.innerHTML = ``;
      renderTasks(getRandomInteger(10), tasksContainer);
    });
  });
};

export default renderFilters;
