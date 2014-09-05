"use strict";

window.addEventListener('DOMContentLoaded', function() {

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
  var b = document.getElementById('bottom')
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


}, false);
