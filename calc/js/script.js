'use strict';

const inputRub = document.querySelector('#rub'),
      inputUsd = document.querySelector('#usd');

inputRub.addEventListener('input', () => {
    const request = new XMLHttpRequest();
    //методы объекта request.open(method, url, async, login, pass);
    request.open('GET', 'js/current.json'); // настройка 
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8'); // донастройка
    request.send(); // отправка запроса 

    request.addEventListener('readystatechange', () => {
        if (request.readyState === 4 && request.status === 200) { //если наш запрос загрузился и выдал успешно то
            console.log(request.response)  // выдаст объект из current.json
            const data = JSON.parse(request.response) // изменили его на обычный js объект
            inputUsd.value = (+inputRub.value / data.current.usd).toFixed(2) // в окошко бачинских вводим рубли разделенные на курс доллара, оставляем 2 знака после точки
        } else {
            inputUsd.value = 'Что-то пошло не так'; // Никогда не оставляем пользователя в недоразумении 
        }
    })

    // свойства объекта
    // status https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%BA%D0%BE%D0%B4%D0%BE%D0%B2_%D1%81%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D1%8F_HTTP 100 info 200 успешно 300 перенаправление 400 ошибка клиента 500 ошибка сервера
    // statusText - текст к коду ошибки
    // response - ответ от сервера
    // readyState - текущее состояние нашего запроса 0-4 0 - объект был создан, петод open() еще не вызывался, 1 - метод open() был вызвaн, 2 - доступны заголовки и статус, 3 заглузка, 4 - done

    // события 
    // onreadystatechange - отслеживает статус готовности нашего запроса в данный момент(свойство readyState 0-4)
    //load - полностью загрузился запрос (readyState==4)


})