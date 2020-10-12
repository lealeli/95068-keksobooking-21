'use strict';

(function () {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;

  window.pin = {
    renderPin(advert) {
      let mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
      let pinElement = mapPinTemplate.cloneNode(true);

      pinElement.style.left = advert.location.x - PIN_WIDTH / 2 + `px`;
      pinElement.style.top = advert.location.y - PIN_HEIGHT + `px`;
      pinElement.querySelector(`img`).src = advert.author.avatar;
      pinElement.querySelector(`img`).alt = advert.offer.title;

      return pinElement;
    },

    appendPin(adverts, pinList) {
      let fragment = document.createDocumentFragment();
      adverts.forEach((element) => fragment.appendChild(window.pin.renderPin(element)));
      pinList.appendChild(fragment);
    },

    eventClickPin(pinElements, adverts) {
      console.log(pinElements, adverts);
      for (let i = 0; i < pinElements.length; i++) {
        pinElements[i].addEventListener(`click`, function () {
          for (let j = 0; j < pinElements.length; j++) {
            if (i === j) {
              pinElements[j].classList.add(`.map__pin--active`);
            } else {
              pinElements[j].classList.remove(`.map__pin--active`);
            }
          }
          let popupOpening = document.querySelector(`.map__card`);
          if (popupOpening) {
            popupOpening.remove();
          }
          window.card.activationCard(adverts[i]);
          window.card.closeCard(document.querySelector(`.map__card`));
        });
      }
    }
  };
})();
