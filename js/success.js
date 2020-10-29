'use strict';

(function () {

  const successHandler = function () {
    const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
    const successMessage = successTemplate.querySelector(`.success__message`);

    successTemplate.style = `z-index: 100; margin: auto; text-align: center; background-color: rgba(9, 13, 25, 0.8);`;
    successTemplate.style.position = `fixed`;
    successTemplate.style.fontSize = `36px`;
    successMessage.textContent = `Ваше объявление успешно размещено!`;
    document.body.insertAdjacentElement(`afterbegin`, successTemplate);

    const submitRestartPage = function () {
      window.main.disablePage();
      window.card.eraseCard();
      window.form.form.reset();

      let success = document.querySelector(`.success`);
      if (success) {
        success.remove();
      }
      for (let i = 0; i < window.main.mapPins.length; i++) {
        if (window.main.mapPins[i].classList.contains(`map__pin--main`)) {
          window.main.mapPins[i].style.top = 375 + `px`;
          window.main.mapPins[i].style.left = 570 + `px`;
          continue;
        } else {
          window.main.mapPins[i].remove();
        }
      }
      window.main.mainPin.addEventListener(`mousedown`, window.main.clickMouseButton);
    };

    const clickEscapeButton = function (evt) {
      if (evt.key === `Escape` || evt.key === `Enter`) {
        submitRestartPage();
      }
      document.removeEventListener(`keydown`, clickEscapeButton);
    };
    document.addEventListener(`keydown`, clickEscapeButton);

    document.addEventListener(`click`, function () {
      submitRestartPage();
    });
  };
  window.success = {
    successHandler
  };
})();
