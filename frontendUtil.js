(function (window) {
  var trUtil = {
    isEmail: function(str){
      return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(str)
    },
    isCellphone: function(cellphone){
      // cellphone 可以是整型，也可以是数字字符串
      return (/^1[3|4|5|7|8]\d{9}$/.test(cellphone)) ? true : false
    },
    isNumber: function(number) {
      return /^[0-9.]*$/.test(number)
    },
    generateOptions: function (options, selected) {
      var i = 0
      var len = options.length
      var result = ''
      for (; i < len; i++) {
        if (options[i] === selected) {
          result += '<option value="' + options[i] + '" selected="selected">' + options[i] + '</option>'
        } else {
          result += '<option value="' + options[i] + '">' + options[i] + '</option>'
        }
      }
      return result
    },
    getDataType: function (obj) {
      if( obj === null ) {
        return 'object';
      } else if( obj === undefined ) {
        return 'undefined';
      } else {
        return obj.constructor.name.toLowerCase();
      }
    }
  }
  window.trUtil = trUtil
})(window)