'use strict';

const ESC_KEY = `Escape`;
const DEBOUNCE_INTERVAL = 500;
let lastTimeout;

window.util = {
  isEscEvent(evt, action) {
    if (evt.key === ESC_KEY) {
      action();
    }
  },

  debounce(cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  },

  housingType: {
    HOUSE: `house`,
    PALACE: `palace`,
    FLAT: `flat`,
    BUNGALOW: `bungalow`,
    ANY: `any`
  },

  roomNumber: {
    ONE_ROOM: 1,
    TWO_ROOM: 2,
    THREE_ROOM: 3,
    HUNDRED_ROOM: 100,
    ANY: `any`
  },

  capacityNumber: {
    ONE_GUEST: 1,
    TWO_GUEST: 2,
    THREE_GUEST: 3,
    NOT_GUEST: 0,
    ANY: `any`
  },

  serverAnswer: {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    NOT_AUTHORIZED: 401,
    NOT_FOUND_ERROR: 404,
    TIMEOUT_SERVER: 10000
  },

  housingPrice: {
    LOW: `low`,
    MIDDLE: `middle`,
    HIGH: `high`,
    ANY: `any`
  }
};

