'use strict';
(function () {

  const map = document.querySelector(`.map`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const offerForm = document.querySelector(`.ad-form`);
  const mapFiltersForm = document.querySelector(`.map__filters`);

  map.classList.remove(`map--faded`);

  // Активация страницы и деактивация
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

  const clickMouseButton = function (click) {
    if (typeof click === `object`) {
      switch (click.button) {
        case 0: activatePage();
      }
    }
  };

  mainPin.addEventListener(`mousedown`, clickMouseButton);
  map.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      window.card.eraseCard();
    }
  });

  const activatePage = function () {
    map.classList.remove(`map--faded`);
    offerForm.classList.remove(`ad-form--disabled`);
    mapFiltersForm.classList.remove(`ad-form--disabled`);

    const enableFieldsets = function (form) {
      let fieldsets = form.children;
      for (let i = 0; i < fieldsets.length; i++) {
        fieldsets[i].removeAttribute(`disabled`, `disabled`);
      }
    };

    enableFieldsets(offerForm);
    enableFieldsets(mapFiltersForm);
    window.pin.popAdvertisement(window.pin.pinsArray[0], window.card.renderCard);
    window.data.mapPins.append(window.pin.pinsFragment);
  };

  mainPin.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      activatePage();
    }
  });

  window.main = {
    mainPin
  };
})();
