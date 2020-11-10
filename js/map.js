'use strict';

const PRICE_LEVEL_ONE = 10000;
const PRICE_LEVEL_TWO = 50000;
const BODY_WIDHT = 1200;
const HEIGHT_BEGIN = 130;
const HEIGHT_END = 630;
const PIN_HEIGHT = 75;
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const pinMain = document.querySelector(`.map__pin--main`);
const form = document.querySelector(`.ad-form`);
const formDisabled = document.querySelectorAll(`.ad-form--disabled fieldset`);
const mapFilters = document.querySelector(`.map__filters`).children;
const addressInput = document.getElementsByName(`address`);
const buttonReset = document.querySelector(`.ad-form__reset`);
const pinListElement = document.querySelector(`.map__pins`);
const fileChooserAvatar = document.querySelector(`.ad-form-header__input`);
const previewAvatar = document.querySelector(`.ad-form-header__preview img`);
const fileChooserPhoto = document.querySelector(`.ad-form__input`);
const previewPhoto = document.querySelector(`.ad-form__photo`);

const formResetState = function () {
  const pinElements = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);

  if (document.querySelector(`.map__card`)) {
    document.querySelector(`.map__card`).remove();
  }

  previewAvatar.src = `img/muffin-grey.svg`;
  previewPhoto.querySelectorAll(`img`).forEach((element) => element.remove());
  formDisabled.forEach((element) => element.setAttribute(`disabled`, `disabled`));

  for (let i = 0; i < mapFilters.length; i++) {
    mapFilters[i].setAttribute(`disabled`, `disabled`);
  }

  document.querySelector(`.map`).classList.add(`map--faded`);
  form.classList.add(`ad-form--disabled`);
  pinElements.forEach((element) => element.remove());
  pinListElement.append(pinMain);
  pinMain.style.left = `570px`;
  pinMain.style.top = `375px`;
  window.formValidation.addressValidation(addressInput, pinMain);
};

const onError = function (message) {
  const node = document.createElement(`div`);
  node.style = `z-index: 100; margin: 40px auto; text-align: center; background-color: #ff5635; color: white; width: 200px; height: auto; padding: 50px;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `22px`;

  node.textContent = message;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

const onSuccess = function (adverts) {
  formResetState();

  const updatePin = function (housingType, housingPrice, roomNumber, capacityNumber) {

    const pinElements = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pinElements.forEach((element) => element.remove());

    const housingFeatures = [];

    document.querySelectorAll(`#housing-features > .map__checkbox`).forEach(function (element) {
      if (element.checked) {
        housingFeatures.push(element.value);
      }
    });

    let samePins = adverts.filter(function (advert) {
      if (housingType !== window.util.housingType.ANY) {
        if (advert.offer.type !== housingType) {
          return false;
        }
      }

      if (housingPrice !== window.util.housingPrice.ANY) {
        if ((housingPrice === window.util.housingPrice.HIGH) && (advert.offer.price < PRICE_LEVEL_TWO)) {
          return false;
        }
        if ((housingPrice === window.util.housingPrice.MIDDLE) && ((advert.offer.price >= PRICE_LEVEL_TWO) || (advert.offer.price < PRICE_LEVEL_ONE))) {
          return false;
        }
        if ((housingPrice === window.util.housingPrice.LOW) && (advert.offer.price >= PRICE_LEVEL_ONE)) {
          return false;
        }
      }

      if (roomNumber !== window.util.roomNumber.ANY) {
        if (advert.offer.rooms !== Number(roomNumber)) {
          return false;
        }
      }

      if (capacityNumber !== window.util.roomNumber.ANY) {
        if (advert.offer.guests !== Number(capacityNumber)) {
          return false;
        }
      }

      if (!housingFeatures.every((r) => advert.offer.features.includes(r))) {
        return false;
      }

      return true;
    });

    samePins = samePins.slice(0, 5);

    const pins = window.pin.append(samePins, pinListElement);

    window.pin.eventClick(pins, samePins);
  };

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

    updatePin(window.util.housingType.ANY, window.util.housingPrice.ANY, window.util.roomNumber.ANY, window.util.capacityNumber.ANY);
  }

  for (let i = 0; i < mapFilters.length; i++) {
    mapFilters[i].addEventListener(`change`, function () {
      const pinCard = document.querySelector(`.map__card`);
      if (pinCard) {
        pinCard.remove();
      }

      window.util.debounce(function () {
        updatePin(mapFilters[0].value, mapFilters[1].value, mapFilters[2].value, mapFilters[3].value);
      });
    });
  }

  pinMain.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      unDisabledForm();
      window.formValidation.addressValidationActive(addressInput, pinMain);
    }
  });

  let shiftX;
  let shiftY;
  let mouseMoveFlag = false;

  function moveAt(pageX, pageY) {
    const viewWidht = document.documentElement.clientWidth;
    const beginX = (viewWidht - BODY_WIDHT) / 2;
    const endX = viewWidht - (viewWidht - BODY_WIDHT) / 2 - pinMain.getBoundingClientRect().width;

    if ((pageX + shiftX <= beginX) || (pageX - shiftX >= endX) || (pageY + shiftY <= HEIGHT_BEGIN) || (pageY - shiftY >= HEIGHT_END)) {
      mouseMoveFlag = false;
    }

    if (mouseMoveFlag === false) {
      return;
    }

    pinMain.style.top = pageY - shiftY + `px`;
    pinMain.style.left = pageX - beginX - shiftX + `px`;

    if (pageX <= beginX + shiftX) {
      pinMain.style.left = `0px`;
    }

    if (pageX >= endX + shiftX) {
      pinMain.style.left = endX - beginX + `px`;
    }

    if (pageY <= HEIGHT_BEGIN + shiftY) {
      pinMain.style.top = HEIGHT_BEGIN - PIN_HEIGHT + `px`;
    }

    if (pageY >= HEIGHT_END - shiftY) {
      pinMain.style.top = HEIGHT_END - PIN_HEIGHT + `px`;
    }

    window.formValidation.addressValidationActive(addressInput, pinMain);
  }

  pinMain.onmousedown = function (event) {

    if (event.button !== 0) {
      return;
    }

    unDisabledForm();
    mouseMoveFlag = true;

    shiftX = event.clientX - pinMain.getBoundingClientRect().left;
    shiftY = event.clientY - pinMain.getBoundingClientRect().top;

    moveAt(event.pageX, event.pageY);

  };

  function onMouseMove(ev) {
    moveAt(ev.pageX, ev.pageY);
  }

  document.addEventListener(`mousemove`, onMouseMove);

  pinMain.addEventListener(`mouseup`, function () {
    mouseMoveFlag = false;
  });

  pinMain.ondragstart = function () {
    return false;
  };
};

