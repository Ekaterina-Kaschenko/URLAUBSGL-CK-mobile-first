(function sliderInit () {
  var items = document.getElementsByClassName('block__item');

  for (var i = 0; i <= items.length - 1; i++) {
   flky = new Flickity( items[i], {
     autoPlay: 2000,
     pauseAutoPlayOnHover: false
   });
 }
})();