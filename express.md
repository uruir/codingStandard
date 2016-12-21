它是Node Web应用框架，建立在node内建的HTTP服务器上。

单独安装express是项目的一个模块，要独立于node使用，需安装`express-generator`。

通过`res.sendFile(__dirname + '/index.html');`向客户端发送静态页面。

`app.all()`是特殊路由方法，无HTTP方法与它对应，是对一个路径上所有请求加载中间件。

与`jsonp`相关的是`<script>`标签，与`XHR/Ajax`无关。`jsonp`利用了`script`的跨域请求能力。

协议/主机名/域名/端口号只要有一个不同，就是跨域。

函数声明优于变量声明，若同名，则函数覆盖变量。

求字符串中最多的字符：
```
var s = 'abcabcaabdefaag';
var obj = {};
var max = -1;
var letter; //有值的变量在前，推荐仅使用一个var

for (var i = 0; i < s.length; i++) {
    if (obj[s[i]]) {
        obj[s[i]]++;
        if (obj[s[i]] > max) {
            letter = s[i];
            max = obj[s[i]];
        }
    } else {
        obj[s[i]] = 1;
    }
}
console.log(letter + ': ' + max);
```

```
var arr = [1, 'a'];
console.log(arr.constructor()); //[]
var obj = {name: 'rui'}
console.log(obj.constructor()); //{}
console.log(arr instanceof Array); //true，在原型链中寻找
```

## 创建简单服务器

```
var express = require('express');
var app = express();

// 主页输出 "Hello World"
app.get('/', function (req, res) {
  console.log("主页 GET 请求");
  res.send('Hello GET');
})

// POST 请求
app.post('/', function (req, res) {
  console.log("主页 POST 请求");
  res.send('Hello POST');
});

// /del_user 页面响应
app.delete('/del_user', function (req, res) {
  console.log("/del_user 响应 DELETE 请求");
  res.send('删除页面');
});

// /list_user 页面 GET 请求
app.get('/list_user', function (req, res) {
  console.log("/list_user GET 请求");
  res.send('用户列表页面');
});

// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function(req, res) {
  console.log("/ab*cd GET 请求");
  res.send('正则匹配');
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
```

## 静态文件

```
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World');
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
```

通过`express.static`设置静态文件目录，在浏览器里打开`http://localhost:8081/output.txt`，即可向浏览器返回`public`目录下的`output.txt`文件。

```
// index.html
<html>
<body>
<form action="http://127.0.0.1:8081/process_get" method="GET">
    First Name: <input type="text" name="first_name">
    <br>
    Last Name: <input type="text" name="last_name">
    <br>
    <input type="submit" value="Submit">
</form>
</body>
</html>

// server.js - GET
var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/index.htm', function (req, res) {
  res.sendFile(__dirname + "/" + "index.htm");
});

app.get('/process_get', function (req, res) {
  // 输出 JSON 格式
  response = {
    first_name:req.query.first_name,
    last_name:req.query.last_name
  };
  console.log(response);
  res.end(JSON.stringify(response));
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
});

// server.js - POST
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));

app.get('/index.htm', function (req, res) {
   res.sendFile(__dirname + "/" + "index.htm");
});

app.post('/process_post', urlencodedParser, function (req, res) {
   // 输出 JSON 格式
   response = {
       first_name:req.body.first_name,
       last_name:req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
```

启动服务器后，打开`index.html`，输入内容提交后，服务器会返回所提交的信息。