const preview = function (fileChooser, matchesFn) {
  fileChooser.addEventListener(`change`, function () {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      matchesFn(file);
    }
  });
};

preview(fileChooserAvatar, function (file) {
  const reader = new FileReader();

  reader.addEventListener(`load`, function () {
    previewAvatar.src = reader.result;
  });

  reader.readAsDataURL(file);
});

preview(fileChooserPhoto, function (file) {
  const img = document.createElement(`img`);
  const reader = new FileReader();

  img.style.width = `100%`;
  img.style.height = `auto`;

  reader.addEventListener(`load`, function () {
    img.src = reader.result;
  });
  previewPhoto.append(img);

  reader.readAsDataURL(file);
});

window.ajax(`https://21.javascript.pages.academy/keksobooking/data`, `GET`, onSuccess, onError);

const sendForm = function (type) {
  const errorTemplate = document.querySelector(`#` + type).content.querySelector(`.` + type);
  const errorElement = errorTemplate.cloneNode(true);
  const fragment = document.createDocumentFragment();

  fragment.appendChild(errorElement);
  document.body.appendChild(fragment);

  const clickFn = function () {
    closeMessage(type);
    document.body.removeEventListener(`keydown`, keydownFn);
    document.body.removeEventListener(`click`, clickFn);
  };
  document.body.addEventListener(`click`, clickFn);

  const keydownFn = function (evt) {
    window.util.isEscEvent(evt, function () {
      closeMessage(type);
      document.body.removeEventListener(`keydown`, keydownFn);
      document.body.removeEventListener(`click`, clickFn);
    });
  };
  document.body.addEventListener(`keydown`, keydownFn);
};


const closeMessage = function (type) {
  document.querySelector(`.` + type).remove();
};

form.addEventListener(`submit`, function (evt) {
  window.ajax(`https://21.javascript.pages.academy/keksobooking`, `POST`, function () {
    form.reset();
    formResetState();
    sendForm(`success`);
  }, function () {
    sendForm(`error`);
  }, new FormData(form));
  evt.preventDefault();
});

buttonReset.addEventListener(`click`, function (event) {
  form.reset();
  formResetState();
  event.preventDefault();
});

