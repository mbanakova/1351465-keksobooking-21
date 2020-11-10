'use strict';

(() => {

  const successHandler = () => {
    const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
    const successMessage = successTemplate.querySelector(`.success__message`);

    successTemplate.style = `z-index: 100; margin: auto; text-align: center; background-color: rgba(9, 13, 25, 0.8);`;
    successTemplate.style.position = `fixed`;
    successTemplate.style.fontSize = `36px`;
    successMessage.textContent = `Ваше объявление успешно размещено!`;
    document.body.insertAdjacentElement(`afterbegin`, successTemplate);

    const submitRestartPage = () => {
      let success = document.querySelector(`.success`);
      if (success) {
        success.style.display = `none`;
      }
    };

    const clickEscapeButton = (evt) => {
      if (evt.key === `Escape` || evt.key === `Enter`) {
        submitRestartPage();
      }
      document.removeEventListener(`keydown`, clickEscapeButton);
    };

    document.addEventListener(`keydown`, clickEscapeButton);

    document.addEventListener(`click`, () => {
      submitRestartPage();
    });
  };

  window.success = {
    successHandler
  };
})();
