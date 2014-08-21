"use strict";
window.addEventListener('load', function() {
  tee.init({
    id:"lun",
    onComplete: function(t) {
      if (t.pageIndex === 1) {}
    }
  })

}, false)

$(function() {

  // remove img mousedown event
  $(document.body).find("img").on("mousedown", function(e) {
    e.preventDefault();
  })

  // open door
  $('#logo').on('click touchstart', function(event) {
    event.preventDefault()
    $(this).addClass('animated zoomOut')
    $('#door').find('.door-left').css('webkitTransform', 'rotateY(-90deg)')
    $('#door').find('.door-right').css('webkitTransform', 'rotateY(90deg)')
  });

  addSvgswipeEvent()

  // add svg swipe event
  function addSvgswipeEvent() {
    touch.on('#sv', 'swipe', function(ev) {
      ev.originEvent.preventDefault()
      var s = document.getElementById('sv'),
        dx = dx || 0,
        offx = dx + ev.x;

      offx = offx <= -520 ? -520 : offx
      offx = offx >= 0 ? 0 : offx
      s.style.webkitTransition = ".5s"
      s.style.webkitTransform = "translate3d(" + offx + "px, 0, 0 )";
    })
  }

});

//style.webkitMaskImage = pa("-webkit-gradient(radial, 17 17, %s, 17 17, %s,from(rgba(0, 0, 0, 1)),color-stop(0.5, rgba(0, 0, 0, 0.2)),to(rgba(0, 0, 0, 1)))", Math.floor(this.coords[0]), Math.floor(this.coords[0] + 15))