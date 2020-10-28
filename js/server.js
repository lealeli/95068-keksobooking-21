'use strict';

(function () {
  window.load = function (url, onSuccess, onError) {
    let xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      let error;
      switch (xhr.status) {
        case window.util.SERVER_ANSWER.SUCCESS:
          onSuccess(xhr.response);
          break;

        case window.util.SERVER_ANSWER.BAD_REQUEST:
          error = `Неверный запрос`;
          break;
        case window.util.SERVER_ANSWER.NOT_AUTHORIZED:
          error = `Пользователь не авторизован`;
          break;
        case window.util.SERVER_ANSWER.NOT_FOUND_ERROR:
          error = `Ничего не найдено`;
          break;

        default:
          error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = window.util.SERVER_ANSWER.TIMEOUT_SERVER; // 10s

    xhr.open(`GET`, url);
    xhr.send();
  };
})();
