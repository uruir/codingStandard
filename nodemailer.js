var nodemailer = require("nodemailer");

var to = 'ttianmur@163.com'; // 收件人邮箱，当然也可以发送到 QQ 邮箱
var subject = '测试 nodemailer'; // 邮件的标题
var html = '<div>测试 nodemailer。</div>'; // 邮件的内容

var transporter = nodemailer.createTransport({
  service: 'QQ',
  auth: {
    user: '445767568@qq.com',
    pass: 'frzkzjoukncscabb'
  }
});

var mailOptions = {
  from: 'uRuier <445767568@qq.com>',
  to: to,
  subject: subject,
  html: html
};

transporter.sendMail(mailOptions, function(error, info){
  if(error){
    console.log(error)
  }else{
    console.log('发送邮件成功！')
  }
}); 