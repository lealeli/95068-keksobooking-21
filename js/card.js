'use strict';

const CARD_LEFT_OFFSET = 50;
const CARD_TOP_OFFSET = 100;
const ARRAY_HOME = {
  HOUSE: `Дом`,
  PALACE: `Дворец`,
  FLAT: `Квартира`,
  BUNGALOW: `Бунгало`,
};
const ARRAY_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
let cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

window.card = {
  renderCard(advert) {
    let cardElement = cardTemplate.cloneNode(true);
    let popupAvatar = cardElement.querySelector(`.popup__avatar`);
    let popupTitle = cardElement.querySelector(`.popup__title`);
    let popupTextAddress = cardElement.querySelector(`.popup__text--address`);
    let popupTextPrice = cardElement.querySelector(`.popup__text--price`);
    let popupType = cardElement.querySelector(`.popup__type`);
    let popupTextCapacity = cardElement.querySelector(`.popup__text--capacity`);
    let popupTextTime = cardElement.querySelector(`.popup__text--time`);
    let popupFeatures = cardElement.querySelector(`.popup__features`);
    let popupDescription = cardElement.querySelector(`.popup__description`);
    let popupPhotos = cardElement.querySelector(`.popup__photos`);

    cardElement.style.left = CARD_LEFT_OFFSET + `px`;
    cardElement.style.top = CARD_TOP_OFFSET + `px`;

    if (advert.author.avatar) {
      popupAvatar.src = advert.author.avatar;
    } else {
      popupAvatar.remove();
    }

    if (advert.offer.title) {
      popupTitle.textContent = advert.offer.title;
    } else {
      popupTitle.remove();
    }

    if (advert.offer.address) {
      popupTextAddress.textContent = advert.offer.address;
    } else {
      popupTextAddress.remove();
    }

    if (advert.offer.price) {
      popupTextPrice.textContent = advert.offer.price + `₽/ночь`;
    } else {
      popupTextPrice.remove();
    }

    if (advert.offer.type) {
      switch (advert.offer.type) {
        case window.util.housingType.PALACE:
          popupType.textContent = ARRAY_HOME.PALACE;
          break;
        case window.util.housingType.BUNGALOW:
          popupType.textContent = ARRAY_HOME.BUNGALOW;
          break;
        case window.util.housingType.FLAT:
          popupType.textContent = ARRAY_HOME.FLAT;
          break;
        case window.util.housingType.HOUSE:
          popupType.textContent = ARRAY_HOME.HOUSE;
          break;
        default:
          window.console.error(`Wrong housing type`);
      }
    } else {
      popupType.remove();
    }

    if (advert.offer.rooms && advert.offer.guests) {
      popupTextCapacity.textContent = advert.offer.rooms + ` комнаты для ` + advert.offer.guests + ` гостей`;
    } else {
      popupTextCapacity.remove();
    }

    if (advert.offer.checkin && advert.offer.checkout) {
      popupTextTime.textContent = `Заезд после` + advert.offer.checkin + `, выезд до ` + advert.offer.checkout;
    } else {
      popupTextTime.remove();
    }

    if (advert.offer.features) {
      ARRAY_FEATURES.forEach((element) => {
        if (!advert.offer.features.some(function (value) {
          return value === element;
        })) {
          popupFeatures.removeChild(cardElement.querySelector(`.popup__feature--` + element));
        }
      }
      );
    } else {
      popupFeatures.remove();
    }

    if (advert.offer.description) {
      popupDescription.textContent = advert.offer.description;
    } else {
      popupDescription.remove();
    }

    function renderPhoto(ad) {
      let photo = cardElement.querySelector(`.popup__photo`).cloneNode(true);
      photo.src = ad;

      return photo;
    }

    if (advert.offer.photos) {
      let fragment = document.createDocumentFragment();
      advert.offer.photos.forEach((element) => fragment.appendChild(renderPhoto(element)));
      popupPhotos.appendChild(fragment);
      popupPhotos.removeChild(cardElement.querySelectorAll(`.popup__photo`)[0]);
    } else {
      popupPhotos.remove();
    }

    return cardElement;
  },

  activationCard(element) {
    let cardListElement = document.querySelector(`.map div:nth-child(1)`);
    let cardFragment = document.createDocumentFragment();
    cardFragment.appendChild(window.card.renderCard(element));
    cardListElement.appendChild(cardFragment);
  },

  closeCard(element) {
    element.querySelector(`.popup__close`).addEventListener(`click`, function () {
      element.remove();
    });

    document.body.addEventListener(`keydown`, function (evt) {
      window.util.isEscEvent(evt, function () {
        element.remove();
      });
    });
  }
};
