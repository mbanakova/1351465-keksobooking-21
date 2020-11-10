'use strict';
(() => {
  const form = document.querySelector(`.ad-form`);
  const ROOMS_MAX = 100;
  const mainPin = document.querySelector(`.map__pin--main`);
  const addressInput = document.querySelector(`#address`);
  const selectRooms = document.querySelector(`#room_number`);
  const selectCapacity = document.querySelector(`#capacity`);
  const titleInput = document.querySelector(`#title`);
  const accomodationPrice = document.querySelector(`#price`);
  const accomodationType = document.querySelector(`#type`);
  const checkInTime = document.querySelector(`#timein`);
  const checkOutTime = document.querySelector(`#timeout`);
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const MAX_PRICE = 1000000;

  // Поле с адресом
  const renderAddressInput = () => {
    let mainPinX = Math.round(parseInt(mainPin.style.left, 10) + (window.data.PIN_SIZE / 2));
    let mainPinY = Math.round(parseInt(mainPin.style.top, 10) + window.data.PIN_SIZE + window.data.PIN_TAG);

    addressInput.value = `${mainPinX}, ${mainPinY}`;
  };
  renderAddressInput();

  // Зависимость кол-ва гостей и вместимости комнат
  const validateCapacity = (evt) => {
    const roomsSelected = +selectRooms.value;
    const guestsSelected = +selectCapacity.value;

    selectRooms.setCustomValidity(``);
    selectCapacity.setCustomValidity(``);

    if (guestsSelected > roomsSelected && roomsSelected !== ROOMS_MAX) {
      evt.target.setCustomValidity(`Выбранное жильё вмещает не более ${roomsSelected} гостя/гостей`);
    } else if (guestsSelected > 0 && roomsSelected === ROOMS_MAX) {
      evt.target.setCustomValidity(`100 комнат - не для гостей`);
    } else if (guestsSelected === 0 && roomsSelected !== ROOMS_MAX) {
      evt.target.setCustomValidity(`Не для гостей можно выбрать только 100 комнат`);
    }
    evt.target.reportValidity();
  };

  selectCapacity.addEventListener(`input`, validateCapacity);
  selectRooms.addEventListener(`input`, validateCapacity);

  // Валидация заголовка объявления
  titleInput.addEventListener(`input`, () => {
    const titleLength = titleInput.value.length;

    if (titleLength < MIN_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Ещё + ${MIN_TITLE_LENGTH - titleLength} + симв.`);
    } else if (titleLength > MAX_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Удалите лишние + ${titleLength - MAX_TITLE_LENGTH} + симв.`);
    } else {
      titleInput.setCustomValidity(``);
    }

    titleInput.reportValidity();
  });

  titleInput.addEventListener(`invalid`, () => {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity(`Минимальная длина — 30 символов`);
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity(`Максимальная длина — 100 символов`);
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity(`Обязательное текстовое поле`);
    } else {
      titleInput.setCustomValidity(``);
    }
  });

  // Валидация стоимости жилья
  accomodationPrice.addEventListener(`input`, () => {
    if (accomodationPrice.value > MAX_PRICE) {
      accomodationPrice.setCustomValidity(`Таких дорогих отелей нет. Максимальная стоимость за ночь - 1000000.`);
    } else {
      titleInput.setCustomValidity(``);
    }
    accomodationPrice.reportValidity();
  });

  accomodationPrice.addEventListener(`invalid`, () => {
    if (accomodationPrice.validity.valueMissing) {
      accomodationPrice.setCustomValidity(`Обязательное поле`);
    } else {
      accomodationPrice.setCustomValidity(``);
    }
  });

  // Валидация типа жилья и влияния его на стоимость
  accomodationType.addEventListener(`change`, () => {
    let typeValue = accomodationType.value;
    if (typeValue === window.data.TYPE[3]) {
      accomodationPrice.min = 0;
    } else if (typeValue === window.data.TYPE[1]) {
      accomodationPrice.min = 1000;
    } else if (typeValue === window.data.TYPE[2]) {
      accomodationPrice.min = 5000;
    } else if (typeValue === window.data.TYPE[0]) {
      accomodationPrice.min = 10000;
    }
    accomodationPrice.placeholder = accomodationPrice.min;
    accomodationType.reportValidity();
  });

  accomodationType.addEventListener(`invalid`, () => {
    if (accomodationType.validity.valueMissing) {
      accomodationType.setCustomValidity(`Обязательное поле`);
    } else {
      accomodationType.setCustomValidity(``);
    }
  });

  // Синхронизация времени заезда / выезда
  checkInTime.addEventListener(`input`, () => {
    let inValue = checkInTime.value;
    checkOutTime.value = inValue;
  });

  checkOutTime.addEventListener(`input`, () => {
    let outValue = checkOutTime.value;
    checkInTime.value = outValue;
  });

  // Очистка формы
  const resetButton = form.querySelector(`.ad-form__reset`);
  resetButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    resetData();
  });

  const resetData = () => {
    form.reset();
    window.main.resetPage();
    window.main.deletePins();
    window.card.eraseCard();
    renderAddressInput();
    window.pin.housingTypeOption.value = `any`;
  };

  // Отправка формы
  const submitValidForm = () => {
    window.success.successHandler();
    window.main.mainPin.style.top = (window.movePin.mapBorder.bottom - window.movePin.mapBorder.top) / 2 + `px`;
    window.main.mainPin.style.left = (window.movePin.mapBorder.right - window.movePin.mapBorder.left) / 2 + `px`;
    resetData();
  };

  const submitHandler = (evt) => {
    window.backend.save(new FormData(form), submitValidForm, window.error.errorHandler);
    evt.preventDefault();
  };

  form.addEventListener(`submit`, submitHandler);

  window.form = {
    renderAddressInput,
    form
  };
})();
