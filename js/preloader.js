"use strict";;
(function(win, doc) {
  var preloader = {
    init: function() {},
    onLoad: function() {},
    id: undefined,
  }

  var loaderClass = 'loadBackground'

  preloader.init = function() {
    var _this = this,
      body = document.getElementsByTagName('body')[0],
      pre = document.createElement('div');
    pre.id = 'preloader'
    pre.style.cssText = 'height: 100%; display: block; position: fixed; top: 0; width: 100%; background: #333; z-index: 100;'
    pre.innerHTML = '<div class="load-container load2"><div class="loader">Loading...</div></div>'
    body.appendChild(pre)

    this.imgArr = ['./img/bg1.jpg', './img/bg2.jpg', './img/bg3.jpg', './img/bg4.jpg', './img/bg5.jpg']

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
  }

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