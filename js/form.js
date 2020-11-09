'use strict';

const PIN_WIDTH = 65;
const PIN_HEIGHT = 75;
const MIN_PRICE_BUNGALOW = 0;
const MIN_PRICE_FLAT = 1000;
const MIN_PRICE_HOUSE = 5000;
const MIN_PRICE_PALACE = 10000;

window.formValidation = {
  compareRooms(roomNumber, capacity) {
    let paramRoom = Number(roomNumber.value);
    let paramCapacity = Number(capacity.value);
    if ((paramRoom === window.util.roomNumber.HUNDRED_ROOM) && (paramCapacity !== window.util.capacityNumber.NOT_GUEST)) {
      capacity.setCustomValidity(`Выберите не для гостей`);
      capacity.reportValidity();
    } else {
      if ((paramRoom !== window.util.roomNumber.HUNDRED_ROOM) && (paramCapacity === window.util.capacityNumber.NOT_GUEST)) {
        roomNumber.setCustomValidity(`Выберите 100 комнат`);
        roomNumber.reportValidity();
      } else {
        if ((paramRoom === window.util.roomNumber.HUNDRED_ROOM) && (paramCapacity === window.util.capacityNumber.NOT_GUEST)) {
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
  },

  timeValidation(timeChange, timeStay) {
    if (timeChange.value !== timeStay.value) {
      timeStay.value = timeChange.value;
    }
  },

  typeHouseValidation(type, price) {
    switch (type.value) {
      case window.util.housingType.HOUSE:
        price.setAttribute(`min`, MIN_PRICE_HOUSE);
        price.setAttribute(`placeholder`, MIN_PRICE_HOUSE);
        type.reportValidity();
        break;
      case window.util.housingType.PALACE:
        price.setAttribute(`min`, MIN_PRICE_PALACE);
        price.setAttribute(`placeholder`, MIN_PRICE_PALACE);
        type.reportValidity();
        break;
      case window.util.housingType.FLAT:
        price.setAttribute(`min`, MIN_PRICE_FLAT);
        price.setAttribute(`placeholder`, MIN_PRICE_FLAT);
        type.reportValidity();
        break;
      case window.util.housingType.BUNGALOW:
        price.setAttribute(`min`, MIN_PRICE_BUNGALOW);
        price.setAttribute(`placeholder`, MIN_PRICE_BUNGALOW);
        type.reportValidity();
        break;
      default:
        window.console.error(`Wrong housing type`);
    }
  },

  addressValidation(addressInput, pinMain) {
    addressInput[0].value = Math.round(PIN_WIDTH / 2 + Number(pinMain.style.left.slice(0, -2))) + `, ` + Math.round(PIN_WIDTH / 2 + Number(pinMain.style.top.slice(0, -2)));
  },

  addressValidationActive(addressInput, pinMain) {
    addressInput[0].value = Math.round(PIN_WIDTH / 2 + Number(pinMain.style.left.slice(0, -2))) + `, ` + Math.round(PIN_HEIGHT + Number(pinMain.style.top.slice(0, -2)));
  }
};
