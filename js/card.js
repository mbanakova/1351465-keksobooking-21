'use strict';
(function () {

  const hotelPhotoWidth = 45;
  const hotelPhotoHeight = 40;
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

  const popError = function (error) {
    popError.querySelector(`.error__message`).textContent = error;
    document.body.insertAdjacentElement(`afterbegin`, popError);
  };

  const eraseCard = function () {
    const currentCard = document.querySelector(`.map__card`);
    if (currentCard) {
      currentCard.remove();
    }
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
    const close = offerCard.querySelector(`.popup__close`);
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
    window.data.map.insertBefore(offerCard, window.pin.mapPins);

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
      cardType.textContent = window.data.TYPE_RU[card.offer.type];
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
      cardLink.src = card.author.avatar;
    } else {
      eraseBlock(cardLink);
    }

    const fragmentCard = document.createDocumentFragment();
    fragmentCard.appendChild(offerCard);
    window.data.map.appendChild(fragmentCard);

    close.addEventListener(`click`, eraseCard);
    close.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        eraseCard();
      }
    });
  };

  window.card = {
    renderCard,
    eraseCard,
    popError
  };
})();
