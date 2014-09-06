"use strict";

window.addEventListener('DOMContentLoaded', function() {

  var b = document.getElementById('bottom');

  // Init preloader
  preloader.init({
    id: 'preloader',
    beforeImages: ['./images/ca.jpg', './images/bg-1.jpg', './images/bottom-icon.png', './images/music.png'],
    onInit: function() {},
    onRemove: function() {
      echo.init({
        offset: 100,
        throttle: 250,
        unload: false,
        callback: function(element, op) {}
      });
    }
  });

});

window.addEventListener('load', function() {

  //Init Music
  var mu = new Raymond.Music();
  mu.init({
    timer: 43000,
    displayBtn: true,
    icon: document.getElementById('music'),
    src: document.getElementsByTagName('audio')[0],
  });

  // Init timor
  tee.init({
    id: "lun",
    onMoveComplete: function(t) {

      var el = t.sec[t.pageIndex]
      var imgs = el.querySelectorAll('.animated')

      for (var i = 0; i < imgs.length; i++) {
        imgs[i].classList.add('animated')
      };

      if (t.pageIndex === 8) {
        bottom.style.display = 'none'
      } else {
        bottom.style.display = 'block'
      }

    },
    onMoveStart: function(t) {
      bottom.style.display = 'none'
    }
  });

  // Share Tips
  touch.on('#share', 'tap', function() {
    var mask = document.querySelector('#mask');
    mask.style.display = 'block'
  })

  touch.on('#mask', 'tap', function() {
    var mask = document.querySelector('#mask');
    mask.style.display = 'none';
  })

}, false);