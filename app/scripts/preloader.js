;(function(win, doc) {
  "use strict";
  var lazyImgs = document.querySelectorAll('img[data-echo]');
  for (var i = 0; i < lazyImgs.length; i++) {
    new Echo(lazyImgs[i]).init();
  }

  var preloader = {
    init: function() {},
    onLoad: function() {},
    id: undefined,
  }

  preloader.init = function() {
    var _this = this,
      body = document.getElementsByTagName('body')[0],
      pre = document.createElement('div');
    pre.id = 'preloader'
    pre.style.cssText = 'height: 100%; display: block; position: fixed; top: 0; width: 100%; background: #333; z-index: 100;'
    pre.innerHTML = '<div class="load"><img class="load-xy" alt="loading" src="./images/logo.png"/><img class="load-word" alt="loading" src="./images/loading.png"/><div>'
    body.appendChild(pre)

    this.imgArr = ['./images/ca.jpg', './images/bg-1.jpg', './images/bottom-icon.png', './images/music.png']

    this.id = document.getElementById('preloader')
    this.id.style.display = 'block'

    _PreLoadImg(_this.imgArr, function() {
     _this.remove()
    })
  }

  preloader.remove = function() {
    var body = document.getElementsByTagName('body')[0],
      pre = document.getElementById('preloader');
    body.removeChild(pre)
    echo.init({
      offset: 100,
      throttle: 250,
      unload: false,
      callback: function(element, op) {
      }
    });
  }

  window.addEventListener('DOMContentLoaded', function() {
    preloader.init()
  });

  /*
    {"name": "PreLoadImg",
      arguments['b']: ImgList[] ,
      arguments['e']: callback()
    }
   */
  function _PreLoadImg(b, e) {
    var c = 0,
      a = {},
      d = 0,
      src = '';
    for (src in b) {
      d++
    }
    for (src in b) {
      a[src] = new Image();
      a[src].onload = function() {
        if (++c >= d) {
          e(a)
        }
      };
      a[src].src = b[src]
    }
  }
})(window, document);