(function (window) {
  var trUtil = {
    // 验证邮箱
    isEmail: function(str){
      return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(str)
    },
    // 验证手机
    isCellphone: function(cellphone){
      // cellphone 可以是整型，也可以是数字字符串
      return (/^1[3|4|5|7|8]\d{9}$/.test(cellphone)) ? true : false
    },
    // 验证数值
    isNumber: function(number) {
      return /^[0-9.]*$/.test(number)
    },
    // 给 select 元素生成 options
    generateOptions: function ($el, options) {
      var i = 0
      var len = options.length
      var result = ''
      for (; i < len; i++) {
        result += '<option value="' + options[i] + '">' + options[i] + '</option>'
      }
      $el.append(result)
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