'use strict';

const ARRAY_TITLE = [`Жилье в центре`, `Лучшее место на берегу`, `В горах с красивым видом`, `Рядом с ТЦ`, `Видовое жилье`];
const ARRAY_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const ARRAY_TIME = [`12:00`, `13:00`, `14:00`];
const ARRAY_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const ARRAY_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min), 1) + min;
}

function advertRandom() {
  let advert = [7];

  for (let i = 0; i < 8; i++) {
    advert[i] = {
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
    };
  }

  return advert;
}
let adverts = advertRandom();

document.querySelector(`.map`).classList.remove(`map--faded`);

let pinListElement = document.querySelector(`.map__pins`);
let mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

function renderAdvert(advert) {
  let pinElement = mapPinTemplate.cloneNode(true);

  pinElement.style.left = advert.location.x - 25 + `px`;
  pinElement.style.top = advert.location.y - 70 + `px`;
  pinElement.querySelector(`img`).src = advert.author.avatar;
  pinElement.querySelector(`img`).alt = advert.offer.title;

  return pinElement;
}

let fragment = document.createDocumentFragment();
for (let i = 0; i < adverts.length; i++) {
  fragment.appendChild(renderAdvert(adverts[i]));
}

pinListElement.appendChild(fragment);

let cardListElement = document.querySelector(`.map div:nth-child(1)`);
let cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

function renderCard(advert) {
  let cardElement = cardTemplate.cloneNode(true);

  if (advert.author.avatar) {
    cardElement.querySelector(`.popup__avatar`).src = advert.author.avatar;
  } else {
    cardElement.querySelector(`.popup__avatar`).remove();
  }

  if (advert.offer.title) {
    cardElement.querySelector(`.popup__title`).innerHTML = advert.offer.title;
  } else {
    cardElement.querySelector(`.popup__title`).remove();
  }

  if (advert.offer.address) {
    cardElement.querySelector(`.popup__text--address`).innerHTML = advert.offer.address;
  } else {
    cardElement.querySelector(`.popup__text--address`).remove();
  }

  if (advert.offer.price) {
    cardElement.querySelector(`.popup__text--price`).innerHTML = advert.offer.price + `₽/ночь`;
  } else {
    cardElement.querySelector(`.popup__text--price`).remove();
  }

  if (advert.offer.type) {
    switch (advert.offer.type) {
      case `palace`:
        cardElement.querySelector(`.popup__type`).innerHTML = `Дворец`;
        break;
      case `bungalow`:
        cardElement.querySelector(`.popup__type`).innerHTML = `Дворец`;
        break;
      case `flat`:
        cardElement.querySelector(`.popup__type`).innerHTML = `Квартира`;
        break;
      default:
        cardElement.querySelector(`.popup__type`).innerHTML = `Дом`;
    }
  } else {
    cardElement.querySelector(`.popup__type`).remove();
  }

  if (advert.offer.rooms && advert.offer.guests) {
    cardElement.querySelector(`.popup__text--capacity`).innerHTML = advert.offer.rooms + ` комнаты для ` + advert.offer.guests + ` гостей`;
  } else {
    cardElement.querySelector(`.popup__text--capacity`).remove();
  }

  if (advert.offer.checkin && advert.offer.checkout) {
    cardElement.querySelector(`.popup__text--time`).innerHTML = `Заезд после` + advert.offer.checkin + `, выезд до ` + advert.offer.checkout;
  } else {
    cardElement.querySelector(`.popup__text--time`).remove();
  }

  if (advert.offer.features) {
    for (let i = 0; i < ARRAY_FEATURES.length; i++) {
      if (!advert.offer.features.some(function (value) {
        return value === ARRAY_FEATURES[i];
      })) {
        cardElement.querySelector(`.popup__features`).removeChild(cardElement.querySelector(`.popup__feature--` + ARRAY_FEATURES[i]));
      }
    }
  } else {
    cardElement.querySelector(`.popup__features`).remove();
  }

  if (advert.offer.description) {
    cardElement.querySelector(`.popup__description`).innerHTML = advert.offer.description;
  } else {
    cardElement.querySelector(`.popup__description`).remove();
  }

  function renderPhoto(ad) {
    let photo = cardElement.querySelector(`.popup__photo`).cloneNode(true);
    photo.src = ad;

    return photo;
  }

  if (advert.offer.photos) {
    for (let i = 0; i < advert.offer.photos.length; i++) {
      fragment.appendChild(renderPhoto(advert.offer.photos[i]));
    }
    cardElement.querySelector(`.popup__photos`).appendChild(fragment);
    cardElement.querySelector(`.popup__photos`).removeChild(cardElement.querySelectorAll(`.popup__photo`)[0]);
  } else {
    cardElement.querySelector(`.popup__photos`).remove();
  }

  return cardElement;
}

let cardFragment = document.createDocumentFragment();
cardFragment.appendChild(renderCard(adverts[0]));
cardListElement.appendChild(cardFragment);
