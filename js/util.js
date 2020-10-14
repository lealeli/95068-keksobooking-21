'use strict';

(function () {
  window.util = {
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min), 1) + min;
    },

    HOUSING_TYPE: {
      HOUSE: `house`,
      PALACE: `palace`,
      FLAT: `flat`,
      BUNGALOW: `bungalow`
    },

    ROOM_NUMBER: {
      ONE_ROOM: 1,
      TWO_ROOM: 2,
      THREE_ROOM: 3,
      HUNDRED_ROOM: 100
    },

    CAPACITY_NUMBER: {
      ONE_GUEST: 1,
      TWO_GUEST: 2,
      THREE_GUEST: 3,
      NOT_GUEST: 0
    }
  };
})();
