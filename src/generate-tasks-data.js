import generateTaskData from './generate-task-data';

// Возвращает массив длиной amount, содержащий данные о задачах
const generateTasksData = (amount) => {
  const tasksData = [];

  for (let i = 0; i < amount; i++) {
    tasksData.push(generateTaskData());
  }

  return tasksData;
};

export default generateTasksData;
