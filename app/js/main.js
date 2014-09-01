"use strict";
// init music
var one = function() {

  var music = document.getElementsByTagName('audio')[0];
  music.play();
  setInterval(function() {
    var music = document.getElementsByTagName('audio')[0];
    music.pause();
    music.play();
  }, 43000);
  var icon = document.getElementById('music')
  icon.style.cssText = "display:block;"
  toggleMusicBtn(icon)

  icon.addEventListener('touchstart', function() {
    musicControl(music)
    toggleMusicBtn(icon)
  }, false)

  window.removeEventListener('touchstart', one, false)
};

window.addEventListener('load', function() {
  var b = document.getElementById('bottom')
  tee.init({
    id: "lun",
    onMoveComplete: function(t) {

      var el = t.sec[t.pageIndex]
      var imgs = el.querySelectorAll('.animated')

      for (var i = 0; i < imgs.length; i++) {
        imgs[i].classList.add('animated')
      };

      if (t.pageIndex === 8) {
        bottom.style.display = 'none'
      } else {
        bottom.style.display = 'block'
      }

    },
    onMoveStart: function(t) {
      bottom.style.display = 'none'
    }
  });

  var collect_first = true;
  if (collect_first) {
    collect_first = false;

    ajax({
      type: "post",
      url: "http://i.weclouds.cn/versino/football/server/footballcontroller.php",
      data: "action=post_click&page=qiuye",
      dataType: "json",
      success: function(data) {
        console.log(0);
      }
    });

  }
}, false)

window.addEventListener('touchstart', one, false)

WeixinApi.ready(function(Api) {

  var wxData = {
    "appId": "",
    "imgUrl": 'http://i.weclouds.cn/tests/raymond/qy/img/send.jpg',
    "link": 'http://i.weclouds.cn/tests/raymond/qy/',
    "desc": '懒人包三件套提醒：\n别等到熬夜加班才后悔！',
    "title": "云教学OFFICE 提逼格神器"
  };

  var wxCallbacks = {
    ready: function() {},
    cancel: function(resp) {},
    fail: function(resp) {},
    confirm: function(resp) {

      ajax({
        type: "post",
        url: "http://i.weclouds.cn/versino/football/server/footballcontroller.php",
        data: "action=post_click&page=shqiu",
        dataType: "json",
        success: function(data) {
          console.log(1);
        }
      });
    },
    all: function(resp) {}
  };

  Api.shareToFriend(wxData, wxCallbacks);

  Api.shareToTimeline(wxData, wxCallbacks);

  Api.shareToWeibo(wxData, wxCallbacks);
});

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
var ajax = function(conf) {

  var type = conf.type;
  var url = conf.url;
  var data = conf.data;
  var dataType = conf.dataType;
  var success = conf.success;

  if (type == null) {
    type = "get";
  }
  if (dataType == null) {
    dataType = "text";
  }
  var xhr = createAjax();
  xhr.open(type, url, true);
  if (type == "GET" || type == "get") {
    xhr.send(null);
  } else if (type == "POST" || type == "post") {
    xhr.setRequestHeader("content-type",
      "application/x-www-form-urlencoded");
    xhr.send(data);
  }
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      if (dataType == "text" || dataType == "TEXT") {
        if (success != null) {
          success(xhr.responseText);
        }
      } else if (dataType == "xml" || dataType == "XML") {
        if (success != null) {
          success(xhr.responseXML);
        }
      } else if (dataType == "json" || dataType == "JSON") {
        if (success != null) {
          success(eval("(" + xhr.responseText + ")"));
        }
      }
    }
  };
};
var createAjax = function() {
  var xhr = null;
  try {
    xhr = new ActiveXObject("microsoft.xmlhttp");
  } catch (e1) {
    try {
      xhr = new XMLHttpRequest();
    } catch (e2) {
      window.alert("您的浏览器不支持ajax，请更换！");
    }
  }
  return xhr;
};