'use strict';
(function () {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const MAX_SIMILAR_PIN_COUNT = 8;

  const generatePinsArray = function (quantity) {
    let pinsArray = [];
    for (let i = 0; i < quantity; i++) {
      //  i+1 для отсчёта картинок с 1
      const card = window.data.generateCardsArray(i + 1)[i];
      pinsArray.push(card);
    }
    return pinsArray;
  };

  const pinsArray = generatePinsArray(window.data.MOCK_AMOUNT);

  const renderPin = function (offer) {
    const offerPin = pinTemplate.cloneNode(true);
    const pinImg = offerPin.querySelector(`img`);

    offerPin.style.left = `${offer.location.x}px`;
    offerPin.style.top = `${offer.location.y}px`;
    pinImg.src = offer.author.avatar;
    pinImg.alt = offer.offer.title;

    offerPin.addEventListener(`click`, function () {
      window.card.eraseCard();
      popAdvertisement(offer, window.card.renderCard);
    });

    return offerPin;
  };

  const popAdvertisement = function (offer, callback) {
    const fragment = document.createDocumentFragment();
    fragment.append(callback(offer));
    return fragment;
  };

  window.pin = {
    popAdvertisement,
    pinsArray,
    MAX_SIMILAR_PIN_COUNT,
    renderPin
  };
})();
