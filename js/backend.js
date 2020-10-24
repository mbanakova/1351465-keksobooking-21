'use strict';

(function () {
  const TIMEOUT = 10000;
  const URL_GET = `https://21.javascript.pages.academy/keksobooking/data`;
  const URL_SEND = `https://21.javascript.pages.academy/keksobooking`;
  window.backend = {};

  const loadData = function (onLoad, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      let error = ``;
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;

        case 400:
          error = `Неверный запрос`;
          break;
        case 401:
          error = `Пользователь не авторизован`;
          break;
        case 404:
          error = `Ничего не найдено`;
          break;

        default:
          error = `Код ошибки: ` + xhr.status + ` ` + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });
    xhr.timeout = TIMEOUT;

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });
    return xhr;
  };

  window.backend.load = function (onLoad, onError) {
    let xhr = loadData(onLoad, onError);
    xhr.open(`GET`, URL_GET);
    xhr.send();
  };

  window.backend.save = function (data, onLoad, onError) {
    let xhr = loadData(onLoad, onError);
    xhr.open(`POST`, URL_SEND);
    xhr.send(data);
  };
})();
