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
  };
  disablePage();

  const clickMouseButton = function (click) {
    if (typeof click === `object`) {
      activatePage();
      mainPin.removeEventListener(`mousedown`, clickMouseButton);
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

    window.backend.load(function (pins) {
      const createFragment = function (array, callback) {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < window.pin.MAX_SIMILAR_PIN_COUNT; i++) {
          fragment.append(callback(array[i]));
        }
        return fragment;
      };
      let pinsFragment = createFragment(pins, window.pin.renderPin);
      window.data.mapPins.append(pinsFragment);
    }, window.error.errorHandler);
  };

  mainPin.addEventListener(`keydown`, function (evt) {
    evt.preventDefault();
    if (evt.key === `Enter`) {
      activatePage();
    }
  });

  window.main = {
    mainPin,
    disablePage,
    activatePage,
    clickMouseButton
  };
})();
