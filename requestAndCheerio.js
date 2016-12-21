var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs')
var path = require('path')
var iconv = require('iconv-lite')

/*request('https://segmentfault.com/a/1190000004465603?utm_source=tuicool&utm_medium=referral', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(body);//当前的$,它是拿到了整个body的前端选择器  
    console.log($('.h3').html().trim()); //我博客的获取用户名
  }else{
    console.log("思密达，没爬取到用户名，再来一次");
  }
})*/

// request('http://www.pp3.cn/uploads/201501/2015011911.jpg').pipe(fs.createWriteStream('demo/小清新.jpg'))

/*var filepath = path.join(__dirname, 'nodemailer.js')
console.log(filepath)
fs.exists(filepath, function (exists) {
  if (exists) {
    console.log('文件存在')
  } else {
    console.log('文件不存在')
  }
})*/

// 删除文件
// fs.unlink(path.join(__dirname, '/tmp.html'))

// 抓取中文乱码
/*
request({
  encoding: null, // 对收到的响应体不做任何数据转换
  url: 'http://auto.sohu.com/20160428/n446578736.shtml'
}, function (err, res, body) {
  if (!err && res.statusCode === 200) {
    fs.writeFile(__dirname + '/tmp.html', iconv.decode(body, 'gb2312'), function (err) {
      if (err) {
        console.log(err)
      }
      console.log('抓取完成！')
    })
  }
})*/
