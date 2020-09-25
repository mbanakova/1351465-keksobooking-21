'use strict';

const OFFERS = [];
const MOCK_AMOUNT = 8;
const TYPE = [`palace`, `flat`, `house`, `bungalow`];
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
const TITLE = `Заголовок объявления`;
const DESCRIPTION = `Описание предложения`;
const map = document.querySelector(`.map`);
const mapPins = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const PIN_SIZE = 62;
const pinYMin = 130;
const pinYMax = 630;
const pinXMin = 0;
const pinXMax = mapPins.clientWidth;


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

const renderOffersArray = function (index) {
  for (let i = 0; i < MOCK_AMOUNT; i++) {
    OFFERS[i] = {
      "author": {
        "avatar": getAvatar(index)
      },
      "offer": {
        "title": TITLE,
        "address": `${getRandomInRange(pinXMin, pinXMax)}, ${getRandomInRange(pinYMin, pinYMax - PIN_SIZE)}`,
        "price": getRandomInRange(PRICE_MIN, PRICE_MAX),
        "type": `${getRandomElement(TYPE)}`,
        "rooms": getRandomInRange(1, ROOMS),
        "guests": getRandomInRange(1, GUESTS),
        "checkin": `${getRandomElement(TIME)}`,
        "checkout": `${getRandomElement(TIME)}`,
        "features": `${generateRandomArray(FEATURES)}`,
        "description": DESCRIPTION,
        "photos": `${generateRandomArray(PHOTOS)}`
      },
      "location": {
        "x": getRandomInRange(pinXMin, (pinXMax - PIN_SIZE)),
        "y": getRandomInRange(pinYMin, pinYMax)
      }
    };
  }
  return OFFERS;
};

const getPinsArray = function (quantity) {
  let pinsArray = [];
  for (let i = 0; i < quantity; i++) {
    //  i+1 для отсчёта картинок с 1
    const offer = renderOffersArray(i + 1)[i];
    pinsArray.push(offer);
  }
  return pinsArray;
};

const pinsArray = getPinsArray(MOCK_AMOUNT);

const renderOffer = function (offer) {
  const offerPin = pinTemplate.cloneNode(true);
  const pinImg = offerPin.querySelector(`img`);

  offerPin.style.left = `${offer.location.x}px`;
  offerPin.style.top = `${offer.location.y}px`;
  pinImg.src = offer.author.avatar;
  pinImg.alt = offer.offer.title;

  return offerPin;
};

const createFragment = function (array, callback) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < array.length; i++) {
    fragment.append(callback(array[i]));
  }
  return fragment;
};

const pinsFragment = createFragment(pinsArray, renderOffer);
mapPins.append(pinsFragment);


map.classList.remove(`map--faded`);
