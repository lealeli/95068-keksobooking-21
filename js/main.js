'use strict';

const ARRAY_TITLE = [`Жилье в центре`, `Лучшее место на берегу`, `В горах с красивым видом`, `Рядом с ТЦ`, `Видовое жилье`];
const ARRAY_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const ARRAY_TIME = [`12:00`, `13:00`, `14:00`];
const ARRAY_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const ARRAY_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min), 1) + min;
}

function advertRandom() {
  const advert = [];

  for (let i = 0; i < 8; i++) {
    advert.push({
      author: {
        avatar: `img/avatars/user0` + (i + 1) + `.png`
      },
      offer: {
        title: ARRAY_TITLE[getRandomInt(0, ARRAY_TITLE.length - 1)],
        address: getRandomInt(0, 1000) + `, ` + getRandomInt(0, 1000),
        price: getRandomInt(500, 100000),
        type: ARRAY_TYPE[getRandomInt(0, ARRAY_TYPE.length - 1)],
        rooms: getRandomInt(1, 5),
        guests: getRandomInt(1, 5),
        checkin: ARRAY_TIME[getRandomInt(0, ARRAY_TIME.length - 1)],
        checkout: ARRAY_TIME[getRandomInt(0, ARRAY_TIME.length - 1)],
        features: ARRAY_FEATURES.slice(0, getRandomInt(1, ARRAY_FEATURES.length + 1)),
        description: `Самое лучше место для проведения вашего отдыха. Наше жилье расположено близко ко всем достопримечательностям, паркам, метро и остановкам другого общественного транспорта`,
        photos: ARRAY_PHOTOS.slice(0, getRandomInt(1, ARRAY_PHOTOS.length + 1))
      },
      location: {
        x: getRandomInt(130, 1030),
        y: getRandomInt(130, 630)
      }
    });
  }

  return advert;
}
let adverts = advertRandom();

let activationMap = function () {
  let pinListElement = document.querySelector(`.map__pins`);
  let mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  function renderAdvert(advert) {
    let pinElement = mapPinTemplate.cloneNode(true);

    pinElement.style.left = advert.location.x - PIN_WIDTH / 2 + `px`;
    pinElement.style.top = advert.location.y - PIN_HEIGHT + `px`;
    pinElement.querySelector(`img`).src = advert.author.avatar;
    pinElement.querySelector(`img`).alt = advert.offer.title;

    return pinElement;
  }

  let fragment = document.createDocumentFragment();
  adverts.forEach((element) => fragment.appendChild(renderAdvert(element)));

  pinListElement.appendChild(fragment);
};


// let cardListElement = document.querySelector(`.map div:nth-child(1)`);
// let cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

// function renderCard(advert) {
//   let cardElement = cardTemplate.cloneNode(true);
//
//   if (advert.author.avatar) {
//     cardElement.querySelector(`.popup__avatar`).src = advert.author.avatar;
//   } else {
//     cardElement.querySelector(`.popup__avatar`).remove();
//   }
//
//   if (advert.offer.title) {
//     cardElement.querySelector(`.popup__title`).innerHTML = advert.offer.title;
//   } else {
//     cardElement.querySelector(`.popup__title`).remove();
//   }
//
//   if (advert.offer.address) {
//     cardElement.querySelector(`.popup__text--address`).innerHTML = advert.offer.address;
//   } else {
//     cardElement.querySelector(`.popup__text--address`).remove();
//   }
//
//   if (advert.offer.price) {
//     cardElement.querySelector(`.popup__text--price`).innerHTML = advert.offer.price + `₽/ночь`;
//   } else {
//     cardElement.querySelector(`.popup__text--price`).remove();
//   }
//
//   if (advert.offer.type) {
//     switch (advert.offer.type) {
//       case `palace`:
//         cardElement.querySelector(`.popup__type`).innerHTML = `Дворец`;
//         break;
//       case `bungalow`:
//         cardElement.querySelector(`.popup__type`).innerHTML = `Дворец`;
//         break;
//       case `flat`:
//         cardElement.querySelector(`.popup__type`).innerHTML = `Квартира`;
//         break;
//       default:
//         cardElement.querySelector(`.popup__type`).innerHTML = `Дом`;
//     }
//   } else {
//     cardElement.querySelector(`.popup__type`).remove();
//   }
//
//   if (advert.offer.rooms && advert.offer.guests) {
//     cardElement.querySelector(`.popup__text--capacity`).innerHTML = advert.offer.rooms + ` комнаты для ` + advert.offer.guests + ` гостей`;
//   } else {
//     cardElement.querySelector(`.popup__text--capacity`).remove();
//   }
//
//   if (advert.offer.checkin && advert.offer.checkout) {
//     cardElement.querySelector(`.popup__text--time`).innerHTML = `Заезд после` + advert.offer.checkin + `, выезд до ` + advert.offer.checkout;
//   } else {
//     cardElement.querySelector(`.popup__text--time`).remove();
//   }
//
//   if (advert.offer.features) {
//     ARRAY_FEATURES.forEach((element) => {
//       if (!advert.offer.features.some(function (value) {
//         return value === element;
//       })) {
//         cardElement.querySelector(`.popup__features`).removeChild(cardElement.querySelector(`.popup__feature--` + element));
//       }
//     }
//     );
//   } else {
//     cardElement.querySelector(`.popup__features`).remove();
//   }
//
//   if (advert.offer.description) {
//     cardElement.querySelector(`.popup__description`).innerHTML = advert.offer.description;
//   } else {
//     cardElement.querySelector(`.popup__description`).remove();
//   }
//
//   function renderPhoto(ad) {
//     let photo = cardElement.querySelector(`.popup__photo`).cloneNode(true);
//     photo.src = ad;
//
//     return photo;
//   }
//
//   if (advert.offer.photos) {
//     advert.offer.photos.forEach((element) => fragment.appendChild(renderPhoto(element)));
//     cardElement.querySelector(`.popup__photos`).appendChild(fragment);
//     cardElement.querySelector(`.popup__photos`).removeChild(cardElement.querySelectorAll(`.popup__photo`)[0]);
//   } else {
//     cardElement.querySelector(`.popup__photos`).remove();
//   }
//
//   return cardElement;
// }
//
// let cardFragment = document.createDocumentFragment();
// cardFragment.appendChild(renderCard(adverts[0]));
// cardListElement.appendChild(cardFragment);

