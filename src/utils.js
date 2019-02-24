// Модуль вспомогательных функций

// Возвращает случайное целое число в диапазоне [min, max)
const randomInteger = (max, min = 0) => Math.floor(Math.random() * (max - min)) + min;

export {
  randomInteger
};
