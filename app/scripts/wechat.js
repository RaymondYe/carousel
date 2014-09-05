'use strict';

;(function(win, doc) {

  var collect = {
    "url": "http://i.weclouds.cn/versino/football/server/footballcontroller.php",
    "isFirst": true,
  }

  var wechat = {
    "img": "http://i.weclouds.cn/tests/raymond/qy/img/send.jpg",
    "url": "http://i.weclouds.cn/tests/raymond/qy/",
    "title": "云教学OFFICE 提逼格神器",
    "desc": "懒人包三件套提醒：\n别等到熬夜加班才后悔！"
  }

  //updatePv();

  function updatePv() {
    if (collect.isFirst) {
      collect.isFirst = false;

      ajax({
        type: "post",
        url: "http://i.weclouds.cn/versino/football/server/footballcontroller.php",
        data: "action=post_click&page=qiuye",
        dataType: "json",
        success: function(data) {}
      });
    }
  }

  function shareToWechat() {
    ajax({
      type: "post",
      url: "",
      data: "action=post_click&page=shqiu",
      dataType: "json",
      success: function(data) {}
    });
  }


  WeixinApi.ready(function(Api) {

    var wxData = {
      "appId": "",
      "imgUrl": wechat.img,
      "link": wechat.url,
      "desc": wechat.desc,
      "title": wechat.title
    };

    var wx2Data = {
      "appId": "",
      "imgUrl": wechat.img,
      "link": wechat.url,
      "desc": wechat.title,
      "title": wechat.title
    };

    var wxCallbacks = {
      ready: function() {},
      cancel: function(resp) {},
      fail: function(resp) {},
      confirm: function(resp) {
        shareToWechat()
      },
      all: function(resp) {}
    };

    Api.shareToFriend(wxData, wxCallbacks);

    Api.shareToTimeline(wx2Data, wxCallbacks);

    Api.shareToWeibo(wxData, wxCallbacks);
  });


})(window, document);