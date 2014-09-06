"use strict";

;(function(exports, undefined) {

  exports.Raymond = exports.Raymond || {};
  var ex = exports.Raymond;
  var Music = ex.Music = function(options) {
    var p;
    for (p in options) {
      this[p] = options[p];
    }
  };

  Music.prototype = {
    "loop": null,
    "icon": document.getElementById('music'),
    "src": document.getElementsByTagName('audio')[0],
    "musicBtn": 'btn-musiced',
    "displayBtn": false,
    "start": true,
    "timer": 50000,
    init: function(args) {
      for (var p in args) {
        this[p] = args[p]
      }
      var _this = this;

      window.addEventListener('touchstart', function(){
        if(_this.start){
          _this.play();
          _this.start = false;
        }
      }, false)

      if(this.onInit){
        this.onInit()
      }
    },
    play: function() {
      var _this = this;
      _this.src.play()

      _this.loop = setInterval(function() {
        _this.src.pause();
        _this.src.play();
      }, _this.timer)

      if (_this.displayBtn) {
        _this.icon.style.cssText += ";display:block;"
        _this.icon.classList.add(_this.musicBtn)

        _this.icon.addEventListener('touchstart', function() {
          _this.toggle()
        }, false);
      }
      if(this.onPlay){
        this.onPlay()
      }
    },
    toggle: function() {
      var _this = this;
      if (_this.src != undefined) {
        if (_this.src.paused || _this.src.ended) {
          _this.src.play();
          _this.loop = setInterval(function() {
            _this.src.pause();
            _this.src.play();
          }, _this.timer);
          if (_this.displayBtn) _this.icon.classList.add(_this.musicBtn);
        } else {
          clearInterval(_this.loop);
          _this.src.pause();
          if (_this.displayBtn) _this.icon.classList.remove(_this.musicBtn);
        }
      }
    }
  };
})(this);