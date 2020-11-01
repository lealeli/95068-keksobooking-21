'use strict';

let pinMain = document.querySelector(`.map__pin--main`);

let addressInput = document.getElementsByName(`address`);
window.formValidation.addressValidation(addressInput, pinMain);

let roomNumber = document.getElementById(`room_number`);
let capacity = document.getElementById(`capacity`);

roomNumber.addEventListener(`change`, function () {
  window.formValidation.compareRooms(roomNumber, capacity);
});

capacity.addEventListener(`change`, function () {
  window.formValidation.compareRooms(roomNumber, capacity);
});

let timeIn = document.getElementById(`timein`);
let timeOut = document.getElementById(`timeout`);

timeIn.addEventListener(`change`, function () {
  window.formValidation.timeValidation(timeIn, timeOut);
});

timeOut.addEventListener(`change`, function () {
  window.formValidation.timeValidation(timeOut, timeIn);
});

let price = document.getElementById(`price`);
let type = document.getElementById(`type`);

type.addEventListener(`change`, function () {
  window.formValidation.typeHouseValidation(type, price);
});

