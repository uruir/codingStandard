/*
 * 在 nodemailer-wellknown 的 services.json 里添加
 * "Mxhichina": {
 *   "aliases": ["Alibaba Enterprise"],
 *   "host": "smtp.mxhichina.com",
 *   "port": 465,
 *   "secure": true
 * }
 * 动态密码需要使用授权码，而不是邮箱密码
 * 另外不能绑定 QQ 邮箱等其它邮箱
 * 邮件系统常见错误代码解释
 */

var nodemailer = require('nodemailer')

var to = '445767568@qq.com, turui@zhizoo.com'
var subject = '测试邮件';
var html = '欢迎注册 ***，当前用户名为：涂睿，密码为：1234。'

var transporter = nodemailer.createTransport({
  service: 'QQex',
  auth: {
    user: 'turui@zhizoo.com',
    pass: '6L12RUtiFQry1LcN'
  }
});

var mailOptions = {
  from: 'turui@zhizoo.com',
  to: to,
  subject: subject,
  html: html
};

transporter.sendMail(mailOptions, function(error, res){
  if(error){
    console.log(error)
  }else{
    console.log('发送邮件成功：' + JSON.stringify(res))
  }
  transporter.close()
});
