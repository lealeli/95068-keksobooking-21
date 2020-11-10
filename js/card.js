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

const renderAvatar = ({offer: {avatar}}, cardElement) => {
  const popupAvatar = cardElement.querySelector(`.popup__avatar`);
  if (avatar) {
    popupAvatar.src = avatar;
  } else {
    popupAvatar.remove();
  }
};

const renderTitle = ({offer: {title}}, cardElement) => {
  const popupTitle = cardElement.querySelector(`.popup__title`);
  if (title) {
    popupTitle.textContent = title;
  } else {
    popupTitle.remove();
  }
};

const renderAddress = ({offer: {address}}, cardElement) => {
  const popupTextAddress = cardElement.querySelector(`.popup__text--address`);
  if (address) {
    popupTextAddress.textContent = address;
  } else {
    popupTextAddress.remove();
  }
};

const renderPrice = ({offer: {price}}, cardElement) => {
  const popupTextPrice = cardElement.querySelector(`.popup__text--price`);
  if (price) {
    popupTextPrice.textContent = price + `₽/ночь`;
  } else {
    popupTextPrice.remove();
  }
};

const renderType = ({offer: {type}}, cardElement) => {
  const popupType = cardElement.querySelector(`.popup__type`);
  if (type) {
    switch (type) {
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

const renderCapacity = ({offer: {rooms, guests}}, cardElement) => {
  const popupTextCapacity = cardElement.querySelector(`.popup__text--capacity`);
  if (rooms && guests) {
    popupTextCapacity.textContent = rooms + ` комнаты для ` + guests + ` гостей`;
  } else {
    popupTextCapacity.remove();
  }
};

const renderTime = ({offer: {checkin, checkout}}, cardElement) => {
  const popupTextTime = cardElement.querySelector(`.popup__text--time`);
  if (checkin && checkout) {
    popupTextTime.textContent = `Заезд после` + checkin + `, выезд до ` + checkout;
  } else {
    popupTextTime.remove();
  }
};

const renderFeatures = ({offer: {features}}, cardElement) => {
  const popupFeatures = cardElement.querySelector(`.popup__features`);
  if (features) {
    ARRAY_FEATURES.forEach((element) => {
      if (!features.some(function (value) {
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

const renderDescription = ({offer: {description}}, cardElement) => {
  const popupDescription = cardElement.querySelector(`.popup__description`);
  if (description) {
    popupDescription.textContent = description;
  } else {
    popupDescription.remove();
  }
};

const renderPhoto = (ad, cardElement) => {
  const photo = cardElement.querySelector(`.popup__photo`).cloneNode(true);
  photo.src = ad;

  return photo;
};

const renderCardPhoto = ({offer: {photos}}, cardElement) => {
  const popupPhotos = cardElement.querySelector(`.popup__photos`);
  if (photos) {
    const fragment = document.createDocumentFragment();
    photos.forEach((element) => fragment.appendChild(renderPhoto(element, cardElement)));
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
