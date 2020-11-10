'use strict';
(() => {

  const map = document.querySelector(`.map`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const offerForm = document.querySelector(`.ad-form`);
  const mapFiltersForm = document.querySelector(`.map__filters`);
  const mapPins = document.querySelector(`.map__pins`).children;

  map.classList.remove(`map--faded`);

  // Активация страницы и деактивация
  const disablePage = () => {
    map.classList.add(`map--faded`);
    offerForm.classList.add(`ad-form--disabled`);
    mapFiltersForm.classList.add(`ad-form--disabled`);

    const disableFieldsets = (form) => {
      let fieldsets = form.children;
      for (let i = 0; i < fieldsets.length; i++) {
        fieldsets[i].setAttribute(`disabled`, `disabled`);
      }
    };

    disableFieldsets(offerForm);
    disableFieldsets(mapFiltersForm);
  };
  disablePage();

  const clickMouseButton = (click) => {
    if (typeof click === `object`) {
      activatePage();
      mainPin.removeEventListener(`mousedown`, clickMouseButton);
    }
  };
  mainPin.addEventListener(`mousedown`, clickMouseButton);

  map.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      window.card.eraseCard();
    }
  });

  const activatePage = () => {
    map.classList.remove(`map--faded`);
    offerForm.classList.remove(`ad-form--disabled`);
    mapFiltersForm.classList.remove(`ad-form--disabled`);

    const enableFieldsets = (form) => {
      let fieldsets = form.children;
      for (let i = 0; i < fieldsets.length; i++) {
        fieldsets[i].removeAttribute(`disabled`, `disabled`);
      }
    };

    enableFieldsets(offerForm);
    enableFieldsets(mapFiltersForm);

    window.backend.load(window.pin.successPinsLoad, window.error.errorHandler);
  };

  mainPin.addEventListener(`keydown`, (evt) => {
    evt.preventDefault();
    if (evt.key === `Enter`) {
      activatePage();
    }
  });

  window.mapListElement = map.querySelector(`.map__pins`);

  const deletePins = () => {
    const buttons = window.mapListElement.querySelectorAll(`button`);
    mainPin.style.top = 375 + `px`;
    mainPin.style.left = 570 + `px`;
    for (let i = 1; i < buttons.length; i++) {
      window.mapListElement.removeChild(buttons[i]);
    }
  };

  const resetPage = () => {
    map.classList.add(`map--faded`);
    window.form.form.classList.add(`ad-form--disabled`);
    mainPin.addEventListener(`mousedown`, clickMouseButton);
  };

  window.main = {
    mainPin,
    mapPins,
    disablePage,
    activatePage,
    clickMouseButton,
    deletePins,
    resetPage
  };
})();
