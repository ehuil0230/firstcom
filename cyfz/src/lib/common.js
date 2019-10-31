import $ from "jquery"
$.extend({
  isNotEmpty: function isNotEmpty(obj) {
    return !$.isEmpty(obj);
  },
  isEmpty: function isEmpty(obj) {
    if (obj == 'undefined') {
      return true;
    } else if (obj == null) {
      return true;
    } else if (obj === '') {
      return true;
    } else if (obj === 'null') {
      return true;
    } else {
      return false;
    }
  }
});

String.prototype.contains = function(str) {
  return this.indexOf(str) != -1;
};
/**
 * 数组删除指定对象
 * @param val
 */
Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
Array.prototype.pushAll = function(resouce) {
  var arr = this;
  resouce.forEach(function(item) {
    arr.push(item);
  });
};

Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};
