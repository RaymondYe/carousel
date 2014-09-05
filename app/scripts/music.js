"use strict";

;(function() {

  var music = {
    "loop": null,
    "icon": document.getElementById('music'),
    "src": document.getElementsByTagName('audio')[0],
    "musicBtn": 'btn-musiced',
    "displayBtn": true,
    "timer": 43000,
  }

  var musicPlay = function() {

    music.src.play()

    music.loop = setInterval(function() {
      music.src.pause();
      music.src.play();
    }, music.timer)

    if (music.displayBtn) {
      music.icon.style.cssText = "display:block;"
      music.icon.classList.add(music.musicBtn)

      music.icon.addEventListener('touchstart', function() {
        musicController()
      }, false)
    }

    window.removeEventListener('touchstart', musicPlay, false)

  };

  function musicController() {

    if (music.src != undefined) {

      if (music.src.paused || music.src.ended) {

        music.src.play();
        music.loop = setInterval(function() {
          music.src.pause();
          music.src.play();
        }, music.timer);
        if (music.displayBtn) music.icon.classList.add(music.musicBtn);

      } else {

        clearInterval(music.loop);
        music.src.pause();
        if (music.displayBtn) music.icon.classList.remove(music.musicBtn);

      }
    }
  }

  window.addEventListener('touchstart', musicPlay, false);

})();