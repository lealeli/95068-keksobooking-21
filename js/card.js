'use strict';

(function () {
  const ARRAY_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  let cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

  window.card = {
    renderCard(advert) {
      let cardElement = cardTemplate.cloneNode(true);

      cardElement.style.left = advert.location.x + `px`;
      cardElement.style.top = advert.location.y + `px`;

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
        ARRAY_FEATURES.forEach((element) => {
          if (!advert.offer.features.some(function (value) {
            return value === element;
          })) {
            cardElement.querySelector(`.popup__features`).removeChild(cardElement.querySelector(`.popup__feature--` + element));
          }
        }
        );
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
        let fragment = document.createDocumentFragment();
        advert.offer.photos.forEach((element) => fragment.appendChild(renderPhoto(element)));
        cardElement.querySelector(`.popup__photos`).appendChild(fragment);
        cardElement.querySelector(`.popup__photos`).removeChild(cardElement.querySelectorAll(`.popup__photo`)[0]);
      } else {
        cardElement.querySelector(`.popup__photos`).remove();
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
    }
  };
})();
