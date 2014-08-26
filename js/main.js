"use strict";

// init music
var one = function() {

  var music = document.getElementsByTagName('audio')[0]
  music.play()

  var icon = document.getElementById('music')
  icon.style.cssText = "display:block;"
  toggleMusicBtn(icon)

  icon.addEventListener('touchstart', function(){
    musicControl(music)
    toggleMusicBtn(icon)
  }, false)

  window.removeEventListener('touchstart', one, false)
};

window.addEventListener('load', function() {
  tee.init({
    id: "lun",
    onComplete: function(t) {
      if (t.pageIndex === 1) {}
    }
  })
}, false)

window.addEventListener('touchstart', one, false)

function musicControl(m) {
  if (m != undefined) {
    if (m.paused || m.ended) {
      m.play();
    } else {
      m.pause();
    }
  }
}

function toggleMusicBtn(el) {
  el.classList.toggle("btn-musiced");
}