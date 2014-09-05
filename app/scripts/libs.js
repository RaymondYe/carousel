"use strict";
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
    } catch (e2) {}
  }
  return xhr;
};