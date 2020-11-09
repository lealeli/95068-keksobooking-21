'use strict';

let pinMain = document.querySelector(`.map__pin--main`);
let addressInput = document.getElementsByName(`address`);
let roomNumber = document.getElementById(`room_number`);
let capacity = document.getElementById(`capacity`);
let timeIn = document.getElementById(`timein`);
let timeOut = document.getElementById(`timeout`);
let price = document.getElementById(`price`);
let type = document.getElementById(`type`);

window.formValidation.addressValidation(addressInput, pinMain);
window.formValidation.compareRooms(roomNumber, capacity);
window.formValidation.timeValidation(timeIn, timeOut);
window.formValidation.typeHouseValidation(type, price);

roomNumber.addEventListener(`change`, function () {
  window.formValidation.compareRooms(roomNumber, capacity);
});

capacity.addEventListener(`change`, function () {
  window.formValidation.compareRooms(roomNumber, capacity);
});

timeIn.addEventListener(`change`, function () {
  window.formValidation.timeValidation(timeIn, timeOut);
});

timeOut.addEventListener(`change`, function () {
  window.formValidation.timeValidation(timeOut, timeIn);
});

type.addEventListener(`change`, function () {
  window.formValidation.typeHouseValidation(type, price);
});

