'use strict'

var Search;
Search = (function () {
  var _button, _input;
  var _elements;

  _button = document.getElementsByClassName('interest__button')[0];
  _input = document.getElementsByClassName('interest__input')[0];

  function Search () {
    this.init();
    this.elements = _elements();
  }

  _elements = function() {
    var elements = document.getElementsByClassName('activity__item');
    return Object.keys(elements).map(function (key) { return elements[key]; });
  };

  Search.prototype.init = function() {
    this.initEvent();
  };

  Search.prototype.initEvent = function () {
    _button.addEventListener('click', function () {
      checkingEmptyValues();
    });

    _input.addEventListener('keydown', function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
      }
    });

    _input.addEventListener('keyup', function (event) {
      event = event || window.event;
      if (event.keyCode == 13) {
        checkingEmptyValues();
      }
    });

    function checkingEmptyValues (text) {
      var text = _input.value;
      if (text.trim() === '') {
        text = '';
        alert ('Введите поисковой запрос');
      } else {
        apiRequest(text);
      }
    }
  }

  return Search;
})();

new Search();

function apiRequest(text) {
  var _API_KEY, _URL, _items, _request, _str, _title;

  _API_KEY = '3347815-19a83d652fee52d8698f16eb6';
  _URL = "https://pixabay.com/api/?key="+_API_KEY+"&q="+encodeURIComponent(text);
  _items = document.querySelectorAll('.activity__item');
  _title = document.querySelectorAll('.activity__title');
  _request = new XMLHttpRequest();
  _request.open('GET', _URL, true);

  _request.onload = function(data) {
    if (_request.status >= 200 && _request.status < 400) {
      var data = JSON.parse(_request.responseText);
      console.log(data.hits.length);

      if (data.hits.length < 7) {
        alert('Введите запрос без ошибок');
      } else {
        Array.prototype.forEach.call(_items, function(item, index) {
          _str = data.hits[index].webformatURL;
          item.style.background = "url('" + _str + "') no-repeat";
          item.style.backgroundSize = 'cover';
        });
      }

      Array.prototype.forEach.call(_title, function(item, index) {
        item.style.display = 'none';
      });

    } else {
      alert('Введите строку без ошибок, результатов по вашему запросу нет');
    }
  };
  _request.send();
}