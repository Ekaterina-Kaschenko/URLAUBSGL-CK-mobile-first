(function () {
  'use strict'
  var button = document.getElementsByClassName('interest__button')[0];
  var input = document.getElementsByClassName('interest__input')[0];
  // var container = document.getElementsByClassName('container')[0];

  button.addEventListener('click', function () {
    checkingEmptyValues();
  });

  input.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  })

  input.addEventListener('keyup', function (event) {
    event = event || window.event;
    if (event.keyCode == 13) {
      checkingEmptyValues();
    }
  });

  function checkingEmptyValues () {
    if (input.value.trim() === '') {
      input.value = '';
      alert ('Введите поисковой запрос');
    } else {
      apiRequest();
    }
  }

  function apiRequest() {
    var API_KEY = '3347815-19a83d652fee52d8698f16eb6';
    var text = input.value;
    var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(text);
    var items = document.querySelectorAll('.activity__item');
    var request = new XMLHttpRequest();
    request.open('GET', URL, true);

    var str;

    request.onload = function(data) {
      if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.responseText);
        console.log(data.hits[0].userImageURL);
        Array.prototype.forEach.call(items, function(item, index) {
          str = data.hits[index].userImageURL;
          console.log(typeof str);
          item.style.background = "url('" + str + "') no-repeat";
          item.style.backgroundSize = 'cover';
        });

      } else {
        alert('Введите строку без ошибок, результатов по вашему запросу нет');
      }
    };
    request.send();
  }
})();