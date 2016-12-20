window.trUtil = {
  // 添加句柄
  addEvent: function(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, handler);
    } else {
      element['on' + type] = handler;
    }
  },
  // 删除句柄
  removeEvent: function(element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent('on' + type, handler);
    } else {
      element['on' + type] = null;
    }
  },
  getEvent: function(event) {
    return event ? event : window.event;
  },
  getType: function(event) {
    return event.type;
  },
  getTarget: function(event) {
    return event.target || event.srcElement;
  },
  preventDefault: function(event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },
  stopPropagation: function(event) {
    var event = this.getEvent(event)
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  },
  log: function () {
    console.log.apply(console, arguments)
  },
  charAmountInStr: function(str) {
    var o = {}
    str.replace(/(\w{1})/g, function($1){
      o[$1] ? o[$1] += 1 : o[$1] = 1
    })
    return o
  },
  getElement: function(element) {
    var firstChar = element[0];
    if (firstChar == '#') {
      return document.getElementById(element.substring(1));
    } else if (firstChar == '.') {
      return document.getElementsByClassName(element.substring(1));
    } else {
      return document.getElementsByTagName(element);
    }
  },
  realArr: function(elements) {
    return [].slice.apply(elements);
  },
  deRepeat: function(arr) {
    var obj = {}
    var newArr = []
    var index = 0
    var len = arr.length
    for (var i = 0; i < len; i++) {
      var el = arr[i];
      if (!obj[el]) {
        obj[el] = 1;
        newArr[index++] = el;
      }
    }
    return newArr;
  },
  getRandom: function(start, end) {
    var region = end - start;
    return Math.floor(Math.random() * region + start);
  },
  maxChar: function(str) {
    var obj = {}
    for (var i = 0, len = str.length; i < len; i++) {
      var char = str[i];
      if (!obj[char]) {
        obj[char] = 1;
      } else {
        obj[char]++;
      }
    }
    var max = -1
    var maxChar = ''
    for (var key in obj) {
      if (max < obj[key]) {
        max = obj[key];
        maxChar = key;
      }
    }
    console.log('最多的字符是：' + maxChar + "及其次数：" + max);
  },
  reverseString: function(str) {
    var result = '';
    for (var i = 0, len = str.length; i < len; i++) {
      result += str[len-i-1]; //直接使用"+"连接字符串
    }
    return result;
  },
  isPalindrome: function(s) {
    var str = String(s);
    for (var i = 0, len = str.length; i < len; i++) {
      if (str[i] !== str[len-i-1]) {
        return false;
      }
    }
    return true;
  },
  wordCounts: function(s) {
    var num = 0
    var str = s.trim()
    if (str.length === 0) {
      return 0;
    }
    for (var i = 0, len = str.length; i < len; i++) {
      if (str[i] === ' ') {
        num++;
        // 如果是连续的空格，那便把上一行的自加减一
        if (str[i-1] === ' ') {
          num--;
        }
      }
    }
    return num + 1
  }
}