[查看更多](http://www.runoob.com/nodejs/nodejs-express-framework.html)

在node平台搭建Web应用的工具集。  

设置REST路由：
```
app.get(/account/:id,function(req, res){/* req.params('id') is available */});
```
自动http头处理：
```
app.get('/',function(req,res){ res.json({object:'foo'}); });
```
支持Connect中间件，可以插入额外请求或响应处理，如用户验证。  

安装和升级express
```
sudo npm install -g express
or git clone git://github.com/visionmedia/express.git --depth 1 express  && cd express && npm install
sudo npm update express
```
建立项目
```
express -e nodejs-demo
cd nodejs-demo & npm install
node app.js
```
express把命令行工具分离出来
```
sudo npm install -g express-generator@3
or 
sudo npm install -g express-generator  //最新版
```

## `express()`

通过`express()`创建 Express 应用。

```
var express = require('express');
var app = express(); // 实例化一个 app 对象
```

### Methods

[express.static](http://expressjs.com/en/starter/static-files.html) 是 Express 唯一内建的中间件，它基于 [serve-static](https://github.com/expressjs/serve-static?_ga=1.146543412.1455353017.1449813954)。

## Application

```
var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('uRuier');
});

app.listen(3210);
```

app 对象的作用：

- 为 HTTP 请求导航，如[app.METHOD](http://expressjs.com/en/api.html#app.METHOD)[app.param](http://expressjs.com/en/api.html#app.param)
- 配置中间件，如[app.route](http://expressjs.com/en/api.html#app.route)
- 渲染 HTML 模板，如[app.render](http://expressjs.com/en/api.html#app.render)
- 注册模板引擎，如[app.engine](http://expressjs.com/en/api.html#app.engine)

当然它的属性设置会影响应用的行为[app.settings](http://expressjs.com/en/api.html#app.settings.table)。

### Properties

#### app.locals

它是一个 JavaScript 对象，在应用内它的属性是本地变量。一旦设置，它的生命周期将贯穿应用，当然它仅在`request`时可用。

```
app.locals.title = 'trApp';
app.locals.email = '445767568@qq.com';
```

#### app.mountpath

挂载子应用。

```
var express = require('express');
var app = express();
var sub = express();

sub.get('/', function(req, res){
  console.log(sub.mountpath); // 控制台显示'/usb'
  res.send('I\'m sub application'); // 发送字符串，sendFile 用于发送文件如 HTML
});

app.use('/sub', sub);

app.listen(3210);
```

在浏览器里打开`localhost:3210/sub`。
 
### Events

```
var express = require('express');
var app = express();
var sub = express();

app.locals.title = 'trApp';
app.locals.email = '445767568@qq.com';

sub.on('mount', function (parent) {
  console.log('Admin Mounted');
  console.log(parent); // 显示的父应用对象中，有 locals.title & locals.email
});

sub.get('/', function(req, res){
  console.log(sub.mountpath);
  res.send('I\'m sub application');
});

app.use('/sub', sub);

app.listen(3210); // 监听端口
```

当进入子应用时，触发回调函数，即`sub.on()`。

### Methods

#### app.all(path, callback[, callback ...])

它匹配所有 HTTP 请求，如：`app.all('/trBlog/*', oneFunc, anotherFunc);`，这里为路径为`trBlog`下的所有请求绑定了两个回调函数。

#### app.disable(name)

让应用中某个设置失效，如：

```
app.disable('study');
app.get('study'); // false
```

#### app.disabled(name)

判断某个设置是否失效，接上例：

```
app.disabled('study'); // true
```

#### app.enable(name)

恢复某个设置功能：

```
app.enable('study');
app.disabled('study'); // false
```

`app.enabled`即是判断某个设置是否开启。

#### app.engine(ext, callback)

为页面应用模板引擎。

```
app.engine('jade', require('jade').__express);

// 若有些模板引擎不提供 __express 方法，如 ejs 有 renderFile 方法，它可以渲染 html 文件，所以
app.engine('html', require('ejs').renderFile);
```

这样当`app.rend('sth')`时，用设置好的引擎解析文件，文件默认为`views`目录下。

#### app.get(name)

返回应用设置中`name`的值。

```
app.get('title'); // undefined
app.set('title', 'trApp\'s site'); // 设置应用属性
app.get('title'); // trApp's site
```

#### app.get(path, callback[, callback ...])

为路径匹配事件处理函数，可设置多个 handler。

```
app.get('/', function(req, res){
  res.send('Hello Express');
});
```

#### app.param([name], callback)

```
var express = require('express');
var app = express();

app.locals.title = 'trApp';
app.locals.email = '445767568@qq.com';

app.get('/user/:id', function (req, res, next) {
  console.log('匹配了这里'); // 后显示
  next();
});

app.get('/user/:id', function (req, res) {
  console.log('这里也匹配到了'); // 最后显示
  res.json(req.params.id); // 返回匹配的字段给浏览器
});

app.param('id', function (req, res, next, id) {
  console.log('这是 id' + id); // 先显示
  next();
});

app.listen(3210);
```

在浏览器地址栏输入：`http://localhost:3210/user/3`，显示结果为：1. 这是 id3；2. 匹配了这里；3. 这里也匹配到了。

```
var express = require('express');
var app = express();

app.locals.title = 'trApp';
app.locals.email = '445767568@qq.com';

app.param(['id', 'page'], function (req, res, next, value) {
  console.log('CALLED ONLY ONCE with', value);
  next();
})

app.get('/user/:id/:page', function (req, res, next) {
  console.log('although this matches');
  next();
});

app.get('/user/:id/:page', function (req, res) {
  console.log('and this matches too');
  res.end();
});

app.listen(3210);
```

在浏览器地址栏输入：`http://localhost:3210/user/3/2`，显示结果为：

```
CALLED ONLY ONCE with 3
CALLED ONLY ONCE with 2
although this matches
and this matches too
```

自定义参数：

```
var express = require('express');
var app = express();

// customizing the behavior of app.param()
app.param(function(param, option) {
  return function (req, res, next, val) {
    if (val == option) {
      next();
    }
    else {
      res.sendStatus(403);
    }
  }
});

// using the customized app.param()
app.param('id', 1337);

// route to trigger the capture
app.get('/user/:id', function (req, res) {
  res.send('OK');
})

app.listen(3000, function () {
  console.log('Ready');
})
```

#### app.path

```
var express = require('express');
var app = express();
var blog = express();
var blogAdmin = express();

app.use('/blog', blog);
blog.use('/admin', blogAdmin);

console.log(app.path()); // 
console.log(blog.path()); // /blog
console.log(blogAdmin.path()); // /blog/admin

app.listen(3210);
```

#### app.post(path, callback [, callback ...])

```
// index.html
<html>
<body>
<form action="http://127.0.0.1:3210/post" method="post">
    First Name: <input type="text" name="first_name">
    <br>
    Last Name: <input type="text" name="last_name">
    <br>
    <input type="submit" value="Submit">
</form>
</body>
</html>

// main.js
var express = require('express');
var fs = require('fs');
var app = express();

app.get('/', function(req, res){
  fs.readFile(__dirname + '/index.html', 'utf-8', function(err, data){
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end(data.toString());
  });
});

app.post('/post', function (req, res) {
  console.log(req);
  res.send('POST request to homepage');
});

app.listen(3210);
```

在当前目录下新建 index.html 文件，再`node main.js`。

#### app.put(path, callback[, callback ...])

```
app.put('/', function(req, res){
  res.send('put');
});
```

#### app.render(view, [locals], callback)

```
app.render('email', { name: 'Tobi' }, function(err, html){
  // ...
});
```

#### app.use([path, ]function[, function...])

```
var express = require('express');
var app = express();

app.use('/admin', function(req, res, next) {
  // GET 'http://www.example.com/admin/new'
  console.log(req.originalUrl); // '/admin/new'
  console.log(req.baseUrl); // '/admin'
  console.log(req.path); // '/new'
  next();
});

app.listen(3210);
```

```
var express = require('express');
var app = express();

// will match paths starting with /abcd and /abd
app.use('/abc?d', function (req, res, next) {
  console.log('A')
  next();
})

// will match paths starting with /abcd, /abbcd, /abbbbbcd and so on
app.use('/ab+cd', function (req, res, next) {
  console.log('B');
  next();
})

// will match paths starting with /abcd, /abxcd, /abFOOcd, /abbArcd and so on
app.use('/ab\*cd', function (req, res, next) {
  console.log('C');
  next();
})

// will match paths starting with /ad and /abcd
app.use('/a(bc)?d', function (req, res, next) {
  console.log('D');
  next();
})

// will match paths starting with /abc and /xyz
app.use(/\/abc|\/xyz/, function (req, res, next) {
  next();
})

// will match paths starting with /abcd, /xyza, /lmn, and /pqr
app.use(['/abcd', '/xyza', /\/lmn|\/pqr/], function (req, res, next) {
  next();
})

app.listen(3210);
```

浏览器地址栏：`http://127.0.0.1:3210/abbcd`，则匹配到 B 和 C。

获取静态资源：

```
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.listen(3210);
```

在当前目录下新建一个 public 目录，public 目录里新建一个 output.txt 文件，这样在浏览器地址栏中`http://127.0.0.1:3210/output.txt`就可以直接显示 output.txt 的文本内容。这可是从浏览器直接读取本地文件啊，NodeJS 就是强大。

当然也可以设置别名：

```
var express = require('express');
var app = express();

// GET /static/style.css etc.
app.use('/static', express.static(__dirname + '/public'));

app.listen(3210);
```

访问`http://127.0.0.1:3210/static/output.txt`。Express 把 public 目录映射为 static 目录了。

## Request

`req`对象代表 HTTP 请求并且有如下属性：请求查询字符串、参数、请求体、HTTP 状态头等。

```
// 创建 answer 变量
var answer = "";
answer += "Request URL: " + request.url + "\n";
answer += "Request type: " + request.method + "\n";
answer += "Request headers: " + JSON.stringify(request.headers) + "\n";


// 返回结果
response.writeHead(200, {"Content-Type": "text/plain" });
response.end(answer);
```

返回：

```
Request URL: /
Request type: GET
Request headers: {"host":"localhost:3000","connection":"keep-alive","cache-control":"max-age=0","accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8","upgrade-insecure-requests":"1","user-agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36","accept-encoding":"gzip, deflate, sdch","accept-language":"zh-CN,zh;q=0.8","cookie":"_ga=GA1.1.1681871243.1446367663","if-none-match":"W/\"aa-SNfgj6aecdqLGkiTQbf9lQ\""}
```

### Properties

#### req.body

```
// index.html
<html>
<body>
<form action="http://127.0.0.1:3210/profile" method="post">
    First Name: <input type="text" name="first_name">
    <br>
    Last Name: <input type="text" name="last_name">
    <br>
    <input type="submit" value="Submit">
</form>
</body>
</html>

// main.js
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
var fs = require('fs');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function(req, res){
  fs.readFile('./index.html', function(err, data){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data.toString());
  });
});
app.post('/profile', upload.array(), function (req, res, next) {
  res.json(req.body);
});

app.listen(3210);
```

打开`http://127.0.0.1:3210/`填入字段后提交，NodeJS 即返回请求体的 JSON 表示。

### Methods

#### req.cookies

使用 [cookie-parser](https://www.npmjs.com/package/cookie-parser) 解析 HTTP 请求里的 cookie。

#### req 部分对象属性

解析客户端 HTTP 的`request`数据，浏览器登入`http://127.0.0.1:3210/study/english?name=tu+rui&age=27`：

```
var express = require('express');
var app = express();

app.get('/study/:class', function(req, res){
  res.json('hostname: ' + req.hostname + ' | originalUrl: ' + req.originalUrl + ' | params: ' + req.params.class + ' | path: ' + req.path + ' | protocol: ' + req.protocol + ' | query: ' + JSON.stringify(req.query));
  // "hostname: 127.0.0.1 | originalUrl: /study/english?name=tu+rui&age=27 | params: english | path: /study/english | protocol: http | query: {\"name\":\"tu rui\",\"age\":\"27\"}"
});

app.listen(3210);
```

```
var express = require('express');
var app = express();

app.get('/study/:class', function(req, res){
  res.json(req.params); // 请求地址为：http://127.0.0.1:3210/study/english，结果为：{"class":"english"}
});

app.listen(3210);
```

```
var express = require('express');
var app = express();

app.get('/user/:id?', function userIdHandler(req, res) {
  res.send(req.get('Connection')); // Host | Cache-control | Accept etc.
})

app.listen(3210);
```

当请求为`http://127.0.0.1:3210/user/english?name=tu+rui&age=27`时的请求头：

```
GET /user/english?name=tu+rui&age=27 HTTP/1.1
Host: 127.0.0.1:3210
Connection: keep-alive
Cache-Control: max-age=0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36
Accept-Encoding: gzip, deflate, sdch
Accept-Language: zh-CN,zh;q=0.8
If-None-Match: W/"4a-rHFakkbJmR1y0aWaqAkPng"
```

#### req.route

```
var express = require('express');
var app = express();

app.get('/user/:id?', function userIdHandler(req, res) {
  console.log(req.route); // 显示当前匹配的路由
  res.send('what GET?');
})

app.listen(3210);
```

控制台内容：

```
Route {
  path: '/user/:id?',
  stack:
   [ Layer {
       handle: [Function: userIdHandler],
       name: 'userIdHandler',
       params: undefined,
       path: undefined,
       keys: [],
       regexp: /^\/?$/i,
       method: 'get' } ],
  methods: { get: true } }
```

#### req.param

```
var express = require('express');
var app = express();

app.get('/user/:id?', function userIdHandler(req, res) {
  res.json(req.param('name'));
  console.log(req.query); // ? 后面的键值对组成的 JSON
});

app.listen(3210);
```

前面例子中的`req.params`是匹配路径，这里的`req.param`是匹配`?`后面的参数。

## Response

`res`对象是 Express 应用收到一个 HTTP request 时返回的 HTTP response。

```
var express = require('express');
var app = express();

app.get('/user/:id?', function(req, res) {
  res.send(req.params.id); // id 匹配到了 english
});

app.listen(3210);
```

地址栏：`http://127.0.0.1:3210/user/english?name=tu+rui&age=27`时返回`english`。

### Properties

#### res.headersSent

布尔值，用于验证是否给客户端发送了数据。

```
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  console.log(res.headersSent); // false
  res.send('OK');
  console.log(res.headersSent); // true
})

app.listen(3210);
```

### Methods 

#### res.json([body])

发送 JSON 数据给客户端。

```
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.json([{ user: 'tobi' }, null]); // [{"user":"tobi"},null]
})

app.listen(3210);
```

#### res.redirect

页面跳转：

```
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.redirect('http://www.baidu.com');
})

app.listen(3210);
```

#### res.render(view [, locals] [, callback])

- `locals`是一个对象，对象的属性为视图定义局部变量
- 回调函数返回错误信息或渲染好了的字符串

```
// send the rendered view to the client
res.render('index');

// if a callback is specified, the rendered HTML string has to be sent explicitly
res.render('index', function(err, html) {
  res.send(html);
});

// pass a local variable to the view
res.render('user', { name: 'Tobi' }, function(err, html) {
  // ...
});
```

#### res.send([body])

发送 HTTP 响应到客户端。

参数 body 可以是 a Buffer object, a String, an object, or an Array. For example:

```
res.set('Content-Type', 'text/html');
res.send(new Buffer('whoop'));
res.send({ some: 'json' });
res.send('<p>some html</p>'); // 直接发送<body>里的内容
res.status(404).send('Sorry, we cannot find that!');
res.status(500).send({ error: 'something blew up' });
```

```
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.set('Content-Type', 'text/html');
  res.send(new Buffer('whoop')); // 如果不设置响应头，则浏览器可能不会显示'whoop'，而是下载'whoop'了
})

app.listen(3210);
```

#### res.sendFile(path [, options] [, fn])

```
var express = require('express');
var app = express();

app.get('/file/:name', function (req, res, next) {
  var options = {
    root: __dirname + '/public/',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };

  var fileName = req.params.name;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
})
app.listen(3210);
```

#### res.sendStatus(statusCode)

```
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.sendStatus(500);
})

app.listen(3210);
```

#### res.set(field[, value])

设置响应头

```
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.set({
    'Content-Type': 'text/html',
    'Content-Length': '13',
    'ETag': '123456'
  })
  res.send('<p>哈哈</p>');
})

app.listen(3210);
```

#### res.status(code)

```
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.status(404).sendFile(__dirname + '/public/error.html'); // 主要是链式操作
})

app.listen(3210);
```

## Router

### Router([options])

创建新路由：

```
var router = express.Router([options]);

// only requests to /calendar/* will be sent to our "router"
app.use('/calendar', router);
```

### Methods

#### router.all(path, [callback, ...] callback)

该方法也`router.METHOD()`类似，只是它处理所有 HTTP verbs。

```
router.all('*', requireAuthentication, loadUser);
```

#### router.METHOD(path, [callback, ...] callback)

such as GET, PUT, POST, and so on.

```
router.get(/^\/commits\/(\w+)(?:\.\.(\w+))?$/, function(req, res){
  var from = req.params[0];
  var to = req.params[1] || 'HEAD';
  res.send('commit range ' + from + '..' + to);
});
```

#### router.param(name, callback)

Add callback triggers to route parameters, where name is the name of the parameter and callback is the callback function. 

The parameters of the callback function are the request object, the response object, the next middleware, the value of the parameter and the name of the parameter, in that order. 

Although name is technically optional, using this method without it is deprecated starting with Express v4.11.0 (see below).

Unlike app.param(), router.param() does not accept an array of route parameters.

将回调函数触发器绑定到路由参数上，回调函数里的参数先后是请求对象、响应对象、`next`中间件、参数值和参数名。不像`app.param()`，`router.param()`不接受路由参数数组。

```
router.param('user', function(req, res, next, id) {

  // try to get the user details from the User model and attach it to the request object
  User.find(id, function(err, user) {
    if (err) {
      next(err);
    } else if (user) {
      req.user = user;
      next();
    } else {
      next(new Error('failed to load user'));
    }
  });
});
```

回调函数参数在请求-响应周期里只被调用一次，尽管参数匹配了多个路由：

```
router.param('id', function (req, res, next, id) {
  console.log('CALLED ONLY ONCE');
  next();
})

router.get('/user/:id', function (req, res, next) {
  console.log('although this matches');
  next();
});

router.get('/user/:id', function (req, res) {
  console.log('and this matches too');
  res.end();
});
```

#### router.route(path)

```
var express = require('express');
var app = express();
var router = express.Router();

router.param('user_id', function(req, res, next, id) {
  // sample user, would actually fetch from DB, etc...
  req.user = {
    id: id,
    name: 'TJ'
  };
  next();
});

router.route('/users/:user_id')
  .all(function(req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    next();
  })
  .get(function(req, res, next) {
    res.json(req.user);
  })
  .put(function(req, res, next) {
    // just an example of maybe updating the user
    req.user.name = req.params.name;
    // save user ... etc
    res.json(req.user);
  })
  .post(function(req, res, next) {
    next(new Error('not implemented'));
  })
  .delete(function(req, res, next) {
    next(new Error('not implemented'));
  })

app.listen(3000, function () {
  console.log('Ready');
})
```

#### router.use([path], [function, ...] function)

该方法与`app.use()`类似。

```
var express = require('express');
var app = express();
var router = express.Router();

// simple logger for this router's requests
// all requests to this router will first hit this middleware
router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path); // 路径为 /foo 时显示 GET / /，当 URL 为 http://localhost:3000/foo/bar 时，显示 GET /bar /bar
  next();
});

// this will only be invoked if the path starts with /bar from the mount point
router.use('/bar', function(req, res, next) {
  console.log('哈哈'); // 当 URL 为 http://localhost:3000/foo/bar 时，路由经过这里
  next();
});

// always invoked
router.use(function(req, res, next) {
  res.send('Hello World'); // 页面显示该内容
});

app.use('/foo', router); // 路径为 /foo 的 URL 转发到 router

app.listen(3000);
```

