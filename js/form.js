'use strict';

(function () {
  window.formValidation = {
    compareRooms(roomNumber, capacity) {
      let paramRoom = Number(roomNumber.value);
      let paramCapacity = Number(capacity.value);
      if ((paramRoom === 100) && (paramCapacity !== 0)) {
        capacity.setCustomValidity(`Выберите не для гостей`);
        capacity.reportValidity();
      } else {
        if ((paramRoom !== 100) && (paramCapacity === 0)) {
          roomNumber.setCustomValidity(`Выберите 100 комнат`);
          roomNumber.reportValidity();
        } else {
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
    },

    timeValidation(timeChange, timeStay) {
      if (timeChange.value !== timeStay.value) {
        timeStay.value = timeChange.value;
      }
    },

    typeHouseValidation(type, price) {
      switch (type.value) {
        case `house`:
          price.setAttribute(`min`, 5000);
          price.setAttribute(`placeholder`, 5000);
          type.reportValidity();
          break;
        case `palace`:
          price.setAttribute(`min`, 10000);
          price.setAttribute(`placeholder`, 10000);
          type.reportValidity();
          break;
        case `flat`:
          price.setAttribute(`min`, 1000);
          price.setAttribute(`placeholder`, 1000);
          type.reportValidity();
          break;
        default:
          price.setAttribute(`min`, 0);
          price.setAttribute(`placeholder`, 0);
          type.reportValidity();
      }
    },

    addressValidation(addressInput, pinMain) {
      const PIN_WIDTH = 50;
      addressInput[0].value = PIN_WIDTH / 2 + Number(pinMain.style.left.slice(0, -2)) + `, ` + (PIN_WIDTH / 2 + Number(pinMain.style.top.slice(0, -2)));
    },

    addressValidationActive(addressInput, pinMain) {
      const PIN_WIDTH = 50;
      const PIN_HEIGHT = 70;
      addressInput[0].value = PIN_WIDTH / 2 + Number(pinMain.style.left.slice(0, -2)) + `, ` + (PIN_HEIGHT / 2 + Number(pinMain.style.top.slice(0, -2)));
    }
  };
})();
