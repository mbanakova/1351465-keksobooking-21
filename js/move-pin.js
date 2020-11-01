'use strict';
(function () {
  const muffin = window.main.mainPin.querySelector(`img`);

  const mapBorder = {
    top: 130,
    right: 1136,
    bottom: 630,
    left: 0
  };

  muffin.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    let onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      const coordinates = {
        x: window.main.mainPin.offsetLeft - shift.x,
        y: window.main.mainPin.offsetTop - shift.y
      };

      if (coordinates.x <= mapBorder.left) {
        coordinates.x = mapBorder.left;
      } else if (coordinates.x > mapBorder.right) {
        coordinates.x = mapBorder.right;
      }

      if (coordinates.y <= mapBorder.top) {
        coordinates.y = mapBorder.top;
      } else if (coordinates.y > mapBorder.bottom) {
        coordinates.y = mapBorder.bottom;
      }

      window.main.mainPin.style.top = coordinates.y + `px`;
      window.main.mainPin.style.left = coordinates.x + `px`;
      window.form.renderAddressInput();
    };

    let onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        let onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          muffin.removeEventListener(`click`, onClickPreventDefault);
        };
        muffin.addEventListener(`click`, onClickPreventDefault);
      }
      window.form.renderAddressInput();
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  window.movePin = {
    mapBorder
  };
})();
