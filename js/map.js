'use strict';

let pinMain = document.querySelector(`.map__pin--main`);
let form = document.querySelector(`.ad-form`);
let formDisabled = document.querySelectorAll(`.ad-form--disabled fieldset`);
let mapFilters = document.querySelector(`.map__filters`).children;
let addressInput = document.getElementsByName(`address`);
let buttonReset = document.querySelector(`.ad-form__reset`);
let pinListElement = document.querySelector(`.map__pins`);
let fileChooserAvatar = document.querySelector(`.ad-form-header__input`);
let previewAvatar = document.querySelector(`.ad-form-header__preview img`);
let fileChooserPhoto = document.querySelector(`.ad-form__input`);
let previewPhoto = document.querySelector(`.ad-form__photo`);

let formResetState = function () {
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
  let pinElements = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  pinElements.forEach((element) => element.remove());
  pinListElement.append(pinMain);
  pinMain.style.left = `570px`;
  pinMain.style.top = `375px`;
  window.formValidation.addressValidation(addressInput, pinMain);
};

let onError = function (message) {
  let node = document.createElement(`div`);
  node.style = `z-index: 100; margin: 40px auto; text-align: center; background-color: #ff5635; color: white; width: 200px; height: auto; padding: 50px;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `22px`;

  node.textContent = message;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

let onSuccess = function (adverts) {
  formResetState();

  const updatePin = function (housingType, housingPrice, roomNumber, capacityNumber) {

    let pinElements = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pinElements.forEach((element) => element.remove());

    let housingFeatures = [];

    document.querySelectorAll(`#housing-features > .map__checkbox`).forEach(function (element) {
      if (element.checked) {
        housingFeatures.push(element.value);
      }
    });

    let samePins = adverts.filter(function (advert) {
      if (housingType !== window.util.HOUSING_TYPE.ANY) {
        if (advert.offer.type !== housingType) {
          return false;
        }
      }

      if (housingPrice !== window.util.HOUSING_PRICE.ANY) {
        if ((housingPrice === window.util.HOUSING_PRICE.HIGH) && (advert.offer.price < 50000)) {
          return false;
        }
        if ((housingPrice === window.util.HOUSING_PRICE.MIDDLE) && ((advert.offer.price >= 50000) || (advert.offer.price < 10000))) {
          return false;
        }
        if ((housingPrice === window.util.HOUSING_PRICE.LOW) && (advert.offer.price >= 10000)) {
          return false;
        }
      }

      if (roomNumber !== window.util.ROOM_NUMBER.ANY) {
        if (advert.offer.rooms !== Number(roomNumber)) {
          return false;
        }
      }

      if (capacityNumber !== window.util.ROOM_NUMBER.ANY) {
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

    let pins = window.pin.appendPin(samePins, pinListElement);

    window.pin.eventClickPin(pins, samePins);
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

    updatePin(window.util.HOUSING_TYPE.ANY, window.util.HOUSING_PRICE.ANY, window.util.ROOM_NUMBER.ANY, window.util.CAPACITY_NUMBER.ANY);
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

    document.body.append(pinMain);

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      const BODY_WIDHT = 1200;
      let viewWidht = document.documentElement.clientWidth;
      let beginX = (viewWidht - BODY_WIDHT) / 2;
      let endX = viewWidht - (viewWidht - BODY_WIDHT) / 2 - pinMain.getBoundingClientRect().width;

      pinMain.style.top = pageY - shiftY + `px`;
      pinMain.style.left = pageX - shiftX + `px`;

      if (pageX <= beginX) {
        pinMain.style.left = beginX + `px`;
      }

      if (pageX >= endX) {
        pinMain.style.left = endX + `px`;
      }

      if (pageY <= 130 - pinMain.getBoundingClientRect().height + shiftY) {
        pinMain.style.top = 130 - pinMain.getBoundingClientRect().height + `px`;
      }

      if (pageY >= 530 + pinMain.getBoundingClientRect().height - shiftY) {
        pinMain.style.top = 530 + pinMain.getBoundingClientRect().height + `px`;
      }

      window.formValidation.addressValidationActive(addressInput, pinMain);
    }

    function onMouseMove(ev) {
      moveAt(ev.pageX, ev.pageY);
    }

    document.addEventListener(`mousemove`, onMouseMove);

    pinMain.addEventListener(`mouseup`, function () {
      document.removeEventListener(`mousemove`, onMouseMove);
      pinMain.onmouseup = null;
    });

  };

  pinMain.ondragstart = function () {
    return false;
  };
};

let avatarPreview = function (fileChooser, preview) {
  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

  fileChooser.addEventListener(`change`, function () {
    let file = fileChooser.files[0];
    let fileName = file.name.toLowerCase();

    let matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      let reader = new FileReader();

      reader.addEventListener(`load`, function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
};

avatarPreview(fileChooserAvatar, previewAvatar);

let photoPreview = function (fileChooser, container) {
  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

  fileChooser.addEventListener(`change`, function () {
    let file = fileChooser.files[0];
    let fileName = file.name.toLowerCase();

    let matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {

      let img = document.createElement(`img`);
      img.style.width = `100%`;
      img.style.height = `auto`;

      let reader = new FileReader();

      reader.addEventListener(`load`, function () {
        img.src = reader.result;
      });
      container.append(img);

      reader.readAsDataURL(file);
    }
  });
};

photoPreview(fileChooserPhoto, previewPhoto);

window.load(`https://21.javascript.pages.academy/keksobooking/data`, onSuccess, onError);

let sendForm = function (type) {
  let errorTemplate = document.querySelector(`#` + type).content.querySelector(`.` + type);
  let errorElement = errorTemplate.cloneNode(true);
  let fragment = document.createDocumentFragment();

  fragment.appendChild(errorElement);
  document.body.appendChild(fragment);

  document.body.addEventListener(`click`, closeMessage(type));

  document.body.addEventListener(`keydown`, function (evt) {
    window.util.isEscEvent(evt, closeMessage(type));
  });
};


let closeMessage = function (type) {
  return function () {
    document.querySelector(`.` + type).remove();
  };
};

form.addEventListener(`submit`, function (evt) {
  window.upload(new FormData(form), function () {
    form.reset();
    formResetState();
    sendForm(`success`);
  }, function () {
    sendForm(`error`);
  });
  evt.preventDefault();
});

buttonReset.addEventListener(`click`, function (event) {
  form.reset();
  formResetState();
  event.preventDefault();
});

