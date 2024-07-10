//Полифилл для метода forEach для Nodelist

if ('NodeList' in window && !NodeList.prototype.forEach) {
  console.info('polyfill for IE11');
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}






//Переменные для выбора кнопок и иконок в header

const navBtn = document.querySelectorAll('.nav__icon-button');
const navIcon = document.querySelectorAll('.nav-icon');
const nav = document.querySelector('.flex-row');

// Определение функции  для клика по пунктам меню в header. Меняем иконку на крестик и обратно
function handleLinkClick() {
  nav.classList.toggle('header__top-row--mobile');
  navIcon.forEach(function (icon) {
    icon.classList.toggle('nav-icon--active');
  })
  // Определение функции  для изменения иконки на крестик
}
function changeIcon() {
  navIcon.forEach(function (icon) {
    icon.classList.toggle('nav-icon--active');
  })
}
//Функция смены иконки при нажатии на кнопку меню мобильной навигации
navBtn.forEach(function (btn) {
  btn.addEventListener('click', changeIcon)// обработчик событий с применением функцци изменения иконки
})

//Включение мобильного меню при нажатии на кнопку мобильной навигации

navBtn.forEach(function (btn) { //Метод перебора всех кнопок 
  btn.addEventListener('click', function () {
    nav.classList.toggle('header__top-row--mobile'); //включение мобильного меню по щелчку по кнопке
    document.body.classList.toggle('no-scroll');  //добавляем носкролл класс для невозможности скролла на заднем фоне
    const links = document.querySelectorAll('.header__top-row--mobile a') // выбираем все ссылки, находящиеся в мобильном меню
    links.forEach(function (l) {
      // привязать событие клик на все ссылки 
      l.addEventListener('click', handleLinkClick // вызываем функцию обработки клика при нажатии
      )
      document.body.classList.toggle('no-scroll'); //добавляем носкролл класс для невозможности скролла на заднем фоне
    })
  })
})

//Пропабдает кнопка мобильной навигации при скролле
window.onscroll = function () { myFunction() };
function myFunction() {
  if (scrollY > 50) {
    navBtn[1].classList.add("none"); //добавляем класс none только ко второму элементу массива найденных кнопок
  } if (scrollY < 50 + 1) {
    navBtn[1].classList.remove("none");
  }
  // Получить header по id
  let header = document.getElementById("myHeader");


  // Get the offset position of the navbar
  let sticky = header.offsetTop;

  // Добавить класс Sticky как только достигнем начальной позиции скрола и убираем класс когда прокручиваем вверх до этой позиции

  if (scrollY > sticky) {
    header.classList.remove('none');
    header.classList.add("sticky");
  } if (scrollY < 200 + 1) {
    header.classList.add('none');
    header.classList.remove("sticky");
  }
}
// При скролле вызываем функцию для скрытия кнопки меню мобильной навигации и вызова мобильного меню прокручиваемого
window.onscroll = function () { myFunction() };

//Переключение табов в меню выбора
const tabsBtns = document.querySelectorAll('[data-tab'); //выбираем все табы с идентификатором data tab
for (let btn of tabsBtns) {

  btn.addEventListener('click', function () {

    //Убираем активный класс у всех кнопок
    for (let btn of tabsBtns) {
      btn.classList.remove('tab-control__btn--active');
    }
    //Добавляем активный класс к текущей кнопке
    this.classList.add('tab-control__btn--active');
  })
}

// КАСТОМНЫЙ ВЫПАДАЮЩИЕ СПИСКИ
document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) { // выбираем все списки с классом dropdown и проходим по ним функцией 
  const dropDownBtn = dropDownWrapper.querySelector('.dropdown__btn');
  const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
  const dropDownListItems = dropDownWrapper.querySelectorAll('.dropdown__list-item');
  const dropDownInput = dropDownWrapper.querySelector('.dropdown__input--hidden');

  //Открыть/закрыть селект

  dropDownBtn.addEventListener('click', function () {
    dropDownList.classList.toggle('dropdown__list--visible');
  });
  //Выбор элемента списка, Запомнить выбранное значение. Закрыть дропдаун
  dropDownListItems.forEach(function (listItem) {
    listItem.addEventListener('click', function (e) {
      e.stopPropagation();
      dropDownBtn.innerText = this.innerText;
      dropDownList.classList.remove('dropdown__list--visible');
      dropDownInput.value = this.dataset.value;
    })

  })

  //клик снаружи дропдауна

  document.addEventListener('click', function (e) {
    if (e.target !== dropDownBtn) {
      dropDownList.classList.remove('dropdown__list--visible');
    }
  })
  //Нажатие на TAB или ESC закрыть дропдаун
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab' || e.key === 'Escape') {
      dropDownList.classList.remove('dropdown__list--visible');
    }
  })
});

ymaps.ready(init);
function init() {
  // Создание карты.
  var myMap = new ymaps.Map("map", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [55.699843, 37.720856],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 15
  });
  var myPlacemark = new ymaps.Placemark([55.699843, 37.720856], null, {
    iconLayout: 'default#image',
    iconImageHref: "./../../img/svgIcons/pinn.svg",
    iconImageSize: [127, 149],
    iconImageOffset: [-25, -44]
  });
  myMap.controls.remove('geolocationControl'); // удаляем геолокацию
  myMap.controls.remove('searchControl'); // удаляем поиск
  myMap.controls.remove('trafficControl'); // удаляем контроль трафика
  myMap.controls.remove('typeSelector'); // удаляем тип

  // map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
  myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
  myMap.controls.remove('rulerControl'); // удаляем контрол правил
  myMap.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
  myMap.geoObjects.add(myPlacemark);

}


