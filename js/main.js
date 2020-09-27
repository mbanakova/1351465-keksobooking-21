'use strict';

const OFFERS = [];
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
const map = document.querySelector(`.map`);
const mapPins = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
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
        "title": getRandomElement(TITLE),
        "address": `${getRandomInRange(pinXMin, pinXMax)}, ${getRandomInRange(pinYMin, pinYMax - PIN_SIZE)}`,
        "price": getRandomInRange(PRICE_MIN, PRICE_MAX),
        "type": `${getRandomElement(TYPE)}`,
        "rooms": getRandomInRange(1, ROOMS),
        "guests": getRandomInRange(1, GUESTS),
        "checkin": `${getRandomElement(TIME)}`,
        "checkout": `${getRandomElement(TIME)}`,
        "features": `${generateRandomArray(FEATURES)}`,
        "description": getRandomElement(DESCRIPTION),
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

const popAdvertisement = function (array, callback) {
  const fragment = document.createDocumentFragment();
  fragment.append(callback(array[0]));

  return fragment;
};

const generateHotelPics = function () {
  const hotelPhotos = document.createDocumentFragment();

  for (let i = 0; i < PHOTOS.length; i++) {
    const pic = document.createElement(`img`);
    pic.classList.add(`popup__photo`);
    pic.src = PHOTOS[i];
    pic.width = 45;
    pic.height = 40;
    hotelPhotos.appendChild(pic);
  }
  return hotelPhotos;
};

const renderCard = function (card) {
  const offerCard = cardTemplate.cloneNode(true);
  const cardTitle = offerCard.querySelector(`.popup__title`);
  const cardAddress = offerCard.querySelector(`.popup__text--address`);
  const cardPrice = offerCard.querySelector(`.popup__text--price`);
  const cardType = offerCard.querySelector(`.popup__type`);
  const cardRoomsGuests = offerCard.querySelector(`.popup__text--capacity`);
  const cardCheck = offerCard.querySelector(`.popup__text--time`);
  const features = offerCard.querySelector(`.popup__features`);
  const cardDescription = offerCard.querySelector(`.popup__description`);
  const cardPhotos = offerCard.querySelector(`.popup__photos`);
  const cardLink = offerCard.querySelector(`.popup__avatar`);

  // в map перед mapPins вставляет offerCard
  map.insertBefore(offerCard, mapPins);

  cardTitle.textContent = card.offer.title;
  cardAddress.textContent = card.offer.address;
  cardPrice.textContent = `${card.offer.price} ₽ / ночь`;
  cardType.textContent = TYPE_RU[card.offer.type];
  cardRoomsGuests.textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  cardCheck.textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
  // с фичерс что-то не то
  features.src = card.offer.features;
  cardDescription.textContent = card.offer.description;
  cardPhotos.innerHTML = ``;
  cardPhotos.appendChild(generateHotelPics(card.offer.photos));
  cardLink.src = getAvatar(getRandomInRange(1, 9));

  const fragmentCard = document.createDocumentFragment();
  fragmentCard.appendChild(offerCard);
  map.appendChild(fragmentCard);
};

const pinsFragment = createFragment(pinsArray, renderOffer);
mapPins.append(pinsFragment);

const cardsFragment = popAdvertisement(pinsArray, renderCard);
mapPins.append(cardsFragment);

map.classList.remove(`map--faded`);
