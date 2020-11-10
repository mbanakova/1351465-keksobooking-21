'use strict';

(() => {

  const errorHandler = (error) => {
    const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
    const errorMessage = errorTemplate.querySelector(`.error__message`);
    const errorButton = errorTemplate.querySelector(`.error__button`);

    errorTemplate.style = `z-index: 100; margin: auto; text-align: center; background-color: rgba(9, 13, 25, 0.8);`;
    errorTemplate.style.position = `fixed`;
    errorTemplate.style.fontSize = `36px`;

    errorMessage.textContent = error;
    document.body.insertAdjacentElement(`afterbegin`, errorTemplate);

    errorButton.addEventListener(`click`, () => {
      errorTemplate.style.display = `none`;
    });

    errorButton.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Escape`) {
        errorTemplate.style.display = `none`;
      }
    });
  };

  window.error = {
    errorHandler
  };
})();
