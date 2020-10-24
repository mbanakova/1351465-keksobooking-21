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

    window.backend.load(function (pins) {
      const createFragment = function (array, callback) {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < window.pin.MAX_SIMILAR_PIN_COUNT; i++) {
          fragment.append(callback(array[i]));
        }
        window.data.mapPins.appendChild(fragment);
      };
      let pinsFragment = createFragment(pins, window.pin.renderPin);
      window.data.mapPins.append(pinsFragment);
    }, errorHandler);
  };

  const errorHandler = function (error) {
    const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
    const errorMessage = errorTemplate.querySelector(`.error__message`);
    const errorButton = errorTemplate.querySelector(`.error__button`);

    errorTemplate.style = `z-index: 100; margin: auto; text-align: center; background-color: blue;`;
    errorTemplate.style.position = `absolute`;
    errorTemplate.style.fontSize = `36px`;

    errorMessage.textContent = error;
    document.body.insertAdjacentElement(`afterbegin`, errorTemplate);

    errorButton.addEventListener(`click`, function () {
      errorTemplate.style.display = `none`;
    });

    errorButton.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape`) {
        errorTemplate.style.display = `none`;
      }
    });
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
