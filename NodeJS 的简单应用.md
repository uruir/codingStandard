## NodeJS 入门
 
本文整理自 [NodeJS 入门](http://www.nodebeginner.org/index-zh-cn.html)。

一次次重启 NodeJS 很麻烦，用：`npm install -g nodemon`，它会时时监测文件变动，一劳永逸。

最最简单的运行 NodeJS：在 helloWorld.js 里写入`console.log("Hello World.");`，运行`node helloWorld.js`。

写一个 HTTP 服务器程序，命名为 server.js。之后会在`index.js`里调用它完成 HTTP 服务器的功能：

```
var http = require("http");  // Nodejs 自带的 http 模块，并将该功能模块赋予 http 变量

// 调用 http 模块的 createServer 函数，该函数返回一个对象，该对象有一个 listen 方法，该方法有一个参数，指定该 http 服务器监听的端口号。所以最简单的 http 服务器可以是这样：http.createServer().listen(8888)。createServer 只有这一个函数定义的参数。
http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  console.log('在浏览器中打开：localhost:8888');
  response.end();
}).listen(8888);
```

```
node server.js
```

在浏览器里键入`localhost:8888`，即可看到“Hello World”。

在 server.js 中，每有一个请求到服务器，createServer 就被调用一次。如果 createServer 不用匿名函数的方式来写：

```
var http = require("http");

function onRequest(request, response) {
  console.log("Request received.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}

http.createServer(onRequest).listen(8888);

console.log("Server has started.");
```

多加了两行`console`是为看代码执行的顺序。

当我们`node server.js`的时候，首先在 shell 里出现 "Server has started."。然后当我们在浏览器里：`localhost:8888`时，shell 里出现"Request received."（如果出现两次，那可能是服务器尝试读取 localhost:8888/favicon.ico）。

这么一个 HTTP 服务器，随时都可能接受新的请求，但 NodeJS 是单线程的，当新请求到达 8888 端口时，怎么办呢？上面代码中的`onRequest`函数即是回调函数的入口。

所以，在之后每有一个请求到该 HTTP 服务器，onRequest 函数都被执行一次，shell 里也就继续出现"Request received."。

这就是 NodeJS 基于事件驱动的回调。详细请参考 [Understanding node.js](http://debuggable.com/posts/understanding-node-js:4bd98440-45e4-4a9a-8ef7-0f7ecbdd56cb)。

接下来是回调函数的两个参数：request, response。

这两个都是对象，都有方法，用它们来处理 http 请求的细节，并响应请求（如向请求的浏览器发回信息）。所以 response 对象的第一个方法 writeHead 向浏览器返回状态代码 200（表示请求是正确的，我会返回你请求的信息）和文件头类型（Content-Type）。然后 write 方法在返回的正文部分写入信息。最后的 end 方法结束从服务器到浏览器的信息传递，即结束响应。

这是 node 内建的模块，如果要自己创一个模块的话，以 http 模块为例：

```
var http = require("http");

function start() {
  function onRequest(request, response) {
    console.log("Request received.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
```

把脚本放在 start 函数里，之后导出这个函数。

这样就可以在主文件 index.js 里启动 HTTP 服务器了。

index.js 如下：

```
var server = require("./server");
server.start();
```

这样就可以像使用其它模块一样使用我们自定义的 server 模块了，所以现在改成先`nodemon index.js`。

现在创建完了 HTTP 服务器，开始建一个路由了，因为路由处理的是来自客户端的 url，所以必须对 url 进行解析并执行相应的代码，举个例子：`http://www.baidu.com/#wd=uRuier%20hexo&rsv_bp=0&tn=baidu&rsv_spt=3&ie=utf-8&rsv_sug3=6&rsv_sug4=202&rsv_sug1=1&rsv_sug2=0&inputT=9435`。在百度里搜索“uRuier hexo”，那么 Url 里，在 http://www.baidu.com/ 后便是请求的详细信息，首先是搜索关键 word=uRuier hexo，中间的%20即表示空格。

所以路由的首要功能就是对 url 进行分解。

因此，我们需要查看 HTTP 请求，从中提取出请求的 URL 以及 GET/POST 参数。这一功能应当属于路由还是服务器（甚至作为一个模块自身的功能）确实值得探讨，但这里暂定其为我们的 HTTP 服务器的功能。

我们需要的所有数据都会包含在 request 对象中，该对象作为 onRequest() 回调函数的第一个参数传递。但是为了解析这些数据，我们需要额外的 NodeJS 模块，它们分别是 url 和 querystring 模块。

                               url.parse(string).query
                                           |
           url.parse(string).pathname      |
                       |                   |
                       |                   |
                     ------ -------------------
http://localhost:8888/start?foo=bar&hello=world
                                ---       -----
                                 |          |
                                 |          |
              querystring(string)["foo"]    |
                                            |
                         querystring(string)["hello"]
                         
在服务器模块里，简单对 url 进行下处理：

```
var http = require("http");
var url = require("url");

function start() {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
```

从 request 对象里取出 url，将其传给 url 模块进行处理。

现在我们可以来编写路由了，建立一个名为 router.js 的文件，添加以下内容：

```
function route(pathname) {
  console.log("About to route a request for " + pathname);
}

exports.route = route;
```

现在更新一下 index.js

```
var server = require("./server");
var router = require("./router");

server.start(router.route);
```

在 server.js中

```
var http = require("http");
var url = require("url");

function start(route) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    route(pathname);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
```

这个时候，在地址栏键入里`localhost:8888/abcd`，那这个 abcd 就会被 route 收到并在控制台显示出来了。

对一个 web 应用，localhost:8888 后面的 /start 和 /upload 显然不同，路由提取出它们后，转向相应的处理程序，所以现在再加一个 requestHandlers 模块：

```
function start() {
  console.log("Request handler 'start' was called.");
}

function upload() {
  console.log("Request handler 'upload' was called.");
}

exports.start = start;
exports.upload = upload;
```

加入新模块，就要更新 index.js

```
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle);
```

恩，上面 server.start 里加了个参数。那 server.js：

```
var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    route(handle, pathname);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
```

噗，route(handle, pathname) 里也加了个参数，所以：

```
function route(handle, pathname) {
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname]();
  } else {
    console.log("No request handler found for " + pathname);
  }
}

exports.route = route;
```

这时我们在地址栏里输入：localhost:8888/start，看下结果。

现在把这个 web 变得有点意思，如显示请求路径下的文件。

```
// requestHandlers.js
var exec = require("child_process").exec;

function start(response) {
  console.log("Request handler 'start' was called.");

  exec("ls -lah", function (error, stdout, stderr) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(stdout);
    response.end();
  });
}

function upload(response) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello Upload");
  response.end();
}

exports.start = start;
exports.upload = upload;
```

```
// router.js
function route(handle, pathname, response) {
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response);
  } else {
    console.log("No request handler found for " + pathname);
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not found");
    response.end();
  }
}

exports.route = route;
```

```
// index.js
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle);
```

```
// server.js
var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    route(handle, pathname, response);
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
```

这是把 response 放在 router 里处理了。这个时候，即使有 start 请求会花很多时间，也不影响 upload 的使用，他会立刻 response。

服务器、请求路由以及请求处理程序都已经完成了，下面让我们按照此前的用例给网站添加交互：用户选择一个文件，上传该文件，然后在浏览器中看到上传的文件。 为了保持简单，我们假设用户只会上传图片，然后我们应用将该图片显示到浏览器中。

处理 POST 请求。考虑这样一个简单的例子：我们显示一个文本区（textarea）供用户输入内容，然后通过 POST 请求提交给服务器。最后，服务器接受到请求，通过处理程序将输入的内容展示到浏览器中。

/start 请求处理程序用于生成带文本区的表单，因此，我们将 requestHandlers.js 修改为如下形式：

```
function start(response) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello Upload");
  response.end();
}

exports.start = start;
exports.upload = upload;
```

```
// server.js：
var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var postData = "";
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    request.setEncoding("utf-8");

    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk '"+
      postDataChunk + "'.");
    });

    request.addListener("end", function() {
      route(handle, pathname, response, postData);
    });

  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
```

修改 router.js 为如下形式：

```
function route(handle, pathname, response, postData) {
  console.log("About to route a request for " + pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, postData);
  } else {
    console.log("No request handler found for " + pathname);
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("404 Not found");
    response.end();
  }
}

exports.route = route;
```

然后，在 requestHandlers.js 中，我们将数据包含在对 upload 请求的响应中：

```
function start(response, postData) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, postData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("You've sent the text: "+
  querystring.parse(postData).text);
  response.end();
}

exports.start = start;
exports.upload = upload;
```

已经可以`nodemon index.js`了，然后`npm install formidable`。

现在我们就可以用 formidable 模块了 —— 使用外部模块与内部模块类似，用 require 语句将其引入即可：

```
var formidable = require("formidable");
```

将 requestHandlers.js 修改为如下形式：

```
var querystring = require("querystring"),
    fs = require("fs");

function start(response, postData) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, postData) {
  console.log("Request handler 'upload' was called.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("You've sent the text: "+
  querystring.parse(postData).text);
  response.end();
}

function show(response, postData) {
  console.log("Request handler 'show' was called.");
  fs.readFile("/tmp/test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/png"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
```

我们还需要将这新的请求处理程序，添加到 index.js 中的路由映射表中：

```
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

server.start(router.route, handle);
```

OK!结束。