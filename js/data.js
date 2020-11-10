'use strict';
(() => {

  const map = document.querySelector(`.map`);
  const mapPins = document.querySelector(`.map__pins`);
  const TYPE = [`palace`, `flat`, `house`, `bungalow`];
  const PIN_SIZE = 65;
  const PIN_TAG = 20;
  const TYPE_RU = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`
  };

  window.data = {
    PIN_SIZE,
    PIN_TAG,
    TYPE,
    TYPE_RU,
    map,
    mapPins
  };
})();
