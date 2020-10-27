'use strict';
(function () {

  const TYPE = [`palace`, `flat`, `house`, `bungalow`];
  const TYPE_RU = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`
  };

  const PIN_SIZE = 65;
  const PIN_TAG = 20;
  const map = document.querySelector(`.map`);
  const mapPins = document.querySelector(`.map__pins`);

  window.data = {
    PIN_SIZE,
    PIN_TAG,
    TYPE,
    TYPE_RU,
    map,
    mapPins
  };
})();
