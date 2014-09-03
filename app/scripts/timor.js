"use strict";

;(function(exports, undefined) {
  exports.Best = exports.Best || {};
  var ns = exports.Best;
  var Timor = ns.Timor = function(options) {
    var p;
    for (p in options) {
      this[p] = options[p];
    }
  };

  Timor.prototype = {
    id: null,
    el: null,
    sec: null,
    _Width: window.innerWidth,
    _Height: window.innerHeight,
    init: function() {
      if (this.onInit) {
        this.onInit.apply(this, arguments);
      }
    },
    start: function() {
      if (this.onStart) {
        this.onStart();
      }
    },
    addEvent: function() {
      if (this.onAddEvent) {
        this.onAddEvent();
      }
    },
    onInit: null,
    onStart: null,
    onAddEvent: null
  }

})(this);

void

function(exports) {

  // Config Plugin
  var DEBUG = false;

  exports.tee = new Best.Timor({

    init: function(args) {

      for (var p in args) {
        this[p] = args[p]
      }

      this.pageIndex = 0
      this.speed = 300
      this.isEvent = true
      this.direction = null
      this.moveSec = null
      this.moveIndex = null

      this.el = document.getElementById(this.id)
      this.sec = this.el.getElementsByTagName('section')
      this.sec[this.pageIndex].classList.remove('hide')
      this.sec[this.pageIndex].classList.add('show')
      this.secLength = this.sec.length

      if (DEBUG) debugger;

      this.start();

    },
    start: function() {
      this.addEvent();
      if (DEBUG) debugger;
    },
    addEvent: function() {

      var _this = this;

      touch.on(this.sec, 'dragstart', function(ev) {
        ev.originEvent.preventDefault()
        if (_this.isEvent) {
          _this.onDragStart(ev);
        }
      })

      touch.on(this.sec, 'drag', function(ev) {
        ev.originEvent.preventDefault()
        if (_this.isEvent) {
          _this.onDrag(ev)
        }
      })

      touch.on(this.sec, 'dragend', function(ev) {
        ev.originEvent.preventDefault()
        if (_this.isEvent) {
          _this.onDragEnd(ev);
        }
      })

      if (DEBUG) debugger;
    },
    onDragStart: function(ev) {

      var i, s;

      s = (ev.direction === 'up' || ev.direction === 'down') ? true : false;
      this.direction = (ev.direction === 'up') ? 1 : -1;

      if (s) {
        i = this.pageIndex + this.direction
      }

      if (0 <= i && i < this.secLength) {
        this.moveIndex = this.pageIndex + this.direction
        this.moveSec = this.sec[this.moveIndex]
        this.onMoveStart(this)
      } else {
        this.moveSec = null
      }

    },
    onDragEnd: function(ev) {

      var _this = this

      if (this.moveSec !== null) {
        var se = this.sec[this.pageIndex],
          mv = this.moveSec
        this.moveSec = null
        this.isEvent = false;
        this.pageIndex = this.moveIndex

        mv.classList.remove('hide')
        mv.classList.add('show')
        mv.style.cssText = '-webkit-transition:' + this.speed + 'ms; -webkit-transform:matrix( 0, 0, 0, 0, 0 );'

        setTimeout(function() {

          se.style.webkitTransition = 0 + 'ms'
          se.classList.remove('show')
          se.classList.add('hide')
          mv.classList.remove('active')
          _this.isEvent = true;
          _this.onMoveComplete(_this)

        }, _this.speed);
      }
    },
    onDrag: function(ev) {

      var moveY;

      if (this.moveSec !== null) {
        var moveY = (this.direction === 1) ? this._Height + ev.y : -this._Height + ev.y,
          mv = this.moveSec;

        if (this.direction === 1) {
          moveY = moveY <= 0 ? 0 : moveY
          mv.style.webkitTransform = 'translate3d(0, ' + moveY + 'px,0)'
          this.sec[this.pageIndex].style.cssText = " -webkit-transition:200ms; -webkit-transform:matrix(.9, 0, 0, .8, 0, 0); -webkit-transform-origin: top center;";
        } else {
          moveY = moveY >= 0 ? 0 : moveY
          mv.style.webkitTransform = 'translate3d(0, ' + moveY + 'px,0)'
          this.sec[this.pageIndex].style.cssText = " -webkit-transition:200ms; -webkit-transform:matrix(.9, 0, 0, .8, 0, 0); -webkit-transform-origin: bottom center;";
        }

        mv.classList.add('active')
      }

    },

  });

}(this);