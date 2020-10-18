'use strict';
(function () {
  const ROOMS_MAX = 100;
  const mainPin = document.querySelector(`.map__pin--main`);
  const addressInput = document.querySelector(`#address`);
  const selectRooms = document.querySelector(`#room_number`);
  const selectCapacity = document.querySelector(`#capacity`);

  // Поле с адресом
  const renderAddressInput = function () {
    let mainPinX = Math.round(parseInt(mainPin.style.left, 10) + (window.data.PIN_SIZE / 2));
    let mainPinY = Math.round(parseInt(mainPin.style.top, 10) + window.data.PIN_SIZE + window.data.PIN_TAG);

    addressInput.value = `${mainPinX}, ${mainPinY}`;
  };
  renderAddressInput();

  // Зависимость кол-ва гостей и вместимости комнат
  const validateCapacity = function (evt) {
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
  const titleInput = document.querySelector(`#title`);

  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;

  titleInput.addEventListener(`input`, function () {
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

  titleInput.addEventListener(`invalid`, function () {
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
  const accomodationPrice = document.querySelector(`#price`);

  const MAX_PRICE = 1000000;

  accomodationPrice.addEventListener(`input`, function () {
    if (accomodationPrice.value > MAX_PRICE) {
      accomodationPrice.setCustomValidity(`Таких дорогих отелей нет. Максимальная стоимость за ночь - 1000000.`);
    } else {
      titleInput.setCustomValidity(``);
    }
    accomodationPrice.reportValidity();
  });

  accomodationPrice.addEventListener(`invalid`, function () {
    if (accomodationPrice.validity.valueMissing) {
      accomodationPrice.setCustomValidity(`Обязательное поле`);
    } else {
      accomodationPrice.setCustomValidity(``);
    }
  });

  // Валидация типа жилья и влияния его на стоимость
  const accomodationType = document.querySelector(`#type`);

  accomodationType.addEventListener(`change`, function () {
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

  accomodationType.addEventListener(`invalid`, function () {
    if (accomodationType.validity.valueMissing) {
      accomodationType.setCustomValidity(`Обязательное поле`);
    } else {
      accomodationType.setCustomValidity(``);
    }
  });

  // Валидация времени заезда / выезда
  const checkInTime = document.querySelector(`#timein`);
  const checkOutTime = document.querySelector(`#timeout`);

  checkInTime.addEventListener(`input`, function () {
    let inValue = checkInTime.value.slice(0, 2);
    let outValue = checkOutTime.value.slice(0, 2);
    if (inValue >= outValue) {
      checkInTime.setCustomValidity(``);
    } else {
      checkInTime.setCustomValidity(`Освободить номер после ${outValue}:00 можно за доплату`);
    }

    checkInTime.reportValidity();
  });

  window.form = {
    renderAddressInput
  };
})();
