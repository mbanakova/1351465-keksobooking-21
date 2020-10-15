'use strict';
(function () {

  const getRandomInRange = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  const getRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  const shuffleArray = function (array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let copy = array[i];
      array[i] = array[j];
      array[j] = copy;
    }
    return array;
  };

  const generateRandomArray = function (array) {
    const copy = [...array];
    return shuffleArray(copy).splice(0, getRandomInRange(1, copy.length));
  };

  const getAvatar = function (num) {
    return `img/avatars/user0${num}.png`;
  };

  window.utils = {
    getRandomInRange,
    getRandomElement,
    generateRandomArray,
    getAvatar
  };
})();
