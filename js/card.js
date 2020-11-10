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
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

const renderAvatar = (advert, cardElement) => {
  const popupAvatar = cardElement.querySelector(`.popup__avatar`);
  if (advert.author.avatar) {
    popupAvatar.src = advert.author.avatar;
  } else {
    popupAvatar.remove();
  }
};

const renderTitle = (advert, cardElement) => {
  const popupTitle = cardElement.querySelector(`.popup__title`);
  if (advert.offer.title) {
    popupTitle.textContent = advert.offer.title;
  } else {
    popupTitle.remove();
  }
};

const renderAddress = (advert, cardElement) => {
  const popupTextAddress = cardElement.querySelector(`.popup__text--address`);
  if (advert.offer.address) {
    popupTextAddress.textContent = advert.offer.address;
  } else {
    popupTextAddress.remove();
  }
};

const renderPrice = (advert, cardElement) => {
  const popupTextPrice = cardElement.querySelector(`.popup__text--price`);
  if (advert.offer.price) {
    popupTextPrice.textContent = advert.offer.price + `₽/ночь`;
  } else {
    popupTextPrice.remove();
  }
};

const renderType = (advert, cardElement) => {
  const popupType = cardElement.querySelector(`.popup__type`);
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
};

const renderCapacity = (advert, cardElement) => {
  const popupTextCapacity = cardElement.querySelector(`.popup__text--capacity`);
  if (advert.offer.rooms && advert.offer.guests) {
    popupTextCapacity.textContent = advert.offer.rooms + ` комнаты для ` + advert.offer.guests + ` гостей`;
  } else {
    popupTextCapacity.remove();
  }
};

const renderTime = (advert, cardElement) => {
  const popupTextTime = cardElement.querySelector(`.popup__text--time`);
  if (advert.offer.checkin && advert.offer.checkout) {
    popupTextTime.textContent = `Заезд после` + advert.offer.checkin + `, выезд до ` + advert.offer.checkout;
  } else {
    popupTextTime.remove();
  }
};

const renderFeatures = (advert, cardElement) => {
  const popupFeatures = cardElement.querySelector(`.popup__features`);
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
};

const renderDescription = (advert, cardElement) => {
  const popupDescription = cardElement.querySelector(`.popup__description`);
  if (advert.offer.description) {
    popupDescription.textContent = advert.offer.description;
  } else {
    popupDescription.remove();
  }
};

const renderPhoto = (ad, cardElement) => {
  const photo = cardElement.querySelector(`.popup__photo`).cloneNode(true);
  photo.src = ad;

  return photo;
};

const renderCardPhoto = (advert, cardElement) => {
  const popupPhotos = cardElement.querySelector(`.popup__photos`);
  if (advert.offer.photos) {
    const fragment = document.createDocumentFragment();
    advert.offer.photos.forEach((element) => fragment.appendChild(renderPhoto(element, cardElement)));
    popupPhotos.appendChild(fragment);
    popupPhotos.removeChild(cardElement.querySelectorAll(`.popup__photo`)[0]);
  } else {
    popupPhotos.remove();
  }
};

window.card = {
  renderCard: (advert) => {
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.style.left = CARD_LEFT_OFFSET + `px`;
    cardElement.style.top = CARD_TOP_OFFSET + `px`;

    renderAvatar(advert, cardElement);
    renderTitle(advert, cardElement);
    renderAddress(advert, cardElement);
    renderPrice(advert, cardElement);
    renderType(advert, cardElement);
    renderCapacity(advert, cardElement);
    renderTime(advert, cardElement);
    renderFeatures(advert, cardElement);
    renderDescription(advert, cardElement);
    renderCardPhoto(advert, cardElement);

    return cardElement;
  },

  activationCard: (element) => {
    const cardListElement = document.querySelector(`.map div:nth-child(1)`);
    const cardFragment = document.createDocumentFragment();
    cardFragment.appendChild(window.card.renderCard(element));
    cardListElement.appendChild(cardFragment);
  },

  closeCard: (element) => {
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
