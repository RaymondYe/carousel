"use strict";
;(function(win, doc, $) {
  var preloader = {
    disable: undefined,
    start: undefined,
    init: function() {},
    onLoad: function() {},
    id: undefined,
    visuals: undefined,
    targetLogoWidth: 0
  }

  var loaderClass = 'loadBackground'

  preloader.init = function() {
    var _this = this
    this.imgArr = ['./img/bg1.jpg', './img/bg2.jpg', './img/bg3.jpg', './img/bg4.jpg', './img/bg5.jpg']
    preloader.id = $('#preloader');

    preloader.targetLogoWidth = $(window).innerWidth()

    _PreLoadImg(_this.imgArr, function() {
      _this.remove()
    })
  }

  preloader.start = function() {
    this.init()
    this.id.show()
  }

  preloader.remove = function() {
    $(document.body).removeClass('unloaded')
    this.id.remove()
  }

  $(function() {
    preloader.start()
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
})(window, document, jQuery);