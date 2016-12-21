var fs = require('fs')
var superagent = require('superagent')

// scroll 到底部后加载的内容，主页使用 http://weibo.com/t9228/home?wvr=5
superagent
  .get('http://weibo.com/aj/mblog/fsearch?ajwvr=6&wvr=5?ajwvr&bid=59&__rnd=1461943288177&pre_page=1&page=1&end_id=3969739275231607&min_id=3969720963154962&pagebar=1')
  .set('X-Requested-With', 'XMLHttpRequest')
  .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2652.2 Safari/537.36')
  .set('Content-Type', 'application/x-www-form-urlencoded')
  .set('Cookie', 'SINAGLOBAL=7489774023048.281.1460611779438; _s_tentry=www.techug.com; Apache=5898182355974.233.1461854555029; ULV=1461854555080:10:10:4:5898182355974.233.1461854555029:1461758713767; TC-V5-G0=c427b4f7dad4c026ba2b0431d93d839e; TC-Ugrow-G0=0149286e34b004ccf8a0b99657f15013; TC-Page-G0=0cd4658437f38175b9211f1336161d7d; myuid=1790238327; login_sid_t=ec0eddafcf5be6a00b5f41ef4b1b99d8; SUS=SID-1790238327-1461857821-XD-nsi9e-fae4a0ef3bc31c1aa40f9b76def988de; SUE=es%3Dd1d30dace5467afcab73ff6b7528b7da%26ev%3Dv1%26es2%3Dcbd37e18a8b933ebba37d3163123c17c%26rs0%3DqgZoQKfr6VNv559LVZZ9xPFChoziMPgio1O%252BkKsfpsF0%252FnDb%252F3ZxMYGTNblYQjXJjgc1%252Fn26jVKgqtG%252BkUAATGSaKWmX6WhLlqsfCX8j1%252BOPXXiFbiqDvGEt5hECQPzawrj0altEalf2PzYbvw1q%252BtuD%252FjV%252BZ9Y8qTgC%252FAoosc8%253D%26rv%3D0; SUP=cv%3D1%26bt%3D1461857821%26et%3D1461944221%26d%3Dc909%26i%3D88de%26us%3D1%26vf%3D0%26vt%3D0%26ac%3D2%26st%3D0%26uid%3D1790238327%26name%3Dttianmur%2540163.com%26nick%3D%25E7%25B3%258A%25E6%25B6%2582%25E6%25B6%2582%25E5%25B0%258F%25E7%259D%25BF%26fmp%3D%26lcp%3D2014-06-22%252013%253A07%253A55; SUB=_2A256Jl5NDeRxGedJ4lIT8ybPyTuIHXVZUsiFrDV8PUNbuNAPLWulkW9LHespxwBRdQ7qzlrGq_vk9h1Ir0x96w..; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WWmlcvxDVrsYMffbVZucagx5JpX5K2t; SUHB=0d4PFj_N_XB5pb; ALF=1493393821; SSOLoginState=1461857821; un=ttianmur@163.com; wvr=6; UOR=news.ifeng.com,widget.weibo.com,www.cnblogs.com; wb_publish_vip_1790238327=5')
  .end(function (err, res) {
    if (err) {
      console.log(err)
    }
    console.log(res.req)
    console.log(res.text)
    fs.writeFile('weibo.html', res.text, function (err) {
      if (err) {
        console.log('aa' + err)
      }
    })
  });

