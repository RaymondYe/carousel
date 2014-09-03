"use strict";

;(function(win, document) {

  // Init Canvas
  var canvas = document.createElement('canvas'),
    b = document.getElementsByTagName('body')[0],
    W = b.clientWidth,
    H = b.clientHeight,
    x1, y1, x2, y2, a = 30,
    timeout, totimes = 100,
    jiange = 30,
    ctx = canvas.getContext("2d");
  canvas.width = W
  canvas.height = H
  b.appendChild(canvas)

  init()

  function init() {
    var img = new Image();
    img.src = "./images/ca.jpg";
    img.onload = function() {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      tapClip()
    }
  }

  function tapClip() {

    var hastouch = "ontouchstart" in window ? true : false,
      tapstart = hastouch ? "touchstart" : "mousedown",
      tapmove = hastouch ? "touchmove" : "mousemove",
      tapend = hastouch ? "touchend" : "mouseup";

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = a * 2;
    ctx.globalCompositeOperation = "destination-out";

    canvas.addEventListener(tapstart, function(e) {
      clearTimeout(timeout)
      e.preventDefault();

      x1 = hastouch ? e.targetTouches[0].pageX : e.clientX - canvas.offsetLeft;
      y1 = hastouch ? e.targetTouches[0].pageY : e.clientY - canvas.offsetTop;

      ctx.save();
      ctx.beginPath();
      ctx.arc(x1, y1, 1, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();

      canvas.addEventListener(tapmove, tapmoveHandler);

      canvas.addEventListener(tapend, function() {
        canvas.removeEventListener(tapmove, tapmoveHandler);
      });

      function tapmoveHandler(e) {
        clearTimeout(timeout)
        e.preventDefault()
        x2 = hastouch ? e.targetTouches[0].pageX : e.clientX - canvas.offsetLeft;
        y2 = hastouch ? e.targetTouches[0].pageY : e.clientY - canvas.offsetTop;

        ctx.save();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.restore()

        x1 = x2;
        y1 = y2;
        timeout = setTimeout(function() {
          checkData();
        }, totimes)
      }

      function checkData() {

        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var dd = 0;
        for (var x = 0; x < imgData.width; x += jiange) {
          for (var y = 0; y < imgData.height; y += jiange) {
            var i = (y * imgData.width + x) * 4;
            if (imgData.data[i + 3] > 0) {
              dd++
            }
          }
        }
        if (dd / (imgData.width * imgData.height / (jiange * jiange)) < 0.6) {
          canvas.style.opacity = 0
          setTimeout(function() {
            if (canvas) {
              b.removeChild(canvas)
            }
          }, 500);
        }
      }
    })
  }

})(window, document);