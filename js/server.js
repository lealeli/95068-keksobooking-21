'use strict';

window.ajax = (url, method, onSuccess, onError, data) => {
  const xhr = new XMLHttpRequest();

  xhr.responseType = `json`;

  xhr.addEventListener(`load`, function () {
    let error;
    switch (xhr.status) {
      case window.util.serverAnswer.SUCCESS:
        onSuccess(xhr.response);
        break;

      case window.util.serverAnswer.BAD_REQUEST:
        error = `Неверный запрос`;
        break;
      case window.util.serverAnswer.NOT_AUTHORIZED:
        error = `Пользователь не авторизован`;
        break;
      case window.util.serverAnswer.NOT_FOUND_ERROR:
        error = `Ничего не найдено`;
        break;

      default:
        error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
    }

    if (error) {
      onError(error);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  xhr.timeout = window.util.serverAnswer.TIMEOUT_SERVER; // 10s

  xhr.open(method, url);
  xhr.send(data);
};

