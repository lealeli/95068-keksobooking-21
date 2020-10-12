'use strict';

(function () {
  let pinMain = document.querySelector(`.map__pin--main`);
  let form = document.querySelector(`.ad-form`);
  let formDisabled = document.querySelectorAll(`.ad-form--disabled fieldset`);
  let mapFilters = document.querySelector(`.map__filters`).children;
  let addressInput = document.getElementsByName(`address`);

  let pinListElement = document.querySelector(`.map__pins`);

  let adverts = window.data.advertRandom(8);

  formDisabled.forEach((element) => element.setAttribute(`disabled`, `disabled`));

  for (let i = 0; i < mapFilters.length; i++) {
    mapFilters[i].setAttribute(`disabled`, `disabled`);
  }

  function unDisabledForm() {
    if (!document.querySelector(`.map--faded`)) {
      return;
    }
    document.querySelector(`.map`).classList.remove(`map--faded`);
    for (let i = 0; i < mapFilters.length; i++) {
      mapFilters[i].removeAttribute(`disabled`);
    }
    form.classList.remove(`ad-form--disabled`);
    formDisabled.forEach((element) => element.removeAttribute(`disabled`));

    window.pin.appendPin(adverts, pinListElement);

    let pinElements = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    window.pin.eventClickPin(pinElements, adverts);
  }


  pinMain.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0) {
      unDisabledForm();
      window.formValidation.addressValidationActive(addressInput, pinMain);
    }
  });

  pinMain.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      unDisabledForm();
      window.formValidation.addressValidationActive(addressInput, pinMain);
    }
  });

  pinMain.onmousedown = function (event) {

    let shiftX = event.clientX - pinMain.getBoundingClientRect().left;
    let shiftY = event.clientY - pinMain.getBoundingClientRect().top;

    pinMain.style.position = `absolute`;
    pinMain.style.zIndex = 1000;
    document.body.append(pinMain);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      if (pageX < 230 || pageX > 1450 || pageY < 130 || pageY > 530) {
        pinMain.onmouseup();
      }
      pinMain.style.left = pageX - shiftX + `px`;
      pinMain.style.top = pageY - shiftY + `px`;
      window.formValidation.addressValidationActive(addressInput, pinMain);
    }

    function onMouseMove(ev) {
      moveAt(ev.pageX, ev.pageY);
    }

    document.addEventListener(`mousemove`, onMouseMove);

    pinMain.onmouseup = function () {
      document.removeEventListener(`mousemove`, onMouseMove);
      pinMain.onmouseup = null;
    };

  };

  pinMain.ondragstart = function () {
    return false;
  };
})();
