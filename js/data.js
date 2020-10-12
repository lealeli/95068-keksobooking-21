'use strict';

(function () {
  const ARRAY_TITLE = [`Жилье в центре`, `Лучшее место на берегу`, `В горах с красивым видом`, `Рядом с ТЦ`, `Видовое жилье`];
  const ARRAY_TYPE = [`palace`, `flat`, `house`, `bungalow`];
  const ARRAY_TIME = [`12:00`, `13:00`, `14:00`];
  const ARRAY_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const ARRAY_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

  window.data = {
    advertRandom(count) {
      const advert = [];

      for (let i = 0; i < count; i++) {
        advert.push({
          author: {
            avatar: `img/avatars/user0` + (i + 1) + `.png`
          },
          offer: {
            title: ARRAY_TITLE[window.util.getRandomInt(0, ARRAY_TITLE.length - 1)],
            address: window.util.getRandomInt(0, 1000) + `, ` + window.util.getRandomInt(0, 1000),
            price: window.util.getRandomInt(500, 100000),
            type: ARRAY_TYPE[window.util.getRandomInt(0, ARRAY_TYPE.length - 1)],
            rooms: window.util.getRandomInt(1, 5),
            guests: window.util.getRandomInt(1, 5),
            checkin: ARRAY_TIME[window.util.getRandomInt(0, ARRAY_TIME.length - 1)],
            checkout: ARRAY_TIME[window.util.getRandomInt(0, ARRAY_TIME.length - 1)],
            features: ARRAY_FEATURES.slice(0, window.util.getRandomInt(1, ARRAY_FEATURES.length + 1)),
            description: `Самое лучше место для проведения вашего отдыха. Наше жилье расположено близко ко всем достопримечательностям, паркам, метро и остановкам другого общественного транспорта`,
            photos: ARRAY_PHOTOS.slice(0, window.util.getRandomInt(1, ARRAY_PHOTOS.length + 1))
          },
          location: {
            x: window.util.getRandomInt(130, 1030),
            y: window.util.getRandomInt(130, 630)
          }
        });
      }

      return advert;
    }
  };
})();
