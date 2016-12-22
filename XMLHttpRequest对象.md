摘自《jQuery 应用开发实践指南》一书第 10 章

## AJAX 和 XMLHttpRequest 基础

现代浏览器都提供了 XHR（作为 JavaScript 对象模型的扩展集成），是一个控制客户端编程语言中 HTTP 事务的集成接口。这些事务独立地取代 Web 浏览器的“常规”数据请求。XHR 直接基于 HTTP 的内部结构，形成了所有 AJAX 请求的骨架。
 
由于安全原因，通常只使用 AJAX 从请求网页的同一个域请求数据，叫做“沙箱原则”。否则，属于跨域访问。

### XHR 对象方法

|方法|描述|
|:---:|:---:|
|`abort()`|停止当前浏览器请求|
|`getAllResponseHeaders()`|获得所有服务器发送过来的头标字段|
|`open('method', url[, asyncFlas[, 'username'[, 'password']]])`|通信中最重要的方法之一|
|`send(content)`|发送请求，在`open`之后调用，参数可以为`null`|
|`setRequestHeader('key', 'value')`|设置单独的头标字段|
|`setMimeType('mimetype')`|设置请求数据的 MIME 类型|

### XHR 对象属性

|属性|描述|
|:---:|:---:|
|`onreadystatechange`|可以拥有一个在 XHR 对象的连接状态（readyState）变化时调用的事件处理器。对于这个事件处理器，一般注册一个对回调函数的引用|
|`readyState`|包含当前事务的连接状态。0: uninitialized, 1: loading, 2: loaded, 3: interactive, 4: completed|
|`responseText`|服务器发来的数据（文本形式），`responseXML`是 XML 数据|
|`status`|包含一个表示连接的 HTTP 状态的数字值，`statusText`属性包含相关的文本消息|

```
$(function(){
  var xhr = new XMLHttpRequest();
  $('button:first').click(function(e){
    xhr.open('get', url, true);
    xhr.send(null);
    xhr.onreadystatechange = function(){
      if (xhr.readyState === 4) {
        $('div:first').html(xhr.responseText);
      }
    }
  });
});
```

### AJAX 通信的数据格式

- 没有任何结构的纯文本
- 含有 HTML 标签的纯文本，即 HTML 片段，这些文本甚至包含脚本
- XML
- JSON

### AJAX 请求处理

1. 创建一个 XHR 对象，通过它进行通信
2. 注册一个回调函数作为 XHR 对象函数引用。这个函数在每次事务状态变化时被调用
3. 调用 XHR 对象的`open()`方法打开连接
4. AJAX 请求通过`send()`方法发送到 Web 服务器
5. Web 服务器响应

## jQuery 中的特殊 AJAX 支持

### `$.get()` & `$.post()`

```
$.get(url[, data][, success(data, textStatus, jqXHR)][, dataType]);
$.post(url[, data][, success(data, textStatus, jqXHR)][, dataType]);

$.post(url, {
  username: $('input:first').val(),
  password: $('input:last').val()
}, function(data) {
  $('#output').html(data);
});

$.getJSON(url, function(data){
  $('#output').append(data.name + ', ' + data.websites.url);
});

// 加载 Twitter Tweet
$.getJSON('http://twitter.com/status/user_timeline/rjsedv.json?count=10&callback=?', function(data) {
  var name = '';
  var screen_name = '';
  var profile_image_url = '';
  var id = '';
  for (var i = 0, len = data.length; i < len; i++) {
    $.each(data[i].user, function(index, value) {
      if ((index === 'name') && (name === '')) {
        name = value;
      }
      if ((index === 'screen_name') && (screen_name === '')) {
        screen_name = value;
      }
      if ((index === "profile_image_url') && (profile_image_url === '')) {
        profile_image_url = value;
      }
      if ((index === 'id') && (id === '')) {
        id = value;
      }
    });
  }
  var title = '<h1>The Twitter Tweets of ' + screen_name + '</h1>';
  $('#output').html(title + '<br />' + 'Name: ' + name + ', ID: ' + id + '<hr />';
  if (profile_image_url !== '') {
    $('#output').append('<img src="' + profile_image_url + '" /><hr />');
  }
  for (var i = 0, len = data.length; i < len; i++) {
    $.each(data[i], function(index, value) {
      if (index === 'text') {
        $('#output').append(value + '<br />');
      }
      if (index === 'created_at') {
        $('#output').append('Created: ' + value + '<hr />');
      }
    });
  }
});
```

### 通过 AJAX 在以后加载脚本：`jQuery.getScript()`

### 加载数据的通用变种：`load()`

### 序列化数据

```
$('form:first').serialize();
```

然后通过 AJAX 将取得的序列化表单数据传递给服务器。

### AJAX 事件和 AJAX 事件处理器

```
$.ajax({
  url: 'ajax.txt'
}).success(function() { $('#output').html('OK'); })
  .error(function() { $('#output').html('Wrong'); })
  .complete(function() { $('#output').html('All Done'); });
```

### 完全控制

**`ajax()`参数的选项**

|名称|描述|
|:---:|:---:|
|`accepts`|类型为 Map 的对象，可以通过告诉服务器接受哪一种类型的应答|
|`async`|默认为`true`，即异步|
|`cache`|布尔值。如果为`false`，则 AJAX 请求的网站不会在浏览器中被缓存；默认为`true`|
|`headers`|设置应该在调用`beforeSend()`回调函数之前输入|
|`jsonp`|可以覆盖 JSONP 请求中的回调函数。该值被用于替代 GET 请求查询串中“callback=?”部分中的“callback”或者 POST 请求的中数据。|

```
$.ajax({
  dataType: 'jsonp',
  jsonp: 'jsonp_callback',
  url: 'sendJSONP.php',
  success: function(data) {
    $('#id').text(data.website);
  }
});

// 加载和执行 JavaScript 文件
$.ajax({
  dataType: 'script',
  type: 'GET',
  url: 'lib/random.js',
  success: function(data){
    $('#id').text(randomNumber());
  }
});

// 发送数据并评估成功
$.ajax({
  data: {
    username: $('input:first').val(),
    password: $('input:last').val()
  },
  type: 'POST',
  url: 'ch10_3_post.php',
  success: function(data){
    $('#id').html(data);
  }
});
```

## Ajax 和 Comet

Ajax的核心是XMLHttpRequest对象，XHR与XML无关，可以传送其它数据格式，是微软在IE5开始引入的特性，用于从页面向服务器请求数据。

Comet则是服务器向页面推送数据，有长轮询和流两种方式。

Web Socket：在一个单独持久的连接上提供全双工、双向通信，如QQ。

## 给后台传输 JSON 格式的数据

```
$.ajax({
  url: 'generatePDF',
  type: 'POST',
  dataType: 'json',
  contentType: 'application/json; charset=utf-8',
  beforeSend: function(request) {
      request.setRequestHeader("token", "tokenValue");
  },
  data: JSON.stringify({
    content: totalPDFContent
  }),
  success: function (data) {
    console.log(data)
    if (data.statusCode === 200) {
      window.open('/getPDF/' + data.data.name)
    }
  },
  error: function (err) {
    notie.alert(err)
  }
})
```

