// Модуль вспомогательных функций

// Возвращает случайное целое число в диапазоне [min, max)
const getRandomInteger = (max, min = 0) => Math.floor(Math.random() * (max - min)) + min;

// Возвращает случайный индекс массива array
const getRandomArrayIndex = (array) => getRandomInteger(array.length);

// Возвращает случайный элемент массива array
const getRandomArrayElement = (array) => array[getRandomArrayIndex(array)];

// Возвращает случайное булево значение
const getRandomBoolean = () => getRandomInteger(2) === 0;

// Возвращает перемешанный массив array
const getShuffledArray = (array) => {
  const copyOfOriginalArray = [...array];
  const shuffledArray = [];

  array.forEach(() => {
    const randomIndex = getRandomArrayIndex(copyOfOriginalArray);
    const randomElement = copyOfOriginalArray[randomIndex];

    shuffledArray.push(randomElement);
    copyOfOriginalArray.splice(randomIndex, 1);
  });

  return shuffledArray;
};

const objectHasValue = (object, value) => {
  for (const key in object) {
    if (object[key] === value) {
      return true;
    }
  }

  return false;
};

export {
  getRandomInteger,
  getRandomArrayElement,
  getRandomBoolean,
  getShuffledArray,
  objectHasValue
};
