import generateTasksData from './generate-tasks-data';
import renderTasks from './render-tasks';
import renderFilters from './render-filters';
import mockFiltersData from './mock-filters-data';

const AMOUNT_OF_TASKS = 7;

// DOM-элемент, в который отрисовываем карточки задач
const tasksContainer = document.querySelector(`.board__tasks`);
const tasksData = generateTasksData(AMOUNT_OF_TASKS);
renderTasks(tasksData, tasksContainer);


// DOM-элемент, в который отрисовываем фильтры
const filtersContainer = document.querySelector(`.filter`);
renderFilters(mockFiltersData.captions, filtersContainer);
