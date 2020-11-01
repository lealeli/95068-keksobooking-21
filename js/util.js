'use strict';

(function () {
  const ESC_KEY = `Escape`;
  const DEBOUNCE_INTERVAL = 500;
  let lastTimeout;

  window.util = {
    isEscEvent(evt, action) {
      if (evt.key === ESC_KEY) {
        action();
      }
    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min), 1) + min;
    },

    debounce(cb) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
    },

    HOUSING_TYPE: {
      HOUSE: `house`,
      PALACE: `palace`,
      FLAT: `flat`,
      BUNGALOW: `bungalow`,
      ANY: `any`
    },

    ROOM_NUMBER: {
      ONE_ROOM: 1,
      TWO_ROOM: 2,
      THREE_ROOM: 3,
      HUNDRED_ROOM: 100,
      ANY: `any`
    },

    CAPACITY_NUMBER: {
      ONE_GUEST: 1,
      TWO_GUEST: 2,
      THREE_GUEST: 3,
      NOT_GUEST: 0,
      ANY: `any`
    },

    SERVER_ANSWER: {
      SUCCESS: 200,
      BAD_REQUEST: 400,
      NOT_AUTHORIZED: 401,
      NOT_FOUND_ERROR: 404,
      TIMEOUT_SERVER: 10000
    },

    HOUSING_PRICE: {
      LOW: `low`,
      MIDDLE: `middle`,
      HIGH: `high`,
      ANY: `any`
    }
  };
})();
