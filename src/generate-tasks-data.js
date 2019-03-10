import data from './mock-task-data';
import {
  getRandomIntegerInRange,
  getRandomArrayElement,
  getRandomBoolean,
  getRandomDateInRange,
  getShuffledArray
} from './utils';

const AMOUNT_OF_HASHTAGS = 3;

// Возвращает множество тегов состоящее не более чем из amount элементов
const getHashtagsSet = (hashtagsArray, amount) => {
  const shuffledHashtagsArray = getShuffledArray(hashtagsArray).slice(0, amount);

  return new Set(shuffledHashtagsArray);
};

// Возвращает url случайного изображения
const getRandomPicture = () => `http://picsum.photos/100/100?r=${getRandomIntegerInRange(100)}`;

// Возвращает объект с данными о повторении задачи
const getRepeatingDays = (daysArray) => {
  const repeatingDays = {};

  new Set(daysArray).forEach((day) => {
    repeatingDays[day] = getRandomBoolean();
  });

  return repeatingDays;
};

// Возвращает объект с данными о задаче
const generateTaskData = () => ({
  description: getRandomArrayElement(data.descriptions),
  dueDate: getRandomBoolean() ? getRandomDateInRange(8, -7) : null,
  isRepeated: getRandomBoolean(),
  repeatingDays: getRepeatingDays(data.days),
  hashtags: getHashtagsSet(data.hashtags, getRandomIntegerInRange(AMOUNT_OF_HASHTAGS + 1)),
  color: getRandomArrayElement(data.colors),
  picture: getRandomPicture(),
  isFavorite: getRandomBoolean(),
  isDone: getRandomBoolean()
});

// Возвращает массив длиной amount, содержащий данные о задачах
const generateTasksData = (amount) => {
  const tasksData = [];

  for (let i = 0; i < amount; i++) {
    tasksData.push(generateTaskData());
  }

  return tasksData;
};

export default generateTasksData;
