'use strict';

(function () {
  let URL = `https://21.javascript.pages.academy/keksobooking`;

  window.upload = function (data, onSuccess, onError) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === 200) {
        onSuccess();
        return;
      }

      onError();

    });

    xhr.addEventListener(`error`, function () {
      onError();
    });

    xhr.addEventListener(`timeout`, function () {
      onError();
    });

    xhr.timeout = 10000; // 10s

    xhr.open(`POST`, URL);
    xhr.send(data);
  };
})();
