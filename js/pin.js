'use strict';
(function () {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const MAX_SIMILAR_PIN_COUNT = 5;

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

  let pinz = [];
  let pinHousingType;
  const mapFilters = document.querySelector(`.map__filters`);
  const housingTypeOption = mapFilters.querySelector(`#housing-type`);

  const updatePins = function () {
    if (housingTypeOption.value === `any`) {
      getPins(pinz, MAX_SIMILAR_PIN_COUNT);
    }

    const sameTypePins = pinz.filter(function (pin) {
      return pin.offer.type === pinHousingType;
    });
    getPins(sameTypePins, sameTypePins.length);
    window.card.eraseCard();
  };

  housingTypeOption.addEventListener(`change`, function () {
    window.main.deletePins();
    const pickedHousingType = housingTypeOption.value;
    pinHousingType = pickedHousingType;
    updatePins();
  });

  const successPinsLoad = function (data) {
    pinz = data;
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
