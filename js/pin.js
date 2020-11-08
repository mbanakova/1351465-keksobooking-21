'use strict';
(function () {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const MAX_SIMILAR_PIN_COUNT = 5;
  const DEBOUNCE = 500; // 0.5sec

  const renderPin = function (offer) {
    if (!offer) {
      return null;
    }
    const pin = pinTemplate.cloneNode(true);
    const pinImg = pin.querySelector(`img`);

    pin.style.left = `${offer.location.x}px`;
    pin.style.top = `${offer.location.y}px`;
    pinImg.src = offer.author.avatar;
    pinImg.alt = offer.offer.title;

    pin.addEventListener(`click`, function () {
      window.card.eraseCard();
      popCard(offer, window.card.renderCard);
    });

    return pin;
  };

  const popCard = function (offer, newElement) {
    const fragment = document.createDocumentFragment();
    fragment.append(newElement(offer));
    return fragment;
  };

  const getPins = function (pins, number) {
    const createFragment = function (array, element) {

      const fragment = document.createDocumentFragment();
      for (let i = 0; i < number; i++) {
        fragment.append(element(array[i]));
      }
      return fragment;
    };
    const pinsFragment = createFragment(pins, renderPin);
    window.data.mapPins.append(pinsFragment);
  };

  let pinsCopy = [];
  const mapFilters = document.querySelector(`.map__filters`);
  const housingTypeOption = mapFilters.querySelector(`#housing-type`);
  const housingPriceOption = mapFilters.querySelector(`#housing-price`);
  const housingRoomsOption = mapFilters.querySelector(`#housing-rooms`);
  const housingGuestsOption = mapFilters.querySelector(`#housing-guests`);
  const housingFeaturesOption = mapFilters.querySelector(`#housing-features`);
  const ROOM_PRICE = {
    low: {
      min: 0,
      max: 9999
    },
    middle: {
      min: 10000,
      max: 49999
    },
    high: {
      min: 50000,
      max: Infinity
    }
  };

  const updatePins = function () {
    window.main.deletePins();

    const checkHousingType = function (pin) {
      if (housingTypeOption.value === `any`) {
        return true;
      }
      return pin.offer.type === housingTypeOption.value;
    };

    const checkHousingPrice = function (pin) {
      if (housingPriceOption.value === `any`) {
        return true;
      }
      return pin.offer.price >= ROOM_PRICE[housingPriceOption.value].min && pin.offer.price <= ROOM_PRICE[housingPriceOption.value].max;
    };

    const checkHousingRooms = function (pin) {
      if (housingRoomsOption.value === `any`) {
        return true;
      }
      return pin.offer.rooms.toString() === housingRoomsOption.value;
    };

    const checkHousingGuests = function (pin) {
      if (housingGuestsOption.value === `any`) {
        return true;
      }
      return pin.offer.guests.toString() === housingGuestsOption.value;
    };

    const checkHousingFeatures = function (pin) {
      let housingCheckbox = document.querySelectorAll(`.map__checkbox:checked`);

      return Array.from(housingCheckbox).every(function (feature) {
        return pin.offer.features.indexOf(feature.value) >= 0;
      });
    };

    const pinsFilter = pinsCopy.filter(function (pin) {
      return checkHousingType(pin) & checkHousingPrice(pin) & checkHousingRooms(pin) & checkHousingGuests(pin) & checkHousingFeatures(pin);
    });

    const getPinsNumber = function (pin) {
      const filteredPins = pin.slice(0, MAX_SIMILAR_PIN_COUNT);
      return filteredPins;
    };

    getPinsNumber(pinsFilter);

    getPins(pinsFilter, getPinsNumber(pinsFilter).length);
    window.card.eraseCard();
  };

  const changeFilterOption = function (filter) {
    filter.addEventListener(`change`, function () {
      window.setTimeout(function () {
        updatePins();
      }, DEBOUNCE);
    });
  };

  changeFilterOption(housingTypeOption);
  changeFilterOption(housingPriceOption);
  changeFilterOption(housingRoomsOption);
  changeFilterOption(housingGuestsOption);
  changeFilterOption(housingFeaturesOption);

  const successPinsLoad = function (data) {
    pinsCopy = data;
    updatePins();
  };

  window.pin = {
    popCard,
    MAX_SIMILAR_PIN_COUNT,
    renderPin,
    successPinsLoad,
    housingTypeOption
  };
})();
