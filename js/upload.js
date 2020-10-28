'use strict';

(function () {
  let URL = `https://21.javascript.pages.academy/keksobooking`;

  window.upload = function (data, onSuccess, onError) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === window.util.SERVER_ANSWER.SUCCESS) {
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

    xhr.timeout = window.util.SERVER_ANSWER.TIMEOUT_SERVER; // 10s

    xhr.open(`POST`, URL);
    xhr.send(data);
  };
})();
