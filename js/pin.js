'use strict';

const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;

window.pin = {
  render: (advert) => {
    const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    const pinElement = mapPinTemplate.cloneNode(true);

    pinElement.style.left = advert.location.x - PIN_WIDTH / 2 + `px`;
    pinElement.style.top = advert.location.y - PIN_HEIGHT + `px`;
    pinElement.querySelector(`img`).src = advert.author.avatar;
    pinElement.querySelector(`img`).alt = advert.offer.title;

    return pinElement;
  },

  append: (adverts, pinList) => {
    const pinArrays = [];
    const fragment = document.createDocumentFragment();
    adverts.forEach(function (element) {
      const pin = window.pin.render(element);
      fragment.appendChild(pin);
      pinArrays.push(pin);
    });
    pinList.appendChild(fragment);

    return pinArrays;
  },

  eventClick: (pinElements, adverts) => {
    pinElements.forEach((elementI, i) => elementI.addEventListener(`click`, function () {
      pinElements.forEach((elementJ, j) => {
        if (i === j) {
          elementJ.classList.add(`.map__pin--active`);
        } else {
          elementJ.classList.remove(`.map__pin--active`);
        }
      });

      const popupOpening = document.querySelector(`.map__card`);
      if (popupOpening) {
        popupOpening.remove();
      }

      window.card.activationCard(adverts[i]);
      window.card.closeCard(document.querySelector(`.map__card`));
    })
    );

  }
};

