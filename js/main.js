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
const mainPin = document.querySelector(`.map__pin--main`);
const mapPins = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const offerForm = document.querySelector(`.ad-form`);
const mapFiltersForm = document.querySelector(`.map__filters`);
const PIN_SIZE = 62;
const pinYMin = 130;
const pinYMax = 630;
const pinXMin = 0;
const pinXMax = mapPins.clientWidth;
const hotelPhotoWidth = 45;
const hotelPhotoHeight = 40;


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
        "features": generateRandomArray(FEATURES),
        "description": getRandomElement(DESCRIPTION),
        "photos": generateRandomArray(PHOTOS)
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

const generateHotelPictures = function (pics) {
  const hotelPhotos = document.createDocumentFragment();

  for (let i = 0; i < pics.length; i++) {
    const pic = document.createElement(`img`);
    pic.classList.add(`popup__photo`);
    pic.src = pics[i];
    pic.width = hotelPhotoWidth;
    pic.height = hotelPhotoHeight;
    hotelPhotos.appendChild(pic);
  }
  return hotelPhotos;
};

const eraseBlock = function (div) {
  div.style.display = `none`;
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

  if (card.offer.title) {
    cardTitle.textContent = card.offer.title;
  } else {
    eraseBlock(cardTitle);
  }

  if (card.offer.address) {
    cardAddress.textContent = card.offer.address;
  } else {
    eraseBlock(cardAddress);
  }

  if (card.offer.price) {
    cardPrice.textContent = `${card.offer.price} ₽ / ночь`;
  } else {
    eraseBlock(cardPrice);
  }

  if (card.offer.type) {
    cardType.textContent = TYPE_RU[card.offer.type];
  } else {
    eraseBlock(cardType);
  }

  if (card.offer.guests) {
    cardRoomsGuests.textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  } else {
    eraseBlock(cardRoomsGuests);
  }

  if (card.offer.checkout && card.offer.checkin) {
    cardCheck.textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
  } else {
    eraseBlock(cardCheck);
  }

  if (card.offer.features) {
    let stock = ``;
    for (let i = 0; i < card.offer.features.length; i++) {
      if (i < card.offer.features.length - 1) {
        stock += `${card.offer.features[i]}, `;
      } else {
        stock += `${card.offer.features[i]}`;
      }
    }
    features.innerHTML = stock;
  } else {
    eraseBlock(features);
  }

  if (card.offer.description) {
    cardDescription.textContent = card.offer.description;
  } else {
    eraseBlock(cardDescription);
  }

  if (card.offer.photos) {
    cardPhotos.innerHTML = ``;
    cardPhotos.appendChild(generateHotelPictures(card.offer.photos));
  } else {
    eraseBlock(cardPhotos);
  }
  if (card.author.avatar) {
    cardLink.src = getAvatar(getRandomInRange(1, MOCK_AMOUNT));
  } else {
    eraseBlock(cardLink);
  }

  const fragmentCard = document.createDocumentFragment();
  fragmentCard.appendChild(offerCard);
  map.appendChild(fragmentCard);
};

const pinsFragment = createFragment(pinsArray, renderOffer);
mapPins.append(pinsFragment);

popAdvertisement(pinsArray, renderCard);

map.classList.remove(`map--faded`);


mainPin.addEventListener(`mousedown`, logMouseButton);

const disablePage = function () {
  map.classList.add(`map--faded`);
  offerForm.classList.add(`ad-form--disabled`);
  mapFiltersForm.classList.add(`ad-form--disabled`);

  const disableFieldsets = function (form) {
    let fieldsets = form.children;
    for (let i = 0; i < fieldsets.length; i++) {
      fieldsets[i].setAttribute(`disabled`, `disabled`);
    }
  };
  disableFieldsets(offerForm);
  disableFieldsets(mapFiltersForm);
// + Надо как-то передвигать мейн пин //
};
disablePage();

function logMouseButton(e) {
  if (typeof e === `object`) {
    switch (e.button) {
      case 0: activatePage();
    }
  }
}

const activatePage = function () {
  map.classList.remove(`map--faded`);
  offerForm.classList.remove(`ad-form--disabled`);
  mapFiltersForm.classList.remove(`ad-form--disabled`);

  const anableFieldsets = function (form) {
    let fieldsets = form.children;
    for (let i = 0; i < fieldsets.length; i++) {
      fieldsets[i].removeAttribute(`disabled`, `disabled`);
    }
  };
  anableFieldsets(offerForm);
  anableFieldsets(mapFiltersForm);
};
