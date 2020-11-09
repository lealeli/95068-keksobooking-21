'use strict';

const URL_UPLOAD = `https://21.javascript.pages.academy/keksobooking123`;

window.upload = function (data, onSuccess, onError) {
  let xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, function () {
    if (xhr.status === window.util.serverAnswer.SUCCESS) {
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

  xhr.timeout = window.util.serverAnswer.TIMEOUT_SERVER; // 10s

  xhr.open(`POST`, URL_UPLOAD);
  xhr.send(data);
};
