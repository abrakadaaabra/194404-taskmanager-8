import {randomInteger} from './utils';
import renderTaskTemplate from './render-task-template';
import renderFilterTemplate from './render-filter-template';

// DOM-элемент, в который отрисовываем карточки задач
const tasksContainer = document.querySelector(`.board__tasks`);

// Отрисовывает указанное количество карточек задач amount в dom-элемент container
const renderTasks = (amount, container) => {
  const tasksTemplate = document.createElement(`template`);

  for (let i = 0; i < amount; i++) {
    tasksTemplate.innerHTML += renderTaskTemplate(`black`);
  }

  container.appendChild(tasksTemplate.content.cloneNode(true));
};

renderTasks(7, tasksContainer);

// DOM-элемент, в который отрисовываем фильтры
const filtersContainer = document.querySelector(`.filter`);

// Массив с названиями фильтов
const filtersCaptions = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `tags`,
  `archive`
];

// Отрисовывает фильтры с названиями из captions в dom-элемент container
const renderFilters = (captions, container) => {
  const filtersTemplate = document.createElement(`template`);

  captions.forEach((caption) => {
    filtersTemplate.innerHTML += renderFilterTemplate(caption, randomInteger(0, 100));
  });

  const filters = filtersTemplate.content.querySelectorAll(`.filter__input`);
  filters.forEach((filter) => {
    filter.addEventListener(`click`, function () {
      tasksContainer.innerHTML = ``;
      renderTasks(randomInteger(10), tasksContainer);
    });
  });

  container.appendChild(filtersTemplate.content.cloneNode(true));
};

renderFilters(filtersCaptions, filtersContainer);
