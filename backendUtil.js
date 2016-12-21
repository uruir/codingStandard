var _ = require('lodash')
var colors = require('colors')
var moment = require('moment')
var nodemailer = require('nodemailer')

module.exports = {
  /*
   * 错误提示
   * param @ 系统提示
   * param @ 自定义提示
   * 若只有一个参数，则显示系统自带错误提示
   * 若有两个参数，则显示自定义提示
   */
  cyan: function (content) {
    console.log(content.cyan)
  },
  err: function (err) {
    if (err !== null) {
      console.log('发生错误！'.red)
      console.log(err)
    }
  },
  info: function (message, content) {
    if (arguments.length === 1) {
      message = message === undefined ? '消息：空' : message
      console.log(message.green)
    } else {
      content = content === undefined ? '消息：空' : content
      console.log(message.green + ', ' + content.green)
    }
  },
  log: function (message, content) {
    if (arguments.length === 1) {
      message = message === undefined ? '消息：空' : message
      console.log(message.green)
    } else {
      content = content === undefined ? '消息：空' : content
      console.log(message.green + ', ' + content.green)
    }
  },
  warn: function (message, content) {
    if (arguments.length === 1) {
      message = message === undefined ? '警告：空' : message
      console.log(message.yellow)
    } else {
      content = content === undefined ? '警告：空' : content
      console.log(message.yellow + ', ' + content.yellow)
    }
  },
  /*
   * 文本右对齐
   * param @ 传入字符
   * param @ 总长度
   * param @ 填充的字符
   */
  leftPad: function (char, length, fill) {
    fill = fill || '0'
    char = char.toString()
    while (char.length < length) char = fill + char
    return char
  },
  // 验证是否为邮箱
  isEmail: function (str){
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    return reg.test(str)
  },
  isCellphone: function(cellphone){
    return (/^1[3|4|5|7|8]\d{9}$/.test(cellphone)) ? true : false
  },
  isNumber: function(number) {
    return /^[0-9.]*$/.test(number)
  },
  // TODO: 验证是否为数组
  /*
   * 前端发送的 Ajax 请求，处理后返回的 JSON
   * param @ res
   * param @ statusCode
   * param @ message
   */
  toFrontEndJson: function (res, statusCode, message, data) {
    console.log(message.red)
    return res.send({
      statusCode: statusCode,
      message: message,
      data: data
    })
  },
  sendEmailWithQQ: function (to, subject, html) {
    var transporter = nodemailer.createTransport({
      service: 'QQ',
      auth: {
        user: '445767568@qq.com',
        pass: ''
      }
    })
    var mailOptions = {
      from: '445767568@qq.com',
      to: to,
      subject: subject,
      html: html
    }
    transporter.sendMail(mailOptions, function(err, info){
      if(err){
        console.log('发送邮件失败：' + err)
      }else{
        console.log('发送邮件成功：' + JSON.stringify(info))
      }
    })
  },
  /*
   * 通过 QQ 企业邮箱发送邮件
   */
  sendEmailWithQQEx: function (to, subject, html) {
    // 若要给多人发送邮件：'445767568@qq.com, turui@zhizoo.com'
    var transporter = nodemailer.createTransport({
      service: 'QQex',
      auth: {
        user: '',
        pass: ''
      }
    })
    var mailOptions = {
      from: '',
      to: to,
      subject: subject,
      html: html
    }
    transporter.sendMail(mailOptions, function(err, res){
      if(err){
        console.log('发送邮件失败：' + err)
      }else{
        console.log('发送邮件成功：' + JSON.stringify(res))
      }
      transporter.close()
    })
  },
  // 隐藏字符串中间字符
  hideStr: function (identity, front, end) {
    var len = identity.length
    var frontStr = identity.substr(0, front)
    var endStr = identity.substr(-end)
    var star = len - front - end
    var stars = ''
    while (star--) {
      stars += '*'
    }
    return frontStr + stars + endStr
  }
}