import renderTasks from './render-tasks';
import renderFilters from './render-filters';
import mockFiltersData from './mock-filters-data';

// DOM-элемент, в который отрисовываем карточки задач
const tasksContainer = document.querySelector(`.board__tasks`);
renderTasks(7, tasksContainer);

// DOM-элемент, в который отрисовываем фильтры
const filtersContainer = document.querySelector(`.filter`);
renderFilters(mockFiltersData.captions, filtersContainer);
