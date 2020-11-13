'use strict';

const pinMain = document.querySelector(`.map__pin--main`);
const addressInput = document.getElementsByName(`address`);
const roomNumber = document.getElementById(`room_number`);
const capacity = document.getElementById(`capacity`);
const timeIn = document.getElementById(`timein`);
const timeOut = document.getElementById(`timeout`);
const price = document.getElementById(`price`);
const type = document.getElementById(`type`);

window.formValidation.addressValidation(addressInput, pinMain);
window.formValidation.compareRooms(roomNumber, capacity);
window.formValidation.timeValidation(timeIn, timeOut);
window.formValidation.typeHouseValidation(type, price);

roomNumber.addEventListener(`change`, () => {
  window.formValidation.compareRooms(roomNumber, capacity);
});

capacity.addEventListener(`change`, () => {
  window.formValidation.compareRooms(roomNumber, capacity);
});

timeIn.addEventListener(`change`, () => {
  window.formValidation.timeValidation(timeIn, timeOut);
});

timeOut.addEventListener(`change`, () => {
  window.formValidation.timeValidation(timeOut, timeIn);
});

type.addEventListener(`change`, () => {
  window.formValidation.typeHouseValidation(type, price);
});

