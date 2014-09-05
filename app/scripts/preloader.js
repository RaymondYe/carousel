"use strict";

;(function(win, doc) {

  var DEBUG = false;
  win.preloader = {
    init: function() {},
    onLoad: function() {},
    id: null,
    beforeImages: [],
    onInit: null,
    onRemove: null,
  }

  preloader.init = function(args) {

    if (args) {
      for (var p in args) {
        this[p] = args[p];
      }
    }

    var _this = this;

    if (DEBUG) debugger;

    _PreLoadImg(_this.beforeImages, function() {
      setTimeout(function() {
        _this.remove()
      }, 500);
    })

    if (this.onInit) {
      this.onInit();
    }
  }

  preloader.remove = function() {
    var body = document.getElementsByTagName('body')[0],
      pre = document.getElementById(this.id);
    body.removeChild(pre)

    if (DEBUG) debugger;
    if (this.onRemove) {
      this.onRemove();
    }
  }

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