let form = document.querySelector(`.ad-form`);
let formDisabled = document.querySelectorAll(`.ad-form--disabled fieldset`);
let mapFilters = document.querySelector(`.map__filters`).children;

formDisabled.forEach((element) => element.setAttribute(`disabled`, `disabled`));

for (let i = 0; i < mapFilters.length; i++) {
  mapFilters[i].setAttribute(`disabled`, `disabled`);
}

let pinMain = document.querySelector(`.map__pin--main`);

function disabledForm() {
  document.querySelector(`.map`).classList.remove(`map--faded`);
  for (let i = 0; i < mapFilters.length; i++) {
    mapFilters[i].removeAttribute(`disabled`);
  }
  form.classList.remove(`ad-form--disabled`);
  formDisabled.forEach((element) => element.removeAttribute(`disabled`));
}

let addressInput = document.getElementsByName(`address`);
addressInput[0].setAttribute(`readonly`, `readonly`);
addressInput[0].value = PIN_WIDTH / 2 + Number(pinMain.style.left.slice(0, -2)) + `, ` + (PIN_WIDTH / 2 + Number(pinMain.style.top.slice(0, -2)));


pinMain.addEventListener(`mousedown`, function (evt) {
  if (evt.button === 0) {
    disabledForm();
    activationMap();
    addressInput[0].value = PIN_WIDTH / 2 + Number(pinMain.style.left.slice(0, -2)) + `, ` + (PIN_HEIGHT + Number(pinMain.style.top.slice(0, -2)));
    compareRooms();
  }
});

pinMain.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    disabledForm();
    activationMap();
    addressInput[0].value = PIN_WIDTH / 2 + Number(pinMain.style.left.slice(0, -2)) + `, ` + (PIN_HEIGHT + Number(pinMain.style.top.slice(0, -2)));
    compareRooms();
  }
});

let roomNumber = document.getElementById(`room_number`);
let capacity = document.getElementById(`capacity`);

let compareRooms = function () {
  let paramRoom = Number(roomNumber.value);
  let paramCapacity = Number(capacity.value);
  if ((paramRoom === 100) && (paramCapacity !== 0)) {
    capacity.setCustomValidity(`Выберите не для гостей`);
    capacity.reportValidity();
  } else {
    if ((paramRoom !== 100) && (paramCapacity === 0)) {
      roomNumber.setCustomValidity(`Выберите 100 комнат`);
      roomNumber.reportValidity();
    }
    else {
      if ((paramRoom === 100) && (paramCapacity === 0)) {
        capacity.setCustomValidity(``);
        roomNumber.setCustomValidity(``);
      } else {
        if (paramCapacity > paramRoom) {
          capacity.setCustomValidity(`Не хватает мест для ` + capacity.value + ` гостей`);
          capacity.reportValidity();
        } else {
          capacity.setCustomValidity(``);
          roomNumber.setCustomValidity(``);
        }
      }
    }
  }
};

roomNumber.addEventListener(`change`, compareRooms);

capacity.addEventListener(`change`, compareRooms);
