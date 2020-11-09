'use strict';

const PIN_WIDTH = 65;
const PIN_HEIGHT = 75;

window.formValidation = {
  compareRooms(roomNumber, capacity) {
    let paramRoom = Number(roomNumber.value);
    let paramCapacity = Number(capacity.value);
    if ((paramRoom === window.util.ROOM_NUMBER.HUNDRED_ROOM) && (paramCapacity !== window.util.CAPACITY_NUMBER.NOT_GUEST)) {
      capacity.setCustomValidity(`Выберите не для гостей`);
      capacity.reportValidity();
    } else {
      if ((paramRoom !== window.util.ROOM_NUMBER.HUNDRED_ROOM) && (paramCapacity === window.util.CAPACITY_NUMBER.NOT_GUEST)) {
        roomNumber.setCustomValidity(`Выберите 100 комнат`);
        roomNumber.reportValidity();
      } else {
        if ((paramRoom === window.util.ROOM_NUMBER.HUNDRED_ROOM) && (paramCapacity === window.util.CAPACITY_NUMBER.NOT_GUEST)) {
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
      case window.util.HOUSING_TYPE.HOUSE:
        price.setAttribute(`min`, 5000);
        price.setAttribute(`placeholder`, 5000);
        type.reportValidity();
        break;
      case window.util.HOUSING_TYPE.PALACE:
        price.setAttribute(`min`, 10000);
        price.setAttribute(`placeholder`, 10000);
        type.reportValidity();
        break;
      case window.util.HOUSING_TYPE.FLAT:
        price.setAttribute(`min`, 1000);
        price.setAttribute(`placeholder`, 1000);
        type.reportValidity();
        break;
      case window.util.HOUSING_TYPE.BUNGALOW:
        price.setAttribute(`min`, 0);
        price.setAttribute(`placeholder`, 0);
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
