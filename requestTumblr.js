var fs = require('fs')
var request = require('request')
var cheerio = require('cheerio')
var path = require('path')


// 滚动到底部后获取
/*
request({
    uri: 'https://www.tumblr.com/svc/dashboard/3/143571654507?nextAdPos=6&stream_cursor=eyJGb2xsb3dlZFNlYXJjaFBvc3QiOltdLCJiZWZvcmVfaWQiOiIxNDM1NzE2NTQ1MDcifQ%3D%3D', //构建请求
    encoding: null, //不转码
    headers: {
      Cookie: 'tmgioct=571a2fe50751530136137460; rxx=wxqu8sb15r.ajhzp9u&v=1; anon_id=WETXJITFAYYWMFZLRKCZWEVTBONAIINK; language=%2Czh_CN; logged_in=1; pfp=ynnHuqcVdr9d8ya6qMogbIsJwE057LIDtQ3z7ZAq; pfs=6rWs9J6mWQNFaPUCtKlLr1KAahg; pfe=1469110090; pfu=186700025; __utmt=1; _ga=GA1.2.145587490.1461334099; yx=0uqcaxyotady3%26o%3D3%26f%3Du1; devicePixelRatio=1; documentWidth=1107; last_toast=1461923806; __utma=189990958.145587490.1461334099.1461829442.1461923802.7; __utmb=189990958.3.10.1461923802; __utmc=189990958; __utmz=189990958.1461829442.6.3.utmcsr=travelcoffeebook.com|utmccn=(referral)|utmcmd=referral|utmcct=/image/139055663713' //这里是关键，设置Cookie为之前请求到的以Cookie形式呈现的SessionID
    }
  }, function (err, res, body) { //获取响应即可
    if (err) {
      console.log('err!')
    }
    var ws = fs.createWriteStream('tumblr.json');
    ws.write(body);
  }
);*/


// 主页
/*request({
    uri: 'https://www.tumblr.com/dashboard', //构建请求
    headers: {
      Cookie: 'tmgioct=571a2fe50751530136137460; rxx=wxqu8sb15r.ajhzp9u&v=1; anon_id=WETXJITFAYYWMFZLRKCZWEVTBONAIINK; language=%2Czh_CN; logged_in=1; pfp=ynnHuqcVdr9d8ya6qMogbIsJwE057LIDtQ3z7ZAq; pfs=6rWs9J6mWQNFaPUCtKlLr1KAahg; pfe=1469110090; pfu=186700025; __utmt=1; _ga=GA1.2.145587490.1461334099; yx=0uqcaxyotady3%26o%3D3%26f%3Du1; devicePixelRatio=1; documentWidth=1107; last_toast=1461923806; __utma=189990958.145587490.1461334099.1461829442.1461923802.7; __utmb=189990958.3.10.1461923802; __utmc=189990958; __utmz=189990958.1461829442.6.3.utmcsr=travelcoffeebook.com|utmccn=(referral)|utmcmd=referral|utmcct=/image/139055663713' //这里是关键，设置Cookie为之前请求到的以Cookie形式呈现的SessionID
    }
  }, function (err, res, body) { //获取响应即可
    if (err) {
      console.log('err!')
    }
    var $ = cheerio.load(body)
    var imgs = $('a img[class!="post"]')
    console.log(imgs.length)
    for (var i = 0, len = imgs.length; i < len; i++) {
      var str = JSON.stringify(imgs[i].attribs)
      var href = JSON.parse(str).src
      console.log(i + ' : ' + href);
      (function(i, href) {
        var delay = 1000 * i
        setTimeout(function () {
          request(href).pipe(fs.createWriteStream('images/' + path.basename(href)))
        }, delay)
      })(i, href)
    }
  }
);*/


var arr = [4, 2, 8, 6]
var num = 3
var times = 1
var total = 0
var IDArr = []

var getImgs = function (url) {
  while (IDArr.length > 0) {
    clearTimeout(IDArr[IDArr.length--])
  }
  IDArr.length = 0
  console.log('第 ' + times++ + ' 次递归！')
  request({
      uri: url, //构建请求
      headers: {
        Cookie: 'tmgioct=571a2fe50751530136137460; rxx=wxqu8sb15r.ajhzp9u&v=1; anon_id=WETXJITFAYYWMFZLRKCZWEVTBONAIINK; language=%2Czh_CN; logged_in=1; pfp=ynnHuqcVdr9d8ya6qMogbIsJwE057LIDtQ3z7ZAq; pfs=6rWs9J6mWQNFaPUCtKlLr1KAahg; pfe=1469110090; pfu=186700025; __utmt=1; _ga=GA1.2.145587490.1461334099; yx=0uqcaxyotady3%26o%3D3%26f%3Du1; devicePixelRatio=1; documentWidth=1107; last_toast=1461923806; __utma=189990958.145587490.1461334099.1461829442.1461923802.7; __utmb=189990958.3.10.1461923802; __utmc=189990958; __utmz=189990958.1461829442.6.3.utmcsr=travelcoffeebook.com|utmccn=(referral)|utmcmd=referral|utmcct=/image/139055663713' //这里是关键，设置Cookie为之前请求到的以Cookie形式呈现的SessionID
      }
    }, function (err, res, body) { //获取响应即可
      if (err) {
        console.log('err!')
      }
      var delay = 0
      var nextPage = JSON.parse(body).meta.tumblr_old_next_page
      var url = 'https://www.tumblr.com/svc' + nextPage + '?nextAdPos=' + arr[num++ % 4] + '&stream_cursor=eyJGb2xsb3dlZFNlYXJjaFBvc3QiOltdLCJiZWZvcmVfaWQiOjE0MzU4NTEwMTE0Nn0%3D'
      console.log('路径: ' + url)
      var cycleId = setTimeout(function(){
        getImgs(url)
      }, 78000)
      IDArr.push(cycleId)
      var content = JSON.parse(body).response.DashboardPosts.body
      var $ = cheerio.load(content)
      var imgs = $('a img[class!="post"]')
      console.log('共有：' + imgs.length + ' 张图片。')
      for (var i = 0, len = imgs.length; i < len; i++) {
        var href = JSON.stringify(imgs[i].attribs.src)
        delay = Math.floor(28000 / len * i)
        ;(function(i, href, delay) {
          var url = href.substring(1, href.length - 1)
          console.log(i + ': ' + url)
          var setTimeoutId = setTimeout(function () {
            // request 里应监听 error 事件，否则会发生连接超时的情况
            request
              .get(url)
              .on('error', function(err) {
                console.log(err)
              })
              .pipe(fs.createWriteStream('images/' + path.basename(url)))
            console.log('当前抓取第 ' + i + ' 张图片，地址为：' + url + '，下载时刻：' + delay + ' ms，总共下载了：' + total++ + ' 张图片！')
          }, delay)
          IDArr.push(setTimeoutId)
        })(i, href, delay)
      }
    }
  );
}

getImgs('https://www.tumblr.com/svc/dashboard/10/143573838652?nextAdPos=8&stream_cursor=eyJGb2xsb3dlZFNlYXJjaFBvc3QiOltdLCJiZWZvcmVfaWQiOiIxNDM1NzM4Mzg2NTIifQ%3D%3D')
