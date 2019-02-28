import data from './mock-task-data';
import {
  getRandomInteger,
  getRandomArrayElement,
  getRandomBoolean,
  getShuffledArray
} from './utils';

// Возвращает множество тего состоящее не более чем из трех элементов
const getHashtagsSet = (hashtagsArray) => {
  const amountOfHashtags = getRandomInteger(4);
  const shuffledHashtagsArray = getShuffledArray(hashtagsArray).slice(0, amountOfHashtags);

  return new Set(shuffledHashtagsArray);
};

// Возвращает случайную дату в диапазоне от текущей даты +- неделя
const getRandomDueDate = () => Date.now() + getRandomInteger(8, -7) * 24 * 60 * 60 * 1000;

// Возвращает url случайного изображения
const getRandomPicture = () => `http://picsum.photos/100/100?r=${getRandomInteger(100)}`;

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
  dueDate: getRandomDueDate(),
  hashtags: getHashtagsSet(data.hashtags),
  picture: getRandomPicture(),
  color: getRandomArrayElement(data.colors),
  repeatingDays: getRepeatingDays(data.days),
  isFavorite: getRandomBoolean(),
  isDone: getRandomBoolean()
});

export default generateTaskData;
