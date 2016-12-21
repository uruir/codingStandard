var request = require('request');
var cheerio = require('cheerio');
request('https://segmentfault.com/a/1190000004465603?utm_source=tuicool&utm_medium=referral', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    $ = cheerio.load(body);//当前的$,它是拿到了整个body的前端选择器  
    console.log($('.h3').html().trim()); //我博客的获取用户名
  }else{
    console.log("思密达，没爬取到用户名，再来一次");
  }
})
