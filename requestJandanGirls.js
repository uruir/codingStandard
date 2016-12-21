var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs')
var path = require('path')
var _ = require('underscore')

var headers = {
  'User-Agent': "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2652.2 Safari/537.36"
}

function request (url, callback) {
  var options = {
    url: url,
    encoding: null, // 等到 Buffer
    headers: headers
  }
  originRequest(options, callback)
}

var n = 1498
var total = 0

var time = setInterval(function () {
  if (n > 0) {
    request('http://jandan.net/ooxx/page-' + n-- + '#comments', function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var $ = cheerio.load(body);
        var arr = $('#comments a[target|="_blank"]')
        var len = arr.length
        total += len
        var next = 0
        for (var img = 1, len = arr.length; img <= len; img++) {
          var href = $(arr[img]).attr('href')
          var basename = path.basename(href)
          var delay = Math.floor(7000 / len)
          next += delay
          setTimeout(function () {
            request(href).pipe(fs.createWriteStream('images/' + n + basename))
            console.log('已写入第 ' + img + ' 张图片：' + basename + '，在第：' + next + ' ms 时下载。')
          }, next)
        }
        console.log('当前目录图片数：' + len)
        console.log('当前所在目录：' + n + '，共抓取：' + total + ' 张图片。')
      } else {
        console.log("抓取出错");
      }
    })
  } else {
    console.log('抓取完成')
  }
}, 10000)

