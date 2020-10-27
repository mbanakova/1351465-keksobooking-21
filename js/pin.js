'use strict';
(function () {
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const MAX_SIMILAR_PIN_COUNT = 8;

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
    MAX_SIMILAR_PIN_COUNT,
    renderPin
  };
})();
