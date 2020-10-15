'use strict';
(function () {

  const CARDS = [];
  const MOCK_AMOUNT = 8;
  const TYPE = [`palace`, `flat`, `house`, `bungalow`];
  const TYPE_RU = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`
  };
  const TIME = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PHOTOS = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
  ];
  const PRICE_MIN = 2000;
  const PRICE_MAX = 30000;
  const ROOMS = 4;
  const GUESTS = 6;
  const TITLE = [
    `Уютное гнездышко для молодоженов`,
    `Цыганское гетто`,
    `Коробка под мостом`
  ];
  const DESCRIPTION = [
    `Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.`,
    `Отличный выбор для любителей самостоятельных поездок. Для тех, кто не признаёт путеводители и предпочитает окунуться в настоящую местную атмосферу!`,
    `Самый бюджетный вариант! Жильё в центре города. Незабываемые впечатления о поездке гарантированы!`
  ];

  const PIN_SIZE = 65;
  const PIN_TAG = 20;
  const pinYMin = 130;
  const pinYMax = 630;
  const pinXMin = 0;
  const map = document.querySelector(`.map`);
  const mapPins = document.querySelector(`.map__pins`);
  const pinXMax = mapPins.clientWidth;

  const generateCardsArray = function (index) {
    for (let i = 0; i < MOCK_AMOUNT; i++) {
      CARDS[i] = {
        "author": {
          "avatar": window.utils.getAvatar(index)
        },
        "offer": {
          "title": window.utils.getRandomElement(TITLE),
          "address": `${window.utils.getRandomInRange(pinXMin, pinXMax)}, ${window.utils.getRandomInRange(pinYMin, pinYMax - PIN_SIZE)}`,
          "price": window.utils.getRandomInRange(PRICE_MIN, PRICE_MAX),
          "type": `${window.utils.getRandomElement(TYPE)}`,
          "rooms": window.utils.getRandomInRange(1, ROOMS),
          "guests": window.utils.getRandomInRange(1, GUESTS),
          "checkin": `${window.utils.getRandomElement(TIME)}`,
          "checkout": `${window.utils.getRandomElement(TIME)}`,
          "features": window.utils.generateRandomArray(FEATURES),
          "description": window.utils.getRandomElement(DESCRIPTION),
          "photos": window.utils.generateRandomArray(PHOTOS)
        },
        "location": {
          "x": window.utils.getRandomInRange(pinXMin, (pinXMax - PIN_SIZE)),
          "y": window.utils.getRandomInRange(pinYMin, pinYMax)
        }
      };
    }
    return CARDS;
  };

  window.data = {
    generateCardsArray,
    MOCK_AMOUNT,
    PIN_SIZE,
    PIN_TAG,
    TYPE,
    TYPE_RU,
    map,
    mapPins
  };
})();
